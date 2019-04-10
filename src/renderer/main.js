import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import "element-ui/lib/theme-chalk/index.css";
import './assets/styles/themes/default.scss'; // 主题

Vue.use(ElementUI)


import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
