import { get, post } from '../utils/fetch'

export const loginPost = (params: any = {}, config: any = {}) => {
  return post('/api/login', params, config)
}

export const getUserInfo = (params: any = {}, config: any = {}) => {
  return get('/api/userinfo', params, config)
}

export const getUsersList = (params: any = {}, config: any = {}) => {
  return get('/api/getuserList', params, config)
}

export const getRoleList = (params: any = {}, config: any = {}) => {
  return get('/api/getRoleList', params, config)
}