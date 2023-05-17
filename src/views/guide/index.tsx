import { Button, Space } from 'antd'
import { FormattedMessage, useIntl } from "react-intl";
import { initDriver } from '@/config/driver';
import TypingCard from '@/components/typingCard'
import { useEffect } from 'react';
import PageWrap from '@/components/page' 

function Guide() {
  const { formatMessage } = useIntl()
  const driver = initDriver(formatMessage)
  const handleClickGuide = () => {
    driver.start()
  }
  const cardContent = `引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本Demo是基于<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>`
  return (
    <PageWrap className="Guide">
      <div>
        <TypingCard title='新手引导' source={cardContent} />
        <Space>
          <Button type="primary" onClick={handleClickGuide}>
            <FormattedMessage id="guide.openGuide" />
          </Button>
        </Space>
      </div>
    </PageWrap>
  )
}

export default Guide