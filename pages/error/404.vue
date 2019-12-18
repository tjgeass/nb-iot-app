<template>
	<view class="content">
		<view class="text">
			<text style="font-size: 40rpx;">网络发生错误!</text>
		</view>
		<view class="btn-row"> 
			<button type="warn" class="warn" @tap="bindRetry">重试</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			bindRetry(){
				uni.reLaunch({
					url: '/pages/tabBar/home/index',
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 200rpx 50rpx;
	}
	.text{
		text-align: center;
		padding: 20rpx 10rpx;
		line-height: 40rpx;
	}
	.btn-row{
		margin-top: 200rpx;
	}
</style>
