// import Mock from 'mockjs'
import service from '@/utils/fetch';
import MockAdapter from 'axios-mock-adapter';
import { login, userInfo } from './user'

const mock = new MockAdapter(service, { delayResponse: 2000 });

// Mock.setup({
//   timeout: "10000",
// });

mock.onPost(/\/login/).reply(login);
mock.onGet(/\/userinfo/).reply(userInfo);
// Mock.mock(/\/login/, 'post', login)
// Mock.mock(/\/userinfo/, 'get', userInfo)

// export default Mock;
