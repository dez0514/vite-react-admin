import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
`

function SiderTrigger() {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollaps = (val: boolean) => {
    setCollapsed(val)
  }
  return (
    <TriggerBox className="custom_btn_hover" onClick={() => changeCollaps(!collapsed)}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </TriggerBox>
  )
}
export default SiderTrigger