import Mock from 'mockjs'
import { login } from './user'

Mock.mock(/\/login/, 'post', login)

export default Mock;