/**
 * 返回嵌套数组的格式
 * @param {*} tableData
 */
export const tableDataToPIDdata = (tableData) => {
  const result = []
  const prefix = ['first', 'second', 'third']
  const subfix = ['P', 'I', 'D']
  let tmp = []
  for (let k = 0; k < prefix.length; k++) {
    // j 是 0 ~ 5 代表表格的每一行
    // i 是 0 ~ 2 代表一组 PID
    // 由于想要 j 为 0 ~ 2 三组结合成一个数组，所以
    for (let j = 0; j < tableData.length; j++) {
      for (let i = 0; i < 3; i++) {
        const prop = prefix[k] + subfix[i]
        const num = tableData[j][prop]
        tmp.push(num)
      }
      if (!((j + 1) % 3)) {
        result.push(tmp)
        tmp = []
      }
    }
  }
  return result
}


