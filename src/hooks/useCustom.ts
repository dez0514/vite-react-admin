import { useEffect, useState, useReducer, useRef } from 'react'

const defaultListLoadedState: any = {
	loading: false,
	loadFail: false,
	noMoreData: false,
	noData: false,
}

const defaultLoadedState: any = {
	loading: false,
	loadFail: false,
}

const loadedTypes = {
	SET_LOAINDG: 'SET_LOADING',
	SET_NODATA: 'SET_NODATA',
	SET_NOMOREDATA: 'SET_NOMOREDATA',
	SET_LOADFAIL: 'SET_LOADFAIL',
	RESET: 'RESET',
	CANCEL: 'CANCEL'
}
// 获取列表数据。带加载或刷新的
export const useFetchList = (
	interfaceFunction: Function,
	initData: any = [],
	initParams: any,
	initListLoadedState: any = defaultListLoadedState
): any => {
	const [listData, setListData] = useState(initData)
	const [params, setParams] = useState(initParams)
	// 接口反复执行运行的条件
	const [isRefresh, setIsRefresh] = useState(false)
	const [loadedState, dispatch] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case loadedTypes.SET_LOAINDG:
				return { ...initListLoadedState, loading: true }
			case loadedTypes.SET_NODATA:
				return { ...initListLoadedState, noData: true }
			case loadedTypes.SET_NOMOREDATA:
				return { ...initListLoadedState, noMoreData: true }
			case loadedTypes.SET_LOADFAIL:
				return { ...initListLoadedState, loadFail: true }
			case loadedTypes.RESET:
				return initListLoadedState
			case loadedTypes.CANCEL:
				return state
			default:
				throw new Error('没有此事件')
		}
	}, initListLoadedState)

	useEffect(() => {
		let didCancle = false
		const fetchDataList = async () => {
			try {
				dispatch({ type: loadedTypes.SET_LOAINDG })
				console.log(111, params)
				const { data } = await interfaceFunction(params)
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					dispatch({ type: loadedTypes.RESET })
				}
				if (data.code === 200) {
					if (data.data.data) {
						if (params.page === 1 && data.data.data.length === 0) {
							dispatch({ type: loadedTypes.SET_NODATA })
						} else {
							if (data.data.data.length < data.data.per_page) {
								dispatch({ type: loadedTypes.SET_NOMOREDATA })
							}
						}
						if (Number(params.page) === 1) {
							setListData(data.data.data)
						} else {
							const newData = data.data.data
							setListData((prevData: any) => [...prevData, ...newData])
						}
					}
				}
				if (data.code === '40041') {
					if (data.msg === '暂无数据') {
						setListData([])
						dispatch({ type: loadedTypes.SET_NODATA })
					} else {
						console.log('失败')
						setListData([])
						dispatch({ type: loadedTypes.SET_LOADFAIL })
					}
				}
			} catch (error) {
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					setListData([])
					dispatch({ type: loadedTypes.SET_LOADFAIL })
				}
			}
		}
		if (params !== initParams) {
			fetchDataList()
		}
		return () => {
			didCancle = true
		}
	}, [params, initParams, isRefresh, interfaceFunction])

	return [{ listData, loadedState, params }, setParams, setIsRefresh]
}

// 获取接口数据
export const useFetch = (
	interfaceFunction: Function,
	initData: any,
	initParams: any,
	initLoadedState: any = defaultLoadedState
): any => {
	const [data, setData] = useState(initData)
	const [params, setParams] = useState(initParams)
	const [isRefresh, setIsRefresh] = useState(false)
	const [loadedState, dispatch] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case loadedTypes.SET_LOAINDG:
				return { ...initLoadedState, loading: true }
			case loadedTypes.SET_LOADFAIL:
				return { ...initLoadedState, loadFail: true }
			case loadedTypes.RESET:
				return initLoadedState
			case loadedTypes.CANCEL:
				return state
			default:
				throw new Error('没有此事件')
		}
	}, initLoadedState)
	useEffect(() => {
		let didCancle = false
		const fetchData = async () => {
			try {
				dispatch({ type: loadedTypes.SET_LOAINDG })
				const { data } = await interfaceFunction(params)
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					dispatch({ type: loadedTypes.RESET })
				}
				if (data.code === 200) {
					setData(data.data)
				}
			} catch (error) {
				console.log(error)
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					dispatch({ type: loadedTypes.SET_LOADFAIL })
				}
			}
		}
		if (params !== initParams) {
			fetchData()
		}
		return () => {
			didCancle = true
		}
	}, [params, initParams, isRefresh, interfaceFunction])

	return [{ data, loadedState }, setParams, setIsRefresh]
}

// 获取路由参数
export function useQuery(key: string): any {
	let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i')
	let rhref = window.location.search
	let r: any
	if (!rhref) {
		rhref = window.location.hash
		if (rhref && rhref.split('?')[1]) {
			r = rhref.split('?')[1].match(reg)
		}
	} else {
		r = rhref.substr(1).match(reg)
	}
	if (r !== null && r) return unescape(r[2])
	return ''
}

export function usePrevious(value: any) {
	const ref = useRef(false)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}


// 获取列表数据。带加载或刷新的
export const useCityFetchList = (
	interfaceFunction: Function,
	initData: any = [],
	initParams: any,
	initListLoadedState: any = defaultListLoadedState
): any => {
	const [listData, setListData] = useState(initData)
	const [params, setParams] = useState(initParams)
	// 接口反复执行运行的条件
	const [isRefresh, setIsRefresh] = useState(false)
	const [loadedState, dispatch] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case loadedTypes.SET_LOAINDG:
				return { ...initListLoadedState, loading: true }
			case loadedTypes.SET_NODATA:
				return { ...initListLoadedState, noData: true }
			case loadedTypes.SET_NOMOREDATA:
				return { ...initListLoadedState, noMoreData: true }
			case loadedTypes.SET_LOADFAIL:
				return { ...initListLoadedState, loadFail: true }
			case loadedTypes.RESET:
				return initListLoadedState
			case loadedTypes.CANCEL:
				return state
			default:
				throw new Error('没有此事件')
		}
	}, initListLoadedState)

	useEffect(() => {
		let didCancle = false
		const fetchDataList = async () => {
			try {
				dispatch({ type: loadedTypes.SET_LOAINDG })
				const { data } = await interfaceFunction(params)
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					dispatch({ type: loadedTypes.RESET })
				}
				if (data.error_no === '0') {
					if (data.resultList) {
						if (params.minId === '' && data.resultList.length === 0) {
							dispatch({ type: loadedTypes.SET_NODATA })
						} else {
							if (data.resultList.length < params.pageSize) {
								dispatch({ type: loadedTypes.SET_NOMOREDATA })
							}
						}
						if (params.minId === '') {
							setListData(data.resultList.reverse())
						} else {
							const newData = data.resultList.reverse()
							setListData((prevData: any) => [...newData, ...prevData])
						}
					}
				}
				if (data.error_no !== '0') {
					if (data.resultList.length === 0) {
						setListData([])
						dispatch({ type: loadedTypes.SET_NODATA })
					} else {
						console.log('失败')
						setListData([])
						dispatch({ type: loadedTypes.SET_LOADFAIL })
					}
				}
			} catch (error) {
				if (didCancle) {
					dispatch({ type: loadedTypes.CANCEL })
					return
				} else {
					setListData([])
					dispatch({ type: loadedTypes.SET_LOADFAIL })
				}
			}
		}
		if (params !== initParams) {
			fetchDataList()
		}
		return () => {
			didCancle = true
		}
	}, [params, initParams, isRefresh, interfaceFunction])

	return [{ listData, loadedState, params }, setParams, setIsRefresh]
}