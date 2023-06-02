import { useState } from 'react'
import PageWrap from '@/components/page'
import MyCard from './components/card'
import { TagOutlined, DeploymentUnitOutlined, SlackOutlined, RadarChartOutlined } from '@ant-design/icons'
import RaddarChart from './components/raddarChart'
import PieChart from './components/pieChart'
import BarChart from './components/barChart'
import LineChart from './components/lineChart'
import BoxCard from './components/boxCard'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

function Home() {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const cardList = [
    {
      id: 1,
      end: 6666,
      duration: 3,
      title: 'Order',
      icon: <DeploymentUnitOutlined />,
      badge: '+56%',
      badgeBg: '#29bbe3',
      info: 'From previous period',
      prefix: '￥'
    },
    {
      id: 2,
      end: 95270,
      duration: 3,
      prefix: '￥',
      title: 'Income',
      icon: <RadarChartOutlined />,
      badge: '+78%',
      badgeBg: '#f5b225',
      info: 'From previous period'
    },
    {
      id: 3,
      end: 666,
      duration: 3,
      prefix: '￥',
      title: 'Average Price',
      icon: <TagOutlined />,
      badge: '-5.2%',
      badgeBg: '#ec536c',
      info: 'From previous period'
    },
    {
      id: 4,
      end: 9527,
      duration: 3,
      title: 'Product Sold',
      icon: <SlackOutlined />,
      badgeBg: '#29bbe3',
      info: 'From previous period'
    }
  ]
  const lineChartDefaultData = { // 与 cardList 的 id 对应
    1 : {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145],
    },
    2: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130],
    },
    3: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130],
    },
    4: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130],
    },
  }
  const [lineChartData, setLineChartData] = useState(lineChartDefaultData[1])
  const hanleClick = (id: 1 | 2 | 3 | 4) => {
    setLineChartData(lineChartDefaultData[id])
  }
  return (
    <PageWrap>
      <div className='tw-flex'>
        {
          cardList.map((item: any) => {
            return (
              <div className='tw-flex-1 tw-mr-[20px] tw-cursor-pointer last:tw-mr-0' key={item.id} onClick={ () => hanleClick(item.id) }>
                <MyCard {...item} />
              </div>
            )
          })
        }
      </div>
      <div className='tw-box-border tw-p-[20px] tw-mt-[20px] tw-shadow-card tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
        <LineChart { ...lineChartData } />
      </div>
      <div className='tw-flex tw-mt-[20px]'>
        <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-mr-[20px] tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
          <RaddarChart />
        </div>
        <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-mr-[20px] tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
          <PieChart />
        </div>
        <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
          <BarChart />
        </div>
      </div>
      <div className='tw-flex tw-mt-[20px]'>
        <div className='tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-[1.8] tw-mr-[20px] tw-bg-white'>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
        <div className='tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-1 tw-bg-white'>
          <BoxCard />
        </div>
      </div>
    </PageWrap>
  )
}

export default Home