import { Button, Table, Card, Space, Tag, Divider, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsersList, getRoleList, addUser, editUser, deleteUser } from '@/api/user'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer';
import { updateUserinfo } from '@/reducers/userReducer'
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'
interface DataType {
  id: string
  role: string
  name: string
  avatar: string
  description: string
}

function userManage() {
  const { formatMessage } = useIntl()
  useTitle(formatMessage({ id: 'menu.userManage' }))
  const [messageApi, contextHolder] = message.useMessage();
  const cardContent = `在这里，你可以对系统中的用户进行管理，例如添加一个新用户，或者修改系统中已经存在的用户。`
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer)
  const dispatch = useDispatch()
  const [ userList, setUserList ] = useState<DataType[]>([])
  const [ roleList, setRoleList ] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [form] = Form.useForm();
  const getList = (updateUser: boolean = false) => {
    getUsersList().then((res: any) => {
      if(res.code === 0) {
        setUserList(res.data.map((item: any, index: number) => {
          return {
            key: String(index),
            ...item
          }
        }))
        if(updateUser) {
          const fitem = res.data.find((item: any) => item.id === userinfo.id)
          if(fitem) {
            dispatch(updateUserinfo(fitem))
          }
        }
      }
    })
  }
  const getRoles = () => {
    getRoleList().then((res: any) => {
      if(res.code === 0) {
        const roles = res.data.map((item: any, index: number) => {
          return { key: String(index), value: item.name, label: item.name }
        })
        setRoleList(roles)
      }
    })
  }
  const showModal = (isEditMode: boolean = false, rowData?: DataType | undefined) => {
    setIsModalOpen(true);
    setIsEdit(isEditMode)
    if(rowData) {
      const { id, name, role, description } = rowData
      form.setFieldsValue({id, name, role, description})
    }
  }
  const handleOk = () => {
    console.log(form)
    form.validateFields().then(res => {
      setLoad(true)
      const { id, name, role, description } = res
      const params = {
        id: id || '',
        name: name || '',
        role: role || '',
        description: description || ''
      }
      if(isEdit) {
        editUser(params).then((data: any) => {
          setLoad(false)
          if(data.code === 0) {
            messageApi.success('修改成功')
            setIsModalOpen(false)
            getList(true)
          }
        }).catch(() => {
          setLoad(false)
        })
      } else {
        addUser(params).then((data: any) => {
          setLoad(false)
          if(data.code === 0) {
            messageApi.success('新增成功')
            setIsModalOpen(false)
            getList()
          }
        }).catch(() => {
          setLoad(false)
        })
      }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    form.resetFields()
  }
  const handleDelete = (row: DataType) => {
    deleteUser({ id: row.id }).then((res: any) => {
      if(res.code === 0) {
        messageApi.success('删除成功')
        getList()
      }
    })
  }
  useEffect(() => {
    getList()
    getRoles()
  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: '头像',
      key: 'avatar',
      render: (_, { avatar }) => (
        <img className='tw-w-[40px]' src={avatar} />
      )
    },
    {
      title: '用户ID',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: '用户名称',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '用户角色',
      key: 'role',
      render: (_, { role }) => (
        <Tag color={ role === 'admin' ? 'geekblue' : role === 'editor' ? 'green' : 'volcano' } key={ role }>
          { role }
        </Tag>
      )
    },
    {
      title: '用户描述',
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
            disabled={record.id === 'admin'}
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} disabled={record.id === 'admin'} />
          </Popconfirm>
        </Space>
      )
    }
  ]
  return ( 
    <PageWrap className="userManage">
      {contextHolder}
      <TypingCard title='用户管理' source={cardContent}/>
      <Card className='tw-mt-[20px]' title={ <Button type="primary" onClick={() => showModal()}>新增用户</Button> }>
        <Table columns={columns} dataSource={userList} pagination={{ pageSize: 10 }} />
      </Card>
      <Modal title={isEdit ? '编辑' : '新增'} width={800} open={isModalOpen} onOk={handleOk} okButtonProps={{ loading: load }} onCancel={handleCancel}>
        <Form className='tw-mt-[20px]' form={form} name="user-form" labelCol={{ span: 4 }}>
          <Form.Item name="id" label="用户ID" rules={[{ required: true }]}>
            <Input placeholder="id" disabled={isEdit} />
          </Form.Item>
          <Form.Item name="name" label="用户名称" rules={[{ required: true }]}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select
              placeholder="role"
              allowClear
              options={[...roleList]}
              disabled={isEdit}
            />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="description" />
          </Form.Item>
        </Form>
      </Modal>
    </PageWrap>
  );
}

export default userManage