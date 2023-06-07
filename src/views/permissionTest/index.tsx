import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import { useIntl } from "react-intl";
import { useTitle } from 'ahooks'
function PermissionTest() {
  const { formatMessage } = useIntl()
  const cardContent = formatMessage({ id: 'permission.intro' })
  useTitle('权限说明')
  return ( 
    <PageWrap className="PermissionTest">
      <TypingCard title={`权限说明`} source={cardContent}/>
    </PageWrap>
  );
}

export default PermissionTest