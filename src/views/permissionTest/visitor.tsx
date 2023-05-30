import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'

function VisitorTest() {
  const cardContent = `这个页面只有admin和visitor角色才可以访问，editor角色看不到`
  return ( 
    <PageWrap className="VisitorTest">
      <TypingCard title='visitor页面' source={cardContent}/>
    </PageWrap>
  );
}

export default VisitorTest