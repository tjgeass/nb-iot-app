import {
	http
} from '@/utils/http-request/index.js' // 局部引入

const project = {
	state: {
		articles: [],
	},

	mutations: {
		SET_PROJECT: (state, articles) => {
			state.articles = articles
		}
	},

	actions: {
		// 登录
		GetArticle({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/article/index', {
					params: dataQuery
				}).then(response => {
					//const articles = response.items;
					//commit('SET_PROJECT', articles);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetArticleView({
			commit
		}, dataQuery) {
			return new Promise((resolve, reject) => {
				http.get('/article/view', {
					params: dataQuery
				}).then(response => {
					//const articles = response.items;
					//commit('SET_PROJECT', articles);
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}

export default project
