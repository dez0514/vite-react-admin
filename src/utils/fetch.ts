import axios from 'axios'
// import { AxiosRequestConfig } from 'axios'
import { baseApiUrl } from './getUrls'
import store from '@/reducers/index'
import { updateConfig } from '@/actions';

const CONTENT_TYPE = {
  json: 'application/json;charset=utf-8',
  xwform: 'application/x-www-form-urlencoded',
}

const service = axios.create({
  baseURL: baseApiUrl, // api的base_url
  timeout: 30000, // 请求超时时间
  headers: { 'Content-Type': CONTENT_TYPE.json }
})
service.interceptors.request.use(
  (config: any) => {
    if(config.loading) {
      store.dispatch(updateConfig({ showGlobalLoading: true }))
    }
    // let url, version; let needParse = true;
		// 		const mapUrl = apiConfig[key] || key;
		// 		// config value 可能是对象 {url:'',version:''}
		// 		if (mapUrl instanceof Object) {
		// 			url = mapUrl.url;
		// 			version = mapUrl.version;
		// 			needParse = mapUrl.needParse;
		// 		} else if (typeof mapUrl == 'string') {
		// 			// 可能是stirng, 'url'
		// 			url = mapUrl;
		// 		}
		// 		// 有可能参数需要拼接到url上
		// 		const parse = pathToRegexp.parse(url);
		// 		const data = ['get', 'delete', 'head'].includes(config.method)
		// 			? config.params
		// 			: config.data;
		// 		if (needParse !== false) {
		// 			url = pathToRegexp.compile(url)(data);
		// 			parse.forEach(item => {
		// 				if (item.name) {
		// 					delete data[item.name];
		// 				}
		// 			});
		// 		}
		// 		config.url = url;
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
    if(response.config.loading) {
      store.dispatch(updateConfig({ showGlobalLoading: false }))
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    // 响应错误处理
    // console.log('error==', error)
    if(error.config.loading) {
      store.dispatch(updateConfig({ showGlobalLoading: false }))
    }
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


// request(options) {
//   const instance = axios.create();
//   const config = {
//     baseURL: this.baseURL,
//     timeout: this.timeout,
//     ...options
//   };
//   this.setInterceptor(instance, options.url); // 给这个实例增加拦截功能
//   return instance(config); // 返回的是一个promise
// }
// /**
//  * 保存资源
//  * @param {Object} url
//  * @param {Object} config
//  */
// get(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'get',
//     url,
//     params: data
//   });
//   return this.request(config);
// }
// delete(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'delete',
//     url,
//     params: data
//   });
//   return this.request(config);
// }
// head(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'head',
//     url,
//     params: data
//   });
//   return this.request(config);
// }
// options(url, config = {}) {
//   config = Object.assign(config, {
//     method: 'options',
//     url
//   });
//   return this.request(config);
// }
// post(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'post',
//     url,
//     data
//   });
//   return this.request(config);
// }
// postUpload(url, data, config = {}) {
//   config = _.merge(config, {
//     method: 'post',
//     url,
//     data,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
//   return this.request(config);
// }
// put(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'put',
//     url,
//     data
//   });
//   return this.request(config);
// }
// patch(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'patch',
//     url,
//     data
//   });
//   return this.request(config);
// }
// // get获取流
// getBlob(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'get',
//     url,
//     params: data,
//     responseType: 'blob'
//   });
//   return this.request(config);
// }
// // get下载
// getDownloadBlob(url, data, config = {}) {
//   return this.getBlob(url, data, config).then(res => {
//     download(res);
//     return res;
//   });
// }
// // get 下载url
// getDownloadUrl(url, data, config = {}) {
//   return this.get(url, data, config).then(res => {
//     // console.log(res);
//     downloadUrl(res);
//     return res;
//   });
// }

// // post获取流
// postBlob(url, data, config = {}) {
//   config = Object.assign(config, {
//     method: 'post',
//     url,
//     data,
//     responseType: 'blob'
//   });
//   return this.request(config);
// }
// // post下载流
// postDownloadBlob(url, data, config = {}) {
//   return this.postBlob(url, data, config).then(res => {
//     download(res);
//     return res;
//   });
// }
// // post 下载url
// postDownloadUrl(url, data, config = {}) {
//   return this.post(url, data, config).then(res => {
//     downloadUrl(res);
//     return res;
//   });
// }


// export const responseFailedValidate = function(result, e) {
// 	const msgs = [];
// 	if (result.actionErrors) {
// 		result.actionErrors.forEach(err => {
// 			msgs.push([err.message, handleParams(err)]);
// 		});
// 	}
// 	if (result.actionMessages) {
// 		result.actionMessages.forEach(err => {
// 			msgs.push([err.message, handleParams(err)]);
// 		});
// 	} else if (result.fieldErrors) {
// 		const fieldErrors = result.fieldErrors;
// 		for (const prop in fieldErrors) {
// 			msgs.push([
// 				fieldErrors[prop][0].message,
// 				handleParams(fieldErrors[prop][0])
// 			]);
// 		}
// 	}
// 	// 提示信息
// 	msgs.forEach((msg, idx) => {
// 		if (messageCache.includes(msg[0])) return;
// 		messageCache.push(msg[0]);
// 		setTimeout(() => {
// 			messageCache.splice(messageCache.findIndex(m => m === msg[0]), 1);
// 		}, duration);
// 		Notification({
// 			title: i18n.t('message.warn'),
// 			message: i18n.t(`message['${msg[0]}']`, msg[1]),
// 			type: 'error',
// 			offset: 65 * idx
// 		});
// 		if (
// 			msg[0] == 'auth.access.token.invalid' ||
//       msg[0] == 'auth.access.token.expired'
// 		) {
// 			router.push('/login');
// 			store.dispatch('user/resetInfo', null, {
// 				root: true
// 			});
// 			window.location.reload();
// 		}
// 	});
// };

// const handleParams = function(err) {
// 	const pageId = util.getSessionStorage('pageId') || 'login';
// 	const obj = {};
// 	obj.filed = i18n.t(`${pageId}['${err.filed}']`);
// 	if (obj.filed.startsWith(pageId)) {
// 		obj.filed = i18n.t(`filed['${err.filed}']`);
// 	}
// 	if (obj.filed.startsWith('filed')) {
// 		obj.filed = err.filed;
// 	}
// 	// 对报错信息中的params中信息进行翻译
// 	const params = err.params;
// 	// 获取params中所有的key值，然后进行for循环
// 	Object.keys(params).forEach(key => {
// 		// 1、将zh.js相关页面模块下面的翻译赋值给obj[key]
// 		obj[key] = i18n.t(`${pageId}['${params[key]}']`);
// 		// 2、判断obj[key]这个值是不是以pageId开头，如果是以pageId开头说明未翻译成功，此时从message_zh.js文件下的filed中进行翻译
// 		if (obj[key].startsWith(pageId)) {
// 			obj[key] = i18n.t(`filed['${params[key]}']`);
// 		}
// 		// 3 判断obj[key]这个值是不是已filed开头，如果是则说明从message_zh.js翻译还是没成功，此时直接返回params[key]
// 		if (obj[key].startsWith('filed')) {
// 			obj[key] = params[key];
// 		}
// 	});
// 	return obj;
// };

// // 下载回调
// const download = function(res) {
// 	const a = document.createElement('a');
// 	const blob = URL.createObjectURL(res.data);
// 	const filename = (res.request.getResponseHeader('content-disposition') && res.request.getResponseHeader('content-disposition').split('filename=')[1]) || '';
// 	a.href = blob;
// 	a.download = filename || '文件.xlsx';
// 	a.click();
// 	window.URL.revokeObjectURL(blob);
// };

// export const downloadUrl = function(res) {
// 	const a = document.createElement('a');
// 	if (typeof res === 'string') {
// 		a.href = res;
// 	} else if (res.data && typeof res.data === 'string') {
// 		a.href = res.data;
// 	} else {
// 		a.href = res.data.body;
// 	}
// 	a.click();
// };

// export const downloadImg = function(src, cb) {
// 	var filename; // 图片名称
// 	var filetype; // 图片类型
// 	var path = src;
// 	if (path.indexOf('/') > 0) {
// 		var file = path.substring(path.lastIndexOf('/') + 1, path.length);
// 		var fileArr = file.toLowerCase().split('.');
// 		filename = fileArr[0];
// 		filetype = fileArr[1];
// 	}
// 	var canvas = document.createElement('canvas');
// 	var img = document.createElement('img');
// 	img.onload = function(e) {
// 		canvas.width = img.width;
// 		canvas.height = img.height;
// 		var context = canvas.getContext('2d');
// 		context.drawImage(img, 0, 0, img.width, img.height);
// 		canvas.toBlob(blob => {
// 			var a = document.createElement('a');
// 			a.href = window.URL.createObjectURL(blob);
// 			a.download = filename;
// 			a.click();
// 			cb && cb();
// 		}, `image/${filetype}`);
// 	};
// 	img.setAttribute('crossOrigin', 'Anonymous');
// 	img.src = src;
// };