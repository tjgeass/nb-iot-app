import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    topbar: {
      title: "首页",
      path: '/'
    },
    device: 'desktop'
  },
  mutations: {
    SET_TOPBAR: (state, item) => {
      state.topbar = item
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = true
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}

export default app
