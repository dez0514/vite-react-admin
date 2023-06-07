import { HomeOutlined, CopyOutlined, TeamOutlined, LockOutlined, ProfileOutlined, RiseOutlined, AppstoreOutlined, LinkOutlined, TagsOutlined, ToolOutlined } from "@ant-design/icons"
import { RouterType } from "@/types"
import { lazy, Suspense, ReactNode } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loading from '@/components/loading'
import Home from '@/views/home'
const NotFound = lazy(() => import('@/views/error/404'))

const Clipboard = lazy(() => import('@/views/clipboard'))
const Guide = lazy(() => import('@/views/guide'))
const RoleManage = lazy(() => import('@/views/roleManage'))
const PermissionIntro = lazy(() => import('@/views/permissionTest/index'))
const PermissionAdmin = lazy(() => import('@/views/permissionTest/admin'))
const PermissionEditor = lazy(() => import('@/views/permissionTest/editor'))
const PermissionVisitor = lazy(() => import('@/views/permissionTest/visitor'))
const UserManage = lazy(() => import('@/views/userManage'))
const DragTable = lazy(() => import('@/views/componentsDemo/dragTable'))
const DragTable2 = lazy(() => import('@/views/componentsDemo/dragTable2'))

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
    roles: ['admin', 'editor', 'visitor']
  },
  {
    path: "guide",
    label: 'menu.guide',
    element: formatSuspense(<Guide />),
    icon: <RiseOutlined />,
    roles: ['admin', 'editor']
  },
  {
    path: "components",
    label: 'menu.components',
    element: <Outlet />,
    icon: <AppstoreOutlined />,
    children: [
      {
        path: "dragTable",
        label: 'menu.components.dragTable',
        icon: <ProfileOutlined />,
        element: formatSuspense(<DragTable />),
        roles: ['admin', 'editor', 'visitor']
      },
      {
        path: "dragTable2",
        label: 'menu.components.dragTable2',
        icon: <ProfileOutlined />,
        element: formatSuspense(<DragTable2 />),
        roles: ['admin', 'editor', 'visitor']
      }
    ]
  },
  {
    path: "permissionTest",
    label: 'menu.permissionTest',
    element: <Outlet />,
    icon: <LockOutlined />,
    children: [
      {
        path: "introduce",
        label: 'menu.permissionTest.introduce',
        icon: <ProfileOutlined />,
        element: formatSuspense(<PermissionIntro />),
        roles: ['admin', 'editor', 'visitor']
      },
      {
        path: "adminPage",
        label: 'menu.permissionTest.adminPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionAdmin />),
        roles: ['admin']
      },
      {
        path: "editorPage",
        label: 'menu.permissionTest.editorPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionEditor />),
        roles: ['admin', 'editor']
      },
      {
        path: "visitorPage",
        label: 'menu.permissionTest.visitorPage',
        icon: <HomeOutlined />,
        element: formatSuspense(<PermissionVisitor />),
        roles: ['admin', 'visitor']
      },
    ]
  },
  {
    path: "clipboard",
    label: 'menu.clipboard',
    element: formatSuspense(<Clipboard />),
    icon: <CopyOutlined />,
    roles: ['admin', 'editor']
  },
  {
    path: "userManage",
    label: 'menu.userManage',
    element: formatSuspense(<UserManage />),
    icon: <TeamOutlined />,
    roles: ['admin']
  },
  {
    path: "roleManage",
    label: 'menu.roleManage',
    element: formatSuspense(<RoleManage />),
    icon: <TagsOutlined />,
    roles: ['admin', 'editor']
  },
  {
    path: "https://github.com/dez0514/react-admin",
    label: 'menu.outlink',
    icon: <LinkOutlined />,
    roles: ['admin', 'editor', 'visitor']
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