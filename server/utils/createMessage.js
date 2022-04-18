/**
 * 创建信息
 *
 * 0  —— 发送端口号信息给前端
 * 1  —— 发送姿态信息给前端
 * 2  —— 发送 PID 数据给前端
 * 3  —— 发送 PID 数据给前端（数据缺失）
 * 10 —— 接收前端的 PID 数据写入
 * 11 —— 接受前端的 PID 数据读取请求
 * @param {any} data
 * @param {Number} code
 */
function createMessage(data, code) {
  const result = { data, code }
  return JSON.stringify(result)
}

module.exports = createMessage