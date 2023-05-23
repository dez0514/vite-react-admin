// import { get, post } from '../utils/fetch'
import { service } from '../utils/fetch2'
import qs from 'qs'

// export const loginPost = (params: any = {}, config: any = {}) => {
//   return post('/api/login', params, config)
// }

// export const getUserInfo = (params: any = {}, config: any = {}) => {
//   return get('/api/userinfo', params, config)
// }

export const loginPost = (params: any = {}, config: any = {}) => {
  const data = qs.stringify(params)
  return service.post('/api/login', data, { ...config, headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }})
}

export const getUserInfo = (params: any = {}, config: any = {}) => {
  return service.get('/api/userinfo', { params: params, ...config})
}