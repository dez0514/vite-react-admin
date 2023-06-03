import { get, post } from '../utils/fetch'

export const getOrderList = (params: any = {}, config: any = {}) => {
  return get('/api/getOrderList', params, config)
}