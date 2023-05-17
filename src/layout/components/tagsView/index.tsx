import { ContextType, WheelEvent } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './hideScrollbar.css'
import { Tag } from 'antd';
import { LeftArrow, RightArrow } from './arrow'
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const TagsView = ({ tags }: { tags: any }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const onWheel = (apiObj: scrollVisibilityApiType, ev: WheelEvent) => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }
  return (
    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {tags.map((tag: string, index: number) => {
          return (<div className='tw-flex tw-flex-col tw-justify-center' style={{height: '40px'}} key={index}><Tag>{tag}</Tag></div>);
        })}
      </ScrollMenu>
    </div>
  );
};

export default TagsView;
