import { useEffect, useState, useContext, ReactNode } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
  children,
  disabled,
  onClick
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </div>
  );
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleElements,
    initComplete
  } = useContext(VisibilityContext);
  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);
  return (
    <Arrow disabled={disabled} onClick={() => {
      if(disabled) return;
      scrollPrev()
    }}>
      <LeftOutlined />
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = useContext(VisibilityContext);
  const [disabled, setDisabled] = useState(!visibleElements.length && isLastItemVisible);
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);
  return (
    <Arrow disabled={disabled} onClick={() => {
      if(disabled) return;
      scrollNext()
    }}>
      <RightOutlined />
    </Arrow>
  );
}