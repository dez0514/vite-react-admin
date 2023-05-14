import { useMemo } from 'react'
import SwitchTheme from "../switchTheme"
import CustomColorPicker from '@/components/colorPicker'
import { CONFIG } from "@/config"
import { updateConfig } from '@/actions';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { ThemeType } from '@/types'
import { FormattedMessage } from "react-intl";
import { Typography } from 'antd'

function Setting () {
  const dispatch = useDispatch()
  const { theme, primaryColor } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const curColor = useMemo(() => {
    return primaryColor || CONFIG[theme as ThemeType]?.colorPrimary
  }, [theme, primaryColor])
  const changeColor = (val: any) => {
    console.log(val)
    // 更新颜色 colorPrimary
    dispatch(updateConfig({ primaryColor: val }))
  }
  return (
    <div>
      <div className='tw-flex tw-justify-between tw-items-center tw-mb-2'>
        <div>
          <Typography.Text>
            <FormattedMessage id="layout.setting.themeType" />
          </Typography.Text>
        </div>
        <div>
          <SwitchTheme/>
        </div>
      </div>
      <div className='tw-flex tw-justify-between tw-items-center tw-mb-2'>
        <div>
          <Typography.Text>
            <FormattedMessage id="layout.setting.themeColor" />
          </Typography.Text>
        </div>
        <div>
          <CustomColorPicker
            value={curColor}
            onChange={changeColor}
          />
        </div>
      </div>
    </div>
  )
}

export default Setting