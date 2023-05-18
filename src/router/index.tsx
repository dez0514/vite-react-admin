
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { RouterType } from "../types"
import { loginRoute } from "./login"
import { mainRoute } from "./main"

export function RootRouter() {
  const formatRoute = (routes: RouterType[]): RouteObject[] => {
    const _routes: RouteObject[] = []
    for (const route of routes) {
      let temp: RouterType = {
        path: route.path,
        element: route.element,
        children: route.children ? formatRoute(route.children) : undefined
      }
      if(route.id) { // 可以加id, 配合 useRouteLoaderData 可以在路由之前异步加载信息，暂时不需要
        temp.id = route.id
      }
      _routes.push(temp as RouterType)
    }
    return _routes
  }
  const allRoutes = [loginRoute, mainRoute]
  const rootRoutes = createBrowserRouter(formatRoute(allRoutes),  { basename: '/react-admin' })
  return <RouterProvider router={rootRoutes} />
}