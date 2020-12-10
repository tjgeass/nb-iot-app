<template>
	<view class="content">
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<image style="width: 100%;" :src="avatar" @tap="bindChange" mode="aspectFit" />
			</view>
			<view style="width: 100%; text-align: center;">
				<text>点击头像修改</text>
			</view>
		</view>
		
	</view>
</template>   

<script>
	import {mapGetters, mapMutations} from 'vuex';
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters(['username','avatar','mobile']),
		},
		methods:{
			...mapMutations(['changeLogo']),
			bindChange(){
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album','camera'],
					success: (res) => {
						const imgSrc = res.tempFilePaths[0];
						uni.showLoading({
							title: '上传中',
							mask: true
						});
						this.$store.dispatch("UpdateAvatar",imgSrc)
						.then(response => {
							//this.loading = false;
							//this.followList = response.follows;
							uni.hideLoading();
							uni.showToast({
								title: '上传成功',
								duration: 2000
							});
						})
						.catch(() => {
							uni.showToast({
								title: '上传失败',
								duration: 2000
							});
							
							//this.loading = false;
					});
						
					},
					fail: (err) => {
						console.log('选择图片失败', err);
					}
				});
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #efeff4;
	}
	.content{
		display: flex;
		justify-content: center;
		height: 100%;
	}
	.uni-padding-wrap{
		padding: 20rpx 50rpx;
	}
</style>
