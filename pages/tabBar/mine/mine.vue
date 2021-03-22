<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="bindLogo">
				<view class="uni-media-list uni-list-cell-navigate uni-navigate-right">
					<image class="uni-media-list-logo me-list-logo" :src="avatar"></image>
					<view class="uni-media-list-body me-list-body">
						<view class="uni-media-list-text-top me-list-text">{{username}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis me-list-bottom">{{mobile}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="uni-list me-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="bindScan">
				<view class="uni-media-list uni-list-cell-navigate uni-navigate-right">
					<image class="uni-media-list-logo" src="../../../static/saoyisao.png"></image>
					<view class="uni-media-list-body me-list-body">
						<view class="uni-media-list-text-top me-list-setting">扫描设备</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="uni-list me-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="bindSetting">
				<view class="uni-media-list uni-list-cell-navigate uni-navigate-right">
					<image class="uni-media-list-logo" src="../../../static/shezhi.png"></image>
					<view class="uni-media-list-body me-list-body">
						<view class="uni-media-list-text-top me-list-setting">设置</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(['nickname', 'username', "hasLogin", "token", "avatar", "mobile"]),
		},
		methods: {
			bindLogo() {
				uni.navigateTo({
					url: '../../mine/info/info'
				});
			},
			bindScan() {
				uni.scanCode({
					onlyFromCamera: false,
					success: function(res) {
						let data = JSON.parse(res.result);
						if (data.type == 'login') {
							uni.showToast({
								title: data.type,
							})
							if (parseInt(new Date().getTime() / 1000) > data.expired_at) {
								uni.showToast({
									title: '二维码已过期',
								})
							} else {
								uni.navigateTo({
									url: '/pages/mine/scan/scan?uuid=' + data.uuid
								});
							}
						}
						
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						console.log('path内容：' + res.path);
					},
					complete: function(res) {
						console.log('条码类型：' + res);
					}
				});
			},
			bindSetting() {
				uni.navigateTo({
					url: '../../mine/setting/setting'
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #efeff4;
	}

	.me-list {
		margin-top: 40rpx;
	}

	.uni-list:before {
		height: 0rpx;
	}

	.uni-list:after {
		height: 0rpx;
	}

	.uni-list-cell:after {
		height: 0rpx;
	}

	.me-list-logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
		margin-right: 30rpx;
	}

	.me-list-body {
		height: 100rpx;
		display: flex;
		align-items: center;
	}

	.me-list-text {
		padding-top: 8rpx;
		font-size: 40rpx;
		line-height: 50rpx;
		font-weight: bold;
	}

	.me-list-bottom {
		padding-bottom: 8rpx;
		font-size: 36rpx;
		line-height: 42rpx;
	}

	.me-list-setting {
		line-height: 100rpx;

	}
</style>
