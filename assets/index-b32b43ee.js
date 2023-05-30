import{j as i}from"./index-e1458059.js";import{P as e,T as r}from"./page-68b227b1.js";function n(){const s=`
    本项目中的菜单权限和路由权限都是基于用户所属角色来分配的，本项目中内置了三种角色，分别是：

    <ul>
      <li>管理员 admin:该角色拥有系统内所有菜单和路由的权限。</li>
      <li>编辑员 editor:该角色拥有系统内除用户管理页之外的所有菜单和路由的权限。</li>
      <li>游客 visitor:该角色仅拥有首页、权限测试页面的权限。</li>
    </ul>

    你可以通过<a href="#/userManage">用户管理</a>页面，动态的添加或删除用户，以及编辑某个已经存在的用户，例如修改其权限等操作。
  `;return i.jsx(e,{className:"PermissionTest",children:i.jsx(r,{title:"admin页面",source:s})})}export{n as default};
