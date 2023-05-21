// import { service } from '../utils/fetch'
// import qs from 'qs'

// export const getCommentList = (params: any = {}, config: any = {}) => {
//   return service.get('/api/comment/comments_list', { params: params, ...config })
// }

// export const addComment = (params: any = {}, config: any = {}) => {
//   const data = qs.stringify(params)
//   return service.post('/api/comment/add_comments', data, { ...config, headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }})
// }