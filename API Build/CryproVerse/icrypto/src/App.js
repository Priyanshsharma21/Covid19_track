import React, { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import './App.css'
import {  Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';


const App = () => {



 


  return (
    <div className='app'>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">

          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
            {/* <Route exact path="/exchanges" element={<Exchanges />} /> */}
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/news" element={<News />} />
          </Routes>

          </div>
        </Layout>

        <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022
          <Link to="/">
            ICrypto Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
      </div>
    
    </div>
  )
}

export default App