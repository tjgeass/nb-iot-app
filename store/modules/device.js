import {
	http
} from '@/utils/http-request/index.js' // 局部引入

const device = {
	state: {
		devices: [],
		device: false,
		follows:[],
		message:[],
		project:{}
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
		SET_PROJECT: (state, project) => {
			state.project = project
		}
	},

	actions: {
		GetHome({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/device/home', {
					params: dataQuery
				}).then(response => {
					const devices = response.devices;
					const follows = response.follows;
					const message = response.message;
					const project = response.project;
					commit('SET_DEVICES', devices);
					commit('SET_FOLLOWS', follows);
					commit('SET_MESSAGE', message);
					commit('SET_PROJECT', project);
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
				http.get('/device/message?XDEBUG_SESSION_START=16095', {
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
