// 使用createSlice创建reducer，createAsyncThunk创建异步actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginPost, getUserInfo } from '@/api/user'
import { LOGIN_FETCH, USER_NAMESPACE, USERINFO_FETCH } from '@/actions/actionTypes'
import { StorageKeys } from '@/types/enum' 

export const loginReducerApi: any = createAsyncThunk(`${USER_NAMESPACE}/${LOGIN_FETCH}`, async (params: any, action) => {
  try {
    const res = await loginPost(params)
    return res.data
  } catch(error) {
    throw error
  }
})

export const userinfoReducerApi: any = createAsyncThunk(`${USER_NAMESPACE}/${USERINFO_FETCH}`, async (params: any, action) => {
  try {
    const token = sessionStorage.getItem(StorageKeys.TOKEN)
    // mock-adapter 监听不到 拦截器里 headers 的更新，
    // 所以里将token手动传一下，让mock响应函数里能接收到token。
    const res = await getUserInfo({}, { headers: { Authorization: token }})
    return res.data
  } catch(error) {
    throw error
  }
})

const userSlice = createSlice({
  name: USER_NAMESPACE,
  initialState: {
    token: sessionStorage.getItem(StorageKeys.TOKEN) || '',
    userinfo: JSON.parse(sessionStorage.getItem(StorageKeys.USERINFO) || "{}")
  },
  reducers: {
    updateToken(state: any, payload) {
      console.log('token payload==', payload)
      state.token = payload
    },
    updateUserinfo(state: any, payload) {
      console.log('info payload==', state)
      state.userinfo = { ...state.userinfo, ...payload }
    },
    resetLoginInfo(state: any) {
      console.log('info payload==', state)
      state.userinfo = {}
      state.token = ''
      sessionStorage.clear()
    }
  },
  // 监听异步action完成
  extraReducers(builder) {
    builder.addCase(loginReducerApi.fulfilled, (state: any, action: any) => {
      console.log('fulfilled payload==', action)
      state.token = action.payload
      sessionStorage.setItem(StorageKeys.TOKEN, action.payload)
      console.log('fulfilled payload==', state)
    })
    builder.addCase(loginReducerApi.rejected, (state: any, action: any) => {
      console.log('rejected action==', action)
    })
    builder.addCase(userinfoReducerApi.fulfilled, (state: any, action: any) => {
      console.log('fulfilled1 payload==', action)
      state.userinfo = action.payload
      sessionStorage.setItem(StorageKeys.USERINFO, JSON.stringify(action.payload))
    })
    builder.addCase(userinfoReducerApi.rejected, (state: any, action: any) => {
      console.log('rejected action==', action)
    })
  }
})

export const { updateToken, updateUserinfo, resetLoginInfo } = userSlice.actions
export const userSliceReducer = userSlice.reducer

