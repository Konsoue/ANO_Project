/**
 * 深拷贝
 * @param {any} obj
 * @param {WeakMap} hash
 * @returns
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null) return null
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj

  if (hash.has(obj)) return hash.get(obj)

  const result = Array.isArray(obj) ? [] : {}

  hash.set(obj, result)

  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepClone(obj[key], hash)
  })

  return result
}