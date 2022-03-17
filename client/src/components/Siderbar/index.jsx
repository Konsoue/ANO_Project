import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import {
  RocketOutlined,
  SettingOutlined
} from '@ant-design/icons';


const Siderbar = (props) => {
  const location = useLocation()

  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="/" icon={<RocketOutlined />}>
        <Link to='/'>飞行状态</Link>
      </Menu.Item>
      <Menu.Item key="/setting" icon={<SettingOutlined />}>
        <Link to='/setting'>飞控设置</Link>
      </Menu.Item>
    </Menu>
  )
}


export default Siderbar