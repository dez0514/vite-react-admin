import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'

function AdminTest() {
  const cardContent = `这个页面只有admin角色才可以访问，guest和editor角色看不到`
  return ( 
    <PageWrap className="AdminTest">
      <TypingCard title='admin页面' source={cardContent}/>
    </PageWrap>
  );
}

export default AdminTest