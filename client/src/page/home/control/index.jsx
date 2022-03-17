import React from 'react'
import { Statistic, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import './index.css'


const Control = () => {
  const statistics = useSelector(state => state.statistics)
  console.log(statistics);

  return (
    <div className="flex-center-container">
      <div className="statistic-container">
        <div className="showStatistic">
          <Row className="margin-bottom-small" gutter={16}>
            <Col span={12}>
              <Statistic className="text-center" title="锁定状态" value={statistics.lock ? '解锁' : '锁定'} />
            </Col>
            <Col span={12}>
              <Statistic className="text-center" title="飞行模式" value={'姿态'} />
            </Col>
          </Row>
          <Row className="margin-bottom-small" gutter={16}>
            <Col span={12}>
              <Statistic className="text-center" title="高度" value={statistics.height} />
            </Col>
            <Col span={12}>
              <Statistic className="text-center" title="航向角" value={statistics.yam} />
            </Col>
          </Row>
          <Row className="margin-bottom-small" gutter={16}>
            <Col span={12}>
              <Statistic className="text-center" title="俯仰角" value={statistics.pit} />
            </Col>
            <Col span={12}>
              <Statistic className="text-center" title="横滚角" value={statistics.rol} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Control