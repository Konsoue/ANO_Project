import React from 'react';
import Control from './control'
import Plane from './plane'
import './index.css'

const Home = () => {
  return (
    <div className="container">
      <div className="left">
        <Control />
      </div>
      <div className="right">
        <Plane/>
      </div>
    </div>
  )
}

export default Home