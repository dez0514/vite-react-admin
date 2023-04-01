import { createContext, useReducer } from "react"
import { ContextProps } from "../types"
import { configState, configAction, ConfigReducerType } from "../types/reducer"
import { initialConfigState, configReducer } from '@/reducers/configReducer'

export const ConfigContext = createContext<{
  configStates: configState
  dispatch:  React.Dispatch<configAction>
}>({
  configStates: initialConfigState,
  dispatch: () => {}
})

export function ConfigProvider(props: ContextProps) {
  const [configStates, dispatch] = useReducer<ConfigReducerType>(configReducer, initialConfigState)
  return (
    <ConfigContext.Provider
      value={{ configStates, dispatch }}>
      {props.children}
    </ConfigContext.Provider>
  )
}
