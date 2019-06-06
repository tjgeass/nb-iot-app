import { getOrgInfo, getOrgMessage, getOrgMessageRead, updateOrgMessage, getOrgConstInfo, getDeviceData, updateOrgInfo, updateContsInfo } from '@/api/device'
import sess from '../../utils/sess'

const device = {
  state: {
    organization: sess.get('organization'),
    constructions: sess.get('constructions'),
    devices: sess.get('devices'),
    type: sess.get("types"),
    messages: sess.get("messages"),
    message_count: sess.get("message_count"),
  },

  mutations: {
    SET_ORGAN: (state, organization) => {
      state.organization = organization
    },
    SET_CONST: (state, constructions) => {
      state.constructions = constructions
    },
    SET_DEVICE: (state, devices) => {
      state.devices = devices
    },
    SET_MESSAGE: (state, messages) => {
      state.messages = messages
    },
    SET_MESSAGE_COUNT: (state, count) => {
      state.message_count = count
    }
  },

  actions: {
    // 获取机构信息
    GetOrgInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getOrgInfo().then(response => {
          const orgInfo = response.item
          sess.set('organization', orgInfo)
          commit('SET_ORGAN', orgInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取机构未读通知
    GetOrgMessageRead({ commit, state }) {
      return new Promise((resolve, reject) => {
        getOrgMessageRead().then(response => {
          sess.set('messages', response.items)
          commit('SET_MESSAGE', response.items)
          sess.set('message_count', response.count)
          commit('SET_MESSAGE_COUNT', response.count)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取机构通知
    GetOrgMessage({ commit, state }, query) {
      return new Promise((resolve, reject) => {
        getOrgMessage(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新机构通知已读
    UpdateOrgMessage({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        updateOrgMessage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 更新机构信息
    UpdateOrgInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        updateOrgInfo(state.organization).then(response => {
          const orgInfo = response.item
          sess.set('organization', orgInfo)
          commit('SET_ORGAN', orgInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新建筑信息
    UpdateContsInfo({ commit, state }, { query, data }) {
      return new Promise((resolve, reject) => {
        updateContsInfo(query, data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取机构房屋列表
    GetOrgConstInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getOrgConstInfo().then(response => {
          var devices = [];
          const contsInfo = response.items
          sess.set('constructions', contsInfo)
          commit('SET_CONST', contsInfo)
          for (var i = 0; i < contsInfo.length; i++) {
            devices = devices.concat(contsInfo[i].devices)
          }
          sess.set('devices', devices)
          commit('SET_DEVICE', devices)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取设备数据列表
    GetDeviceData({ commit, state }, dataQuery) {
      return new Promise((resolve, reject) => {
        getDeviceData(dataQuery).then(response => {
          //const contsInfo = response.items
          //commit('SET_ORGAN', contsInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  getters: {
    getDeviceById: (state) => (dev_id) => {
      return state.devices.find(device => device.dev_id == dev_id)
    }
  }
}

export default device
