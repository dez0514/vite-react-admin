import { useCountUp } from 'use-count-up'
import { ReactNode } from 'react'
import { Tag } from 'antd'
interface TypeCard {
  start: number
  end: number
  duration: number
  title: string
  prefix: string
  icon?: ReactNode | undefined
  badge?: string | undefined
  badgeBg: string
  info: string
}
function MyCard({ start, end, duration, title, prefix, icon, badge, info, badgeBg }: TypeCard) {
  const { value } = useCountUp({ isCounting: true, start, end, duration })
  return (
    <div className='tw-relative tw-h-[100%] tw-text-white tw-rounded-[8px] tw-mb-[24] tw-bg-[#7a6fbe] tw-text-[16px] hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px] tw-font-hel tw-shadow-card'>
      <div className='tw-p-[20px] tw-h-[100%] tw-bg-[url(@/assets/bg-1.png)] tw-bg-cover'>
        { icon && <div className='tw-absolute tw-right-[20px] tw-top-[20px] tw-text-[30px] tw-w-[64px] tw-h-[64px] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-[rgba(255,255,255,0.1)]'>{ icon }</div> }
        <div>
          <div className='tw-mb-[16px]'>{ title }</div>
          <div className='tw-mb-[24px] tw-h-[28px] tw-leading-[28px]'>{prefix || ''}{value}</div>
          <div className='tw-flex tw-items-center'>
            { badge && <Tag className='tw-mr-[10px]' color={badgeBg}>{ badge }</Tag> }
            { info && <div className='tw-leading-[22px]'>{ info }</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyCard
