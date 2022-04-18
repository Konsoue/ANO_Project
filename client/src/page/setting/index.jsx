import React, { useRef, useEffect } from 'react';
import EditableTable from './EditableTable'
import { Button, Space, message } from 'antd';
import { deepClone } from '@/utils';
import websocket from '@/utils/websocket'
import { useSelector } from 'react-redux'
import {
  tableDataToPIDdata,
  PIDToTableData,
  dataSource,
  resetTableData,
  setDataSource
} from './handleData'
import './index.css'

const Setting = () => {
  const tableRef = useRef()
  const com = useSelector(state => state.com)
  useEffect(() => {
    const callback = (result) => {
      if (result.code === 2) {
        console.log(result);
        PIDToTableData(result.data)
        const { setData } = tableRef.current
        const newData = deepClone(dataSource)
        setData(newData)
        message.success('数据读取成功')
      } else if (result.code === 3) {
        message.success('读取数据存在问题')
      }
    }
    websocket.onMessage(callback);
  }, [])

  const writePID = () => {
    const { data } = tableRef.current
    const result = tableDataToPIDdata(data)
    websocket.send({ code: 10, data: result })
    setDataSource(data)
    if (com) {
      message.success('PID 写入成功')
    } else {
      message.info('请打开串口')
    }
  }

  const readPID = () => {
    websocket.send({ code: 11 })
    if (!com) message.info('请打开串口')
  }

  const resetPID = () => {
    const { setData } = tableRef.current
    resetTableData()
    setData(dataSource)
  }

  return (
    <div className="setting-container">
      <EditableTable ref={tableRef} />
      <footer className="text-center">
        <Space>
          <Button onClick={writePID}>写入 PID</Button>
          <Button onClick={readPID}>读取 PID</Button>
          <Button onClick={resetPID}>恢复默认 PID</Button>
        </Space>
      </footer>
    </div>
  )
}


export default Setting