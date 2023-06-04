import { useState, CSSProperties } from 'react'
import styles from './index.module.scss'
import Saturation from '@uiw/react-color-saturation';
import EditableInput from '@uiw/react-color-editable-input'
import Hue from '@uiw/react-color-hue';
import Swatch from '@uiw/react-color-swatch';
import { hsvaToHex, hexToHsva, validHex } from '@uiw/color-convert';
import { presetColors } from '@/config'
import { Button, Popover, theme } from 'antd'
import styled from 'styled-components'
const TriggerBox = styled.span`
  display: inline-block;
  padding: 4px;
  box-sizing: border-box;
  width: 42px;
  height: 22px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid ${props => props.color};
  background-color: transparent;
  overflow: hidden;
`
const TriggerSpan = styled.span`
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  background-color: ${props => props.color};
  vertical-align: top;
`
// 此处是使用react-color的小组件拼装成自己定制的CustomColorPicker
// 也可使用react-color默认的
// 番外：antd 最新版 加了 ColorPicker ... 我giao...
function CustomColorPicker({ hexval, onChange, popoverStyle={} }: { hexval: any, onChange: Function, popoverStyle?: CSSProperties }) {
  const { token: { colorBorder } } = theme.useToken();
  const [visible, setVisible] = useState(false)
  const hexColor = hexval || '#ffffff'
  const hsvaColor = hexToHsva(hexColor)
  const [hex, setHex] = useState(hexColor);
  const [hsva, setHsva] = useState(hsvaColor);
  const handleChange = (hsvaColor: any) => {
    setHex(hsvaToHex(hsvaColor))
    setHsva(hsvaColor)
  }
  const handleConfirm = () => {
    onChange(hex)
    setVisible(false)
  }
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible)
    if(newVisible) {
      // 打开时初始化
      setHex(hsvaToHex(hsvaColor))
      setHsva(hsvaColor)
    }
  };
  const content = () => {
    return (
      <div className={styles.custom_colorpicker_wrapper}>
        <div className={styles.top_content}>
          <div className={styles.saturation_wrap}>
            <Saturation
              style={{ width: '280px', height: '180px' }}
              hsva={hsva}
              onChange={(newColor) => handleChange({ ...hsva, ...newColor, a: hsva.a })}
            />
          </div>
          <div>
            <Hue
              hue={hsva.h}
              direction='vertical'
              height={180}
              width={16}
              onChange={(newHue) => handleChange({ ...hsva, ...newHue })}
            />
          </div>
        </div>
        <div className={styles.swatch_wrap}>
          <Swatch
            colors={[...presetColors]}
            color={hex}
            rectProps={{
              style: {
                width: '20px',
                height: '20px'
              }
            }}
            onChange={(hsvColor) => {
              handleChange({ ...hsva, ...hsvColor })
            }}
          />
        </div>
        <div className={styles.bottom_wrap}>
          <EditableInput
            label=""
            placement="left"
            value={hsvaToHex(hsva)}
            style={{ flexDirection: 'row' }}
            inputStyle={{ 
              width: 145,
              height: 32,
              borderRadius: '6px',
              outline: 'none',
              padding: '0 6px'
            }}
            onChange={(e, value) => {
              if(!validHex(value as string)) return
              const newColor = hexToHsva(value as string)
              handleChange({ ...hsva, ...newColor })
            }}
          />
          <Button type='primary' onClick={handleConfirm}>确定</Button>
        </div>
      </div>
    )
  }
  return (
    <Popover
      title=""
      content={ content() }
      open={visible}
      trigger="click"
      overlayStyle={{ ...popoverStyle }}
      onOpenChange={handleVisibleChange}
    >
      <TriggerBox color={colorBorder}>
        <TriggerSpan color={hexColor}></TriggerSpan>
      </TriggerBox>
    </Popover>
  );
}


export default CustomColorPicker