import Vue from 'vue'
//import MintUI from 'mint-ui';
//import 'mint-ui/lib/style.css';
import App from './App'
//import BaiduMap from 'vue-baidu-map'

import filters from './utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//Vue.use(MintUI);

import store from './store'

Vue.config.productionTip = false;

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
