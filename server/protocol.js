/**
 * 将数值约束到 Int16 范围内：-32768 到 +32767（-2^16 ~ 2^16 - 1）
 * 65536 === 0x10000 --> 0x0000 = 0
 * 65535 === 0xffff -->  = -1
 * 32767 === 0x7fff --> 32767
 * 32768 === 0x8000 --> -32768
 * @param {Unsigned Int16} number 0 ~ 65535
 */
const changeInt16 = number => {
  if (number <= 32767) return number
  return number - 65536
}

/**
 * 将数值约束到 Int32 范围内：-2147483648 到 +2147483647
 * @param {Unsigned Int32} number
 * @returns
 */
const changeInt32 = number => {
  if (number <= 2147483647) return number
  return number - 4294967296
}

/**
 * 取低八位，用于校验和
 * @param {string} string 16 进制的字符串
 */
const cutToLow8 = (string) => {
  const map = {
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15,
  }
  let a = string[string.length - 1]
  let b = string[string.length - 2]
  a = /[A-Fa-f]/.test(a) ? map[a] : a
  b = /[A-Fa-f]/.test(b) ? map[b] : b
  return b * 16 + a * 1
}

/**
 * 解析无人机飞行姿态数据
 * @param {String} frameString 协议数据
 * @returns
 */
const parserActionInfo = (buffer) => {
  let i = 3
  const contentLength = buffer[i++]
  if (!buffer[i + contentLength]) return { isLess: true }
  const rol = changeInt16((buffer[i++] << 8) + buffer[i++]) / 100 // 横滚角
  const pit = changeInt16((buffer[i++] << 8) + buffer[i++]) / 100 // 俯仰角
  const yam = changeInt16((buffer[i++] << 8) + buffer[i++]) / 100 // 偏航角
  const height = ((buffer[i++] << 24) + (buffer[i++] << 16) + (buffer[i++] << 8) + buffer[i++]) / 100
  const mode = buffer[i++]
  const lock = buffer[i++]
  return { contentLength, rol, pit, yam, height, mode, lock }
}

/**
 * 判断帧头是否为 aaaa01，是则为飞机姿态等基本信息
 * @param {Node Buffer} buffer
 * @returns
 */
const isActionInfo = (buffer) => {
  if (buffer[0] === 0xaa
    && buffer[1] === 0xaa
    && buffer[2] === 0x01) {
    return true
  }
  return false
}

/**
 * 判断帧头是否为 aaaa10 ~ aaaa15，是则为飞机 PID 信息
 * @param {Node Buffer} buffer
 */
const isPIDInfo = (buffer) => {
  if (buffer[0] === 0xaa
    && buffer[1] === 0xaa
    && buffer[2] > 15
    && buffer[2] < 22
  ) {
    return true
  }
  return false
}

/**
 * 解析无人机发送的 PID 数据
 * @param {Node Buffer} buffer
 * @returns
 */
const parserPIDInfo = (buffer) => {
  let i = 3
  const contentLength = buffer[i++]
  if (!buffer[i + contentLength - 1]) return { isLess: true }
  const result = {}
  const key = buffer[2] % 16 * 3
  result[key + 1] = { P: changeInt16((buffer[i++] << 8) + buffer[i++]), I: changeInt16((buffer[i++] << 8) + buffer[i++]), D: changeInt16((buffer[i++] << 8) + buffer[i++]) }
  result[key + 2] = { P: changeInt16((buffer[i++] << 8) + buffer[i++]), I: changeInt16((buffer[i++] << 8) + buffer[i++]), D: changeInt16((buffer[i++] << 8) + buffer[i++]) }
  result[key + 3] = { P: changeInt16((buffer[i++] << 8) + buffer[i++]), I: changeInt16((buffer[i++] << 8) + buffer[i++]), D: changeInt16((buffer[i++] << 8) + buffer[i++]) }
  return result
}

module.exports = {
  parserActionInfo,
  isActionInfo,
  isPIDInfo,
  parserPIDInfo,
  cutToLow8
}