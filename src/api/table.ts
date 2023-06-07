import { get } from '../utils/fetch'

export const getTableData = (params: any = {}, config: any = {}) => {
  return get('/api/tabledata', params, config)
}
