import {
	http
} from '@/utils/http-request/index.js' // 局部引入

const project = {
	state: {
		
	},

	mutations: {
		
	},

	actions: {
		// 登录
		GetProject({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/project/info', {
					params: dataQuery
				}).then(response => {
					const project = response.item;
					commit('SET_PROJECT', project);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default project
