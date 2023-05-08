## 搭建基础结构
1.vite + react + react-router + ts
2.使用function组件 + hooks

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
4. 内联style
5. tailwindCss库

## antd组件换主题， 换肤。
参考官网：[研发 -> 定制主题](https://ant.design/docs/react/customize-theme-cn)
1. 主题: light, dark。修改antd的预设算法。
2. 换肤：修改antd的token里的变量颜色值。
3. 使用theme provider 就不需要在 vite.config.ts 里配置按需引入antd的样式配置

## 国际化
1. i18next react-i18next 参考：[https://www.i18next.com/overview/getting-started]
```js
// en.js, zh.js
export default {
  menu: {
    home: 'Home',
  },
  login: {
    loginBtn: 'Login'
  }
};
```
```js
// i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
// import LanguageDetector from "i18next-browser-languagedetector"
import En from './language/en'
import Zh from './language/zh'
console.log('navigator==', navigator)
const langType: string = sessionStorage.getItem("langType")
i18n
  // .use(LanguageDetector)  // 获取浏览器默认的语言（浏览器默认通常是en）
  .use(initReactI18next).init({
    resources:  {
      en: {
        translation: En
      },
      zh: {
        translation: Zh
      }
    },
    interpolation: {
      escapeValue: false,
    },
    lng: langType,
    debug: false,
    // fallbackLng: "zh", //默认当前环境的语言
    fallbackLng: ["zh", "en", "dev"],
    detection: {
      lookupSessionStorage: "langType",
      caches: ["sessionStorage"],
      order: ["sessionStorage"],
      lookupQuerystring: "lng"
    }
  })
export default i18n
```
```js
// 切换组件里 切换时调用
import i18n from "@/i18n"
i18n.changeLanguage(val.key);
```
2. react-intl 参考：[https://formatjs.io/docs/getting-started/installation/]
```js
import { FormattedMessage, useIntl } from "react-intl";

<FormattedMessage id="usernameNotEmpty" />
// const intl = useIntl()
// intl.formatMessage({ id: `${intlKey}` })

```
两种方案都可以。
1. i18next 配置可以分模块，插件很多，使用简单。遇到的问题，form表单校验的rules的message，无法在切换语言是实时转换，需要额外处理，刷新组件或页面，即重新校验才会更新为切换后的语言。
2. react-intl 没有上述1的form的问题，但是想配置中分模块的话，写法比较麻烦（defineMessages）。配置是铺平的，不能嵌套（可以在key上作文章，例如这样 'module1.xxx': 'xxxx'）。
我偏向使用 react-intl

#### 存疑
1. React.StrictMode 严格模式下使用antd报findDOMNode的错，说是4.5.0版本以上解决了，但是5.3.1怎么也有？？
// https://blog.csdn.net/qq_40314318/article/details/105209873

#### hooks api
规则限制: 只在React最顶层使用，不能在循环，条件，或者嵌套函数中使用。指的是 useXXX 不能在if中使用，不是指定义的 setXXX 方法不能在if中使用。
基础： useState, useEffect, useContext
额外的：useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue

1. 常用的用法：useReducer + useContext， 利用二者结合来实现`局部`中的全局数据管理。效果类似 redux。
2. useMemo： 类似vue的计算属性computed，返回一个 memoized 值。
```js 
// a, b 为依赖项，当依赖项变化时才会变化，否则使用缓存的
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
3. useCallback：缓存函数。返回一个 memoized 回调函数。
```js
// a, b 为依赖项，当依赖项变化时才会变化，否则使用缓存的
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
4. useImperativeHandle：类似于vue3的defineExpose， 暴露出子组件，在父组件调用ref, 来调用子组件的方法。
```js
// 用法： useImperativeHandle(ref, createHandle, [deps])
// useImperativeHandle 可以在使用 ref 时自定义暴露给父组件的实例值。
// 在大多数情况下，应当避免使用 ref 这样的命令式代码。
// useImperativeHandle 应当与 forwardRef 一起使用：
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

// 在 渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。

```

5. useLayoutEffect：尽可能使用标准的 useEffect 以避免阻塞视觉更新。

说明：其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

6. useDebugValue：用于在 React 开发者工具中显示自定义 hook 的标签。

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

### redux 与 useReducer + useContext
用法很相似：reducer定义, dispatch触发，写法基本一样。
1. useReducer + useContext 使用比较方便，小场景几乎能达到redux的效果， 缺点就是更新时会触发整个context渲染。
```js
import { createContext, useReducer } from "react"
import { ContextProps } from "../types"
import { configState, configAction, ConfigReducerType } from "../types/reducer"
import { initialConfigState, configReducer } from '@/reducers/configReducer'
export const ConfigContext = createContext<{
  configStates: configState
  dispatch:  React.Dispatch<configAction>
}>({
  configStates: initialConfigState,
  dispatch: () => {}
})
export function ConfigProvider(props: ContextProps) {
  const [configStates, dispatch] = useReducer<ConfigReducerType>(configReducer, initialConfigState)
  return (
    <ConfigContext.Provider
      value={{ configStates, dispatch }}>
      {props.children}
    </ConfigContext.Provider>
  )
}

```

```js
// providers/config.tsx  定义context 和 provider
import { createContext, useReducer } from "react"
import { ContextProps } from "../types"
import { configState, configAction, ConfigReducerType } from "../types/reducer"
import { initialConfigState, configReducer } from '@/reducers/configReducer'
export const ConfigContext = createContext<{
  configStates: configState
  dispatch:  React.Dispatch<configAction>
}>({
  configStates: initialConfigState,
  dispatch: () => {}
})
export function ConfigProvider(props: ContextProps) {
  const [configStates, dispatch] = useReducer<ConfigReducerType>(configReducer, initialConfigState)
  return (
    <ConfigContext.Provider
      value={{ configStates, dispatch }}>
      {props.children}
    </ConfigContext.Provider>
  )
}
```
```js
import { useContext } from 'react'
import { ConfigContext } from "@/providers/config"
// 函数组件里使用hooks获取到数据，
const { configStates, dispatch } = useContext(ConfigContext)
const { siderCollapse } = configStates
// dispatch 调用
dispatch({ type: 'UPDATE_CONFIG', payload: { siderCollapse: true }})
```

2. redux
```js
// main.js
import reducers from '@/store/reducers/index'
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: reducers
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```
```js
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const { siderCollapse } = useSelector((state: any) => state.globalConfig, shallowEqual)
const dispatch = useDispatch() 

// dispatch 调用
dispatch({ type: 'UPDATE_CONFIG', payload: { siderCollapse: true }})
```
### 自定义 hooks

