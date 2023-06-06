/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // 使用时加前缀
  content: [
    './src/**/*.{ts,tsx,jsx,js}'
  ],
  corePlugins: {
    preflight: false // 不使用 tailwindcss 的 默认基础样式, 会影响antd基础样式
  },
  theme: {
    extend: {},
    fontFamily: {
      'hel': ['Helvetica Neue','Helvetica','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Arial','sans-serif']
    },
    boxShadow: {
      card: '0 -3px 31px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.02)',
      thumb: '0 1px 3px rgba(0, 0, 0, 0.2)'
    }
  },
  plugins: [],
}

