## 搭建基础结构

## react 样式
0. 安装`sass`。
1. 使用Module Css。 文件名：`xxx.module.scss`。在 `vite-env.d.ts` 声明类型：`declare module '*.scss';`
```
import styles from './xxx.module.scss'
// 标签中
<div className={styles.类名}></div>
```
2. 也可以使用 `styled-components`。定义元素样式标签。注意要定义在FC组件的外面。
```
import styled from 'styled-components'
const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
`
// 使用等价于 div
<TriggerBox/>...</TriggerBox>
```
3. 多类名借助 `classnames` 库。
```
 import classNames from 'classnames'
 <div className={classNames('a', 'b', { 'c': true })}></div>
```
## antd组件换主题， 换肤。
参考官网：[研发 -> 定制主题](https://ant.design/docs/react/customize-theme-cn)
1. 主题: light, dark。修改antd的预设算法。
2. 换肤：修改antd的token里的变量颜色值。
3. 使用theme provider 就不需要在 vite.config.ts 里配置按需引入antd的样式配置

#### 存疑
1. React.StrictMode 严格模式下使用antd报findDOMNode的错，说是4.5.0版本以上解决了，但是5.3.1怎么也有？？
// https://blog.csdn.net/qq_40314318/article/details/105209873