<template>
	<view class="container">
		<view class="banner">
			<image class="banner-img" :src="banner.thumb" style="width: 750rpx;" mode="aspectFit"></image>
			<text class="banner-title">{{banner.title}}</text>
		</view>
		<view class="article-meta">
			<text class="article-author">{{banner.author_name}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner.created_at}}</text>
		</view>
		<view class="article-content">
			<rich-text type: :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				banner: {},
				strings: ''
			};
		},
		onLoad(event) {

			// TODO 后面把参数名替换成 payload
			const payload = event.detail || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.banner = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.banner = JSON.parse(payload);
			}
			uni.setNavigationBarTitle({
				title: this.banner.title
			});
			this.getDetail();
		},
		methods: {
			getDetail() {
				var query = {
					id: this.banner.id
				};
				this.$store
					.dispatch("GetArticleView", query)
					.then(response => {
						//this.loading = false;
						var htmlString = response.item.content.replace(/\\/g, "");
						this.strings = htmlString;
					})
					.catch(() => {
						//this.loading = false;
					});
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 690rpx;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #FFFFFF;
		z-index: 11;
	}

	.article-meta {
		padding: 20rpx 40rpx;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26rpx;
		line-height: 50rpx;
		margin: 0 20rpx;
	}

	.article-author,
	.article-time {
		font-size: 26rpx;
	}

	.article-content {
		padding: 0 30rpx;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
