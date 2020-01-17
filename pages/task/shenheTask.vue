<template>
	<view class="content">
		<view class="uni-rw-time">
			<view class="uni-rw-title">
				<text>{{rwArray.TaskName}}</text>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务说明：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.explain}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务要求：</view>
				<view class="uni-rw-yq">
					<text>{{rwArray.Requirement}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家名称：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Merchant}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">商家位置：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Position}}</text>
				</view>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家照片：</view>
				<view class="uni-rw-m">
					<image :src="rwArray.Pictures" mode=""></image>
					<image :src="rwArray.Pictures" mode=""></image>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">操作步骤</view>
			</view>
			<view class="uni-cz-bz" v-for="(item,index) in rwbzArray" :key="index">
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				shows: 0,
				rwArray: {},
				rwbzArray: {},
			}
		},
		onLoad(e) {         //e接收任务的id
			this.shrwlist(e)
		},
		methods: {
			// 领取任务列表
			shrwlist(e) {
				helper.islogin(true);
				uni.showLoading({
					title: "加载中....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + 'task/getmytask',
					method: "GET",
					data: helper.postdata({
						id: e.shid,
					}),
					success: (res) => {
						if (res.data.code == 200) {
							this.rwArray = res.data.data.baseinfo;
							this.rwbzArray = res.data.data.baseinfo.Instruction.split(";");
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					}
				})
			},
	
		}
	}
</script>

<style>
	view {
		line-height: 35upx;
	}

	.content {
		padding-top: 15upx;
		padding-bottom: 107upx;
	}

	.uni-rw-time {
		background-color: #FFFFFF;
		padding: 0 25upx;
		width: 700upx;
		margin-top: 15upx;
	}

	.uni-rw-time .uni-rw-title {
		text-align: center;
		font-size: 32upx;
		color: #0b0b0b;
		padding: 20upx 0;
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-ms {
		display: flex;
		font-size: 30upx;
		padding: 25upx 0;
	}
	.uni-rw-ms .uni-rw-sm {
		width: 154upx;
		color: #212121;
	}

	.uni-rw-ms .uni-rw-m {
		flex-grow: 2;
		width: 565upx;
		text-align: justify;
		color: #616161;
	}

	.uni-rw-yq {
		color: #f3571a;
	}

	.uni-rw-yq text:first-child {
		margin-right: 40upx;
	}

	.uni-sj-wz {
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-m image {
		width: 267upx;
		height: 178upx;
		margin-top: 10upx;
	}

	.uni-rw-m image:first-child {
		margin-right: 15upx;
	}

	.uni-cz-bz text:first-child {
		margin-top: 25upx;
	}

	.uni-cz-bz text {
		font-size: 30upx;
		color: #616161;
		display: inline-block;
		margin-bottom: 25upx;
	}

	.uni-time-list {
		display: flex;
		justify-content: space-between;
	}

	.uni-time-item {
		font-size: 30upx;
		color: #212121;
		width: 105upx;
		text-align: center;
	}

	.uni-time-item text {
		display: inline-block;
		width: 100%;
		margin-bottom: 15upx;
	}

	.uni-time-item text:first-child {
		margin-top: 15upx;
	}

	.active {
		border-bottom: 2upx solid #fbb42b;
		color: #fbb42b;
	}

	.uni-but-item {
		position: fixed;
		bottom: 0;
		display: flex;
	}

	.uni-but-item view {
		width: 375upx;
		text-align: center;
		line-height: 107upx;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.uni-but-item .uni-sc-but {
		background-color: #d1d1d1;
	}

	.uni-but-item .uni-lqs-but {
		background-color: #fbb42b;
	}
</style>
