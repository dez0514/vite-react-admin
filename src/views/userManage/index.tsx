import { Button, Table, Card, Space, Tag, Divider } from 'antd'
import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

function userManage() {
  const cardContent = `在这里，你可以对系统中的用户进行管理，例如添加一个新用户，或者修改系统中已经存在的用户。`
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: '用户ID',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '用户名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '用户角色',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '用户描述',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" shape="circle" icon={<FormOutlined />} />
          <Divider type="vertical" />
          <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return ( 
    <PageWrap className="userManage">
      <TypingCard title='用户管理' source={cardContent}/>
      <Card className='tw-mt-[20px]' title={ <Button type="primary">新增用户</Button> }>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageWrap>
  );
}

export default userManage