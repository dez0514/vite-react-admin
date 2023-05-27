import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { mainRoute } from '@/router/main'
import { flatRouteTree } from '@/utils'
import { useEffect, useState } from 'react'
import { FormattedMessage } from "react-intl";

function CustomBreadcrumb() {
  const location = useLocation()
  const MenuData = flatRouteTree(mainRoute || [])
  const [breadList, setBreadList] = useState<any[]>([])
  const renderBreadcrumbs = () => {
    const paths = location.pathname.match(/\w+/g)
    if(paths === null) {
      const title = (MenuData && MenuData[0] && MenuData[0].label) || ''
      setBreadList([{ title: <FormattedMessage id={`${title}`} /> }])
    } else {
      const temp = paths.map(item => {
        const fitem = MenuData.find((inner: any) => inner.path === item)
        return {
          title: fitem ? <FormattedMessage id={`${fitem.label}`} /> : ''
        }
      })
      setBreadList([...temp])
    }
  }
  useEffect(() => {
    renderBreadcrumbs()
  }, [location])

  return <Breadcrumb items={breadList} />
}
export default CustomBreadcrumb