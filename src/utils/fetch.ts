import axios from 'axios'
// import { AxiosRequestConfig } from 'axios'
import { baseApiUrl } from './getUrls'
import store from '@/reducers/index'
import { updateConfig } from '@/actions';
import { parse, compile } from 'path-to-regexp';
import { notification } from 'antd';
import { StorageKeys } from '@/types/enum';

/**
 * config 参数配置:
 * abortRequest: boolean 取消之前所有的请求.
 * abortSign: string 取消某个请求
 * baseURL: string
 * url: string 接口地址
 * loading: boolean 是否全局加载
 * hideError: boolean 不走共通的报错
 * hideErrorByCallback: (err) => boolean // true表示不走共通。个别code不走共通error时,传说error, 利用error返回code判断是否不走共通
 * headers: object header信息覆盖
 * **/
/**
 * 请求参数情况：
 * 1.参数可能在url上 例如 '/article/:id'
 * 2.get方式在url后，例如'/article?id='
 * 3.body上
**/
const CancelToken = axios.CancelToken
const CONTENT_TYPE = {
  json: 'application/json;charset=utf-8',
  xwform: 'application/x-www-form-urlencoded',
  mpform: 'multipart/form-data' // 通常上传用这个
}
const defaultConfig = {
  loading: true,
  hideError: true,
  headers: {
    version: '1.0.0',
    'Content-Type': CONTENT_TYPE.json
  }
}
let loadingRequestList: any = []; // 请求带的队列
let sources: any = []; // 保存请求的config，cancel
let loadingTimeout: any = null
if(loadingTimeout) clearTimeout(loadingTimeout);
// 是否取消之前的请求
function isAbortRequest(config: any) {
  // 单个取消
  if (config.abortSign) {
    sources.forEach((item: any) => {
      if(item.config && item.config.abortSign) {
        if (config.abortSign === item.config.abortSign) {
          item.cancel('取消所有请求');
        }
      }
    });
	}
  // 全部取消
	if (config.abortRequest) {
    loadingRequestList = []
		sources.forEach((item: any) => {
			item.cancel('取消所有请求');
		});
	}
	config.cancelToken = new CancelToken((cancel) => {
		sources.push({ config, cancel });
	});
}
// loading
function changeLoadingState(config: any, toState: boolean) {
  const request = config.url + config.method;
  if(config.loading || (!('loading' in config) && defaultConfig.loading)) {
    if(toState) {
      loadingRequestList.push(request);
      store.dispatch(updateConfig({ showGlobalLoading: toState }))
    } else {
      // 隐藏 loading 时，考虑其他的请求是否完成，都完成时再隐藏
      const findex = loadingRequestList.findIndex((item: string) => item === request)
      if(findex > -1) {
        loadingRequestList.splice(findex, 1)
      }
      if(loadingTimeout) clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        if (loadingRequestList.length === 0) {
          store.dispatch(updateConfig({ showGlobalLoading: toState }))
        }
      }, 100);
    }
  }
}
// config
function compileConfig(config: any) {
  // 默认修改post的Content-Type
  if(config.method === 'post') { // post默认
    config.headers['Content-Type'] = CONTENT_TYPE.xwform
  }
  const { headers, ...defaultRest } = defaultConfig
  let { headers: newHeaders, ...rest } = config
  if(!newHeaders) newHeaders = {};
  config = { ...defaultRest, ...rest, headers: { ...headers, ...newHeaders }}
  // config 重新赋值了, 要return出去
  // get,set token...
  const token = sessionStorage.getItem(StorageKeys.TOKEN)
  if(token) {
    config.headers.Authorization = token; // 坑：axios-mock-adapter 监听不到更新
  }
  // 处理restful方式的url, 形如 '/article/:id'
	const data = ['get', 'delete', 'head'].includes(config.method) ? config.params : config.data;
  const parseData = parse(config.url);
	config.url = compile(config.url)(data);
	parseData.forEach((item: any) => {
		if (item.name) {
			delete data[item.name];
		}
	});
  return config
}

function handleError(data: any) {
  // 根据code来做不同的错误提示
  if(data.code !== 0) {
    notification.error({
      message: '提示',
      description: data.message || `网络错误(${data.code})`
    })
  }
}
// 移除没回来的请求
function removeSourcesRequest(config: any) {
	let i = sources.length - 1;
	for (i; i > -1; i--) {
		if (sources[i].config === config) {
			sources.splice(i, 1);
		}
	}
}

const service = axios.create({
  baseURL: baseApiUrl, // api的base_url
  timeout: 30000, // 请求超时时间
  headers: defaultConfig.headers
})
service.interceptors.request.use(
  (config: any) => {
    isAbortRequest(config)
    config = compileConfig(config)
    // 先处理config, 再loading， 防止 url 中存在变量时（例如 /:id）， loadingRequestList 匹配问题: push时是处理前的，find时是处理后的
    changeLoadingState(config, true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response: any) => {
    // 成功请求到数据
    console.log('response==', response)
    changeLoadingState(response.config, false)
    removeSourcesRequest(response.config);
    if(!response.config.hideError) {
      handleError(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    // 响应错误处理
    // console.log('error==', error)
    changeLoadingState(error.config, false)
    let hideErr = false
    if(error.config.hideErrorByCallback && typeof error.config.hideErrorByCallback === 'function') {
      hideErr = error.config.hideErrorByCallback(error) // 返回true时不走共通
      // 此场景比较少遇到。
      // 例如某接口大部分error的时候都走共通error, 仅当 error.code === -2 时，不走共通，单独修改页面某处显示，
      // 在调用接口时传入 hideErrorByCallback: (err) => { if(err.code === -2) {return true} else {return false} }。
    }
    if(!hideErr && !error.config.hideError) {
      handleError(error.data)
    }
    return Promise.reject(error)
  }
)
export const get = (url: string, params: any, option: any) => {
  const config = {
    method: 'get',
    url,
    params,
    ...option
  };
  return service.request(config);
}
export const post = (url: string, data: any, option: any) => {
  const config = {
    method: 'post',
    url,
    data: data,
    ...option
  };
  return service.request(config);
}
// 严格模式下不能用 保留字delete 命名。。
export const deletes = (url: string, params: any, option: any) => {
  const config = {
    method: 'delete',
    url,
    params,
    ...option
  };
  return service.request(config);
}
export const put = (url: string, data: any, option: any) => {
  const config = {
    method: 'put',
    url,
    data,
    ...option
  }
  return service.request(config);
}
export const patch = (url: string, data: any, option: any) => {
  const config = {
    method: 'patch',
    url,
    data,
    ...option
  }
  return service.request(config);
}
export const head = (url: string, params: any, option: any) => {
  const config = {
    method: 'head',
    url,
    params,
    ...option
  };
  return service.request(config);
}
export const options = (url: string, option: any) => {
  const config = {
    method: 'options',
    url,
    ...option
  };
  return service.request(config);
}
export const postUpload = (url: string, data: any, option: any) => {
  const config = {
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': CONTENT_TYPE.mpform
    },
    ...option
  }
  return service.request(config);
}
export const getBlob = (url: string, params: any, option: any) => {
  const config = {
    method: 'get',
    url,
    params,
    responseType: 'blob',
    ...option
  };
  return service.request(config);
}
export const postBlob = (url: string, data: any, option: any) => {
  const config = {
    method: 'post',
    url,
    data,
    responseType: 'blob',
    ...option
  };
  return service.request(config);
}

export default service