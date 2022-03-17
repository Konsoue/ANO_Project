import React from 'react';
import ReactDom from 'react-dom';
import { MainRouter } from "./router";
import './index.css'

ReactDom.render(
  <MainRouter />,
  document.getElementById('root')
);
