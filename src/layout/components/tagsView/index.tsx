import { ContextType, WheelEvent, useMemo } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './hideScrollbar.css'
import { Tag } from 'antd';
import { LeftArrow, RightArrow } from './arrow'
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { FormattedMessage } from "react-intl";
import { TagType } from '@/types';
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { ThemeType } from '@/types'
import { CONFIG } from '@/config';
import { useNavigate, useLocation } from 'react-router-dom'

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const TagsView = ({ tags }: { tags: any }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const { theme, primaryColor } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const checkColor = useMemo(() => {
    return primaryColor || CONFIG[theme as ThemeType]?.colorPrimary
  }, [theme, primaryColor])
  
  const handleClose = (item: any) => {
    console.log('item====', item) // 删掉tags里的
    navigate(-1)
  }
  const handleCheck = (item: any) => {
    console.log('item====', navigate)
    navigate(item.path)
  }
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
        {tags.map((tag: TagType, index: number) => {
          return (<div className='tw-flex tw-flex-col tw-justify-center' style={{height: '40px'}} key={index}>
            <Tag style={{ cursor: 'pointer', userSelect: 'none' }} color={ location.pathname === tag.path ? checkColor : 'default' } closable={tag.closable} onClose={() => handleClose(tag)} onClick={() => handleCheck(tag)}>
              <FormattedMessage id={`${tag.label}`} />
            </Tag>
          </div>);
        })}
      </ScrollMenu>
    </div>
  );
};

export default TagsView;
