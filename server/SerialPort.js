const { SerialPort } = require('serialport')
const { parserActionInfo, isActionInfo, isPIDInfo, cutToLow8, parserPIDInfo } = require('./protocol')
const createMessage = require('./utils/createMessage')
const { throttle } = require('./utils/throttle')

class createSerialPort {
  constructor(path, baudRate = 500000) {
    this.port = new SerialPort({ path, baudRate })
    this.logError()
  }

  static onOpen(connection) {
    SerialPort.list().then(items => {
      const ports = items.map(item => item.path)
      const result = createMessage(ports, 0)
      connection.sendText(result)
    })
  }

  write(data) {
    this.port.write(data)
  }

  sendPIDToPlane(array) {
    for (let i = 0; i < array.length; i++) {
      const pid = array[i]
      pid.unshift(0xaa, 0xaf, 10 + i, 18)
      const sum = cutToLow8(pid.reduce((res, cur) => res += cur).toString('16'))
      pid.push(sum)
      this.write(Buffer.from(pid))
    }
  }

  onMessage(connection) {
    const callback = (data) => {
      if (isActionInfo(data)) {
        const result = parserActionInfo(data)
        if (!result.isLess) connection.sendText(createMessage(result, 1))
      } else if (isPIDInfo(data)) {
        const result = parserPIDInfo(data)
        if (!result.isLess) connection.sendText(createMessage(result, 2))
      }
    }
    this.port.on('data', throttle(callback, 100))
  }

  close() {
    this.port.close()
  }
  logClose() {
    this.port.on('close', () => console.log('port is closed'))
  }
  logError() {
    this.port.on('error', (err) => console.log('error', err))
  }
}




module.exports = createSerialPort