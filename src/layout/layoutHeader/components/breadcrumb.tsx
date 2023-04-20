import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { mainRoute } from '@/router/main'
import { flatArr } from '@/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function CustomBreadcrumb() {
  const { t } = useTranslation()
  const location = useLocation()
  const MenuData = flatArr(mainRoute.children)
  const [breadList, setBreadList] = useState<any[]>([])
  const renderBreadcrumbs = () => {
    const paths = location.pathname.match(/\w+/g)
    if(paths === null) {
      const title = (MenuData && MenuData[0] && MenuData[0].label) || ''
      setBreadList([{ title: t(title) }])
    } else {
      const temp = paths.map(item => {
        const fitem = MenuData.find(inner => inner.path === item)
        return {
          title: fitem ? t(fitem.label) : ''
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