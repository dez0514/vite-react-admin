import { CSSProperties } from "react"

function NavTypeBox({ style = {} }: { style?: CSSProperties }) {
  return (
    <div className='tw-overflow-hidden tw-h-[50px] tw-w-[50px] tw-border tw-border-[#d3d3d3] tw-shadow-setnav tw-rounded-[5px] tw-bg-[#f0f2f5]' style={{...style}}>
      <div className='tw-h-[12px] tw-bg-white tw-border-b-[1px] tw-border-[#d3d3d3]'></div>
    </div>
  )
}

export default NavTypeBox