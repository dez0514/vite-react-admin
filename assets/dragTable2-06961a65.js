import{r as b,j as s,b as h,S as u,B as g,bp as f}from"./index-ad2fb77b.js";import{D as w,C as j,P as y}from"./react-beautiful-dnd.esm-b9aba4c4.js";import{P as D}from"./page-8ddd5ddd.js";import{T as I}from"./typingCard-64ce67dd.js";function v(){const p=(l,n=0)=>Array.from({length:l},(e,r)=>r).map(e=>({id:`item-${e+n}-${new Date().getTime()}`,title:`item ${e+n}`})),[c,d]=b.useState([p(10),p(5,10)]),m=l=>{console.log("result===",l);const{source:n,destination:a}=l;if(!a)return;const e=+n.droppableId,r=+a.droppableId;if(e===r){const o=f(c[e],n.index,a.index),t=[...c];t[e]=o,d(t)}else{const o=x(c[e],c[r],n,a),t=[...c];t[e]=o[e],t[r]=o[r],d(t.filter(i=>i.length))}},x=(l,n,a,e)=>{const r=Array.from(l),o=Array.from(n),[t]=r.splice(a.index,1);o.splice(e.index,0,t);const i={};return i[a.droppableId]=r,i[e.droppableId]=o,i};return s.jsxs(D,{children:[s.jsx(I,{title:"拖拽列表",source:"可能会遇到的复杂场景demo"}),s.jsxs(h,{title:"多列",className:"tw-mt-[20px]",children:[s.jsxs(u,{children:[s.jsx(g,{type:"primary",onClick:()=>{d([...c,[]])},children:"新增一空列"}),s.jsx(g,{type:"primary",onClick:()=>{d([...c,p(1)])},children:"新增一列"})]}),s.jsx("div",{className:"tw-overflow-auto tw-h-[400px] tw-mt-[8px]",children:s.jsx(w,{onDragEnd:m,children:s.jsx("div",{className:"tw-flex",children:c.map((l,n)=>s.jsx(j,{droppableId:`${n}`,children:(a,e)=>s.jsxs("div",{className:"tw-mr-[8px] tw-w-[120px]",ref:a.innerRef,...a.droppableProps,style:{background:e.isDraggingOver?"lightblue":"lightgrey"},children:[l==null?void 0:l.map((r,o)=>s.jsx(y,{draggableId:r.id,index:o,children:(t,i)=>s.jsx("div",{className:"tw-select-none tw-p-[16px] tw-mb-[8px]",ref:t.innerRef,...t.draggableProps,...t.dragHandleProps,style:{background:i.isDragging?"lightgreen":"grey",...t.draggableProps.style},children:r.title})},r.id)),a.placeholder]})},n))})})})]})]})}export{v as default};
