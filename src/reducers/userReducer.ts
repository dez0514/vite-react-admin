// 使用createSlice创建reducer，createAsyncThunk创建异步actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginPost, getUserInfo } from '@/api/user'
import { LOGIN_FETCH, USER_NAMESPACE, USERINFO_FETCH } from '@/config/actionTypes'

export const loginReducerApi: any = createAsyncThunk(`${USER_NAMESPACE}/${LOGIN_FETCH}`, async (params: any, action) => {
  console.log('async reducer params=====', params)
  try {
    const res = await loginPost(params)
    console.log('async reducer res=====', res)
    sessionStorage.setItem('token', res.data)
    action.dispatch(userinfoReducerApi())
    return res.data
  } catch(error) {
    throw error
  }
})

export const userinfoReducerApi: any = createAsyncThunk(`${USER_NAMESPACE}/${USERINFO_FETCH}`, async (params: any, action) => {
  console.log('async1 reducer params=====', params)
  try {
    const res = await getUserInfo()
    console.log('async1 reducer res=====', res)
    return res.data
  } catch(error) {
    throw error
  }
})

const loginSlice = createSlice({
  name: USER_NAMESPACE,
  initialState: {
    token: '',
    userinfo: {}
  },
  reducers: {
    updateToken(state: any, payload) {
      console.log('token payload==', payload)
      state.token = payload
    },
  },
  // 监听异步action完成
  extraReducers(builder) {
    builder.addCase(loginReducerApi.fulfilled, (state: any, action: any) => {
      console.log('fulfilled state==', state)
      console.log('fulfilled payload==', action)
      state.token = action.payload
    })
    builder.addCase(loginReducerApi.rejected, (state: any, action: any) => {
      console.log('rejected action==', action)
    })
    builder.addCase(userinfoReducerApi.fulfilled, (state: any, action: any) => {
      console.log('fulfilled1 state==', state)
      console.log('fulfilled1 payload==', action)
      state.token = action.payload.data
    })
    builder.addCase(userinfoReducerApi.rejected, (state: any, action: any) => {
      console.log('rejected action==', action)
    })
  }
})

export const { updateToken } = loginSlice.actions
export const loginSliceReducer = loginSlice.reducer

