// 扁平Routes
export const flatRouteTree = (routes: any, fullPath: string | null = null) => {
  return routes.reduce((prev: any, cur: any) => {
    const { path, children, ...rest } = cur;
    const full = fullPath ? `/${fullPath}/${path}` : path === '*' ? path : `/${path}`
    prev.push({ path, fullPath: full, ...rest });
    if (Array.isArray(children)) {
      prev.push(...flatRouteTree(children, path));
    }
    return prev;
  }, []);
}