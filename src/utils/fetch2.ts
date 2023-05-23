import axios from 'axios'
// import { AxiosRequestConfig } from 'axios'
// import { baseURL } from '../api/urls'

const CONTENT_TYPE = {
  json: 'application/json;charset=utf-8',
  xwform: 'application/x-www-form-urlencoded',
}

const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': CONTENT_TYPE.json,
    projectid: 'client' // 前端页面
  }
})
service.interceptors.request.use(
  (config: any) => {
    // 在所有请求头部添加token值
    // const token = localStorage.getItem('token') // store.state.token;
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    // if (config.headers && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    //   config.data = JSON.stringify(config.data)
    // }
    console.log('config2222===', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: any) => {
    // 成功请求到数据
    // console.log('response==', response)
    return Promise.resolve(response)
  },
  (error) => {
    // 响应错误处理
    // console.log('error==', error)
    if (axios.isCancel(error)) {
      // 取消请求的情况下，终端Promise调用链
      return { code: '-1', message: '请求取消' }
    } else {
      return Promise.reject(error)
    }
  }
)

const CancelToken = axios.CancelToken

export { service, CancelToken }