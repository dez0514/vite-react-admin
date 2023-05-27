
import { Navigate } from 'react-router-dom'
import { RouterType } from "../types"
import { loginRoute } from "./login"
import { mainRoute } from "./main"
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout"
import { flatRouteTree } from '@/utils'
export function RootRouter() {
  const MenuData: RouterType[] = flatRouteTree(mainRoute || []).filter((item: any) => item.path).map((item: any) => {
    return {
      ...item,
      fullPath: item.fullPath
    }
  })
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Layout />}>
          {
            MenuData.map((item: RouterType, index: number) => {
              return <Route key={index} path={item.fullPath} element={item.element} />
            })
          }
        </Route>
        <Route path="/login" element={loginRoute.element} />
      </Routes>
    </HashRouter>
  );
}