import{r as o,j as a,P as j,b as c,bq as x}from"./index-2c159d48.js";import{D as p,C as g,P as b}from"./react-beautiful-dnd.esm-db827d73.js";import{T as D}from"./typingCard-fb43cdb2.js";function N(){const i=new Array(10).fill(0).map((e,t)=>({id:`id-${t}`,title:`Item ${t}`})),[d,h]=o.useState([...i]),[l,f]=o.useState([...i]),m=e=>{if(!e.destination||e.destination.index===e.source.index)return;const t=x(d,e.source.index,e.destination.index);h(t)},w=e=>{if(!e.destination||e.destination.index===e.source.index)return;const t=x(l,e.source.index,e.destination.index);f(t)},u=`下面Demo使用的是<a href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd</a>。<br />
  antd Table已经集成了拖拽排序功能，使用的<a href="https://dndkit.com">dnd kit</a><br/>
  还可以使用 <a href="https://react-dnd.github.io/react-dnd/about"> react-dnd + react-dnd-html5-backend</a>`;return a.jsxs(j,{children:[a.jsx(D,{title:"拖拽列表",source:u}),a.jsxs("div",{className:"tw-flex",children:[a.jsx(c,{title:"横向",className:"tw-mt-[20px] tw-w-[360px]",children:a.jsx("div",{children:a.jsx(p,{onDragEnd:w,children:a.jsx(g,{droppableId:"DragTable1",direction:"horizontal",children:e=>a.jsxs("div",{className:"tw-overflow-x-auto tw-w-[300px]",ref:e.innerRef,...e.droppableProps,style:{display:"flex"},children:[l.map((t,r)=>a.jsx(b,{draggableId:t.id,index:r,children:(n,s)=>a.jsx("div",{className:"tw-select-none tw-p-[16px] tw-mr-[8px]",ref:n.innerRef,...n.draggableProps,...n.dragHandleProps,style:{background:s.isDragging?"lightgreen":"grey",...n.draggableProps.style},children:t.title})},t.id)),e.placeholder]})})})})}),a.jsx(c,{title:"纵向",className:"tw-mt-[20px] tw-ml-[20px] tw-w-[360px]",children:a.jsx("div",{className:"tw-overflow-y-auto tw-h-[400px]",children:a.jsx(p,{onDragEnd:m,children:a.jsx(g,{droppableId:"DragTable",children:e=>a.jsxs("div",{ref:e.innerRef,...e.droppableProps,children:[d.map((t,r)=>a.jsx(b,{draggableId:t.id,index:r,children:(n,s)=>a.jsx("div",{className:"tw-select-none tw-p-[16px] tw-mb-[8px]",ref:n.innerRef,...n.draggableProps,...n.dragHandleProps,style:{background:s.isDragging?"lightgreen":"grey",...n.draggableProps.style},children:t.title})},t.id)),e.placeholder]})})})})})]})]})}export{N as default};
