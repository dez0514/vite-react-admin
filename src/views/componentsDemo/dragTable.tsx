import { useState }  from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { swapIndices } from '@/utils'
import PageWrap from '@/components/page'
import TypingCard from '@/components/typingCard'
import { Card } from 'antd'
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'

function DragTable() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.components.dragTable' }))
  const list = new Array(10).fill(0).map((item, index) => {
    return {
      id: `id-${index}`, 
      title: `Item ${index}`
    }
  })
  const [tableList, setTableList] = useState([...list])
  const [tableList2, setTableList2] = useState([...list])
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const temp: any = swapIndices(tableList, result.source.index, result.destination.index)
    setTableList(temp);
  }
  const onDragEnd2 = (result: any) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const temp: any = swapIndices(tableList2, result.source.index, result.destination.index)
    setTableList2(temp);
  }
  const tips = `下面Demo使用的是<a href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd</a>。<br />
  antd Table已经集成了拖拽排序功能，使用的<a href="https://dndkit.com">dnd kit</a><br/>
  还可以使用 <a href="https://react-dnd.github.io/react-dnd/about"> react-dnd + react-dnd-html5-backend</a>`
  return (
    <PageWrap>
      <TypingCard title='拖拽列表' source={tips} />
      <div className='tw-flex'>
        <Card title="横向" className='tw-mt-[20px] tw-w-[360px]'>
          <div>
            <DragDropContext onDragEnd={onDragEnd2}>
              <Droppable droppableId="DragTable1" direction="horizontal">
                {(provided: any) => (
                  <div className='tw-overflow-x-auto tw-w-[300px]' ref={provided.innerRef} {...provided.droppableProps} style={{display: 'flex'}}>
                    {
                      tableList2.map((item: any, index: number) => (
                        <Draggable draggableId={item.id} index={index}  key={item.id}>
                          {(provided: any, snapshot: any) => (
                            <div
                              className='tw-select-none tw-p-[16px] tw-mr-[8px] last:tw-mr-0'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                background: snapshot.isDragging ? 'lightgreen' : 'grey',
                                ...provided.draggableProps.style // 这个要带上
                              }}
                            >
                              { item.title }
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Card>
        <Card title="纵向" className='tw-mt-[20px] tw-ml-[20px] tw-w-[360px]'>
          <div className='tw-overflow-y-auto tw-h-[400px]'>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="DragTable">
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {
                      tableList.map((item: any, index: number) => (
                        <Draggable draggableId={item.id} index={index}  key={item.id}>
                          {(provided: any, snapshot: any) => (
                            <div
                              className='tw-select-none tw-p-[16px] tw-mb-[8px] last:tw-mb-0'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                background: snapshot.isDragging ? 'lightgreen' : 'grey',
                                ...provided.draggableProps.style // 这个要带上
                              }}
                            >
                              { item.title }
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Card>
      </div>
    </PageWrap>
  )
}

export default DragTable