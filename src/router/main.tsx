import { HomeOutlined, FileImageOutlined, TagsOutlined, ToolOutlined } from "@ant-design/icons"
import { RouterType } from "@/types"
import { lazy, Suspense, ReactNode } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loading from '@/components/loading'
import Home from '@/views/home'
const Pics = lazy(() => import('@/views/pics'))
const Guide = lazy(() => import('@/views/guide'))
const Tags = lazy(() => import('@/views/tags'))
const NotFound = lazy(() => import('@/views/error/404'))
const Test1 = lazy(() => import('@/views/error/test1'))
const Test2 = lazy(() => import('@/views/error/test2'))

const PermissionIntro = lazy(() => import('@/views/permissionTest/index'))
const PermissionAdmin = lazy(() => import('@/views/permissionTest/admin'))
const PermissionEditor = lazy(() => import('@/views/permissionTest/editor'))
const PermissionVisitor = lazy(() => import('@/views/permissionTest/visitor'))
const UserManage = lazy(() => import('@/views/userManage'))

// 注：懒加载的路由必须使用 Suspense
const formatSuspense = (comps: ReactNode) => {
  return (
    <Suspense fallback={<Loading />}>{comps}</Suspense>
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
    path: "permissionTest",
    label: 'menu.permissionTest',
    element: <Outlet />,
    icon: <ToolOutlined />,
    children: [
      {
        path: "introduce",
        label: 'menu.permissionTest.introduce',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionIntro />)
      },
      {
        path: "adminPage",
        label: 'menu.permissionTest.adminPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionAdmin />)
      },
      {
        path: "editorPage",
        label: 'menu.permissionTest.editorPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionEditor />)
      },
      {
        path: "visitorPage",
        label: 'menu.permissionTest.visitorPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionVisitor />)
      },
    ]
  },
  {
    path: "userManage",
    label: 'menu.userManage',
    element: formatSuspense(<UserManage />),
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