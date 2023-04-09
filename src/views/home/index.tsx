import { Button, Space } from 'antd'
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'

import { useTranslation, Trans } from 'react-i18next'

function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const gorouter = () => {
    navigate(`/pics`)
  }
  const arr = new Array(100).fill(0)
  return (
    <div className="Home">
      <div>
        <div className={styles.title}>111</div>
        <h2>{t('components.strip_data')}</h2>
        <h3><Trans>components.strip_data</Trans></h3>
        <Space>
          <Button type="primary" onClick={gorouter}>Home</Button>
        </Space>
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