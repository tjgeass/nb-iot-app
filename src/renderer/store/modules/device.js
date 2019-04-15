import { getOrgInfo, getOrgConstInfo } from '@/api/device'

const device = {
  state: {
    organization: {},
    construction: [],
    devices: []
  },

  mutations: {
    SET_ORGAN: (state, organization) => {
      state.organization = organization
    },
    SET_CONST: (state, construction) => {
      state.construction = construction
    },
    SET_DEVICE: (state, devices) => {
      state.devices = devices
    }
  },

  actions: {
    // 获取机构信息
    GetOrgInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getOrgInfo(state.token).then(response => {
          const orgInfo = response.item
          commit('SET_ORGAN', orgInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取机构房屋列表
    GetOrgConstInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getOrgConstInfo(state.token).then(response => {
          const contsInfo = response.item
          commit('SET_ORGAN', contsInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default device
