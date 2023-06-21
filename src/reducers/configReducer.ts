import { configState, configAction } from '@/types/reducer'
import { UPDATE_CONFIG } from '@/actions/actionTypes'
import { CONFIG } from '@/config'
import { StorageKeys } from '@/types/enum'
import { TypeLang, ThemeType, TypeNav } from '@/types'
// nofixedHeader: true 时指高度不固定在顶部，其实并不是真正的定位，是改变 layoutContent 的高度来控制滚动条区域
export const initialConfigState: configState = {
  showGlobalLoading: false,
  openSettingDrawer: false,
  siderCollapse: false,
  language: (sessionStorage.getItem(StorageKeys.LANGUAGE) || CONFIG.language) as TypeLang,
  theme: (sessionStorage.getItem(StorageKeys.THEME) || CONFIG.theme) as ThemeType,
  primaryColor: sessionStorage.getItem(StorageKeys.PRIMARY_COLOR) || '',
  hideLogo: sessionStorage.getItem(StorageKeys.HIDELOGO) === 'true' ? true : (CONFIG.hideLogo || false),
  nofixedHeader: sessionStorage.getItem(StorageKeys.NOFIXEDHEADER) === 'true' ? true : (CONFIG.nofixedHeader || false),
  hideTagsView: sessionStorage.getItem(StorageKeys.HIDETAGSVIEW) === 'true' ? true : (CONFIG.hideTagsView || false),
  navType: sessionStorage.getItem(StorageKeys.NAVTYPE) as TypeNav || CONFIG.navType || 'lt',
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
      if('nofixedHeader' in payload) {  // boolean 值可能是 false
        sessionStorage.setItem(StorageKeys.NOFIXEDHEADER, String(payload.nofixedHeader))
      }
      if('hideTagsView' in payload) {
        sessionStorage.setItem(StorageKeys.HIDETAGSVIEW, String(payload.hideTagsView))
      }
      if('navType' in payload) {
        sessionStorage.setItem(StorageKeys.NAVTYPE, payload.navType as TypeNav)
        if(payload.navType === 't') {
          // 清掉 menuOpenKeys
          sessionStorage.removeItem(StorageKeys.menuOpenkeys)
        }
      }
      return { ...state, ...payload };
    default:
      return state;
  }
}
