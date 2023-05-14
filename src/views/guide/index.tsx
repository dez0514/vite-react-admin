import { Button, Space } from 'antd'
import { FormattedMessage, useIntl } from "react-intl";
import { initDriver } from '@/config/driver';

function Guide() {
  const { formatMessage } = useIntl()
  const driver = initDriver(formatMessage)
  const handleClickGuide = () => {
    driver.start()
  }
  return (
    <div className="Guide">
      <div>
        <Space>
          <Button type="primary" onClick={handleClickGuide}>
            <FormattedMessage id="guide.openGuide" />
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default Guide