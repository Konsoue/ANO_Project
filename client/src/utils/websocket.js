const defaultUrl = 'ws://localhost:3500'

class createWebSocket {
  constructor(url) {
    this.url = url
    this.ws = new WebSocket(this.url)
    this.listener = []
    this.status = this.ws.readyState
  }

  onOpen(callback) {
    this.ws.onopen = callback
  }

  onClose(callback) {
    this.listener = []
    this.ws.onclose = callback
  }
  onMessage(callback) {
    this.listener.push(callback)
    this.ws.onmessage = (event) => {
      for (let i = 0, len = this.listener.length; i < len; i++) {
        this.listener[i]?.(JSON.parse(event.data))
      }
    }
  }
  send(data) {
    if (this.ws.readyState === this.ws.OPEN) this.ws.send(JSON.stringify(data))
  }
  close() {
    this.ws.close()
  }
  reset(url = defaultUrl) {
    this.ws.close()
    this.ws = new WebSocket(url)
  }
}

export default new createWebSocket(defaultUrl)