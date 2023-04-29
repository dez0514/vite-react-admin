export type configState = {
  openSettingDrawer?: boolean
  siderCollapse?: boolean
}
export type configAction = {
  type: string,
  payload: configState
}
export type ConfigReducerType = React.Reducer<configState, configAction>