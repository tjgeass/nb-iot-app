import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    bgColor: true,
    topbar: {
      title: "主界面",
      path: '/'
    },
    device: 'desktop'
  },
  mutations: {
    SET_TOPBAR: (state, item) => {
      state.topbar = item
    },
    SET_TOPBAR_BG: (state, item) => {
      state.bgColor = item
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = true
    },
    CLOSE_SIDEBAR: (state) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }) {
      commit('CLOSE_SIDEBAR')
    }
  }
}

export default app
