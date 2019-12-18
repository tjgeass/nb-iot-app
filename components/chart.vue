<template>
	<view class="qiun-charts">
		<uni-load-more v-if="loading" iconType="spinner" status="loading" />
		<canvas v-show="!loading" canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uCharts from '@/components/u-charts/u-charts.js';
	var canvaMix = null;
	var _self;

	export default {
		components: {
			uniLoadMore
		},
		props: {
			dev_id: {
				type: String,
				default: null
			},
		},
		data() {
			return {
				loading:true,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				list: [],
				chartData: {
					categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
					series: [{
						name: "柱1",
						data: [40, 30, 55, 110, 24, 58],
						type: "column"
					}, {
						name: "折线",
						data: [120, 140, 105, 170, 95, 160],
						type: "line",
						color: "#2fc25b"
					}]
				}
			};
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(650);
			this.cHeight = uni.upx2px(400);
			//_self.showMix("canvasMix", this.chartData);
			setTimeout(() => {
				this.fetchData();
			}, 100);

		},
		methods: {
			fetchData() {
				var query = {
					dev_id: this.dev_id,
					num: 20,
				};
				this.$store
					.dispatch("GetDeviceData", query)
					.then(response => {
						if (response.items.length == 0) {
							return;
						}
						_self.lists = response.items;
						let Mix = {
							categories: [],
							series: []
						};
						var categories = [];
						var series1 = {
							name: "温度",
							data: [],
							type: "line",
							color: "#2fc25b"
						};
						var series2 = {
							name: "湿度",
							data: [],
							type: "column",
							width:3
						};
						for (let i = 0; i < _self.lists.length; i++) {
							categories.push(_self.lists[i].uplink_at);
							series1.data.push(_self.lists[i].temperature);
							series2.data.push(_self.lists[i].humidity);
						}
						Mix.categories = categories;
						Mix.series = [series2, series1];
						_self.showMix("canvasMix", Mix);
						this.loading =false;
					})
					.catch(() => {
						//this.loading = false;
					});
			},
			showMix(canvasId, chartData) {
				canvaMix = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disabled: true,
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 10,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						gridType: 'dash',
						splitNumber: 5,
						
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			touchMix(e) {
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData() {
				canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			}
		}
	}
</script>

<style lang="scss">
	.qiun-charts {
		width: 650rpx;
		height: 400rpx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 650rpx;
		height: 400rpx;
		background-color: #FFFFFF;
	}
</style>
