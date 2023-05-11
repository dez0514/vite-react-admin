import { Divider } from 'antd';
import SwitchTheme from "@/layout/switchTheme"
import CustomColorPicker from '../../components/colorPicker'

function Setting () {
  const changeColor = (val: any) => {
    console.log(val)
  }
  return (
    <div>
      <div className='tw-flex tw-justify-between tw-items-center tw-mb-2'>
        <div>主题</div>
        <div>
          <SwitchTheme/>
        </div>
      </div>
      <div className='tw-flex tw-justify-between tw-items-center tw-mb-2'>
        <div>系统主题</div>
        <div>
          <CustomColorPicker value={'red'} onChange={changeColor} />
        </div>
      </div>
    </div>
  )
}

export default Setting