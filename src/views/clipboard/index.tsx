import { Button, Space, Input } from 'antd'
import { CopyOutlined } from "@ant-design/icons"
import PageWrap from '@/components/page'
import clip from "@/utils/clipboard"; 
import { useState } from 'react'
import { useTitle } from 'ahooks'
import { useIntl } from 'react-intl';

function Clipboard() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.clipboard' }))
  const text = `快复制我吧。。。`
  const [formText, setFormText] = useState<string>('复制我也行') 
  const handleCopy = (text: any, event: any) => {
    clip(text, event);
  };
  const handleChange = (e: any) => {
    // console.log(e.target.value)
    setFormText(e.target.value)
  }
  return (
    <PageWrap className="Clipboard">
      <div>
        <div className='tw-mb-[20px]'>将文字复制到剪贴板</div>
        <div className='tw-mb-[20px]'>
          { text }
          <Button type='link' onClick={(e) => handleCopy(text, e)}>click copy</Button>
        </div>
        <Input className='tw-mb-[20px]' placeholder='输入文字点击复制' defaultValue={formText} allowClear onChange={handleChange} />
        <Space>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={(e) => {
              handleCopy(formText, e);
            }}
          >
            Copy Input Text
          </Button>
        </Space>
        <Input.TextArea className='tw-mt-[20px]' placeholder='粘贴验证' autoSize={{ minRows: 6, maxRows: 10 }} allowClear />
      </div>
    </PageWrap>
  )
}

export default Clipboard