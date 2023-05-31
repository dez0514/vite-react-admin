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

export const addUser = (params: any = {}, config: any = {}) => {
  return post('/api/addUser', params, config)
}

export const editUser = (params: any = {}, config: any = {}) => {
  return post('/api/editUser', params, config)
}

export const deleteUser = (params: any = {}, config: any = {}) => {
  return post('/api/deleteUser', params, config)
}

export const addRole = (params: any = {}, config: any = {}) => {
  return post('/api/addRole', params, config)
}

export const editRole = (params: any = {}, config: any = {}) => {
  return post('/api/editRole', params, config)
}

export const deleteRole = (params: any = {}, config: any = {}) => {
  return post('/api/deleteRole', params, config)
}
