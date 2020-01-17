<template>
	<view class="uni-swiper-box">
		<view class="content">
			<view class="uni-rw-list" v-for="(item,index) in shArray" :key="index">
				<view class="uni-rw-cont" @tap="opensh" :data-shid="item.ID">
					<image :src="item.thumbnail" mode=""></image>
					<view class="uni-rw-text">
						<text class="Text_Nowrap">{{item.TaskName}}</text>
						<view class="uni-rw-sl">
							<view>{{item.PeopleMin}}-{{item.PeopleMax}}人</view>
							<view>{{item.Days}}天内</view>
							<view>还剩<text class="uni-sy">{{item.Surplus}}</text>份</view>
						</view>
					</view>
					<view class="uni-rw-time uni-rw-time2">
						<text>审核中...</text>
					</view>
				</view>
			</view>
		</view>
		<text class="tisi">{{Tishi}}</text>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control.vue";
	import helper from '../../common/helper.js';

	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				shArray: '',
				num: '6', //默认显示9条任务数据
				Tishi: ''
			}
		},
		onLoad() {
			this.fllist();
		},
		onShow() {
			this.fllist()
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.fllist(true);
			uni.showLoading({
				title: "刷新中....",
				mask: true
			})
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.fllist();
		},
		methods: {
			// 获取已领取任务的id
			openlq(e) {
				uni.navigateTo({
					url: '../task/YilinquTask?lqid=' + e.currentTarget.dataset.lqid
				});
			},
			// 请求任务列表
			fllist(isdown) {
				helper.islogin(true);
				uni.request({
					url: helper.websiteUrl + 'task/getmytasklist',
					method: 'GET',
					data: helper.postdata({
						"page": "1",
						"num": this.num,
						"State": 3,
						"userid": helper.getstate().userid,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.shArray = res.data.data.baseinfo;

						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						if (res.data.data.baseinfo.length >= this.num) { //判断触底加载是否到底最后一条 否则提示没有更多数据了
							this.bottomtisi = '正在加载...'
						} else {
							this.bottomtisi = '没有更多数据了'
						}
						if (res.data.data.baseinfo.length === 0) { //判断分类数据是否为空 否则提示暂无任务
							this.Tishi = "暂无任务";
							this.bottomtisi = ''
						} else {
							this.Tishi = "";
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请下拉刷新重试！'
						});
					},
					complete: () => {
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			// 获取待审核任务的id
			opensh(e) {
				uni.navigateTo({
					url: '../task/shenheTask?shid=' + e.currentTarget.dataset.shid
				});
			},
		}
	}
</script>

<style>
	/* 内容背景色 */
	.content {
		background: #f5f5f5;
	}

	/* 选项卡样式 */
	.uni-swiper-box {
		border-top: 2upx solid #F5F5F5;
	}

	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 26upx;
		border-radius: 10upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		height: 135upx;

	}

	.segmented-control.button {
		border: 2upx soli
	}

	.segmented-control.text {
		border: 0;
		border-radius: 0upx;
	}

	.segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 190upx;
		box-sizing: border-box;
		position: relative;
	}


	.segmented-control-item.text {
		border-left: 0;
	}

	.segmented-control-item:first-child {
		border-left-width: 0;
	}

	/* 分类列表样式 */
	/* 任务列表 */
	.uni-rw-cont:first-child {
		margin-top: 15upx;
	}

	.segmented-control-item:nth-child(1) {
		background: url(http://lx97.cn/static/linquicon.png) no-repeat center;
		background-size: 45upx 45upx;
		background-position-y: 25upx;
	}

	.segmented-control-item:nth-child(2) {
		background: url(http://lx97.cn/static/shenheicon.png) no-repeat center;
		background-size: 45upx 45upx;
		background-position-y: 25upx;
	}

	.segmented-control-item:nth-child(3) {
		background: url(http://lx97.cn/static/wcicon.png) no-repeat center;
		background-size: 45upx 45upx;
		background-position-y: 25upx;
	}

	.segmented-control-item:nth-child(4) {
		background: url(http://lx97.cn/static/sbicon.png) no-repeat center;
		background-size: 45upx 45upx;
		background-position-y: 25upx;
	}

	.uni-rw-cont {
		position: relative;
	}

	.uni-rw-cont:first-child {
		margin-top: 15upx;
	}

	.uni-rw-text .Text_Nowrap {
		padding-bottom: 5upx;
	}

	.uni-rw-time {
		text-align: center;
		padding-left: 5upx;
	}

	.uni-rw-time2 {
		padding-left: 0upx !important;
	}

	.uni-rw-time3 {
		color: #b6b6b6;
	}

	.uni-rw-time view {
		font-size: 26upx;
	}

	.uni-rw-time text {
		font-size: 26upx;
		color: #ff533c;
	}

	.uni-rw-text .Text_Nowrap {
		width: 380upx;
		display: inline-block;
		align-items: flex-end;
	}

	.uni-rw-text:after {
		content: "";
		width: 1upx;
		height: 70upx;
		position: absolute;
		top: 44upx;
		right: 168upx;
		background: #e6e6e6;
	}
</style>
