import { Divider } from 'antd';
import SwitchTheme from "@/layout/switchTheme"
// import { SketchPicker } from 'react-color';
// import ColorPicker from '../../components/colorPicker'
function Setting () {
  return (
    <>
      <Divider plain>主题</Divider>
      <div style={{textAlign: 'center'}}>
        <SwitchTheme/>
      </div>
      <Divider plain>系统主题</Divider>
      <div style={{textAlign: 'center'}}>
        {/* <ColorPicker /> */}
      </div>
    </>
  )
}

export default Setting