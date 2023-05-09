import { useState } from 'react';
import { SketchPicker } from 'react-color';

const popoverStyle = {
  position: 'absolute',
  zIndex: '2'
}
const coverStyle = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
}

function ColorPicker() {
  const [color, setColor] = useState<any>('#fff')
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
    setVisible(!visible)
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleChange = (val) => {
    setColor(val)
  }
  return (
    <div>
      <div style={{ width: '60px', height: '30px' }} onClick={ handleClick }>
        <div style={{ background: color }} />
      </div>
      {
        visible ? (
          <div style={{...popoverStyle}}>
            <div style={{...coverStyle}} onClick={ handleClose }/>
            <SketchPicker color={ color } onChange={ handleChange } />
          </div>
        ) : null 
      }
    </div>
  )
}

export default ColorPicker