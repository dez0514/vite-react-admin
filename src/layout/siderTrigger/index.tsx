import { useContext } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { ConfigContext } from "@/providers/config"

const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;
`

function SiderTrigger() {
  const { configStates, dispatch } = useContext(ConfigContext)
  const { siderCollapse } = configStates
  const changeCollaps = (val: boolean) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: { siderCollapse: val }})
  }
  return (
    <TriggerBox className="custom_btn_hover" onClick={() => changeCollaps(!siderCollapse)}>
      { siderCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </TriggerBox>
  )
}
export default SiderTrigger