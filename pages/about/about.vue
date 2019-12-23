<template>
	<view class="content">
		<view class="uni-flex uni-column" style="justify-content: center; align-items: center;">
			<image src="/static/logo.png" style="width: 300rpx; height: 350rpx;" mode="aspectFit">
			</image>
			<text class="version">古建物联网监测 {{version}}</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="update">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					检测更新
					<text class="me-list-text"></text>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					版权信息
					<text class="me-list-text"></text>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					技术服务
					<text class="me-list-text" @tap="call">18567610500</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '',
			};
		},
		onLoad() {
			this.version = plus.runtime.version;
		},
		methods: {
			/**
			 * 拨打电话
			 */
			call() {
				uni.makePhoneCall({
					phoneNumber: '18567610500' //仅为示例
				});
			},
			/**
			 * 检测更新
			 */
			update() {
				uni.showLoading({
					 title:'检测更新'
				});
				var query = {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				};
				this.$store
					.dispatch("UpdateApp", query)
					.then(response => {
						uni.hideLoading();
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
						} else {
							uni.showToast({
							    title: '已是最新版本',
							    duration: 2000
							});
						}
					})
					.catch(error => {
						uni.hideLoading();
					});
					
			}
		}
	}
</script>

<style lang="scss">
	.version {
		padding: 10rpx 0;
	}
</style>
