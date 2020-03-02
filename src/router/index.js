import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu',
    children: [{
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/menu/create'),
      meta: { title: 'Menu-Demo', icon: 'dashboard' }
    }]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/create',
    meta: { title: '图书管理', icon: 'dashboard' },
    children:[{
      path: '/book/create',
      name: 'create',
      component: () => import('@/views/book/create'),
      meta: { title: '上传图书', icon: 'example' }
    },{
      path: '/book/look',
      name: 'look',
      component: () => import('@/views/book/create'),
      meta: { title: '查看图书', icon: 'eye'}
    }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/test',
    component: Layout,
    children:[{
      path: '/test/create',
      name: 'test',
      component: () => import('@/views/test/create'),
      meta: { title: '目录一', icon: 'example' }
    }
    ]
  },
// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
