import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import store from './store'
// api文档接口
import api from './api/index'
Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.prototype.HOST = '/admin'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

/*router.beforeEach((to, from, next) => {   // 使用钩子函数对路由进行权限跳转
  const role = localStorage.getItem('username');
  if ( !role && to.path !== '/login' && to.path !== '/register' ) {  // 如果用户不存在，并且访问的页面不是登录和注册，就前往登录页面
    next('/login');
  } else if ( to.meta.permission ) {  // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
  }
})*/
