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
    path: '/book',
    component: Layout,
    redirect: '/book/create',
    meta: { title: '图书管理', icon: 'dashboard' },
    children: [
      {
        path: '/book/create',
        name: 'create',
        component: () => import('@/views/book/create'),
        meta: { title: '上传图书', icon: 'example' }
      },
      {
        path: '/book/edit/:fileName',
        name: 'edit',
        component: () => import('@/views/book/edit'),
        hidden: true,
        meta: { title: '编辑图书', icon: 'example', activeMenu: '/book/look' }
      },
      {
        path: '/book/list',
        name: 'list',
        component: () => import('@/views/book/list'),
        meta: { title: '图书列表', icon: 'eye' }
      }
    ]
  }
]
export const asyncRoutes = [

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
