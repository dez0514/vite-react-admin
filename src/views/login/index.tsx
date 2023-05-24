import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, theme, Space, Typography, message } from "antd"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@/providers/user"
import SwitchLanguage from "@/layout/components/switchLanguage"
import SwitchTheme from "@/layout/components/switchTheme"
import styled from "styled-components"
import { FormattedMessage, useIntl } from "react-intl";
import { getUserInfo } from '@/api/user'
import { useSelector, useDispatch } from 'react-redux'
import { updateToken, loginReducerApi } from '@/reducers/userReducer'

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
  const userInfo = useContext(UserContext)
  const dispatch = useDispatch()
  const { token } = useSelector((store: any) => store.loginReducer)
  useEffect(() => {
    console.log('state===', token)
  }, [token])
  const rules = {
    username: [{ required: true, message: <FormattedMessage id="login.usernameNotEmpty" /> }],
    password: [{ required: true, message: <FormattedMessage id="login.passwordNotEmpty" /> }]
  }
  const {
    token: { colorPrimaryBg },
  } = theme.useToken()
  const handleGetUserInfo = () => {
    getUserInfo().then((res: any) => {
      console.log(res)
    })
  }
  const onFinish = (values: any) => {
    const { username, password } = values
    dispatch(loginReducerApi({ username, password }))
    // loginPost({ username, password }).then((res: any) => {
    //   console.log('res==', res)
    //   if(res.data.code === 0) {
    //     message.success("登录成功");
    //     userInfo.userLogin({ name: username, token: res.data.data })
    //     handleGetUserInfo()
    //     navigate('/')
    //   }
    // })
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
          initialValues={{ remember: true }}
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
