<template>
	<view class="content">
		<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts"></canvas>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import TweenLite from "@/components/TweenMax.min.js";

	var _self;
	var canvaArcbar1 = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				tweenedScore: 100,
				arcbar:{},
			};
		},
		props: {
			score: {
				type: Number,
				default: 100
			},
		},
		computed: {
			animatedScore: function() {
				return Number(this.tweenedScore.toFixed(0) / 100);
			}
		},
		watch: {
			score: function(newValue) {
				/**
				TweenLite.to(this.$data, 0.5, {
					tweenedScore: newValue
				});
				*/
				//this.updateData();
			}
		},
		created() {
			_self = this;
			setTimeout(()=>{
				_self.init();
			},500)
		},
		methods: {
			init(){
				this.arcbar = {
					series: [{
						name: '正确率',
						data: this.score/100,
						color: '#22BB69'
					}]
				};
				this.cWidth = uni.upx2px(350);
				this.cHeight = uni.upx2px(350);
				this.arcbarWidth = uni.upx2px(24);
				this.showArcbar("canvasArcbar1", this.arcbar);
			},
			showArcbar(canvasId, chartData) {
				canvaArcbar1 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: "#ffffff",
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data * 100), //这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 56 * _self.pixelRatio
					},
					subtitle: {
						name: '分', //这里您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 15 * _self.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'circle', //整圆类型进度条图
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
							startAngle: -0.5 //整圆类型只需配置起始角度即可
						}
					}
				});
			},
			updateData(){
				canvaArcbar1.updateData({
					series: [{
						name: '正确率11',
						data: this.animatedScore,
						color: '#2fc25b'
					}],
					title: {
						name: this.animatedScore, //这里我自动计算了，您可以直接给任意字符串
						fontSize: 25 * _self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name, //这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15 * _self.pixelRatio
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		justify-content: center;
	}

	.charts {
		width: 350rpx;
		height: 350rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}
</style>
