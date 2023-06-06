import { CSSProperties } from "react"
import { TypeNav } from "@/types"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { GlobalConfigState } from "@/types/reducer"
import { updateConfig } from "@/actions"

function NavTypeBox({ style = {} }: { style?: CSSProperties }) {
  const dispatch = useDispatch()
  const { navType } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const handleClick = (type: TypeNav) => {
    dispatch(updateConfig({ navType: type, openSettingDrawer: false }))
  }
  return (
    <div className="tw-flex tw-items-center tw-select-none" style={{...style}}>
      <div className='tw-relative tw-overflow-hidden tw-flex tw-h-[50px] tw-w-[50px] tw-cursor-pointer tw-border tw-border-[#d3d3d3] tw-rounded-[5px] tw-bg-[#f0f2f5]'
        style={{boxShadow: '0px 1px 4px #d3d3d3'}}
        onClick={() => handleClick('lt')}
      >
        <div className='tw-h-[100%] tw-w-[20px] tw-bg-white tw-border-r-[1px] tw-border-[#d3d3d3]'></div>
        <div className='tw-h-[12px] tw-flex-1 tw-bg-white tw-border-b-[1px] tw-border-[#d3d3d3]'></div>
        {navType === 'lt' && <div className="tw-absolute tw-left-[50%] tw-top-[50%] tw-translate-y-[-50%] tw-translate-x-[-50%]">✔</div>}
      </div>
      <div className='tw-relative tw-overflow-hidden tw-ml-[10px] tw-h-[50px] tw-w-[50px] tw-cursor-pointer tw-border tw-border-[#d3d3d3] tw-rounded-[5px] tw-bg-[#f0f2f5]'
        style={{boxShadow: '0px 1px 4px #d3d3d3'}}
        onClick={() => handleClick('tl')}
      >
        <div className='tw-h-[12px] tw-bg-white tw-border-b-[1px] tw-border-[#d3d3d3]'></div>
        <div className='tw-h-[37px] tw-w-[20px] tw-bg-white tw-border-r-[1px] tw-border-[#d3d3d3]'></div>
        {navType === 'tl' && <div className="tw-absolute tw-left-[50%] tw-top-[50%] tw-translate-y-[-50%] tw-translate-x-[-50%]">✔</div>}
      </div>
      <div className='tw-relative tw-overflow-hidden tw-ml-[10px] tw-h-[50px] tw-w-[50px] tw-cursor-pointer tw-border tw-border-[#d3d3d3] tw-rounded-[5px] tw-bg-[#f0f2f5]'
        style={{boxShadow: '0px 1px 4px #d3d3d3'}}
        onClick={() => handleClick('t')}
      >
        <div className='tw-h-[12px] tw-bg-white tw-border-b-[1px] tw-border-[#d3d3d3]'></div>
        {navType === 't' && <div className="tw-absolute tw-left-[50%] tw-top-[50%] tw-translate-y-[-50%] tw-translate-x-[-50%]">✔</div>}
      </div>
    </div>
  )
}

export default NavTypeBox