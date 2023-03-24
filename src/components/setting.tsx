import { useState, useEffect, useContext } from 'react'
import { Switch, Divider } from 'antd';
import { Theme } from '@/types'
import { ThemeContext } from "../providers/theme"

function Setting () {
  const [themeSwitchValue, setThemeSwitchValue] = useState(false);
  const { updateThemeType } = useContext(ThemeContext)
  useEffect(() => {
    console.log('themeSwitchValue===', themeSwitchValue)
    if (!themeSwitchValue) {
      updateThemeType(Theme.light)
    } else {
      updateThemeType(Theme.dark)
    }
  }, [themeSwitchValue])
  return (
    <>
      <Divider plain>主题</Divider>
      <div style={{textAlign: 'center'}}>
        <Switch
          style={{ marginRight: '5px' }}
          checkedChildren={<>🌞</>}
          unCheckedChildren={<>🌜</>}
          checked={themeSwitchValue}
          onChange={(value) => setThemeSwitchValue(value)}
        />
      </div>
      <Divider plain>系统主题</Divider>
    </>
  )
}

export default Setting