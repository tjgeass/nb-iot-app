<template>
	<view class="scan-login">
		<button type="primary" :loading="loading" class="primary" @tap="handleLogin">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				uuid:null
			};
		},
		onLoad: function(option) {
			var _this = this;
			this.uuid = option.uuid;
		},
		methods:{
			handleLogin(){
				this.loading = true;
				var data = {
					uuid: this.uuid,
				};
				this.$store
					.dispatch("ScanLogin", data)
					.then(response => {
						//this.loading = false;
						uni.navigateBack({
							delta:1
						})
						if(response.login){
							uni.showToast({
								title:'登录成功' 
							})
						}else{
							uni.showToast({
								title:'登录失败' 
							})
						}
					})
					.catch(() => {
						this.loading = false;
					});
			}
		}
	}
</script>

<style>
	button.primary {
		background-color: #22BB69;
	}
.scan-login{
	padding: 500rpx 50rpx;
}
</style>
