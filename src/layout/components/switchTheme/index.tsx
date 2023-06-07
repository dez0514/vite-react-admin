import { useMemo } from 'react'
import { Switch } from 'antd';
import { updateConfig } from '@/actions';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { GlobalConfigState } from '@/types/reducer'
import { ReactComponent as IconSun } from '@/assets/icons/sun.svg';
import { ReactComponent as IconMoon } from '@/assets/icons/moon.svg';
import IconBox from '@/components/IconBox'

function SwitchTheme() {
  const dispatch = useDispatch()
  const { theme } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const handleChange = (val: boolean) => {
    const current = val ? 'dark' : 'light'
    dispatch(updateConfig({ theme: current }))
  }
  const themeSwitchValue = useMemo(() => {
    return theme === 'dark'
  }, [theme])
  return (
    <Switch
      checkedChildren={
        <IconBox style={{left: 0}}>
          <IconSun />
        </IconBox>
      }
      unCheckedChildren={
        <IconBox>
          <IconMoon />
        </IconBox>
      }
      checked={themeSwitchValue}
      onChange={(value: boolean) => handleChange(value)}
    />
  )
}
export default SwitchTheme