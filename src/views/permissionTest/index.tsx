import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import { useIntl } from "react-intl";
function PermissionTest() {
  const { formatMessage } = useIntl()
  const cardContent = formatMessage({ id: 'permission.intro' })
  const title = formatMessage({ id: 'permission.page' })
  
  return ( 
    <PageWrap className="PermissionTest">
      <TypingCard title={`admin ${title}`} source={cardContent}/>
    </PageWrap>
  );
}

export default PermissionTest