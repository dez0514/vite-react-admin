import { combineReducers } from 'redux'
import { configReducer } from './configReducer'

const reducers = combineReducers({
  globalConfig: configReducer
})

export default reducers
