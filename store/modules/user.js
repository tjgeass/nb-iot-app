import {
	http
} from '@/utils/http-request/index.js' // 局部引入

const user = {
	state: {
		weatherData: false,
		token: uni.getStorageSync('token'),
		nickname: '',
		username: '',
		avatar: '',
		mobile: '',
		hasLogin: false, // 是否登录
		hasSkip: false // 是否跳过启动页

	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			uni.setStorageSync('token', token);
		},
		SET_NAME: (state, username) => {
			state.username = username
		},
		SET_NICKNAME: (state, nickname) => {
			state.nickname = nickname
		},
		SET_PHONE: (state, mobile) => {
			state.mobile = mobile
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_HasLogin: (state, hasLogin) => {
			state.hasLogin = hasLogin
		},
		SET_WeatherData: (state, weatherData) => {
			state.weatherData = weatherData
		},
	},

	actions: {
		// 获取用户信息
		UpdateApp({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/site/update-app', {
					params: dataQuery
				}).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登录
		Login({
			commit
		}, userInfo) {
			const username = userInfo.username.trim();
			return new Promise((resolve, reject) => {
				http.post('/auth/login', {
					username: username,
					password: userInfo.password
				}).then(response => {
					const user = response.user
					commit('SET_TOKEN', user.access_token)
					commit('SET_NAME', user.username);
					commit('SET_NICKNAME', user.nickname);
					commit('SET_AVATAR', user.avatar);
					commit('SET_HasLogin', true);
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				http.get('/user/info').then(response => {
					const user = response.user
					commit('SET_TOKEN', user.access_token)
					commit('SET_NAME', user.username);
					commit('SET_NICKNAME', user.nickname);
					commit('SET_AVATAR', user.avatar);
					commit('SET_PHONE', user.phone);
					commit('SET_HasLogin', true);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		//修改用户信息
		UpdateSelf({
			commit,
			state
		}, userInfo) {
			return new Promise((resolve, reject) => {
				http.post('/user/update-self?XDEBUG_SESSION_START=17920', userInfo).then(response => {
					const user = response.user
					commit('SET_TOKEN', user.access_token)
					commit('SET_NAME', user.username);
					commit('SET_NICKNAME', user.nickname);
					commit('SET_AVATAR', user.avatar);
					commit('SET_PHONE', user.mobile);
					commit('SET_HasLogin', true);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		//修改用户头像
		UpdateAvatar({
			commit,
			state
		}, imgSrc) {
			return new Promise((resolve, reject) => {
				http.upload('/user/update-avatar', {
					filePath: imgSrc, // 要上传文件资源的路径。
					name: 'file'
				}).then(response => {
					response = JSON.parse(response.data);
					const user = response.user;
					commit('SET_AVATAR', user.avatar);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				http.get('/auth/logout').then(response => {
					commit('SET_TOKEN', false)
					uni.setStorageSync('token', false);
					commit('SET_HasLogin', false);
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				removeToken()
				commit('SET_TOKEN', '')
				resolve()
			})
		}
	}
}

export default user
