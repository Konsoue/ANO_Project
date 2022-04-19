/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Avatar, Space, Typography } from 'antd'
import websocket from '@/utils/websocket'
import COMControl from './COMControl'
import { UPDATE_STATISTICS } from '@/store/actions'
import logo from '@/static/plane.png'
import './index.css'

const { Title } = Typography;

const setStyleVariate = (data) => {
  for (let key in data) {
    if (key === 'pit') {
      document.body.style.setProperty(`--${key}`, `${-data[key]}deg`);
    } else if (key === 'yam') {
      document.body.style.setProperty(`--${key}`, `${-data[key] - 180}deg`);
    } else {
      document.body.style.setProperty(`--${key}`, `${-data[key]}deg`);
    }
  }
}

const Header = () => {
  const [form] = Form.useForm();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const callback = (result) => {
        if (result.code === 1) {
          dispatch({ type: UPDATE_STATISTICS, data: result.data })
          setStyleVariate(result.data)
        }
      }
      websocket.onMessage(callback);
    }
  }, [isOpen])

  return (
    <div className="header-container">
      <div className="logo">
        <Space size="large">
          <Avatar src={logo} size='large' />
          <Title level={4}> Konsoue 的地面站</Title>
        </Space>
      </div>
      <COMControl
        isOpen={isOpen}
        setOpen={setOpen}
        form={form}
      />
    </div>
  )
}


export default Header