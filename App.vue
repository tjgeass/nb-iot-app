<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		computed:{
			...mapGetters(["hasLogin","hasSkip","token", "username"]),
		},
		onLaunch: function () {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定
			//生产环境热更新
			if (process.env.NODE_ENV == 'production') {
			    // TODO
				// 检测升级
				var query = {
					appid: plus.runtime.appid,
				    version: plus.runtime.version,
				    imei: plus.device.imei
				};
				this.$store
					.dispatch("UpdateApp",query)
					.then(response => {
						if (response.errcode == 0 && response.isUpdate) {
						    let openUrl = plus.os.name === 'iOS' ? response.iOS : response.Android;
						    // 提醒用户更新
							uni.showModal({
							    title: response.title ? response.title : '更新提示',
							    content: response.note ? response.note : '是否选择更新',
							    success: (showResult) => {
							        if (showResult.confirm) {
							            plus.runtime.openURL(openUrl);
							        }
							    }
							})
						}
					})
				.catch(error => {
				});
			};
			// #endif

			if (!this.token) {
				uni.reLaunch({ // 关闭所有页面进行跳转
					url: 'pages/denglu/login/login'
				});
				return;
			}else{
				this.$store
					.dispatch("GetInfo")
					.then(response => {
						console.log('获取用户信息');
					})
				.catch(err => {
				});
			}
		},
		onShow: function () {
			console.log('App Show');
		},
		onHide: function () {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css"; 
	@import "./common/uni.scss";  
	@import "./common/app.css"; 
	
</style>
