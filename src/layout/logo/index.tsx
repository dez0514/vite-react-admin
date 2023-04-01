import styled from 'styled-components'
import { Typography } from 'antd';
import { CONFIG } from '@/config'

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  height: ${CONFIG.headerHeight}px;
  font-size: 16px;
  text-align: center;
  img {
    display: block;
    width: 25px;
  }
`

function Logo({ collapsed }: { collapsed: boolean | undefined }) {
  return (
    <LogoBox style={{ justifyContent: !collapsed ? 'start' : 'center', paddingLeft: !collapsed ? '26px' : '10px' }}>
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="加载失败" title="logo" />
      { !collapsed ? <Typography.Text style={{marginLeft: '10px'}} strong>React Admin</Typography.Text> : null }
    </LogoBox>
  )
}

export default Logo