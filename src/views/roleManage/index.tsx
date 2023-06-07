import { Button, Table, Card, Space, Divider, Modal, Form, Input, message, Popconfirm } from 'antd'
import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { getRoleList } from '@/api/user'
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'
interface DataType {
  id: string
  role: string
  name: string
  avatar: string
  description: string
}

function roleManage() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.roleManage' }))
  const [messageApi, contextHolder] = message.useMessage();
  const cardContent = `这里可以对系统中的角色进行管理，例如添加一个新角色分配需要的权限，或者修改系统中已经存在的角色，admin和visitor为基础角色不可删除。<br/>
  基本思路就是：角色与权限挂钩，通过角色来控制页面各处的访问权限，再给用户赋予角色。用户描述其实是指角色描述。<br/>
  初始化页面时获取到各角色绑定的权限信息，将每个路由routes与各个角色role的关系根据权限信息处理好，然后再渲染路由页面，<br/>目前各个路由的role是写的固定值，仅提供思路，不做动态实现。`
  const [ roleList, setRoleList ] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const getRoles = () => {
    getRoleList().then((res: any) => {
      if(res.code === 0) {
        const roles = res.data.map((item: any, index: number) => {
          return { key: String(index), role: item.name, ...item }
        })
        setRoleList(roles)
      }
    })
  }
  const showModal = (isEditMode: boolean = false, rowData?: DataType | undefined) => {
    setIsModalOpen(true);
    setIsEdit(isEditMode)
    if(rowData) {
      const { name, description } = rowData
      form.setFieldsValue({name, description})
    }
  }
  const handleOk = () => {
    form.validateFields().then(res => {
      messageApi.info('角色管理仅提供简单的思路，暂不实现')
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    form.resetFields()
  }
  const handleDelete = (row: DataType) => {
    messageApi.info('角色管理仅提供简单的思路，暂不实现')
  }
  useEffect(() => {
    getRoles()
  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: '角色名称',
      key: 'role',
      dataIndex: 'role'
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" shape="circle" icon={<FormOutlined />} onClick={() =>showModal(true, record)} />
          <Divider type="vertical" />
          <Popconfirm
            title="提示"
            description="确定删除？"
            onConfirm={() =>handleDelete(record)}
            okText="是"
            cancelText="否"
            disabled={record.name === 'admin' || record.name === 'visitor'}
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} disabled={record.name === 'admin' || record.name === 'visitor'} />
          </Popconfirm>
        </Space>
      )
    }
  ]
  return ( 
    <PageWrap className="roleManage">
      {contextHolder}
      <TypingCard title='角色管理' source={cardContent}/>
      <Card className='tw-mt-[20px]' title={ <Button type="primary" onClick={() => showModal()}>新增角色</Button> }>
        <Table columns={columns} dataSource={roleList} pagination={{ pageSize: 10 }} />
      </Card>
      <Modal title={isEdit ? '编辑角色' : '新增角色'} width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form className='tw-mt-[20px]' form={form} name="role-form" labelCol={{ span: 4 }}>
          <Form.Item name="name" label="角色名称" rules={[{ required: true }]}>
            <Input placeholder="name" disabled={isEdit} />
          </Form.Item>
          <Form.Item name="description" label="角色描述">
            <Input.TextArea placeholder="description" />
          </Form.Item>
          <Form.Item name="permissions" label="权限树">
            权限树...略
          </Form.Item>
        </Form>
      </Modal>
    </PageWrap>
  );
}

export default roleManage