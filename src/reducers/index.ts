import { combineReducers } from 'redux'
import { configReducer } from './configReducer'
import { GlobalConfigState } from '@/types/reducer'

const reducers = combineReducers<GlobalConfigState>({
  globalConfig: configReducer
})

export default reducers
