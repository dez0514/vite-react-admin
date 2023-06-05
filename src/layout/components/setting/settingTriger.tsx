import { useMemo } from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { CONFIG } from '@/config'
import { updateConfig } from '@/actions';
import { useDispatch } from "react-redux";
import { theme } from 'antd'
const style = {
  padding: '0 15px',
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function SettingTrigger() {
  const { token: { colorBgTextHover } } = theme.useToken();
  const hoverColor = useMemo(() => { // tailwindcss rgba 不能带空格，去掉空格
    return colorBgTextHover.replace(/\s+/g, '')
  }, [colorBgTextHover])
  const dispatch = useDispatch()
  const showDrawer = () => {
    dispatch(updateConfig({ openSettingDrawer: true }))
  };
  return (
    <div id='system-setting' className={`hover:tw-bg-[${hoverColor}]`} style={{...style}} onClick={showDrawer}>
      <SettingOutlined />
    </div>
  )
}

export default SettingTrigger