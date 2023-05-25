import { UPDATE_CONFIG } from '@/actions/actionTypes'
import { configState } from '@/types/reducer'
// Action是一个Object 或者 函数, 用于描述发生的动作
export const updateConfig = (payload: configState) => {
  return {
    type: UPDATE_CONFIG,
    payload
  }
}


// redux-thunk 异步 action

// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from './reducer'
// const composedEnhancer = applyMiddleware(thunkMiddleware)
// const store = createStore(rootReducer, composedEnhancer)

// function fetchData() {
//   return dispatch => {
//     dispatch({ type: 'FETCH_DATA_BEGIN' });
//     fetch('/some-url').then(res => {
//       dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
//     }).catch(err => {
//       dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
//     })
//   }
// }

// const dispatch = useDispatch();
// // dispatch 了一个函数由 redux-thunk 中间件去执行
// dispatch(fetchData());