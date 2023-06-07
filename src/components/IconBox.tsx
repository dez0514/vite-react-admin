import styled from "styled-components"
import { CSSProperties, ReactNode } from "react"

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`
interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
}
export default function Page({ children, style, className}: Props) {
  return (
    <IconBox className={className} style={{ ...style }}>{children}</IconBox>
  )
}