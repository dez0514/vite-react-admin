import { Button, Space } from 'antd'
import { FormattedMessage, useIntl } from "react-intl";
import { initDriver } from '@/config/driver';
import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import { useTitle } from 'ahooks'

function Guide() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.guide' }))
  const driver = initDriver(formatMessage)
  const handleClickGuide = () => {
    driver.start()
  }
  const cardContent = `引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本Demo是基于<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>，antd5.x已经支持Tour组件，可直接使用。`
  return (
    <PageWrap className="Guide">
      <div>
        <TypingCard title='新手引导' source={cardContent} />
        <Space>
          <Button className='tw-mt-[10px]' type="primary" onClick={handleClickGuide}>
            <FormattedMessage id="guide.openGuide" />
          </Button>
        </Space>
      </div>
    </PageWrap>
  )
}

export default Guide