import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, theme, Space,DatePicker } from "antd"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { defaultUser, UserContext } from "@/providers/user"
import SwitchLanguage from "@/layout/layoutHeader/components/switchLanguage"
import SwitchTheme from "@/layout/switchTheme"
import styled from "styled-components"
import { useTranslation, Trans } from 'react-i18next'
import { FormattedMessage } from "react-intl";

const RightCorner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
`
const IconStyle = {
  color: 'rgba(0, 0, 0, 0.25)'
}

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = useContext(UserContext)
  const rules = {
    username: [{ required: true, message: <FormattedMessage id="usernameNotEmpty" /> }], // t('login.usernameNotEmpty') // 
    password: [{ required: true, message: t('login.passwordNotEmpty') }]
  }
  const {
    token: { colorPrimaryBg },
  } = theme.useToken()
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    userInfo.userLogin(defaultUser)
    navigate("/pics")
  }
  const onChange = (val: any) => {
    console.log(val)
  }
  // useEffect(() => {
  //   const rules = {
  //     username: [{ required: true, message: t('login.usernameNotEmpty') }],
  //     password: [{ required: true, message: t('login.passwordNotEmpty') }]
  //   }
  //   console.log('init==============')
  //   setFormRules(rules)
  // }, [])
  return (
    <div className='flex-center' style={{ backgroundColor: colorPrimaryBg, height: '100vh' }}>
      <RightCorner>
        <Space>
          <SwitchLanguage />
          <SwitchTheme />
        </Space>
      </RightCorner>
      <Card style={{ width: 400 }} title={t('common.systemTitle')} bordered={false}>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={ onFinish }
        >
          <Form.Item name="username" rules={ rules.username }>
            <Input
              size="large"
              prefix={<UserOutlined style={{ ...IconStyle }} />}
              placeholder={t('login.username') || ''}
            />
          </Form.Item>
          <Form.Item name="password" rules={ rules.password }>
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ ...IconStyle }} />}
              placeholder={t('login.password') || ''}
              autoComplete="off"
            />
          </Form.Item>
          <DatePicker onChange={onChange} />
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>{t('login.loginBtn')}</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
