import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import device from './modules/device'
import project from './modules/project'
import article from './modules/article'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	device,
	article
  },
  getters
})

export default store
