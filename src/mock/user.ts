import qs from 'qs'
import avatar from '@/assets/head.png'
import avatar0 from '@/assets/avatar/0.jpg'
import avatar1 from '@/assets/avatar/1.jpg'
// import Mock from 'mockjs'
const roles: string[] = ['admin', 'editor', 'visitor']
const tokens: any = {
  admin: "admin-token",
  editor: "editor-token",
  visitor: "visitor-token"
}
const users: any = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "寒山骚年",
    avatar: avatar,
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: avatar0,
    description:"可以看到除户管理页面之外的所有页面",
  },
  "visitor-token": {
    id: "visitor",
    role: "visitor",
    name: "游客",
    avatar: avatar1,
    description:"仅能看到首页、权限测试页面",
  }
};

export const login = (config: any) => {
  // console.log('config===', config)
  const { data } = config; // 获取前端传递的数据
  // console.log('data===',data);
  const { username } = qs.parse(data)
  if(!username || !Object.keys(tokens).includes(username as string)){
    const err = {
      code: 1,
      message: 'error.username.password.wrong'
    }
    return [200, err]
  }
  const response = {
    code: 0,
    message: 'success',
    data: tokens[username as string]
  }
  return [200, response];
}

export const userInfo = (config: any) => {
  // console.log('get==config===', config)
  const { headers } = config; // 获取请求头信息
  // console.log('headers===',headers); // 打印请求头信息
  const token: string = headers.Authorization || '';
  if(!token || !Object.keys(users).includes(token)) {
    const err = {
      code: 1,
      message: "error.getuserinfo",
    };
    return [200, err]
  }
  const response = {
    code: 0,
    message: 'success',
    data: users[token as string]
  }
  return [200, response]
}

export const getUserList = () => {
  const arr = Object.values(users)
  const response = {
    code: 0,
    message: 'success',
    data: arr
  }
  return [200, response]
}

export const getRoleList = () => {
  const response = {
    code: 0,
    message: 'success',
    data: roles
  }
  return [200, response]
}

export const addUser = (config: any) => {
  const { data } = config;
  console.log('data===',data);
  const { id, name, role, description } = qs.parse(data)
  const userArr = Object.values(users)
  const fitem = userArr.find((item: any) => item.id === id)
  if(!fitem) { // 新增
    const lastUser = {
      id: id,
      role: role,
      name: name,
      avatar: avatar1,
      description: description
    }
    const token = `${id}-token`
    tokens[id as string] = token
    users[token] = lastUser
    const response = {
      code: 0,
      message: 'success'
    }
    return [200, response]
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return [200, response]
  }
}

export const editUser = (config: any) => {
  const { data } = config;
  const { id, name, role, description } = qs.parse(data)
  const userArr = Object.values(users)
  const fitem = userArr.find((item: any) => item.id === id)
  if(fitem) {
    const token = `${id}-token`
    users[token] = {
      ...users[token],
      id: id,
      role: role,
      name: name,
      avatar: avatar1,
      description: description
    }
    const response = {
      code: 0,
      message: 'success'
    }
    return [200, response]
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return [200, response]
  }
}

export const deleteUser = (config: any) => {
  const { data } = config;
  const { id } = qs.parse(data)
  delete users[`${id}-token`]
  delete tokens[id as string]
  const response = {
    code: 0,
    message: 'success'
  }
  return [200, response]
}
