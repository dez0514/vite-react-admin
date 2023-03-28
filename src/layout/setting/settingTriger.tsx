import { useState } from 'react'
import { SettingOutlined } from '@ant-design/icons';
const style = {
  padding: '0 15px',
  height: '48px',
  lineHeight: '48px',
  cursor: 'pointer'
}

function SettingTrigger() {
  const [isOpenDrawer, setDrawerOpen] = useState(false);
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  return (
    <div className='custom_btn_hover' style={{...style}} onClick={showDrawer}>
      <SettingOutlined />
    </div>
  )
}

export default SettingTrigger