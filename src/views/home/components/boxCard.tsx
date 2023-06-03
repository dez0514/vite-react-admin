import { Progress } from 'antd'
import TextHover from '@/components/textHover'
import Thumb from '@/components/thumb'
import { useSelector, shallowEqual } from 'react-redux'
import { GlobalConfigState } from "@/types/reducer"

function BoxCard() {
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer, shallowEqual)
  return (
    <div>
      <div className='tw-h-[240px] tw-bg-[url(https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png)] tw-bg-no-repeat tw-bg-cover tw-transition-all tw-duration-200 tw-linear hover:tw-scale-[1.1] hover:tw-contrast-[1.3]'></div>
      <div className='tw-relative tw-px-[20px] tw-pt-[52px] tw-pb-[20px]'>
        <div className='tw-absolute tw-w-[70px] tw-h-[70px] tw-top-[-25px] tw-left-[20px]'>
          <Thumb image={userinfo?.avatar} text={userinfo.name}/>
        </div>
        <TextHover className="tw-absolute tw-right-[20px] tw-top-[20px] tw-text-[25px] tw-font-bold" text="React Antd Admin" />
        <div>
          <div>
            <div>React</div>
            <Progress percent={90} />
          </div>
          <div>
            <div>JavaScript</div>
            <Progress percent={95} />
          </div>
          <div>
            <div>Redux</div>
            <Progress percent={30} />
          </div>
          <div>
            <div>TypeScript</div>
            <Progress percent={85} />
          </div>
          <div>
            <div>React Router</div>
            <Progress percent={70} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxCard