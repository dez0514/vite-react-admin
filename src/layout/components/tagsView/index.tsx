import { ContextType, WheelEvent, useMemo } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './hideScrollbar.css'
import { Tag } from 'antd';
import { LeftArrow, RightArrow } from './arrow'
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { TagType } from '@/types';
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { ThemeType } from '@/types'
import { CONFIG } from '@/config';
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components';

const Circle = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background: #ffffff;
`

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const TagsView = ({ tags, onClose }: { tags: any, onClose: Function }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const { theme, primaryColor } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const checkColor = useMemo(() => {
    return primaryColor || CONFIG[theme as ThemeType]?.colorPrimary
  }, [theme, primaryColor])
  
  const handleCheck = (item: any) => {
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
            <Tag
              style={{ cursor: 'pointer', userSelect: 'none', padding: '4px 10px', transition: 'all 0.05s' }}
              color={ location.pathname === tag.path ? checkColor : 'default' }
              icon={ location.pathname === tag.path ? <Circle/> : null }
              closable={tag.closable}
              onClose={(e) => {
                e.preventDefault()
                onClose(tag)
              }}
              onClick={() => handleCheck(tag)}
            >
              {tag.label}
            </Tag>
          </div>);
        })}
      </ScrollMenu>
    </div>
  );
};

export default TagsView;
