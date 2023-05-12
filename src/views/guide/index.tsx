import { Button, Space } from 'antd'
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { guideSteps } from '@/config';
import { FormattedMessage } from "react-intl";
const driver = new Driver({
  allowClose: false, //禁止点击外部关闭
  doneBtnText: '完成', // 完成按钮标题
  closeBtnText: '关闭', // 关闭按钮标题
  stageBackground: '#fff', // 引导对话的背景色
  nextBtnText: '下一步', // 下一步按钮标题
  prevBtnText: '上一步' // 上一步按钮标题
})
driver.defineSteps(guideSteps)
function Guide() {
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