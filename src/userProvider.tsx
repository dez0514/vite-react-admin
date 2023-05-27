import { createContext, useState, useEffect } from "react"
import { ContextProps } from "@/types"
import { StorageKeys } from '@/types/enum'
import store from '@/reducers/index'
import { userinfoReducerApi } from '@/reducers/userReducer'

export const UserContext = createContext<{isAuth: boolean}>({isAuth: false})

export function UserProvider(props: ContextProps) {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const getAuthState = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem(StorageKeys.TOKEN)
    if (!token) {
      setIsAuth(false)
    } else {
      const users = sessionStorage.getItem(StorageKeys.USERINFO)
      const info = JSON.parse(users || "{}")
      if (!info || !info.name || !info.role) {
        const { payload } = await store.dispatch(userinfoReducerApi())
        if (!payload) setIsAuth(false);
        setIsLoading(false)
        return
      }
      setIsAuth(true)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getAuthState()
  }, []);
  
  if(isLoading) {
    return <></>
  }
  return (
    <UserContext.Provider value={{ isAuth }}>
      {props.children}
    </UserContext.Provider>
  )
}