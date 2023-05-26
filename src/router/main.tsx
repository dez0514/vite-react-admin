import { HomeOutlined, LoadingOutlined, FileImageOutlined, TagsOutlined, ToolOutlined } from "@ant-design/icons"
import { RouterType } from "@/types"
import { lazy, Suspense, ReactNode } from "react"
import Layout from "@/layout"
import { Outlet, redirect } from "react-router-dom"
// const Home = lazy(() => import('@/views/home'))
import store from '@/reducers/index'
import { userinfoReducerApi } from '@/reducers/userReducer'
import { StorageKeys } from "@/types/enum"

import Home from '@/views/home'
const Pics = lazy(() => import('@/views/pics'))
const Guide = lazy(() => import('@/views/guide'))
const Tags = lazy(() => import('@/views/tags'))
const NotFound = lazy(() => import('@/views/error/404'))
const Test1 = lazy(() => import('@/views/error/test1'))
const Test2 = lazy(() => import('@/views/error/test2'))


// 注：懒加载的路由必须使用 Suspense
const formatSuspense = (comps: ReactNode) => {
  return (
    <Suspense fallback={<LoadingOutlined />}>{ comps }</Suspense>
  )
}
// 在loader里判断登录情况，刷新时走这个loader
const loader = async () => {
  const token = sessionStorage.getItem(StorageKeys.TOKEN)
  // debugger
  if(!token) {
    return redirect('/login');
  } else {
    const users = sessionStorage.getItem(StorageKeys.USERINFO)
    const info = JSON.parse(users || "{}")
    // debugger
    if(!info || !info.name || !info.role) {
      // debugger
      const { payload } = await store.dispatch(userinfoReducerApi())
      // debugger
      if(!payload) return redirect('/login');
    }
    return null
  }
}

export const mainRoute: RouterType = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "",
      label: 'menu.home',
      loader: loader,
      element: <Home />,
      icon: <HomeOutlined />,
    },
    {
      path: "guide",
      label: 'menu.guide',
      loader: loader,
      element: formatSuspense(<Guide />),
      icon: <FileImageOutlined />,
    },
    {
      path: "pics",
      label: 'menu.picsManage',
      loader: loader,
      element: formatSuspense(<Pics />),
      icon: <FileImageOutlined />,
    },
    {
      path: "tags",
      label: 'menu.tagsManage',
      loader: loader,
      element: formatSuspense(<Tags />),
      icon: <TagsOutlined />,
    },
    {
      path: "else",
      label: 'menu.else',
      element: <Outlet />,
      icon: <ToolOutlined />,
      children: [
        {
          path: "test1",
          label: 'menu.test1',
          loader: loader,
          icon: <HomeOutlined />,
          element:  formatSuspense(<Test1 />)
        },
        {
          path: "test2",
          label: 'menu.test2',
          loader: loader,
          icon: <HomeOutlined />,
          element: formatSuspense(<Test2 />)
        },
      ]
    },
    {
      path: "*",
      label: "404",
      element: formatSuspense(<NotFound />),
      icon: <HomeOutlined />,
      hide: true
    }
  ],
}