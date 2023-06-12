import screenfull from 'screenfull'
import { message, theme } from 'antd'
import { useEffect, useState, useMemo } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { CONFIG } from '@/config'

const style = {
  padding: '0 15px',
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function Fullscreen() {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)
  const { token: { colorBgTextHover } } = theme.useToken();
  const hoverColor = useMemo(() => { // tailwindcss rgba 不能带空格，去掉空格
    return colorBgTextHover.replace(/\s+/g, '')
  }, [colorBgTextHover])
  
  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
    })
    return () => screenfull.off('change', () => {})
  }, [])
  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <div id='fullscreen' className={`FullScreen hover:tw-bg-[${hoverColor}]`} style={{ ...style}} onClick={handleFullScreen}>
      {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  )
}
export default Fullscreen