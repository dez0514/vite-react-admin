import { useRef, useEffect } from 'react';
import { Card } from 'antd';
import Typing from '@/utils/typing';

interface Props {
  title: string
  source: string
}

const TypingCard = (props: Props) => {
  const { title, source } = props;
  const sourceEl = useRef(null);
  const outputEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 先清空
    if(outputEl.current && outputEl.current.innerHTML) {
      outputEl.current.innerHTML = ''
    }
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: 30,
    });
    console.log('typing===', typing)
    typing.destory()
    typing.start();
    return () => {
      typing.destory()
    }
  }, [title, source]);
  return (
    <Card bordered={false} className="card-item" title={title}>
      <div
        style={{ display: 'none' }}
        ref={sourceEl}
        dangerouslySetInnerHTML={{ __html: source }}
      />
      <div ref={outputEl} />
    </Card>
  );
};

export default TypingCard;