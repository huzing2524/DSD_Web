import Vue from 'vue'
import Router from 'vue-router'
import Bus from '@/bus/'
import { SetDefaultHeader } from '_common/http'
import Order from './order'
import Store from './store'
import Make from './make'
import Buy from './buy'
import Product from './product'
import Rights from './rights'
import Industry from './industry'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/order',
    },
    ...Order,
    ...Store,
    ...Make,
    ...Buy,
    ...Product,
    ...Rights,
    ...Industry,
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


/**
 * 路由拦截
 * 不是所有版块都需要鉴权的,所以需要鉴权的在路由meta添加添加一个字段needLogin,
 * 设置为true的时候就必须走鉴权,像登录页这些不要,是可以直接访问的!
 */
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
    // 更新iOS webview title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) { 
      window.webkit && window.webkit.messageHandlers.updateTitle.postMessage(to.meta.title)
    }
  }
  let authorization = to.query.token || localStorage.getItem('Authorization')
  let phone = to.query.phone
  let username = to.query.name || phone
  if (authorization) {
    if (phone) {
      localStorage.setItem('Authorization', authorization)
      localStorage.setItem('Phone', phone)
      localStorage.setItem('UserName', username)
      SetDefaultHeader('Authorization', authorization);
    }
    next()
  } else {
    localStorage.clear()
    Bus.$toast('登录失效')
    next()
    // next({ replace: true, path: `/user/login?backurl=${to.fullPath}` });
  }
})

export default router
