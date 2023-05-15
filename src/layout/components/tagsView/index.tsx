// import { useState, useRef } from 'react';
// import { Tag, Row, Col, Button } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons'

// const TagsView = ({ tags }) => {
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const tagContainerRef = useRef();

//   const handleTagsScroll = () => {
//     const containerWidth = tagContainerRef.current.clientWidth;
//     const scrollWidth = tagContainerRef.current.scrollWidth;
//     const scrollLeft = tagContainerRef.current.scrollLeft;

//     if (scrollWidth > containerWidth) {
//       setShowLeftButton(scrollLeft > 0);
//       setShowRightButton(scrollLeft + containerWidth < scrollWidth);
//     } else {
//       setShowLeftButton(false);
//       setShowRightButton(false);
//     }

//     setScrollPosition(scrollLeft);
//   };

//   const handleLeftButtonClick = () => {
//     tagContainerRef.current.scroll({ left: scrollPosition - 100, behavior: 'smooth' });
//   };

//   const handleRightButtonClick = () => {
//     tagContainerRef.current.scroll({ left: scrollPosition + 100, behavior: 'smooth' });
//   };

//   return (
//     <div>
//       {showLeftButton && (
//         <Button className="tags-view-button tags-view-left-button" onClick={handleLeftButtonClick}>
//           <LeftOutlined />
//         </Button>
//       )}
//       <div
//         className="tags-view-container"
//         onScroll={handleTagsScroll}
//         ref={tagContainerRef}
//       >
//         <Row gutter={[16, 16]} wrap={false}>
//           {tags.map((tag, index) => (
//             <Col key={index} flex="none">
//               <Tag>{tag}</Tag>
//             </Col>
//           ))}
//         </Row>
//       </div>

//       {showRightButton && (
//         <Button className="tags-view-button tags-view-right-button" onClick={handleRightButtonClick}>
//           <RightOutlined />
//         </Button>
//       )}
//     </div>
//   );
// };

// export default TagsView

import { useState } from 'react';
import { Tag } from 'antd';

const TagsView = ({ tags }) => {
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (scrollOffset) => {
    const container = document.getElementById('tags-container');
    if (container) {
      const newScrollLeft = scrollLeft + scrollOffset;
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setScrollLeft(newScrollLeft);
    }
  };

  return (
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      <div
        id="tags-container"
        style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}
      >
        {tags.map((tag, index) => {
          return <Tag key={index}>{tag}</Tag>;
        })}
      </div>
      <div style={{ alignSelf: 'center', marginLeft: '8px', cursor: 'pointer' }}>
        <span role="img" aria-label="left-arrow" onClick={() => handleScroll(-100)}>
          ⬅️
        </span>
        <span role="img" aria-label="right-arrow" onClick={() => handleScroll(100)}>
          ➡️
        </span>
      </div>
    </div>
  );
};

export default TagsView;
