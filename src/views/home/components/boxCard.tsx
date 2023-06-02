import { Card, Progress } from 'antd'
import TextHover from '@/components/textHover'

function BoxCard() {
  return (
    <Card cover={<img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" />}>
      <div></div>
      <div>
        <div></div>
        <TextHover className="tw-text-[25px] tw-font-bold" text="React Antd Admin" />
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
    </Card>
  )
}

export default BoxCard