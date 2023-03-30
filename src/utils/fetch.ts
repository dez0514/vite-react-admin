import axios from 'axios'
// import Qs from 'qs'
const instance = axios.create({
  timeout: 10000,
  headers: {  
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json;charset=utf-8'// TYPE=2
    // 'Content-Type': 'application/x-www-form-urlencoded' // TYPE=1
  }
});
// 请求前的拦截
instance.interceptors.request.use(config => {
  // console.log(config, Qs.stringify(config.data))  
  // config.data = Qs.stringify(config.data)
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 请求返回后的拦截
instance.interceptors.response.use(
  response => {
    console.log('返回数据:', response)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance