
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { RouterType } from "../types"
import { loginRoute } from "./login"
import { mainRoute } from "./main"

export function RootRouter() {
  const formatRoute = (routes: RouterType[]): RouteObject[] => {
    const _routes: RouteObject[] = []
    for (const route of routes) {
      _routes.push({
        path: route.path,
        element: route.element,
        children: route.children ? formatRoute(route.children) : undefined,
      } as RouterType)
    }
    return _routes
  }
  const allRoutes = [loginRoute, mainRoute]
  const rootRoutes = createBrowserRouter(formatRoute(allRoutes))
  return <RouterProvider router={rootRoutes} />
}