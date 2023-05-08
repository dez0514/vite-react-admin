/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // 使用时加前缀
  content: [
    './src/**/*.{ts,tsx,jsx,js}'
  ],
  corePlugins: {
    preflight: false // 不使用 tailwindcss 的 默认基础样式
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

