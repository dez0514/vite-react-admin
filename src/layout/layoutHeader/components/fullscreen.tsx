import screenfull from 'screenfull'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const style = {
  padding: '0 15px',
  height: '48px',
  lineHeight: '48px',
  cursor: 'pointer'
}

function Fullscreen() {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)
  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
      return () => screenfull.off('change', () => {})
    })
  }, [])
  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <div className="FullScreen custom_btn_hover" style={{...style}} onClick={handleFullScreen}>
      {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  )
}
export default Fullscreen