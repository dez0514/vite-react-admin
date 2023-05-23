import Mock from 'mockjs'
import { service } from '@/utils/fetch2';
import MockAdapter from 'axios-mock-adapter';
import { login, userInfo } from './user'

const mock = new MockAdapter(service);

Mock.setup({
  timeout: "200-600",
});

mock.onPost(/\/login/).reply(login);
mock.onGet(/\/userinfo/).reply(userInfo);
// Mock.mock(/\/login/, 'post', login)
// Mock.mock(/\/userinfo/, 'get', userInfo)

export default Mock;
