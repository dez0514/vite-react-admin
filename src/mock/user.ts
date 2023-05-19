const tokens = {
  admin: "admin-token",
  editor: "editor-token",
  visitor: "visitor-token"
}

export const login = (data: any) => {
  const { username } = JSON.parse(data.body)
  const token = tokens[username];
  if (!token) {
    return {
      code: 1,
      message: '用户名或密码错误'
    };
  }
  return { code: 0, token }
}