import { SettingOutlined } from '@ant-design/icons';
import { CONFIG } from '@/config'
import { updateConfig } from '@/actions';
import { useDispatch } from "react-redux";
const style = {
  padding: '0 15px',
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function SettingTrigger() {
  const dispatch = useDispatch()
  const showDrawer = () => {
    dispatch(updateConfig({ openSettingDrawer: true }))
  };
  return (
    <div id='system-setting' className='custom_btn_hover' style={{...style}} onClick={showDrawer}>
      <SettingOutlined />
    </div>
  )
}

export default SettingTrigger