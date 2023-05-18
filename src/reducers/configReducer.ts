import { configState, configAction } from '@/types/reducer'
import { UPDATE_CONFIG } from '@/config/actionTypes'
import { CONFIG } from '@/config'
import { StorageKeys } from '@/types/enum'
import { TypeLang, ThemeType } from '@/types'

export const initialConfigState: configState = {
  openSettingDrawer: false,
  siderCollapse: false,
  language: (sessionStorage.getItem(StorageKeys.LANGUAGE) || CONFIG.language) as TypeLang,
  theme: (sessionStorage.getItem(StorageKeys.THEME) || CONFIG.theme) as ThemeType,
  primaryColor: sessionStorage.getItem(StorageKeys.PRIMARY_COLOR) || '',
  hideLogo: sessionStorage.getItem(StorageKeys.HIDELOGO) === 'true' ? true : (CONFIG.hideLogo || false),
  hideTagsView: sessionStorage.getItem(StorageKeys.HIDETAGSVIEW) === 'true' ? true : (CONFIG.hideTagsView || false)
};

export const configReducer = (
  state: configState = initialConfigState, 
  { type, payload } : configAction
) => {
  switch (type) {
    case UPDATE_CONFIG:
      if('language' in payload) {
        sessionStorage.setItem(StorageKeys.LANGUAGE, payload.language || '')
      }
      if('theme' in payload) {
        sessionStorage.setItem(StorageKeys.THEME, payload.theme || '')
      }
      if('primaryColor' in payload) {
        sessionStorage.setItem(StorageKeys.PRIMARY_COLOR, payload.primaryColor || '')
      }
      if('hideLogo' in payload) {  // boolean 值可能是 false
        sessionStorage.setItem(StorageKeys.HIDELOGO, String(payload.hideLogo))
      }
      if('hideTagsView' in payload) {
        sessionStorage.setItem(StorageKeys.HIDETAGSVIEW, String(payload.hideTagsView))
      }
      return { ...state, ...payload };
    default:
      return state;
  }
}
