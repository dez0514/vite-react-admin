import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;
`

function SiderTrigger() {
  const { siderCollapse } = useSelector((state: any) => state.globalConfig, shallowEqual)
  const dispatch = useDispatch() 
  console.log('reduxData===', siderCollapse)
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