import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, theme, Space } from "antd"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { defaultUser, UserContext } from "@/providers/user"
import SwitchLanguage from "@/layout/layoutHeader/components/switchLanguage"
import SwitchTheme from "@/layout/switchTheme"
import styled from "styled-components"

const Box = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex; 
  alignItems: center;
  padding: 0 10px 0 10px;
`

export default function Login() {
  const navigate = useNavigate()
  const userInfo = useContext(UserContext)
  const {
    token: { colorPrimaryBg },
  } = theme.useToken()
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    userInfo.userLogin(defaultUser)
    navigate("/")
  }

  return (
    <div className='flex-center' style={{ backgroundColor: colorPrimaryBg, height: '100vh' }}>
      <Box>
        <Space>
          <SwitchLanguage />
          <SwitchTheme />
        </Space>
      </Box>
      <Card style={{ width: 300 }} title="React Admin" bordered={false}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请填写用户名!" }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请填写用户名!" }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
