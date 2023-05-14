import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { updateConfig } from '@/actions';
import { GlobalConfigState } from '@/types/reducer'

const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;
`

function SiderTrigger() {
  const { siderCollapse } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const dispatch = useDispatch() 
  // console.log('reduxData===', siderCollapse)
  const changeCollaps = (val: boolean) => {
    dispatch(updateConfig({ siderCollapse: val }))
  }
  return (
    <TriggerBox id='sider-trigger' className="custom_btn_hover" onClick={() => changeCollaps(!siderCollapse)}>
      { siderCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </TriggerBox>
  )
}
export default SiderTrigger