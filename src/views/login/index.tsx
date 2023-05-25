import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, theme, Space, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import SwitchLanguage from "@/layout/components/switchLanguage"
import SwitchTheme from "@/layout/components/switchTheme"
import styled from "styled-components"
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from 'react-redux'
import { loginReducerApi, userinfoReducerApi } from '@/reducers/userReducer'

const RightCorner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
`

export default function Login() {
  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rules = {
    username: [{ required: true, message: <FormattedMessage id="login.usernameNotEmpty" /> }],
    password: [{ required: true, message: <FormattedMessage id="login.passwordNotEmpty" /> }]
  }
  const {
    token: { colorPrimaryBg },
  } = theme.useToken()
  const onFinish = async (values: any) => {
    const { username, password } = values
    await dispatch(loginReducerApi({ username, password })) // 获取token
    const res = await dispatch(userinfoReducerApi()) // 获取userinfo
    console.log('logggggg=====', res)
    navigate('/')
  }
  return (
    <div className='flex-center' style={{ backgroundColor: colorPrimaryBg, color: 'currentcolor', height: '100vh' }}>
      <RightCorner>
        <Typography.Text>
          <Space>
            <SwitchLanguage showHover={false} />
            <SwitchTheme />
          </Space>
        </Typography.Text>
      </RightCorner>
      <Card style={{ width: 400 }} title={formatMessage({ id: 'common.systemTitle' })}>
        <Form
          name="normal_login"
          initialValues={{ remember: true, username: 'admin', password: '123456'  }}
          autoComplete="off"
          onFinish={ onFinish }
        >
          <Form.Item name="username" rules={ rules.username }>
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder={formatMessage({ id:'login.username' })}
            />
          </Form.Item>
          <Form.Item name="password" rules={ rules.password }>
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder={formatMessage({ id: 'login.password' })}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>{formatMessage({ id: 'login.loginBtn' })}</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
