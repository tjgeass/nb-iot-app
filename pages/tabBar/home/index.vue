<template>
	<view class="container">
		<view class="header" style="400rpx">
			<view class="weather">
				<view class="wendu" >
					<view style="float: left;height: 80rpx;line-height: 80rpx; font-size: 80rpx;">
						{{weatherData.liveData.temperature || 0}}
					</view>
					<view style="float: left;height: 80rpx;">
						<view style="height: 40rpx;font-size: 40rpx; line-height: 40rpx;">℃</view>
						<view style="height: 40rpx; ">湿度:{{weatherData.liveData.humidity || 0}}%</view>
					</view>
				</view>
				<text class="tianqi">{{weatherData.liveData.weather || ""}}</text>
				<text class="p-name">项目名称:{{project.name||'无'}}</text>
				<text class="num">设备数量:<text style=" margin-left: 10rpx; background-color: #7AB975;border-radius: 20rpx;padding:0 10rpx;">{{project.d_num||0}}</text></text>
				<text class="date">{{time|formatDate}}</text>
				
			</view>
			<image class="bg"></image>
		</view>
		<view class="main">
			<view class="header-grid">
				<view class="uni-swiper-msg" @tap="clickErrMessage">
					<view class="uni-swiper-msg-icon">
						<image style="width:100%; flex-shrink:0;" src="/static/images/horn.png" mode="widthFix"></image>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="width:100%; height:40rpx;">
						<swiper-item v-for="(item, index) in message" :key="index" style="line-height:40rpx;">
							<navigator>{{item.content}}</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="btns">
					<view class="btn" @tap="clickMessage"> 
						<view class="btn-icon" style="background-color:#288EF8 ;">
							<image src="/static/images/home1.png" mode="aspectFit"></image>
						</view>
						<text class="btn-label">开锁记录</text>
					</view>
					<view class="btn" @tap="clickMap">
						<view class="btn-icon" style="background-color:#288EF8 ;">
							<image src="/static/images/home2.png" mode="aspectFit"></image>
						</view>
						<text class="btn-label">地图定位</text>
					</view>
					<view class="btn" @tap="clickErrMessage">
						<view class="btn-icon" style="background-color:#288EF8 ;">
							<image src="/static/images/home3.png" mode="aspectFit"></image>
						</view>
						<text class="btn-label">报警信息</text>
					</view>
					<view class="btn" @tap="clickText" >
						<view class="btn-icon" style="background-color:#FF495A ;">
							<image src="/static/images/home4.png" mode="aspectFit"></image>
						</view>
						<text class="btn-label">热点信息</text>
					</view>
				</view>
			</view>
			<view class="devices">
				<view class="head">
					<view style="align-items: center ;display: flex;flex-direction: row;height: 50rpx;">
						<image style="width: 10rpx;margin-right: 15rpx;" src="/static/images/line.png" mode="aspectFit"></image>
						<view class="title">我的设备</view>
					</view>
					<view class="uni-icon uni-icon-compose"  @click="showPopup" />
				</view>
				<view class="content">
					<view class="device-item" :key="index" v-for="(device, index) in followList"  @tap="clickDevice(device.dev_id)">
						<view class="image">
							<image style="width: 60rpx;height: 60rpx;" src="/static/images/box_blue.png"></image>
						</view>
						<view class="info">
							<text class="name">{{device.name}}</text>
							<view class="desc">
								<text class="status">设备{{device.status|formatNameStatus}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const amap = require('../../../components/amap-wx.js');
	import {
		mapGetters
	} from "vuex";

	export default {
		components: {
		},
		computed: {
		  ...mapGetters(['weatherData',"hasLogin", "token", "username","follows",'message']),
		},
		filters: {
		  formatDate:function(value){
		  	let date = new Date(value);
		  	let y = date.getFullYear();
		  	let MM = date.getMonth() + 1;
		  	MM = MM < 10 ? ('0' + MM) : MM;
		  	let d = date.getDate();
		  	return y + '年' + MM + '月' + d + '日';
		  },
		  formatColorStatus(num) {
		      switch (num) {
		          case 1:
		              return 'background-color:#67C23A';
		              break;
		          case 2:
		              return 'background-color:#F56C6C';
		              break;
		          case 0:
		              return 'background-color:#909399';
		              break;
		      }
		  },
		  formatIcoStatus(num) {
		      switch (num) {
		          case 1:
		              return '/static/images/s1.png';
		              break;
		          case 2:
		              return '/static/images/s2.png';
		              break;
		          case 0:
		              return '/static/images/s0.png';
		              break;
		      }
		  },
		  formatNameStatus(num) {
		      switch (num) {
		          case 1:
		              return '正常';
		              break;
		          case 2:
		              return '异常';
		              break;
		          case 0:
		              return '离线';
		              break;
		      }
		  
		  },
		},
		data() {
			return {
				time:Date.parse(new Date()),
				project:{
					name:'',
					d_num:0
				},
				amapPlugin: null,
				key: "ba4b1b44e808bdd37a9b764089767601",
				obj: {},
				title:"我的设备",
				followList: [],
			};
		},
		onLoad() {
			if (this.token) {
				this.amapPlugin = new amap.AMapWX({
					key: this.key
				});
				this.fetchData();
				this.getWeather();
			}
			// 请求消息列表
			
			//监听收藏设备事件刷新数据
			uni.$on('home', (data) => {
				this.fetchData();
			})
		},
		methods:{
			/**
			 * 获取首页数据
			 */
			fetchData(){
				this.$store
					.dispatch("GetHome")
					.then(response => {
						//this.loading = false;
						this.followList = response.follows;
						this.project = response.project;
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
			clickDevice(dev_id){
				uni.navigateTo({
				    url: '/pages/device/info?dev_id='+dev_id,
				});
			},
			/**
			 * 点击地图事件
			 */
			clickMap : function(){
				uni.navigateTo({
				    url: '/pages/tabBar/home/map',
				});
			},
			/**
			 * 点击热点信息
			 */
			clickText : function(){
				uni.navigateTo({
				    url: '/pages/article/index',
				});
			},
			/**
			 * 跳转报警页面,自动切换tab
			 * @param {Object} index
			 */
			clickErrMessage(){
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
			clickMessage:function(){
				uni.switchTab({
				    url: '/pages/tabBar/message/index',
					success: function() {
						uni.$emit('message', {tab_index:0});
					}
				});
			},
			/**
			 * 高德地图获取天气
			 */
			getWeather: function() {
				if (!this.weatherData){
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

<style>
	*{
		box-sizing: border-box;
	}
	.container{
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #FAFAFA;
		display: flex;
		flex: 1;
	}
	.header{
		box-sizing: border-box;
		background-image: linear-gradient(to right, #5DA4FB, #7E77F7);
		padding-top: 70rpx;
	}
	.header .weather{
		width: 750rpx;
		position: relative;
	}
	.weather .wendu{
		position: absolute;
		top: 20rpx;
		left: 40rpx;
		color: #FFFFFF;
		font-size: 60rpx;
	}
	.weather .tianqi{
		position: absolute;
		top: 20rpx;
		right: 40rpx;
		color: #FFFFFF;
		font-size: 60rpx;
	}
	.weather .p-name{
		position: absolute;
		top: 120rpx;
		left: 40rpx;
		color: #FFFFFF;
		font-size:30rpx;
	}
	.weather .num{
		position: absolute;
		top: 165rpx;
		left: 40rpx;
		color: #FFFFFF;
		font-size:30rpx;
	}
	.weather .date{
		position: absolute;
		top: 120rpx;
		right: 40rpx;
		color: #FFFFFF;
		font-size:30rpx;
	}
	.bg{
		height: 350rpx;
	}
	.main{
		box-sizing: border-box;
		margin-top: -125rpx;
		width: 680rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header-grid{
		box-sizing: border-box;
		width: 100%;
		border-radius: 10rpx;
		height: 250rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}
	.uni-swiper-msg{
		width:100%; 
		padding:12rpx 0; 
		flex-wrap:nowrap; 
		display:flex;
	}
	.btns{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.btn{
		height: 170rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btn-icon{
		box-sizing: border-box;
		width: 90rpx;
		height: 90rpx;
		padding: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
	}
	.btn-label {
		display: block;
		text-align: center;
		font-weight: 400;
		color: #333;
		font-size: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10upx;
	}
	.uni-swiper-msg{
		height: 40rpx;
	}
	.uni-swiper-msg-icon{
		width:40rpx; 
		margin-right:20rpx;
		}
		
	.uni-media-list-logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 15upx;
	}

	.uni-media-list-body {
		height: 120rpx;
	}

	.uni-media-list-text-top {
		font-size: 1.2em;
		line-height: 1.2em;
		margin: 5upx 0 15upx 0;
	}

	.uni-media-list-text-bottom {
		font-size: .8em;
		line-height: 1.2em;
		margin-bottom: 5upx;
	}

	.devices{
		box-sizing: border-box;
		margin-top: 30rpx;
		width: 680rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}
	.devices .head{
		box-sizing: border-box;
		height: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.devices .content{
		flex: 1;
		flex-direction: row;
		flex-flow: wrap;
		display: flex;
		box-sizing: border-box;
	}
	.device-item{
		width: 45%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		background-color: #F7F7FF;
		padding: 15rpx;
		margin: 15rpx;
		align-items: center;
		justify-content:center;
		border-radius:10rpx;
		box-sizing: border-box;
	}
	.device-item .image{
		color: #4B00FB;
		width: 60rpx;
		height: 60rpx;
	}
	.device-item .info{
		margin-left: 30rpx;
	}
	.device-item .info .name{
		color: #333333;
		font-size: 34rpx;
		line-height: 36rpx;
	}
	.device-item .info .desc{
		color: #acacac;
		line-height: 24rpx;
	}
</style>
