import { Button, Space } from 'antd'
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'

function Home() {
  const navigate = useNavigate();
  const gorouter = () => {
    navigate(`/pics`)
  }
  const arr = new Array(100).fill(0)
  return (
    <div className="Home">
      <div>
        <div className={styles.title}>111</div>
        <Space>
          <Button type="primary" onClick={gorouter}>Home</Button>
        </Space>
        <div className='tw-bg-orange-400 tw-text-green-700'>tailwindCss</div>
        {
          arr.map((item, index) => {
            return (
              <div key={index}>{item}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home