import { login, logout, getInfo, updateAvatar, updateSelf } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { sess } from '@/utils/sess'
const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    phone: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const user = response.user
          setToken(user.access_token)
          commit('SET_TOKEN', user.access_token)
          commit('SET_NAME', user.username)
          commit('SET_AVATAR', user.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const user = response.user
          commit('SET_NAME', user.username)
          commit('SET_AVATAR', user.avatar)
          commit('SET_PHONE', response.user.phone)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改用户信息
    UpdateSelf({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        updateSelf(userInfo).then(response => {
          commit('SET_PHONE', response.user.phone)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改用户头像
    UpdateAvatar({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        updateAvatar(userInfo).then(response => {
          commit('SET_AVATAR', response.user.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          sessionStorage.clear();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
