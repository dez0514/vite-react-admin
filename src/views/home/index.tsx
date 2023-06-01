import PageWrap from '@/components/page'
import MyCard from './components/card';
import { TagOutlined, DeploymentUnitOutlined, SlackOutlined, RadarChartOutlined } from '@ant-design/icons'

function Home() {
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
      badge: '+22%',
      badgeBg: '#29bbe3',
      prefix: '￥',
      info: 'From previous period'
    }
  ]

  return (
    <PageWrap>
      <div className='tw-flex'>
        {
          cardList.map((item: any) => {
            return (
              <div className='tw-flex-1 tw-mr-[10px] last:tw-mr-0' key={item.id}>
                <MyCard {...item} />
              </div>
            )
          })
        }
      </div>
    </PageWrap>
  )
}

export default Home