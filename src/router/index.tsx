
import { Navigate } from 'react-router-dom'
import { RouterType } from "../types"
import { loginRoute } from "./login"
import { mainRoute } from "./main"
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout"
import { flatRouteTree } from '@/utils'
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
export function RootRouter() {
  const { userinfo } = useSelector((state: GlobalConfigState) => state.userReducer, shallowEqual)
  const MenuData: RouterType[] = flatRouteTree(mainRoute || []).filter((item: any) => item.path).map((item: any) => {
    return {
      ...item,
      fullPath: item.fullPath
    }
  })
  const handleRoutesFilter = (arr: RouterType[]) => {
    const { role } = userinfo
    if(role === 'admin') {
      return arr
    } else {
      return arr.filter((item: RouterType) => !item.roles || item.roles!.includes(role)).filter(item => !item.children || item.children.length !== 0)
    }
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Layout />}>
          {
            handleRoutesFilter(MenuData).map((item: RouterType, index: number) => {
              return <Route key={index} path={item.fullPath} element={item.element} />
            })
          }
        </Route>
        <Route path="/login" element={loginRoute.element} />
      </Routes>
    </HashRouter>
  );
}