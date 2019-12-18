<template>
	<view class="content" >
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="bindReg">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					修改密码
					<text class="me-list-text"></text>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="bindAbout">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					关于中创文物箱
					<text class="me-list-text">{{version}}</text>
				</view>
			</view>
		</view>
		<button class="me-logout default" type="default" @tap="bindLogout">退出登录</button>
	</view>
		
	
</template>

<script>
	export default {
		data() {
			return {
				version:''
			};
		},
		onLoad() {
			this.version=plus.runtime.version;
		},
		methods:{
			bindReg(){
				uni.navigateTo({
					url: '/pages/denglu/register/register',
				});
			},
			bindAbout(){
				uni.navigateTo({
					url: '/pages/about/about',
				});
			},
			
			/**
			 * 退出登录
			 */
			bindLogout(){
				this.$store
					.dispatch("LogOut")
					.then(() => {
						//this.loading = false;
						uni.reLaunch({
							url: '/pages/denglu/login/login',
						});
					})
					.catch(() => {
						//this.loading = false;
					});
			}
		}
	}
</script>

<style>
	page{
		background-color: #efeff4;
	}
	.me-logout{
		margin-top: 100rpx;
	}
	button.default{
		background-color: #FFFFFF;
	}
</style>
