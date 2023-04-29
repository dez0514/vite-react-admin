import { useEffect, useState } from 'react'
import Icon from '@ant-design/icons';
import {  Dropdown } from 'antd';
import type { MenuProps } from 'antd'
import { CONFIG } from '@/config'

const LangSvg = () => (
  <svg viewBox="0 0 1024 1024" p-id="3644" width="1em" height="1em" fill="currentColor">
    <path
      d="M531 703.2c0.8-1.2 1.8-2.6 2.4-3.8 0.8-1.4 1.4-2.6 2-4 0.6-1.4 1.2-2.8 1.6-4.2 0.4-1.4 1-2.8 1.2-4.4 0.4-1.4 0.6-3 0.8-4.4 0.2-1.6 0.4-3 0.4-4.6v-4.6c0-1.6-0.2-3-0.4-4.6-0.2-1.4-0.6-3-1-4.4-0.4-1.4-0.8-3-1.4-4.4l-1.8-4.2c-0.6-1.4-1.4-2.6-2.2-4-0.8-1.2-1.6-2.6-2.6-3.8-1-1.2-1.8-2.4-3-3.4-1-1.2-2.2-2.2-3.2-3.2-1.2-1-2.4-2-3.6-2.8-0.4-0.4-31.6-23.4-77-73.2 83.6-113.2 131-242 150.4-302.6h68c1.6 0 3 0 4.6-0.2 1.6-0.2 3-0.4 4.6-0.6 1.4-0.2 3-0.6 4.4-1.2 1.4-0.4 2.8-1 4.2-1.6 1.4-0.6 2.8-1.2 4.2-2 1.4-0.8 2.6-1.4 4-2.4 1.2-0.8 2.4-1.8 3.6-2.8 1.2-1 2.2-2 3.4-3 1-1 2-2.2 3-3.4 1-1.2 1.8-2.4 2.8-3.6 0.8-1.2 1.6-2.6 2.4-4 0.8-1.4 1.4-2.8 2-4.2 0.6-1.4 1-2.8 1.6-4.2 0.4-1.4 0.8-3 1.2-4.4s0.6-3 0.6-4.6c0.2-1.6 0.2-3 0.2-4.6s0-3-0.2-4.6c-0.2-1.6-0.4-3-0.6-4.6s-0.6-3-1.2-4.4c-0.4-1.4-1-2.8-1.6-4.2-0.6-1.4-1.2-2.8-2-4.2-0.8-1.4-1.4-2.6-2.4-4-0.8-1.2-1.8-2.4-2.8-3.6-1-1.2-2-2.2-3-3.4-1-1-2.2-2-3.4-3s-2.4-1.8-3.6-2.8c-1.2-0.8-2.6-1.6-4-2.4-1.4-0.8-2.8-1.4-4.2-2-1.4-0.6-2.8-1-4.2-1.6-1.4-0.4-3-0.8-4.4-1.2-1.4-0.2-3-0.6-4.6-0.6-1.6-0.2-3-0.2-4.6-0.2H417.4V127.6c0-1.6 0-3-0.2-4.6-0.2-1.6-0.4-3-0.6-4.6-0.2-1.4-0.6-3-1.2-4.4-0.4-1.4-1-2.8-1.6-4.2s-1.2-2.8-2-4.2c-0.8-1.4-1.4-2.6-2.4-4-0.8-1.2-1.8-2.4-2.8-3.6-1-1.2-2-2.2-3-3.4-1-1-2.2-2-3.4-3-1.2-1-2.4-1.8-3.6-2.8-1.2-0.8-2.6-1.6-4-2.4s-2.8-1.4-4.2-2c-1.4-0.6-2.8-1-4.2-1.6-1.4-0.4-3-0.8-4.4-1.2-1.4-0.2-3-0.6-4.6-0.6-1.6-0.2-3-0.2-4.6-0.2-1.6 0-3 0-4.6 0.2-1.6 0.2-3 0.4-4.6 0.6-1.4 0.2-3 0.6-4.4 1.2-1.4 0.4-2.8 1-4.2 1.6-1.4 0.6-2.8 1.2-4.2 2s-2.6 1.4-4 2.4c-1.2 0.8-2.4 1.8-3.6 2.8-1.2 1-2.2 2-3.4 3s-2 2.2-3 3.4c-1 1.2-1.8 2.4-2.8 3.6-0.8 1.2-1.6 2.6-2.4 4-0.8 1.4-1.4 2.8-2 4.2-0.6 1.4-1 2.8-1.6 4.2-0.4 1.4-0.8 3-1.2 4.4s-0.6 3-0.6 4.6c-0.2 1.6-0.2 3-0.2 4.6v42.2H80c-1.6 0-3 0-4.6 0.2-1.6 0.2-3 0.4-4.6 0.6-1.4 0.2-3 0.6-4.4 1.2-1.4 0.4-2.8 1-4.2 1.6-1.4 0.6-2.8 1.2-4.2 2-1.4 0.8-2.6 1.4-4 2.4-1.2 0.8-2.4 1.8-3.6 2.8-1.2 1-2.2 2-3.4 3-1 1-2 2.2-3 3.4-1 1.2-1.8 2.4-2.8 3.6-0.8 1.2-1.6 2.6-2.4 4-0.8 1.4-1.4 2.8-2 4.2s-1 2.8-1.6 4.2c-0.4 1.4-0.8 3-1.2 4.4-0.2 1.4-0.6 3-0.6 4.6-0.2 1.6-0.2 3-0.2 4.6 0 1.6 0 3 0.2 4.6s0.4 3 0.6 4.6c0.2 1.4 0.6 3 1.2 4.4 0.4 1.4 1 2.8 1.6 4.2 0.6 1.4 1.2 2.8 2 4.2 0.8 1.4 1.4 2.6 2.4 4 0.8 1.2 1.8 2.4 2.8 3.6s2 2.2 3 3.4c1 1 2.2 2 3.4 3 1.2 1 2.4 1.8 3.6 2.8s2.6 1.6 4 2.4c1.4 0.8 2.8 1.4 4.2 2 1.4 0.6 2.8 1 4.2 1.6s3 0.8 4.4 1.2c1.4 0.2 3 0.6 4.6 0.6 1.6 0.2 3 0.2 4.6 0.2h416c-20 56.8-57 146.6-113.4 228.6-66.2-88-90.8-144.8-91-145.2-0.6-1.4-1.2-2.8-2-4-0.8-1.4-1.6-2.6-2.4-3.8-0.8-1.2-1.8-2.4-2.8-3.6-1-1.2-2-2.2-3-3.4-1-1-2.2-2-3.4-3s-2.4-1.8-3.6-2.6-2.6-1.6-4-2.2c-1.4-0.6-2.8-1.4-4.2-1.8-1.4-0.6-2.8-1-4.2-1.4-1.4-0.4-3-0.8-4.4-1-1.4-0.2-3-0.4-4.4-0.6-1.6-0.2-3-0.2-4.6-0.2-1.6 0-3 0-4.6 0.2-1.6 0.2-3 0.4-4.4 0.6-1.4 0.4-3 0.6-4.4 1.2s-2.8 1-4.2 1.6-2.8 1.2-4 2c-1.4 0.8-2.6 1.4-3.8 2.4-1.2 0.8-2.4 1.8-3.6 2.8-1.2 1-2.2 2-3.4 3-1 1-2 2.2-3 3.4-1 1.2-1.8 2.4-2.6 3.6s-1.6 2.6-2.4 3.8c-0.8 1.4-1.4 2.6-2 4-0.6 1.4-1 2.8-1.6 4.2-0.4 1.4-0.8 3-1.2 4.4-0.2 1.4-0.6 3-0.6 4.4-0.2 1.6-0.2 3-0.2 4.6s0 3 0.2 4.6 0.4 3 0.6 4.4c0.2 1.4 0.6 3 1 4.4s1 2.8 1.4 4.2c1.2 3 30.6 72.2 111.6 177 2 2.6 3.8 5 5.8 7.4-82.8 93.6-164 151.6-198 170.4-1.4 0.8-2.6 1.6-3.8 2.4-1.2 0.8-2.4 1.8-3.6 2.8-1.2 1-2.2 2-3.4 3-1 1-2 2.2-3 3.4-1 1.2-1.8 2.4-2.6 3.6-0.8 1.2-1.6 2.6-2.4 4-0.8 1.4-1.4 2.8-2 4.2-0.6 1.4-1 2.8-1.6 4.4s-0.8 3-1 4.4c-0.2 1.4-0.4 3-0.6 4.6-0.2 1.6-0.2 3-0.2 4.6 0 1.6 0 3 0.2 4.6 0.2 1.6 0.4 3 0.8 4.6 0.4 1.4 0.6 3 1.2 4.4 0.4 1.4 1 2.8 1.6 4.2s1.2 2.8 2 4.2c0.8 1.4 1.6 2.6 2.4 3.8 0.8 1.2 1.8 2.4 2.8 3.6 1 1.2 2 2.2 3 3.4 1 1 2.2 2 3.4 3 1.2 1 2.4 1.8 3.6 2.6 1.2 0.8 2.6 1.6 4 2.4 1.4 0.8 2.8 1.4 4.2 2 1.4 0.6 2.8 1 4.4 1.4 1.4 0.4 3 0.8 4.4 1 1.4 0.2 3 0.4 4.6 0.6 1.6 0.2 3 0.2 4.6 0.2 1.6 0 3-0.2 4.6-0.2 1.6-0.2 3-0.4 4.6-0.8 1.4-0.4 3-0.6 4.4-1.2 1.4-0.4 2.8-1 4.2-1.6 1.4-0.6 2.8-1.2 4.2-2 4.6-2.4 102.6-56.8 214.4-180.6 47.6 50.8 80.2 74.8 82.2 76.2 1.2 0.8 2.6 1.8 3.8 2.4 1.4 0.8 2.6 1.4 4 2.2l4.2 1.8c1.4 0.4 2.8 1 4.4 1.2 1.4 0.4 3 0.6 4.4 0.8 1.6 0.2 3 0.4 4.6 0.4h4.6c1.6 0 3-0.2 4.6-0.4 1.6-0.2 3-0.6 4.4-1s3-0.8 4.4-1.4l4.2-1.8c1.4-0.6 2.8-1.4 4-2.2 1.2-0.8 2.6-1.6 3.8-2.6 1.2-1 2.4-1.8 3.4-3 1.2-1 2.2-2.2 3.2-3.2 0.4-2.6 1.2-3.8 2.2-5z m141.2 40.2l70-169.4 70 169.4h-140z m302.8 151.2l-189.8-459.8c-0.8-2.2-1.8-4.2-3-6.2s-2.4-3.8-4-5.6-3-3.4-4.8-5c-1.6-1.6-3.4-3-5.4-4.2-1.8-1.2-3.8-2.4-6-3.4-2-1-4.2-1.8-6.4-2.4-2.2-0.6-4.4-1.2-6.6-1.4-2.2-0.4-4.6-0.6-6.8-0.6s-4.6 0.2-6.8 0.6c-2.2 0.4-4.4 0.8-6.6 1.4-2.2 0.6-4.4 1.4-6.4 2.4s-4 2.2-6 3.4c-1.8 1.2-3.6 2.6-5.4 4.2-1.6 1.6-3.2 3.2-4.8 5-1.4 1.8-2.8 3.6-4 5.6-1.2 2-2.2 4-3 6.2l-189.8 459.8c-0.6 1.4-1.2 2.8-1.6 4.2-0.4 1.4-0.8 3-1.2 4.4s-0.6 3-0.6 4.6c-0.2 1.6-0.2 3-0.2 4.6 0 1.6 0 3 0.2 4.6 0.2 1.6 0.4 3 0.6 4.6 0.2 1.4 0.6 3 1.2 4.4 0.4 1.4 1 2.8 1.6 4.4s1.2 2.8 2 4.2c0.8 1.4 1.4 2.6 2.4 4 0.8 1.2 1.8 2.4 2.8 3.6 1 1.2 2 2.4 3 3.4s2.2 2.2 3.4 3c1.2 1 2.4 1.8 3.6 2.8 1.2 0.8 2.6 1.6 4 2.4 1.4 0.8 2.8 1.4 4.2 2 1.4 0.6 2.8 1 4.4 1.6 1.4 0.4 3 0.8 4.4 1.2 1.4 0.2 3 0.6 4.6 0.6 1.6 0.2 3 0.2 4.6 0.2s3 0 4.6-0.2c1.6-0.2 3-0.4 4.6-0.6 1.4-0.4 3-0.6 4.4-1.2 1.4-0.4 2.8-1 4.2-1.6 1.4-0.6 2.8-1.2 4.2-2 1.4-0.8 2.6-1.6 4-2.4s2.4-1.8 3.6-2.8c1.2-1 2.2-2 3.4-3 1-1 2-2.2 3-3.4 1-1.2 1.8-2.4 2.8-3.6 0.8-1.2 1.6-2.6 2.4-4 0.8-1.4 1.4-2.8 2-4.2l38.6-93.6h216.6l38.6 93.6c0.8 2.2 1.8 4.2 3 6.2s2.4 3.8 4 5.6c1.4 1.8 3 3.4 4.8 5 1.6 1.6 3.4 3 5.4 4.2 1.8 1.2 3.8 2.4 6 3.4 2 1 4.2 1.8 6.4 2.4 2.2 0.6 4.4 1.2 6.6 1.4 2.2 0.4 4.6 0.6 6.8 0.6h2.8c1 0 1.8-0.2 2.8-0.2 1-0.2 1.8-0.2 2.8-0.4 1-0.2 1.8-0.4 2.8-0.6 1-0.2 1.8-0.4 2.8-0.8 1-0.2 1.8-0.6 2.6-1s1.8-0.8 2.6-1.2c0.8-0.4 1.8-0.8 2.6-1.2 0.8-0.4 1.6-1 2.4-1.4s1.6-1 2.4-1.6c0.8-0.6 1.6-1.2 2.2-1.8 0.8-0.6 1.4-1.2 2.2-1.8 0.8-0.6 1.4-1.2 2-2l2-2c0.6-0.8 1.2-1.4 1.8-2.2 0.6-0.8 1.2-1.6 1.6-2.4 0.6-0.8 1-1.6 1.6-2.4 0.4-0.8 1-1.6 1.4-2.6 0.4-0.8 0.8-1.8 1.2-2.6 0.4-0.8 0.8-1.8 1-2.6 0.4-0.8 0.6-1.8 0.8-2.8 0.2-1 0.6-1.8 0.8-2.8 0.2-1 0.4-1.8 0.6-2.8 0.2-1 0.2-1.8 0.4-2.8 0-1 0.2-1.8 0.2-2.8v-2.8c0-1 0-1.8-0.2-2.8 0-1-0.2-1.8-0.4-2.8-0.2-1-0.4-1.8-0.6-2.8-0.2-1-0.4-1.8-0.6-2.8-0.2-1-0.6-1.8-0.8-2.8-1-1.4-1.2-2.2-1.6-3z"
      fill="currentColor"
    />
  </svg>
)

const style = {
  padding: '0 15px',
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function SwitchLanguage({ showHover = true }: { showHover?: Boolean }) {
  const [language, setLanguage] = useState('');
  const handleSelect = (val: any) => {
    setLanguage(val.key);
    sessionStorage.setItem("langType", val.key)
  }
  const langMenu: MenuProps['items'] = [
    {
      key: 'zh',
      label: '简体中文'
    },
    {
      key: 'en',
      label: 'English'
    }
  ]
  useEffect(() => {
    const type = sessionStorage.getItem("langType");
    if (type) {
      setLanguage(type);
    }
  }, []);
  return (
    <div className='language'>
      <Dropdown menu={{ items: langMenu, selectable: true, selectedKeys: [language], onSelect: handleSelect }} trigger={['click']}>
        <div className={showHover ? 'custom_btn_hover' : ''} style={{...style}}>
          <Icon component={LangSvg} />
        </div>
      </Dropdown>
    </div>
  )
}
export default SwitchLanguage