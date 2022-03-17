import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import Home from "./page/home";
import Setting from "./page/setting";
import Siderbar from './components/Siderbar'
import HeaderContainer from './components/Header'
import store from './store'
const { Sider, Content, Header } = Layout;

export const MainRouter = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout >
          <Header><HeaderContainer /></Header>
          <Layout>
            <Sider className="siderbar-container" theme='light' width="150">
              <Siderbar />
            </Sider>
            <Content>
              <Routes>
                <Route exact path={'/'} element={<Home />} />
                <Route path={'/setting'} element={<Setting />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}
