import { createContext, useState } from "react"
import { ContextProps, UserType } from "../types"
import { StorageKeys } from "../types/enum"

interface IUserContext {
  user: UserType
  userLogin: (user: UserType) => void
  userLoginOut: () => void
  userUpdate: (user: UserType) => void
  userCheck: () => boolean
}

export const UserContext = createContext<IUserContext>({
  user: {},
  userLogin: function (user: UserType): void {
    throw new Error("Function not implemented.")
  },
  userLoginOut: function (): void {
    throw new Error("Function not implemented.")
  },
  userUpdate: function (user: UserType): void {
    throw new Error("Function not implemented.")
  },
  userCheck: function (): boolean {
    throw new Error("Function not implemented.")
  },
})

const userInit = () => {
  const userJson = sessionStorage.getItem(StorageKeys.USERINFO)
  try {
    const user = JSON.parse(userJson || "{}")
    return user
  } catch (error) {
    return {}
  }
}

export function UserProvider(props: ContextProps) {
  const [user, setUser] = useState<UserType>(userInit())
  const userLogin = (user: any) => {
    const jsonUser = JSON.stringify(user)
    sessionStorage.setItem(StorageKeys.USERINFO, jsonUser)
    sessionStorage.setItem(StorageKeys.TOKEN, user.token)
    setUser(user)
  }

  const userLoginOut = () => {
    setUser({})
    sessionStorage.clear()
  }

  const userUpdate = (user: any) => {
    userLogin(user)
  }

  const userCheck = () => {
    if (user.token) {
      return true
    } else {
      return false
    }
  }

  return (
    <UserContext.Provider
      value={{ user, userLogin, userLoginOut, userUpdate, userCheck }}>
      {props.children}
    </UserContext.Provider>
  )
}
