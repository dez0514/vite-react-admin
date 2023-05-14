import styled from 'styled-components'
import { Typography } from 'antd';
import { CONFIG } from '@/config'
import { CSSProperties } from "react"

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
const spanStyle: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginLeft: '10px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  wordBreak: 'unset'
}

function Logo({ collapsed }: { collapsed: boolean | undefined }) {
  return (
    <LogoBox
      style={{
        justifyContent: !collapsed ? 'start' : 'center',
        paddingLeft: !collapsed ? '26px' : '10px'
      }}
    >
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="加载失败" title="logo" />
      { !collapsed ? <Typography.Text style={{ ...spanStyle }} strong>React Admin</Typography.Text> : null }
    </LogoBox>
  )
}

export default Logo