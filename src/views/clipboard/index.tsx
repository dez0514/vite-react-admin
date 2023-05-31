import { Button, Space } from 'antd'
import { CopyOutlined } from "@ant-design/icons"
import PageWrap from '@/components/page'
import clip from "@/utils/clipboard"; 

function Clipboard() {
  const text = `快复制我吧。。。`
  const handleCopy = (text: any, event: any) => {
    clip(text, event);
  };
  return (
    <PageWrap className="Clipboard">
      <div>
        <div className='tw-mb-[20px]'>点击下方的Copy按钮，可将以下文字复制到剪贴板</div>
        <Space>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={(e) => {
              handleCopy(text, e);
            }}
          >
            Copy
          </Button>
        </Space>
      </div>
    </PageWrap>
  )
}

export default Clipboard