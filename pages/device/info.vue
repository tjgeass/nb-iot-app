<template>
	<view class="container">
		<view class="uni-row uni-jc">
			<text class="title">名称:{{device.name}}</text>
			<text class="date">上报时间:{{device.updated_at}}</text>
		</view>
		<view class="address-box" @tap="clickMap(device.dev_id)">
			<image style="width: 25rpx;height: 29rpx;" src="/static/images/address.png" mode="aspectFit"></image>
			<text class="address">{{construction.name}}</text>
		</view>
		<view class="info-box">
			<view class="flex-item-2 uni-bg-green">
				<image style="width: 100rpx;height: 100rpx;" src="/static/images/device.png"></image>
				<text class="item-text">工作状态:{{device.status|formatNameStatus}}</text>
			</view>
			<view class="flex-item-2 uni-bg-red" @tap="clickMessage(device)">
				<image style="width: 100rpx;height: 100rpx;" src="/static/images/police.png"></image>
				<text class="item-text">历史警告</text>
			</view>
		</view>
		<view class="card" style="margin-top: 30rpx;">
			<view class="card-top">
				<view class="uni-row" style="align-items: center;">
					<image src="/static/images/line.png" style="width:8rpx; height: 40rpx" mode="aspectFit"></image>
					<text style="color: #333333; margin-left: 10rpx;">详细数据</text>
				</view>
			</view>
			<view class="card-bottom">
				<view class="bottom-col">
					<text class="w-iconfont icon-wendu icon-item"></text>
					<text class="col-title">温度</text>
					<text class="col-v">{{device.newData.temp||'N/A'}}℃</text>
				</view>
				<view class="bottom-col">
					<text class="w-iconfont icon-shidu icon-item"></text>
					<text class="col-title">湿度</text>
					<text class="col-v">{{device.newData.humi||'N/A'}}%RH</text>
				</view>
				<view class="bottom-col">
					<text class="w-iconfont icon-guangzhao icon-item" style="color: rgb(228, 158, 28);"></text>
					<text class="col-title">光照</text>
					<text class="col-v" >{{device.newData.illu||'N/A'}}Lux</text>
				</view>
				<view class="bottom-col" v-if="device.type.isPerc">
					<text class="w-iconfont icon-suidaoliefeng icon-item"></text>
					<text class="col-title">裂隙</text>
					<text class="col-v">{{device.newData.perc||'N/A'}}mm </text>
				</view>
				<view class="bottom-col" v-if="device.newData.isDire">
					<text class="w-iconfont icon-suidaoliefeng icon-item"></text>
					<text class="col-title">前后倾角</text>
					<text class="col-v">{{device.newData.dire_0||'N/A'}}°</text>
				</view>
				<view class="bottom-col" v-if="device.newData.isDire">
					<text class="w-iconfont icon-suidaoliefeng icon-item"></text>
					<text class="col-title">左右倾角</text>
					<text class="col-v">{{device.newData.dire_1||'N/A'}}°</text>
				</view>
				<view class="bottom-col">
					<text class="w-iconfont icon-dianliang icon-item"></text>
					<text class="col-title">电压</text>
					<text class="col-v">{{device.newData.volt/10||'N/A'}}V</text>
				</view>
				<view class="bottom-col">
					<text class="w-iconfont icon-qiya icon-item"></text>
					<text class="col-title">气压</text>
					<text class="col-v">{{Number(device.newData.alti/1000).toFixed(2)||'N/A'}}Kpa</text>
				</view>
			</view>
		</view>
		<view class="card" style="margin-top: 30rpx;">
			<view class="card-top">
				<view class="uni-row" style="align-items: center;">
					<image src="/static/images/line.png" style="width:8rpx; height: 40rpx" mode="aspectFit"></image>
					<text style="color: #333333; margin-left: 10rpx;">环境数据</text>
				</view>
				<text style="color: #333333;font-size: 26rpx;" @tap="clickData(device.dev_id)">更多</text>
			</view>
			<view class="card-content">
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		components: {},
		data() {
			return {
				dev_id: '',
				device: {
					name: '设备',
					address: '无',
					status: "正常",
				},
				construction: {},
				lists: [],
			}
		},
		filters: {
			formatNameStatus(num) {
				switch (num) {
					case 1:
						return '正常';
						break;
					case 2:
						return '异常';
						break;
					case 3:
						return '危险';
						break;
					case 0:
						return '离线';
						break;
				}
			},
		},
		onLoad: function(option) {
			var _this = this;
			this.dev_id = option.dev_id;
			var query = {
				expand: "construction",
				dev_id: option.dev_id,
				XDEBUG_SESSION_START: 19945
			};
			this.$store
				.dispatch("GetDeviceInfo", query)
				.then(response => {
					//this.loading = false;
					this.device = response.item;
					this.construction = response.construction;
					console.log(this.device);
				})
				.catch(() => {
					//this.loading = false;
				});


		},
		methods: {
			clickData(dev_id) {
				uni.navigateTo({
					url: '/pages/device/data?tabIndex=1&dev_id=' + dev_id,
				});
			},
			clickMessage(dev_id) {
				var that = this;
				this.$store.commit("SET_DEVICE", that.device);
				uni.switchTab({
					url: '/pages/tabBar/message/index',
					success: function() {
						uni.$emit('message', {
							device: that.device,
							tab_index: 1
						});
					}
				});
			},
			clickMap(dev_id) {
				uni.navigateTo({
					url: '/pages/device/data?tabIndex=2&dev_id=' + dev_id,
				});
			},
			clickPic(dev_id) {
				uni.navigateTo({
					url: '/pages/device/data?tabIndex=0&dev_id=' + dev_id,
				});
			},
			imageError(e) {
				e.url = "/static/images/pic.png";
			},
		}
	}
</script>

<style lang="scss">
	@import "../../common/iconfont.css";
	
	.container {
		color: #007AFF;
		padding: 30rpx;
	}

	.title {
		color: #585858;
		font-size: 42rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.date {
		color: #A7A7A7;
		font-size: 26rpx;
		line-height: 60rpx;
	}

	.address-box {
		display: flex;
		flex: 1;
		align-items: center;
		flex-direction: row;
		padding-left: 5rpx;

	}

	.address {
		box-sizing: border-box;
		padding-left: 10rpx;
		line-height: 50rpx;
		color: #A7A7A7;
		font-size: 30rpx;
		flex-shrink: 1;
		overflow: hidden;
	}

	.info-box {
		display: flex;
		height: 250rpx;
		flex-direction: row;
		justify-content: space-between;
	}

	.flex-item-2 {
		display: flex;
		flex: 0.48;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 5rpx;
		padding: 10rpx;
		border-radius: 20rpx;

	}

	.item-text {
		font-size: 34rpx;
		color: #FFFFFF;
		margin-top: 20rpx;
	}

	.uni-bg-green {
		background-image: linear-gradient(to right, #00DFB5, #46E442);
	}

	.uni-bg-red {
		background-image: linear-gradient(to right, #FFA659, #FD5E75);
	}

	.uni-row {
		display: flex;
	}

	.card {
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 10rpx;
		border-color: rgba(106, 152, 140, 0.33);
		border-width: 2rpx;
		border-style: solid;
	}

	.card-top {
		box-sizing: border-box;
		display: flex;
		padding: 10rpx 30rpx;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		height: 80rpx;
	}

	.card-content {
		display: flex;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.card-bottom {
		padding: 15rpx;
		display: flex;
		flex: 1;
		box-sizing: border-box;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	
	.bottom-col {
		width: 33%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.icon-item{
		font-size: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #909399;
	}
	.col-title {
		box-sizing: border-box;
		font-size: 32rpx;
		text-align: center;
		padding: 10rpx 0;
		color: #909399;
	}

	.col-v {
		box-sizing: border-box;
		font-size: 32rpx;
		text-align: center;
		padding: 10rpx 0;
		color: #909399;
	}

	.img-con {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
