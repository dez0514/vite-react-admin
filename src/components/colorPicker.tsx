import { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { presetColors } from '@/config'

const TriggerBox = styled.span`
  display: inline-block;
  padding: 4px;
  box-sizing: border-box;
  width: 42px;
  height: 22px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
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
function CustomColorPicker({ value, onChange }: { value: any, onChange: Function }) {
  const [color, setColor] = useState<any>(value)
  const handleChange = (val: ColorResult) => {
    // console.log(val)
    setColor(val.hex)
    onChange(val.hex)
  }
  return (
    
    <Popover content={ <SketchPicker color={ color } disableAlpha={true} presetColors={[...presetColors]} onChange={ handleChange } /> } title="" trigger="click">
      <TriggerBox>
        <TriggerSpan color={color}></TriggerSpan>
      </TriggerBox>
    </Popover>
  )
}

CustomColorPicker.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomColorPicker