import React, { useRef } from 'react';
import EditableTable from './EditableTable'
import { Button, Space } from 'antd';
import { defaultDataSource } from './EditableTable/tableDefault'
import { deepClone } from '@/utils';
import websocket from '@/utils/websocket'
import { tableDataToPIDdata } from './handleData'
import './index.css'

const Setting = () => {
  const tableRef = useRef()

  const writePID = () => {
    const { data } = tableRef.current
    const result = tableDataToPIDdata(data)
    websocket.send({ code: 10, data: result })
  }

  const readPID = () => {
    const { setData, data } = tableRef.current
    const newData = deepClone(data)
    setData(newData)
  }

  const resetPID = () => {
    const { setData } = tableRef.current
    setData(defaultDataSource)
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