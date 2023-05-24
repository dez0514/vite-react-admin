import { combineReducers } from 'redux'
import { configReducer } from './configReducer'
import { GlobalConfigState } from '@/types/reducer'
import { configureStore } from "@reduxjs/toolkit";
import { loginSliceReducer } from './userReducer';

const reducers = combineReducers<GlobalConfigState>({
  globalConfig: configReducer,
  loginReducer: loginSliceReducer
})

const store = configureStore({
  reducer: reducers
})

export default store
