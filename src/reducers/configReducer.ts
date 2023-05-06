import { configState, configAction } from '@/types/reducer'
import { UPDATE_CONFIG } from '@/config/actionTypes'
import { CONFIG } from '@/config'
import { StorageKeys } from '@/types/enum'
import { TypeLang, ThemeType } from '@/types'

export const initialConfigState: configState = {
  openSettingDrawer: false,
  siderCollapse: false,
  language: (sessionStorage.getItem(StorageKeys.LANGUAGE) || CONFIG.language) as TypeLang,
  theme: (sessionStorage.getItem(StorageKeys.THEME) || CONFIG.theme) as ThemeType
};

export const configReducer = (
  state: configState = initialConfigState, 
  { type, payload } : configAction
) => {
  switch (type) {
    case UPDATE_CONFIG:
      if(payload.language) {
        sessionStorage.setItem(StorageKeys.LANGUAGE, payload.language)
      }
      if(payload.theme) {
        sessionStorage.setItem(StorageKeys.THEME, payload.theme)
      }
      return { ...state, ...payload };
    default:
      return state;
  }
}
