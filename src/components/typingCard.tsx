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
  const outputEl = useRef(null);
  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: 30,
    });
    typing.start();
    return () => {
      typing.destory()
    }
  }, []);
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