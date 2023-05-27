import { HomeOutlined, LoadingOutlined, FileImageOutlined, TagsOutlined, ToolOutlined } from "@ant-design/icons"
import { RouterType } from "@/types"
import { lazy, Suspense, ReactNode } from "react"
import { Outlet, Navigate } from "react-router-dom"
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
    <Suspense fallback={<LoadingOutlined />}>{comps}</Suspense>
  )
}
export const mainRoute: RouterType[] = [
  {
    path: "dashboard",
    label: 'menu.home',
    element: <Home />,
    icon: <HomeOutlined />,
  },
  {
    path: "guide",
    label: 'menu.guide',
    element: formatSuspense(<Guide />),
    icon: <FileImageOutlined />,
  },
  {
    path: "pics",
    label: 'menu.picsManage',
    element: formatSuspense(<Pics />),
    icon: <FileImageOutlined />,
  },
  {
    path: "tags",
    label: 'menu.tagsManage',
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
        icon: <HomeOutlined />,
        element: formatSuspense(<Test1 />)
      },
      {
        path: "test2",
        label: 'menu.test2',
        icon: <HomeOutlined />,
        element: formatSuspense(<Test2 />)
      },
    ]
  },
  {
    path: "404",
    label: "404",
    element: formatSuspense(<NotFound />),
    icon: <HomeOutlined />,
    hide: true
  },
  {
    path: "*",
    element: <Navigate to='/404' />,
    hide: true
  }
]