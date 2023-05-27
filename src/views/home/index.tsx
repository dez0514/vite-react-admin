import { Button, Space } from 'antd'
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import CustomColorPicker from '@/components/colorPicker'
import { useSelector, shallowEqual } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer';

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
        {/* <div className='tw-bg-orange-400 tw-text-green-700'>{msg}</div> */}
        <CustomColorPicker hexval={color} onChange={colorChange} />
      </div>
    </div>
  )
}

export default Home