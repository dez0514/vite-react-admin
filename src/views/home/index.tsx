import { useState, useEffect } from 'react'
import PageWrap from '@/components/page'
import MyCard from './components/card'
import { TagOutlined, DeploymentUnitOutlined, SlackOutlined, RadarChartOutlined } from '@ant-design/icons'
import RaddarChart from './components/raddarChart'
import PieChart from './components/pieChart'
import BarChart from './components/barChart'
import LineChart from './components/lineChart'
import BoxCard from './components/boxCard'
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrderList } from '@/api/home'
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'
interface DataType {
  key: string;
  order_no: string;
  price: string;
  tag: string;
}

function Home() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.home' }))
  const [ listData, setListData ] = useState<DataType[]>([])
  const getList = () => {
    getOrderList().then((res: any) => {
      console.log('list===', res)
      if(res.code === 0) {
        const temp = res.data.slice(0, 9).map((item: any, index: number) => {
          return {
            ...item,
            key: String(index)
          }
        })
        setListData(temp)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: 'Order_No',
      dataIndex: 'order_no',
      key: 'order_no'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tag',
      key: 'tag',
      dataIndex: 'tag',
      render: (_, { tag }) => <Tag color={tag === 'success' ? 'success' : tag === 'pending' ? 'processing' : 'default'} key={tag}>{tag}</Tag>
    }
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
        <div className='tw-overflow-hidden tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-[3] tw-mr-[20px] tw-bg-white tw-h-[fit-content]'>
          <Table columns={columns} dataSource={listData} pagination={false} />
        </div>
        <div className='tw-overflow-hidden tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-1 tw-bg-white tw-h-[fit-content]'>
          <BoxCard />
        </div>
      </div>
    </PageWrap>
  )
}

export default Home