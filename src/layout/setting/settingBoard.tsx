import { Divider } from 'antd';
import SwitchTheme from "@/layout/switchTheme"

function Setting () {
  return (
    <>
      <Divider plain>主题</Divider>
      <div style={{textAlign: 'center'}}>
        <SwitchTheme/>
      </div>
      <Divider plain>系统主题</Divider>
    </>
  )
}

export default Setting