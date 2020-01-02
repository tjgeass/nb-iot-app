<template>
	<view class="container">
		<view class="header" :style="{backgroundImage: 'url(' + bg + ')'}">
			<view class="header-title uni-flex">
				<text class="title">
					物联网智能分析系统
				</text>
			</view>
			<view class="score">
				<arcbar :score="score"></arcbar>
			</view>
			<view class="status-text">
				<text class="text1">您管理的文物遗址很健康</text>
				<text class="text2">良好的定期体检习惯，会让文物遗址的健康状态持续时间更久</text>
			</view>
			<view class="header-btn">
				<button class="btn">智能检测</button>
			</view>
		</view>
		<view class="main">
			<view class="btns" style="display: none;">
				<view class="btn" >
					<image class="btn-icon" src="/static/images/home/btn1.png" mode="aspectFit"></image>
					<text class="btn-label">设备分布</text>
				</view>
				<view class="btn" >
					<image class="btn-icon" src="/static/images/home/btn2.png" mode="aspectFit"></image>
					<text class="btn-label">运行状态</text>
				</view>
				<view class="btn" >
					<image class="btn-icon" src="/static/images/home/btn3.png" mode="aspectFit"></image>
					<text class="btn-label">数据导出</text>
				</view>
				<view class="btn" >
					<image class="btn-icon" src="/static/images/home/btn4.png" mode="aspectFit"></image>
					<text class="btn-label">监控报告</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import bg from '@/static/images/home/bg.png';

	import {
		mapGetters
	} from "vuex";
	import arcbar from '@/components/arcbar.vue';

	export default {
		components: {
			arcbar
		},
		computed: {
			...mapGetters(["hasLogin", "token", "username", "follows", 'message']),
		},
		data() {
			return {
				bg:bg,
				time: Date.parse(new Date()),
				project: {
					name: '',
					d_num: 0
				},
				amapPlugin: null,
				key: "ba4b1b44e808bdd37a9b764089767601",
				obj: {},
				title: "我的设备",
				followList: [],
				score: 100,
				gaugeWidth: 15,

			};
		},
		onLoad() {
			if (this.token) {
				this.fetchData();
			}
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去

		},
		methods: {
			/**
			 * 获取首页数据
			 */
			fetchData() {
				this.$store
					.dispatch("GetHome")
					.then(response => {
						//this.loading = false;
						this.score = response.item.score;
					})
					.catch(() => {
						//this.loading = false;
					});
			},
			/**
			 * 显示设备列表
			 */
			showPopup() {
				uni.getSubNVueById('follow').show('zoom-fade-out', 250);
			},
			/**
			 * 点击设备事件
			 * @param {Object} dev_id
			 */
			clickDevice(dev_id) {
				uni.navigateTo({
					url: '/pages/device/info?dev_id=' + dev_id,
				});
			},
			/**
			 * 点击地图事件
			 */
			clickMap: function() {
				uni.navigateTo({
					url: '/pages/tabBar/home/map',
				});
			},
			/**
			 * 点击热点信息
			 */
			clickText: function() {
				uni.navigateTo({
					url: '/pages/article/index',
				});
			},
			/**
			 * 跳转报警页面,自动切换tab
			 * @param {Object} index
			 */
			clickErrMessage() {
				uni.switchTab({
					url: '/pages/tabBar/message/index',
					success: function() {
						uni.$emit('message', {
							tab_index: 1
						});
					}
				});
			},
			/**
			 * 跳转开锁页面
			 */
			clickMessage: function() {
				uni.switchTab({
					url: '/pages/tabBar/message/index',
					success: function() {
						uni.$emit('message', {
							tab_index: 0
						});
					}
				});
			},
			/**
			 * 高德地图获取天气
			 */
			getWeather: function() {
				if (!this.weatherData) {
					this.amapPlugin.getWeather({
						success: (data) => {
							//成功回调
							//console.log(data)
							uni.hideLoading()
							this.obj = data
							this.$store.commit("SET_WeatherData", data);
						},
						fail: function(info) {
							//失败回调
							console.log(info);
							uni.hideLoading();
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #FAFAFA;
		display: flex;
		flex: 1;
	}

	.header {
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-color: linear-gradient(to bottom, #22bb69 50%,#FFFFFF 50%);
		background-position: bottom;
		background-size: cover;
		padding-top: 150rpx;
		width: 750rpx;
		height: 890rpx;
		display: flex;
		flex-direction: column;
	}

	.header-title {
		justify-content: center;
		.title {
			color: #FFFFFF;
			font-size: 30rpx;
		}
	}

	.score {
		margin: 50rpx auto;
	}

	.status-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.text1 {
			font-size: 40rpx;
			color: #FFFFFF;
		}
		.text2 {
			font-size: 24rpx;
			color: #FFFFFF;
		}
	}
	.header-btn {
		justify-self: flex-end;
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
		.btn {
			height: 100rpx;
			line-height: 100rpx;
			width: 350rpx;
			font-size: 46rpx;
			color: #FFFFFF;
			background: linear-gradient(0deg, rgba(241, 167, 66, 1), rgba(252, 192, 80, 1));
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.18);
			border-radius: 50rpx;
		}
	}

	.main {
		display: flex;
		flex: 1;
		box-sizing: border-box;
		width: 720rpx;
		margin-left: auto;
		margin-right: auto;
		padding-top: 150rpx;
		.btns {
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: space-around;
		}

		.btn {
			height: 170rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
		}

		.btn-icon {
			box-sizing: border-box;
			width: 110rpx;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
		}

		.btn-label {
			background-color: #31C878;
			display: block;
			text-align: center;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 28rpx;
			white-space: nowrap;
			padding: 5rpx 20rpx;
			text-overflow: ellipsis;
			margin-top: 40rpx;
			border-radius:9px;

		}
	}








	.devices {
		box-sizing: border-box;
		margin-top: 30rpx;
		width: 680rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.devices .head {
		box-sizing: border-box;
		height: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.devices .content {
		flex: 1;
		flex-direction: row;
		flex-flow: wrap;
		display: flex;
		box-sizing: border-box;
	}

	.device-item {
		width: 45%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		background-color: #F7F7FF;
		padding: 15rpx;
		margin: 15rpx;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		box-sizing: border-box;
	}

	.device-item .image {
		color: #4B00FB;
		width: 60rpx;
		height: 60rpx;
	}

	.device-item .info {
		margin-left: 30rpx;
	}

	.device-item .info .name {
		color: #333333;
		font-size: 34rpx;
		line-height: 36rpx;
	}

	.device-item .info .desc {
		color: #acacac;
		line-height: 24rpx;
	}
</style>
