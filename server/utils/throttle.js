/**
 * 节流函数
 * @param {*} fn
 * @param {*} delay
 */
const throttle = (fn, delay = 500) => {
  let previous = 0;
  return function (...args) {
    const now = Date.now();
    if (now - previous > delay) {
      previous = now;
      return fn.apply(this, args);
    }
  }
}

module.exports = {
  throttle
}