
// 扁平Routes
export const flatRouteTree = (routes: any[], fullPath: string | null = null) => {
  return routes.reduce((prev: any, cur: any) => {
    const { path, children, ...rest } = cur;
    const full = fullPath ? `/${fullPath}/${path}` : path === '*' ? path : `/${path}`
    prev.push({ path, fullPath: full, ...rest });
    if (Array.isArray(children)) {
      prev.push(...flatRouteTree(children, path));
    }
    return prev;
  }, []);
}

// 数组交换位置, 返回新数组
export const swapIndices = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result
}

export const debounce = (fn: Function, wait: number = 500) => {
  let timeout: any = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...arguments)
    }, wait)
  }
}

// 下载文件流，使用file-save也行
export const download = (data: Blob, file: string = '') => {
  // res 为接口返回的信息。 res.data: blob信息, res.request.getResponseHeader 里能获取到文件名
  // const filename = file || (res.request.getResponseHeader('content-disposition') && res.request.getResponseHeader('content-disposition').split('filename=')[1]);
	const a = document.createElement('a');
	const blob = URL.createObjectURL(data);
	const filename = file
	a.href = blob;
	a.download = filename ? window.decodeURI(filename) : '文件.xlsx';
	a.click();
	window.URL.revokeObjectURL(blob);
}

export const downloadUrl = (url: string) => {
	const a = document.createElement('a');
  a.href = url
	a.click();
};

export const downloadImg = function(src: string, cb: Function) {
	let filename: string = '' // 图片名称
	let filetype: string = '' // 图片类型
	let path = src;
	if (path.indexOf('/') > 0) {
		let file = path.substring(path.lastIndexOf('/') + 1, path.length);
		let fileArr = file.toLowerCase().split('.');
		filename = fileArr[0];
		filetype = fileArr[1];
	}
	let canvas = document.createElement('canvas');
	let img = document.createElement('img');
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
		context!.drawImage(img, 0, 0, img.width, img.height);
		canvas.toBlob((blob: Blob | null) => {
			let a = document.createElement('a');
			a.href = window.URL.createObjectURL(blob!);
			a.download = filename;
			a.click();
			cb && cb();
		}, `image/${filetype}`);
	};
	img.setAttribute('crossOrigin', 'Anonymous');
	img.src = src;
};