import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import { useTitle } from 'ahooks'

function EditorTest() {
  useTitle('权限测试-editor')
  const cardContent = `这个页面只有admin和editor角色才可以访问，visitor角色看不到`
  return ( 
    <PageWrap className="EditorTest">
      <TypingCard title='editor页面' source={cardContent}/>
    </PageWrap>
  );
}

export default EditorTest