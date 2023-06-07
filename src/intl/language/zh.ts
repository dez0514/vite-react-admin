export default {
  // common
  'common.systemTitle': '管理系统',
  '404': '404',
  // menu
  'menu.home': '首页',
  'menu.guide': '引导页',
  'menu.clipboard': '剪切板',
  'menu.roleManage': '角色管理',
  'menu.components': '组件',
  'menu.components.dragTable': '拖拽列表',
  'menu.components.dragTable2': '拖拽列表2',
  'menu.components.dragTable3': '拖拽列表3',
  'menu.permissionTest': '权限测试',
  'menu.permissionTest.introduce': '权限说明',
  'menu.permissionTest.adminPage': 'admin页面',
  'menu.permissionTest.editorPage': 'editor页面',
  'menu.permissionTest.visitorPage': 'visitor页面',
  'menu.userManage': '用户管理',
  'menu.outlink': '外链',
  'menu.excelexport': 'Excel导出',
  'menu.zip': 'Zip',
  // layout
  'layout.setting': '系统布局配置',
  'layout.setting.themeType': '主题模式',
  'layout.setting.themeColor': '主题颜色',
  'layout.setting.isshowlogo': '是否显示Logo',
  'layout.setting.isshowtagsview': '是否显示TagsView',
  'layout.setting.navtype': '导航模式',
  'layout.setting.fixedheader': '固定Header',
  // login
  'login.loginBtn': '登录',
  'login.loginBtn.loading': '正在登录',
  'login.username': '用户名',
  'login.password': '密码',
  'login.usernameNotEmpty': '请填写用户名',
  'login.passwordNotEmpty': '请填写密码',
  'login.errorUsernameOrPassword': '用户名或密码不正确',
  'login.extra.whatever': '随便填',
  // guide
  'guide.openGuide': '打开引导',
  'guide.finish': '完成',
  'guide.close': '关闭',
  'guide.prev': '上一步',
  'guide.next': '下一步',
  'guide.change.collapse': '侧边栏按钮',
  'guide.change.collapse.desc': '控制侧边栏展开或收拢',
  'guide.change.fullscreen': '全屏',
  'guide.change.fullscreen.desc': '控制网页全屏',
  'guide.change.language': '语言',
  'guide.change.language.desc': '切换语言',
  'guide.change.setting': '设置',
  'guide.change.setting.desc': '系统设置',
  // permission intro
  'permission.page': '页面',
  'permission.intro': `
    本项目中的菜单权限和路由权限都是基于用户所属角色来分配的，本项目中内置了三种角色，分别是：
    <ul>
      <li>管理员 admin:该角色拥有系统内所有菜单和路由的权限。</li>
      <li>编辑员 editor:该角色拥有系统内除用户管理页之外的所有菜单和路由的权限。</li>
      <li>游客 visitor:该角色仅拥有首页、权限测试页面的权限。</li>
    </ul>
    你可以通过<a href="#/userManage">用户管理</a>页面，动态的添加或删除用户，以及编辑某个已经存在的用户，例如修改其权限等操作。
  `
};