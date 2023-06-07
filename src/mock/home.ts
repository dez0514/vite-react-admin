import Mock from 'mockjs'
const list: any = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    key: '@increment',
    order_no: '@guid()',
    price: '@float(1000, 15000, 0, 2)',
    'tag|1': ['success', 'pending']
  }))
}

export const getOrderList = () => {
  const response = {
    code: 0,
    message: 'success',
    data: [...list]
  }
  return [200, response]
}

export const getTableList = () => {
  let temp = []
  for (let i = 0; i < count; i++) {
    temp.push(Mock.mock({
      id: '@increment',
      title: '@ctitle(5, 10)',
      author: '@cname',
      readings: '@integer(300, 5000)',
      date: '@datetime'
    }))
  }
  const response = {
    code: 0,
    message: 'success',
    data: [...temp]
  }
  return [200, response]
}