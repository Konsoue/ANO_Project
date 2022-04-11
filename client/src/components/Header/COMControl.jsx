import React, { useEffect, useState, memo } from 'react'
import { Form, Select, message, Button } from 'antd'
import { SET_COM } from '@/store/actions'
import { useDispatch } from 'react-redux'
import websocket from '@/utils/websocket'

const { Option } = Select
const { Item } = Form

const COMControl = (props) => {
  const { isOpen, setOpen, form } = props
  const [comList, setComList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const callback = (result) => {
      if (result.code === 0) {
        setComList(result.data)
      }
    }
    websocket.onMessage(callback);
  }, [])


  const openCOM = (value) => {
    if (!value.COM) {
      message.info('请选择串口 COM')
      return
    }
    setOpen(true);
    value.code = 1
    dispatch({ type: SET_COM, data: value.COM })
    websocket.send(value)
  }

  const closeCOM = () => {
    setOpen(false);
    dispatch({ type: SET_COM, data: null })
    websocket.send({ code: -1 })
  }

  return (
    <Form
      form={form}
      onFinish={openCOM}
      className='com-form'
    >
      <Item
        className='com-item'
        label="COM"
        name="COM"
        initialvalues='COM3'
      >
        <Select disabled={isOpen}>
          {comList.map(com => <Option key={com} value={com}>{com}</Option>)}
        </Select>
      </Item>
      <Item
        className='com-item'
      >
        <Button htmlType="submit" type="primary" disabled={isOpen}>打开串口</Button>
      </Item>
      <Item
        className='com-item'
      >
        <Button onClick={closeCOM} disabled={!isOpen}>关闭串口</Button>
      </Item>
    </Form>
  )
}

export default memo(COMControl)