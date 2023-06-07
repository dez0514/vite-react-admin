import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { swapIndices } from '@/utils'
import PageWrap from '@/components/page'
import TypingCard from '@/components/typingCard'
import { Card, Button, Space } from 'antd'
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'

function DragTable2() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.components.dragTable2' }))
  const getItems = (count: number, offset = 0) => {
    const arr = Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      title: `item ${k + offset}`
    }));
    return arr
  }
  const [tableData, setTableData] = useState([getItems(10), getItems(5, 10)])
  const onDragEnd = (result: any) => {
    console.log('result===', result)
    const { source, destination } = result;
    // source: 起始位置， destination: 目标位置
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = swapIndices(tableData[sInd], source.index, destination.index);
      const newTableData: any = [...tableData];
      newTableData[sInd] = items;
      setTableData(newTableData);
    } else {
      const result: any = move(tableData[sInd], tableData[dInd], source, destination);
      const newTableData = [...tableData];
      newTableData[sInd] = result[sInd];
      newTableData[dInd] = result[dInd];
      setTableData(newTableData.filter((group: any) => group.length));
    }
  }
  const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };
  return (
    <PageWrap>
      <TypingCard title='拖拽列表' source={`可能会遇到的复杂场景demo`} />
      <Card title={'多列'} className='tw-mt-[20px]'>
        <Space>
          <Button type="primary" onClick={() => {setTableData([...tableData, []])}}>新增一空列</Button>
          <Button type="primary" onClick={() => {setTableData([...tableData, getItems(1)])}}>新增一列</Button>
        </Space>
        <div className='tw-overflow-auto tw-h-[400px] tw-mt-[8px]'>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='tw-flex'>
            {
              tableData.map((list: any, ind: number) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                  {(provided: any, snapshot: any) => (
                    <div className='tw-mr-[8px] tw-w-[120px]' ref={provided.innerRef} {...provided.droppableProps}
                      style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}
                    >
                      {
                        list?.map((item: any, index: number) => {
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
              ))
            }
            </div>
          </DragDropContext>
        </div>
      </Card>
    </PageWrap>
  )
}

export default DragTable2