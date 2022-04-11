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

export let dataSource = [
  {
    key: 'row-1',
    firstIndex: 1,
    firstProps: 'Rol 速率',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 7,
    secondProps: '高度速率',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 13,
    thirdProps: 'PID13',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
  {
    key: 'row-2',
    firstIndex: 2,
    firstProps: 'PIT 速率',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 8,
    secondProps: '高度保持',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 14,
    thirdProps: 'PID14',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
  {
    key: 'row-3',
    firstIndex: 3,
    firstProps: 'YAW 速率',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 9,
    secondProps: '位置速率',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 15,
    thirdProps: 'PID15',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
  {
    key: 'row-4',
    firstIndex: 4,
    firstProps: '自稳 ROL',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 10,
    secondProps: '位置保持',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 16,
    thirdProps: 'PID16',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
  {
    key: 'row-5',
    firstIndex: 5,
    firstProps: '自稳 PIT',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 11,
    secondProps: 'PID11',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 17,
    thirdProps: 'PID17',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
  {
    key: 'row-6',
    firstIndex: 6,
    firstProps: '自稳 YAW',
    firstP: 0,
    firstI: 0,
    firstD: 0,
    secondIndex: 12,
    secondProps: 'PID12',
    secondP: 0,
    secondI: 0,
    secondD: 0,
    thirdIndex: 18,
    thirdProps: 'PID18',
    thirdP: 0,
    thirdI: 0,
    thirdD: 0,
  },
]

export const setDataSource = (data) => {
  dataSource = data
}

export const PIDToTableData = (PIDdata) => {
  const Indexs = Object.keys(PIDdata).map(key => Number(key))
  const prefixs = ['first', 'second', 'third']
  for (let index of Indexs) {
    dataSource.forEach(item => {
      prefixs.forEach(prefix => {
        if (item[prefix + 'Index'] === index) {
          item[prefix + 'P'] = PIDdata[index]['P']
          item[prefix + 'I'] = PIDdata[index]['I']
          item[prefix + 'D'] = PIDdata[index]['D']
        }
      })
    })
  }
  return dataSource
}

export const resetTableData = () => {
  const prefixs = ['first', 'second', 'third']
  dataSource.forEach(item => {
    prefixs.forEach(prefix => {
      item[prefix + 'P'] = 0
      item[prefix + 'I'] = 0
      item[prefix + 'D'] = 0
    }
    )
  })
}