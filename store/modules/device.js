import {
	http
} from '@/utils/http-request/index.js' // 局部引入

const device = {
	state: {
		devices: [],
		device: false,
		follows:[],
		message:[],
		organization:{}
	},

	mutations: {
		SET_DEVICES: (state, devices) => {
			state.devices = devices
		},
		SET_DEVICE: (state, device) => {
			state.device = device
		},
		SET_FOLLOWS:(state, follows) => {
			state.follows = follows
		},
		SET_MESSAGE:(state, message) => {
			state.message = message
		},
		SET_ORGAN: (state, organization) => {
		      state.organization = organization
		},
	},

	actions: {
		GetHome({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/organization/index', {
					params: dataQuery
				}).then(response => {
					const orgInfo = response.item
					commit('SET_ORGAN', orgInfo)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		UpdateFollow({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				http.post('/device/update-follow', data).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登录
		GetDevices({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/index', {
					params: dataQuery
				}).then(response => {
					const devices = response.items;
					//commit('SET_DEVICES', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceInfo({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/info', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceData({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/data', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceCoord({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/coord', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceChart({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/chart', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDevicePictrues({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/pictures', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceLockRecord({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/lock-record', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetDeviceMessage({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device-message/index', {
					params: dataQuery
				}).then(response => {
					//const devices = response.item;
					//commit('SET_DEVICE', devices);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default device
