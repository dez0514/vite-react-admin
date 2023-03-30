import { configState, configAction } from '@/types/reducer'

export const initialConfigState: configState = {
  openSettingDrawer: false,
  siderCollapse: false
};

export const configReducer = (
  state: configState = initialConfigState, 
  { type, payload } : configAction
) => {
  switch (type) {
    case 'UPDATE_CONFIG':
      return { ...state, ...payload };
    default:
      return state;
  }
}
