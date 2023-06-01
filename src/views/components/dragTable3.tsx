import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import PageWrap from '@/components/page'
import TypingCard from '@/components/typingCard'
import { Card } from 'antd'
import { v4 as uuidv4 } from 'uuid'

function DragTable3() {
  const [list1, setList1] = useState<any>([
    { id: 'item1', title: 'Item 1' },
    { id: 'item2', title: 'Item 2' },
    { id: 'item3', title: 'Item 3' },
    { id: 'item4', title: 'Item 4' }
  ]);
  const [list2, setList2] = useState<any>([
    { id: 'item5', title: 'Item 5' }
  ]);
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    // 如果没有目标位置，跳过操作
    if (!destination) {
      return;
    }
    // 复制数据到目标列表
    if (source.droppableId !== destination.droppableId) {
      if(source.droppableId === 'list1') {
        const item = list1.find((item: any) => item.id === draggableId);
        setList2([...list2, { ...item, id: uuidv4() }]) // 仅复制内容，id得换，否则后续操作会出问题
      } else if(source.droppableId === 'list2') {
        const item = list2.find((item: any) => item.id === draggableId);
        setList1([...list1, { ...item, id: uuidv4() }]) // 仅复制内容，id得换，否则后续操作会出问题
      }
    } else
    // 否则拖动排序
    if (source.droppableId === 'list1') {
      const items = Array.from(list1);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setList1(items);
    } else if (source.droppableId === 'list2') {
      const items = Array.from(list2);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setList2(items);
    }
  };
  return (
    <PageWrap>
      <TypingCard title='拖拽列表' source={`todo: 文档没找全，复制有待完善，拖拽时应该复制一个元素拖,而不会从原表中干掉拖动元素`} />
      <Card title={'复制'} className='tw-mt-[20px]'>
        <div className='tw-overflow-auto tw-h-[400px] tw-mt-[8px]'>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='tw-flex'>
              <Droppable droppableId="list1">
                {(provided: any, snapshot: any) => (
                  <div className='tw-mr-[8px] tw-w-[120px]' ref={provided.innerRef} {...provided.droppableProps}
                    style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", }}
                  >
                    {
                      list1?.map((item: any, index: number) => {
                        return (
                          <Draggable draggableId={item.id} index={index} key={item.id}>
                            {(provided: any, snapshot: any) => (
                              <div
                                className='tw-select-none tw-p-[16px] tw-mb-[8px]'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  background: snapshot.isDragging ? 'lightgreen' : 'grey',
                                  ...provided.draggableProps.style // 这个要带上
                                }}
                              >
                                {item.title}
                              </div>
                            )}
                          </Draggable>
                        )
                      })
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="list2">
                {(provided: any, snapshot: any) => (
                  <div className='tw-mr-[8px] tw-w-[120px]' ref={provided.innerRef} {...provided.droppableProps}
                    style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", }}
                  >
                    {
                      list2?.map((item: any, index: number) => {
                        return (
                          <Draggable draggableId={item.id} index={index} key={item.id}>
                            {(provided: any, snapshot: any) => (
                              <div
                                className='tw-select-none tw-p-[16px] tw-mb-[8px]'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  background: snapshot.isDragging ? 'lightgreen' : 'grey',
                                  ...provided.draggableProps.style // 这个要带上
                                }}
                              >
                                {item.title}
                              </div>
                            )}
                          </Draggable>
                        )
                      })
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </Card>
    </PageWrap>
  )
}

export default DragTable3