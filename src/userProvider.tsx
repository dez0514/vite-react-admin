import { createContext, useState, useEffect } from "react"
import { ContextProps } from "@/types"
import { StorageKeys } from '@/types/enum'
import { useDispatch, useSelector } from "react-redux"
import { userinfoReducerApi } from '@/reducers/userReducer'
import { GlobalConfigState } from '@/types/reducer'

export const UserContext = createContext<{isAuth: boolean, triggerAuth: Function}>({
  isAuth: false,
  triggerAuth: () => {}
})

export function UserProvider(props: ContextProps) {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer )
  const getAuthState = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem(StorageKeys.TOKEN)
    if (!token) {
      setIsAuth(false)
    } else {
      const users = sessionStorage.getItem(StorageKeys.USERINFO)
      const info = JSON.parse(users || "{}")
      if (!info || !info.name || !info.role) {
        const { payload } = await dispatch(userinfoReducerApi())
        if (!payload) setIsAuth(false);
        setIsLoading(false)
        return
      }
      setIsAuth(true)
    }
    setIsLoading(false)
  }
  // userinfo 变化时触发重新验证，或者在需要的地方（例如登录跳转前）利用 triggerAuth 方法触发验证
  useEffect(() => {
    getAuthState()
  }, [userinfo]);
  
  if(isLoading) {
    return <></>
  }
  return (
    <UserContext.Provider value={{ isAuth, triggerAuth: getAuthState }}>
      {props.children}
    </UserContext.Provider>
  )
}