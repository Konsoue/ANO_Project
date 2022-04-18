const ws = require('nodejs-websocket')
const createSerialPort = require('./SerialPort')
let serialPort = null

/**
 * 判断前端发过来的数据，进行不同的处理
 * @param {Object} message
 */
const router = (message, connection) => {
  switch (message.code) {
    case -1:
      serialPort?.close()
    case 1:
      serialPort = new createSerialPort(message.COM)
      serialPort.onMessage(connection)
      break;
    case 10:
      serialPort?.sendPIDToPlane(message.data)
      break;
    case 11:
      serialPort?.requestPIDFromPlane()
  }
}

const server = ws.createServer(function (conn) {
  console.log("New connection")

  createSerialPort.onOpen(conn)

  conn.on("text", function (clientData) {
    const result = JSON.parse(clientData)
    router(result, conn)
  })

  conn.on("error", function (err) {
    console.log(err);
  })

  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  })
}).listen(3500)



