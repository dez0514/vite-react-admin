import { Button, Space } from 'antd'
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import CustomColorPicker from '@/components/colorPicker'
import { useSelector, shallowEqual } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer';
import MyCard from './components/card/card';

function Home() {
  const navigate = useNavigate();
  const { userinfo } = useSelector((state: GlobalConfigState) => state.userReducer, shallowEqual)
  // const [msg, setMsg] = useState('')
  const [color, setColor] = useState('#167fff')
  const colorChange = (val:any) => {
    console.log('cur color===', val)
    setColor(val)
  }
  const gorouter = () => {
    navigate(`/pics`)
  }
  const cardList = [
    {
      id : 1,
      end : 6666,
      duration : 3,
      title : 'Order',
      icon : 'yu-icon-lifangti',
      badge : '+56%',
      info : 'From previous period',
      prefix : '￥'
    },
    {
      id : 2,
      end : 95270,
      duration : 3,
      prefix : '￥',
      title : 'Income',
      icon : 'yu-icon-chanpin1',
      badge : '+78%',
      info : 'From previous period'
    },
    {
      id : 3,
      end : 666,
      duration : 3,
      prefix : '￥',
      title : 'Average Price',
      icon : 'yu-icon-jiagebiaoqian',
      badge : '-5.2%',
      info : 'From previous period'
    },
    {
      id : 4,
      end : 9527,
      duration : 3,
      title : 'Product Sold',
      icon : 'yu-icon-icon_xinyong_xianxing_jijin-129',
      badge : '+22%',
      prefix : '￥',
      info : 'From previous period'
    }
  ]
  // useEffect(() => {
  //   const source = new EventSource('http://localhost:3000/article');
  //   let str = ''
  //   source.onmessage = function (e) {
  //     if (e.data === 'end') {
  //       source.close()
  //     }
  //     str += e.data
  //     setMsg(str)
  //   }
  //   return () => {
  //     source.close()
  //   }
  // }, [])
  return (
    <div className="Home">
      <div>
        <div className={styles.title}>{userinfo.name}</div>
        <Space>
          <Button type="primary" onClick={gorouter}>Home</Button>
        </Space>
        {
          cardList.map((item: any, index: number) => {
            const { end, duration, title, prefix, badge, info } = item
            return (
              <MyCard key={index} start={0} end={end} prefix={prefix} info={info} badge={badge} title={title} duration={duration} />
            )
          })
        }
        {/* <div className='tw-bg-orange-400 tw-text-green-700'>{msg}</div> */}
        <CustomColorPicker hexval={color} onChange={colorChange} />
      </div>
    </div>
  )
}

export default Home