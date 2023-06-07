import { useState, useEffect } from 'react'
import { ProfileOutlined, FileExcelOutlined } from '@ant-design/icons'
import { getTableData } from '@/api/table'
import { Table, Tag, Form, Button, Input, Radio, Select, message, Divider } from 'antd'
import PageWrap from '@/components/page'
import { useTitle } from 'ahooks'
const { Item } = Form
function ExcelExport() {
  useTitle('Excel导出')
  const [tableList, setTableList] = useState<any>([])
  const [selectedRows, setSelectedRows] = useState<any>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)
  const [autoWidth, setAutoWidth] = useState<boolean>(true)
  const [filename, setFilename] = useState<string>('excel-file')
  const [bookType, setBookType] = useState<string>('xlsx')
  const getList = () => {
    getTableData().then((res: any) => {
      if(res.code === 0) {
        const temp = res.data.map((item: any, index: number) => {
          return {
            ...item,
            key: String(index)
          }
        })
        setTableList(temp)
      }
    }) 
  }
  const filenameChange = (e: any) => {
    setFilename(e.target.value)
  }
  const autoWidthChange = (e: any) => {
    setAutoWidth(e.target.value)
  }
  const bookTypeChange = (val: string) => {
    console.log('vvvv===', val)
    setBookType(val)
  }
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys)
    setSelectedRows(selectedRows)
  }
  const formatJson = (filterVal: any, jsonData: any) => {
    return jsonData.map((v: any) => filterVal.map((j: any) => v[j]))
  }
  const handleDownload = (type: string) => {
    if (type === 'selected' && selectedRowKeys.length === 0) {
      message.error('至少选择一项进行导出')
      return
    }
    setDownloadLoading(true)
    import('@/config/Export2Excel').then((excel) => {
      const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      const filterVal = ['id', 'title', 'author', 'readings', 'date']
      const list = type === 'all' ? tableList : selectedRows
      const data = formatJson(filterVal, list)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filename,
        autoWidth: autoWidth,
        bookType: bookType
      })
      setDownloadLoading(false)
      setSelectedRowKeys([])
    })
  }
  useEffect(() => {
    getList()
  }, [])
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
  return (
    <PageWrap>
      <div style={{ marginTop: '20px' }}>
          <Form layout='inline'>
            <Item label='文件名:'>
              <Input
                style={{ width: '250px' }}
                prefix={
                  <ProfileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='请输入文件名(默认excel-file)'
                onChange={filenameChange}
              />
            </Item>
            <Item label='单元格宽度是否自适应:'>
              <Radio.Group onChange={autoWidthChange} value={autoWidth} >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Item>
            <Item label='文件类型:'>
              <Select
                defaultValue='xlsx'
                style={{ width: 120 }}
                onChange={bookTypeChange}
              >
                <Select.Option value='xlsx'>xlsx</Select.Option>
                <Select.Option value='csv'>csv</Select.Option>
                <Select.Option value='txt'>txt</Select.Option>
              </Select>
            </Item>
            <Item>
              <Button
                type='primary'
                icon={<FileExcelOutlined />}
                onClick={() => handleDownload('all')}
              >
                全部导出
              </Button>
            </Item>
            <Item>
              <Button
                type='primary'
                icon={<FileExcelOutlined />}
                onClick={() => handleDownload('selected')}
              >
                导出选择项
              </Button>
            </Item>
          </Form>
        </div>
        <Divider />
        <Table
          bordered
          size={'small'}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={tableList}
          pagination={{
            pageSize: 10
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange
          }}
          loading={downloadLoading}
        />
    </PageWrap>
  )
}

export default ExcelExport