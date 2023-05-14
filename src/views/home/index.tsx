import { Button, Space } from 'antd'
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate();
  // const [msg, setMsg] = useState('')
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
        <div className={styles.title}>111</div>
        <Space>
          <Button type="primary" onClick={gorouter}>Home</Button>
        </Space>
        {/* <div className='tw-bg-orange-400 tw-text-green-700'>{msg}</div> */}
      </div>
    </div>
  )
}

export default Home