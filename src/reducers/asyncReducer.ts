// 使用createSlice创建reducer，createAsyncThunk创建异步actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const request = () => {
  return fetch('http://xxx.xxxxxxxxx.xxx').then(res => {
    return res.json()
  })
}

export const asyncReducer = createAsyncThunk('count/asyncAdd', async () => {
  const res = await request()
  return res
})

const slice = createSlice({
  name: 'count',
  initialState: {
    value: 0,
    list: [],
  },
  reducers: {
    add(state) {
      state.value += 1
    },
  },
  // 监听异步action完成
  extraReducers(builder) {
    builder.addCase(asyncReducer.fulfilled, (state, { payload }) => {
      state.list = payload.movieList
    })
  },
})

export const { add } = slice.actions

export default slice.reducer


// // HelloWorld.js
// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { add, asyncReducer } from '../store/features/count'

// const HelloWorld = () => {
//   // 从store中获取状态
//   const { value, list } = useSelector(store => {
//     return store.count
//   })
  
//   // 从store中对dispatch函数的引用
//   const dispatch = useDispatch()
//   return (
//     <div>
//       <div>value：{value}</div>
//       <button onClick={() => dispatch(add())}>点击加1</button>
//       <button onClick={() => dispatch(asyncReducer())}>异步action</button>
//       <div>
//         {list.length}
//       </div>
//     </div>
//   )
// }

// export default HelloWorld
