import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import vitePluginImp from 'vite-plugin-imp'
import path from 'path';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "antd",
    //       style: (name) => `antd/es/${name}/style`,
    //     }
    //   ]
    // })
  ],
  resolve: {
    alias:{
      "@":path.resolve(__dirname,'./src')//配置@别名
    }
  },  
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         '@primary-color': '#1890ff',//设置antd主题色
  //       }
  //     }
  //   }
  // }
})
