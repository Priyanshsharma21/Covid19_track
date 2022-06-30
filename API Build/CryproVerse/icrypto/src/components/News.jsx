import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;


const News = ({simplified}) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCatogery] = useState('Cryptocurrency')
  const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory : newsCategory,count: simplified?6:100 })
  if(!cryptoNews?.value) return <Loader />;
  
  return (
    <Row gutter={[24,24]}>
    {!simplified && (
      <Col span={24}>
      <Select
      className='select-news' 
       placeholder="Select a Crypto" 
       optionFilterProp="children"
      onChange={(value)=>setNewsCatogery(value)}
      filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
      >

      <Option>Cryptocurrency</Option>
      {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
      </Select>

      </Col>
    )}
    {cryptoNews?.value?.map((samachar,i)=>(
      <Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className='news-card'>
            <a href={samachar.url} target='_blank' rel='noreferrer'>
            <div className="news-image-container">
              <Title className='news-title' level={4}>{samachar.name}</Title>
              <img style={{maxWidth : '200px',maxHeight:'100px'}} src={samachar?.image?.thumbnail?.contentUrl || demoImage} alt="Samachar" />
            </div>
            <p>
              {samachar.description > 100 ? `${samachar.description.substring(0,100)}...` : samachar.description}
            </p>

            <div className='provider-container'>
                <Avatar src={samachar.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                <Text className='provider-name'>{samachar.provider[0]?.name}</Text>
            </div>
            <Text>{moment(samachar.datePublished).startOf('ss').fromNow()}</Text>
            </a>
        </Card>
      </Col>
    ))}
    </Row>
  )
}

export default News