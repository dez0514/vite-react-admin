import { useState, useEffect } from 'react'
import { Table, Tag, Form, Button, Input, Divider } from 'antd'
import { ProfileOutlined, FileZipOutlined } from '@ant-design/icons'
import { getTableData } from '@/api/table'
import { useTitle } from 'ahooks'
import PageWrap from '@/components/page'

const { Item } = Form
const columns: any = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    align: 'center'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    align: 'center'
  },
  {
    title: 'Author',
    key: 'author',
    dataIndex: 'author',
    width: 100,
    align: 'center',
    render: (author: string) => <Tag key={author}>{author}</Tag>
  },
  {
    title: 'Readings',
    dataIndex: 'readings',
    key: 'readings',
    width: 195,
    align: 'center'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 195,
    align: 'center'
  }
]

const Zip = () => {
  useTitle('Zip')
  const [fileName, setFileName] = useState('')
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [tableData, setTableData] = useState([])

  const getList = () => {
    getTableData().then((res: any) => {
      if (res.code === 0) {
        const temp = res.data.map((item: any, index: number) => {
          return {
            ...item,
            key: String(index)
          }
        })
        setTableData(temp)
      }
    })
  }

  useEffect(() => {
    getList()
  }, [])

  const exportZip = () => {
    import('@/config/Export2Zip').then(zip => {
      setDownloadLoading(true)
      const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      const filterVal = ['id', 'title', 'author', 'readings', 'date']
      const data = formatJson(filterVal, tableData)
      zip.export_txt_to_zip(tHeader, data, fileName, fileName)
      setDownloadLoading(false)
    })
  }

  const formatJson = (filterVal: any, jsonData: any) => {
    return jsonData.map((v: any) => filterVal.map((j: any) => v[j]))
  }

  return (
    <PageWrap>
      <Form layout='inline'>
        <Item label='文件名:'>
          <Input
            style={{ width: '250px' }}
            prefix={
              <ProfileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            value={fileName}
            placeholder='请输入文件名(默认file)'
            onChange={(e) => setFileName(e.target.value)}
          />
        </Item>
        <Item>
          <Button type='primary' icon={<FileZipOutlined />} onClick={exportZip} >导出Zip</Button>
        </Item>
      </Form>
      <Divider />
      <Table
        bordered
        size={'small'}
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={tableData}
        pagination={{
          pageSize: 10
        }}
        loading={downloadLoading}
      />
    </PageWrap>
  )
}

export default Zip