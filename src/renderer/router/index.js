import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/',
    component: Layout,
    props: { class: 'home-page' },
    name: 'Home',
    children: [{
      name: 'HomeIndex',
      path: '',
      meta: {
        title: '主界面',
        icon: 'el-icon-s-home',
        keepAlive: true // 需要被缓存
      },
      component: () => import('@/views/home/index'),
    }]
  },

  {
    path: '/report',
    component: Layout,
    props: { class: 'report-page' },
    redirect: '/report/index',
    name: 'Report',
    children: [{
      name: 'ReportIndex',
      path: 'index',
      meta: { title: '智能检测', icon: 'el-icon-s-marketing' },
      component: () => import('@/views/report/index'),
    }]
  },
  {
    path: '/status',
    component: Layout,
    props: { class: 'status-page' },
    redirect: '/status/index',
    name: 'Status',
    children: [{
      path: 'index',
      name: 'StatusIndex',
      meta: { title: '运行状态', icon: 'el-icon-s-help' },
      component: () => import('@/views/status/index'),
    }]
  },
  {
    path: '/device',
    component: Layout,
    props: { class: 'device-page' },
    redirect: '/device/index',
    name: 'Device',
    children: [{
      name: 'deviceIndex',
      path: 'index',
      meta: {
        keepAlive: true, // 需要被缓存
        title: '设备分布',
        icon: 'el-icon-s-platform'
      },
      component: () => import('@/views/device/index'),
    }, {
      name: 'deviceChart',
      path: 'chart',
      meta: {
        keepAlive: false
      },
      component: () => import('@/views/device/chart'),
      hidden: true
    }, {
      name: 'deviceView',
      path: 'view',
      meta: {
        keepAlive: false
      },
      component: () => import('@/views/device/view'),
      hidden: true
    }
    ]
  },
  {
    path: '/user',
    component: Layout,
    props: { class: 'user-page' },
    redirect: '/user/index',
    name: 'User',
    children: [{
      path: 'index',
      meta: {
        title: '用户设置', icon: 'el-icon-s-tools'
      },
      component: () => import('@/views/User/index'),
    }]
  },

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

