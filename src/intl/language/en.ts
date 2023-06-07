export default {
  // common
  'common.systemTitle': 'React admin',
  '404': '404',
  // menu
  'menu.home': 'Home',
  'menu.guide': 'Guide',
  'menu.clipboard': 'Clipboard',
  'menu.roleManage': 'Role Manage',
  'menu.components': 'Components',
  'menu.components.dragTable': 'Drag Table',
  'menu.components.dragTable2': 'Drag Table2',
  'menu.components.dragTable3': 'Drag Table3',
  'menu.permissionTest': 'Permission Test',
  'menu.permissionTest.introduce': 'Introduce',
  'menu.permissionTest.adminPage': 'Admin Page',
  'menu.permissionTest.editorPage': 'Editor Page',
  'menu.permissionTest.visitorPage': 'Visitor Page',
  'menu.userManage': 'User Manage',
  'menu.outlink': 'Outlink',
  'menu.excelexport': 'Excel Export',
  'menu.zip': 'Zip',
  // layout
  'layout.setting': 'system setting',
  'layout.setting.themeType': 'theme mode',
  'layout.setting.themeColor': 'theme color',
  'layout.setting.isshowlogo': 'show Logo',
  'layout.setting.isshowtagsview': 'show TagsView',
  'layout.setting.navtype': 'navigation Type',
  'layout.setting.fixedheader': 'fixed Header',
  // login
  'login.loginBtn': 'Login',
  'login.loginBtn.loading': 'Login Data...',
  'login.username': 'Username',
  'login.password': 'Password',
  'login.usernameNotEmpty': 'Please Enter Username',
  'login.passwordNotEmpty': 'Please Enter Password',
  'login.errorUsernameOrPassword': 'Not Found The Username Or Password',
  'login.extra.whatever': 'whatever',
  // guide
  'guide.openGuide': 'open guide',
  'guide.finish': 'Done',
  'guide.close': 'Close',
  'guide.prev': 'Previous',
  'guide.next': 'Next',
  'guide.change.collapse': 'Hamburger',
  'guide.change.collapse.desc': 'Open && Close sidebar',
  'guide.change.fullscreen': 'Screenfull',
  'guide.change.fullscreen.desc': 'Set the page into fullscreen',
  'guide.change.language': 'Language',
  'guide.change.language.desc': 'Set language',
  'guide.change.setting': 'Setting',
  'guide.change.setting.desc': 'system setting',
  // permission intro
  'permission.page': 'Page',
  'permission.intro': `
    Menu permissions and routing permissions in this project are assigned based on the roles that users belong to. There are three built-in roles in this project, which are:
    <ul>
      <li>admin: This role has permissions on all menus and routes in the system.</li>
      <li>editor: This role has permissions on all menus and routes in the system except the user admin page.</li>
      <li>visitor: This role only has the permissions of the home page and the permission test page.</li>
    </ul>
    You can dynamically add or delete users through the <a href="#/userManage">User Manage</a> page, as well as edit an existing user, such as changing its permissions and other operations.
  `
};