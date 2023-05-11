import { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'antd';

const TriggerBox = styled.span`
  display: inline-block;
  width: 44px;
  height: 22px;
  background-color: ${props => props.color};
  cursor: pointer;
`
const PopoverBox = styled.div`
  position: absolute;
  z-index: 2;
`
const CoverBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

function CustomColorPicker({ value, onChange }: { value: string, onChange: Function }) {
  const [color, setColor] = useState<string>(value)
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
    setVisible(!visible)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleChange = (val: ColorResult) => {
    console.log(val)
    setColor(val.hex)
  }
  const handleConfirm = () => {
    onChange(color);
  }
  const content = (<ChromePicker color={ color } onChange={ (val) => handleChange(val) } />)
  return (

    <Popover content={content} title="" trigger="click">
      <TriggerBox color={color} onClick={ handleClick }>
        <span style={{ background: color }}></span>
      </TriggerBox>
    </Popover>
    // <div style={{ position: 'relative', display: 'inline-block' }}>
    //   <TriggerBox color={color} onClick={ handleClick }>
    //     <div style={{ background: color }}></div>
    //   </TriggerBox>
    //   {
    //     visible ? (
    //       <PopoverBox>
    //         <CoverBox onClick={ handleClose } />
    //         <ChromePicker color={ color } onChange={ (val) => handleChange(val) } />
    //         <Button className="confirm-button" onClick={handleConfirm}>确定</Button>
    //       </PopoverBox>
    //     ) : null 
    //   }
    // </div>
  )
}

CustomColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomColorPicker