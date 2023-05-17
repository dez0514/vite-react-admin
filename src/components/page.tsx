import { CSSProperties, ReactNode } from "react"

export default function Page(props: {
  children: ReactNode
  style?: CSSProperties
  className?: string
}) {
  return (
    <div style={{ margin: '20px', ...props.style }}>{props.children}</div>
  )
}