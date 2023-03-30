import { useContext } from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { CONFIG } from '@/config'
import { ConfigContext } from "@/providers/config"
const style = {
  padding: '0 15px',
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function SettingTrigger() {
  const { dispatch } = useContext(ConfigContext)
  const showDrawer = () => {
    dispatch({ type: 'UPDATE_CONFIG', payload: { openSettingDrawer: true }})
  };
  return (
    <div className='custom_btn_hover' style={{...style}} onClick={showDrawer}>
      <SettingOutlined />
    </div>
  )
}

export default SettingTrigger