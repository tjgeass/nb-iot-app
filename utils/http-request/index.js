import Request from './request'
import store from '../../store'

const test = new Request()




test.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.aaa.cn'
	config.header = {
		...config.header,
		a: 1,
		b: 2
	}
	return config
})

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
		a: 3
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Object } response - 请求响应体（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
test.validateStatus = (response) => {
	return response.statusCode === 200
}

test.interceptor.response((response) => { /* 请求之后拦截器 */
	return response
}, (response) => { // 请求错误做点什么
	return response
})



const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	if (process.env.NODE_ENV === 'development') {
		config.baseUrl = 'http://192.168.31.222:81/api/v1' /* 根域名不同 */
	}
	// uEnvProd
	if (process.env.NODE_ENV === 'production') {
		config.baseUrl = 'http://gjjc.hlwhw.com/api/v1' /* 根域名不同 */
	}

	config.header = {
		...config.header,
	};
	config.dataType = 'json';
	config.responseType = 'json';
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Object } response - 请求响应体（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (response) => {
	return response.statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
	}
	if (store.getters.token) {
		config.header = {
			...config.header,
			'X-Token': 'Bearer ' + store.getters.token
		}
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	const res = response.data
	if (res.errcode !== 0) {
		if (res.errcode === 401) {
			uni.reLaunch({
				url: '/pages/denglu/login/login',
				success: function() {
					uni.showToast({
						icon: 'none',
						title: '登录凭证过期,请重新登录',
						duration: 2000
					});
				},
				complete: function() {
					//uni.hideToast();
				}
			});
			//return;
		} else {
			uni.showToast({
				icon: 'none',
				title: res.errmsg,
			});
		}

		// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
		if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
			/**
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
		*/
		}
		return Promise.reject('error')
	} else {
		return response.data
	}
}, (response) => { // 请求错误做点什么
		uni.reLaunch({
			url: '/pages/error/404',
		});
	return response
})

export {
	http,
	test
}
