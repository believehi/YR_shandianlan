<template>
	<page>
		<view class="uni-top-nav uni-nav-bak">
			<!-- 商家头像 -->
			<view class="uni-user-info">
				<image :src="userinfo.Headimgurl" mode=""></image>
				<text>{{userinfo.MerchantName}}</text>
			</view>
			<!-- 闪电币 -->
			<text class="uni-tyb">{{userinfo.Suncoin}}喵币</text>
			<!-- 充值 -->
			<button class="uni-cz-but" @click="opencher">充值</button>
		</view>
		<!-- 发布核销活动 -->
		<view class="uni-but-list">
			<!-- 发布活动 -->
			<view class="uni-fb-but" @click="openNew">
				<view class="uni-but-item">
					<uni-icon class='uni-jias-icon'></uni-icon>
				</view>
				<text>发布活动</text>
			</view>
			<!-- 核銷活动-->
			<view class="uni-fb-but" @click="nucleus">
				<view class="uni-but-item">
					<uni-icon class='uni-sao-icon'></uni-icon>
				</view>
				<text>核销活动</text>
			</view>
		</view>
		<!-- 活动状态列表 -->
		<view class="uni-rw-list">
			<view class="uni-rw-item" @click="opendlq">
				<text>待领取活动</text>
				<view class="message" v-if="userinfo.NotReceived!=0">{{userinfo.NotReceived}}</view>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-rw-item" @click="openylq">
				<text>已领取活动</text>
				<view class="message" v-if="userinfo.Received!=0">{{userinfo.Received}}</view>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>

			<view class="uni-rw-item" @click="openywc">
				<text>已完成活动</text>
				<view class="message" v-if="userinfo.DoneNum!=0">{{userinfo.DoneNum}}</view>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="nui-nav-bot">
			<view class="nui-nav-item">
				<image src="../../static/Homes.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="nui-nav-item" @click="opentask">
				<image src="../../static/tesk.png" mode=""></image>
				<text>活动</text>
			</view>
			<view class="nui-nav-item" @click="openInfo">
				<image src="../../static/my.png" mode=""></image>
				<text>我的</text>
			</view>
		</view>
	</page>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				userinfo: '' //商家信息
			}
		},
		onLoad() {
		   this.MerInfo()
		},
		onShow() {

		},
		onPullDownRefresh: function() { //下拉刷新
			this.MerInfo(true);
		},
		methods: {
			// 获取商家信息
			MerInfo(isdown) {
				helper.islogin_Mer(true);
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + 'mindex/getindex',
					method: 'GET',
					data: helper.postdata({
						merchantid: userId,
					}),
					success: (res) => {
						if (res.data.code == 200) {
							this.userinfo = res.data.data.baseinfo;
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						uni.hideLoading();
					},
					fail() {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常，请下拉刷新'
						});
					},
					complete: () => {
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			// 打开充值中心
			opencher() {
				uni.navigateTo({
					url: 'voucher'
				});
			},
			// 打开发布活动
			openNew() {
				uni.navigateTo({
					url: '../TaskList/TaskList'
				});
			},
			// 核销活动
			nucleus() {
				uni.scanCode({
					success: function(res) {
						var canid = res.result //扫描出的会员领取活动id
						// uni.request({ // 请求核销接口
						// 	url: helper.websiteUrl + 'mtask/writeoffs',
						// 	method: 'GET',
						// 	data: helper.postdata({
						// 		Mytaskid: canid,
						// 		mid: helper.getstate().userid
						// 	}),
						// 	success: (res) => {
						// 		if (res.data.code == 200) {
						// 			uni.showModal({
						// 				title: '提示',
						// 				content: res.data.info,
						// 			});
						// 		} else {
						// 			helper.goout(res.data.info);
						// 			uni.showModal({
						// 				title: '提示',
						// 				content: res.data.info,
						// 			});
						// 		}
						// 		uni.hideLoading();
						// 	},
						// 	fail() {
						// 		uni.hideLoading();
						// 	},
						// });
					},
					fail: function(res) {
						uni.showToast({
							icon: 'none',
							title: '网络异常，请重新扫描'
						});
					}
				})
			},
			//核销
			cancel() {

			},
			// 打开商家活动
			opentask() {
				uni.redirectTo({
					url: 'MerTask'
				});
			},
			// 打开商家信息
			openInfo() {
				uni.redirectTo({
					url: 'MerInfo'
				});
			},
			// 打开已领取的活动
			openylq() {
				uni.navigateTo({
					url: 'YetUnclaimed'
				});
			},
			// 打开待领取的活动
			opendlq() {
				uni.navigateTo({
					url: 'Unclaimed'
				});

			},
			// 打开已完成的活动
			openywc() {
				uni.navigateTo({
					url: 'Completed'
				});

			}
		}
	}
</script>


<style>
	.uni-top-nav {
		height: 315upx;
		width: 100%;
	}

	.uni-user-info {
		display: flex;
		align-items: center;
		padding: 30upx 50upx 0 50upx;
	}

	.uni-user-info image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.uni-user-info text {
		color: #000000;
		font-size: 29upx;
		letter-spacing: 1upx;
		margin-left: 15upx;
	}

	button {
		padding: 0;
	}

	.uni-tyb {
		text-align: center;
		font-size: 50upx;
		color: #FFFFFF;
		width: 100%;
		display: inline-block;
		font-weight: bold;
		margin: 15upx 0;
	}

	.uni-cz-but {
		width: 115upx;
		height: 52upx;
		background-color: #2FB6A7;
		border-radius: 26upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 48upx;
		margin-top: 30upx;
	}

	.uni-but-list {
		display: flex;
		justify-content: center;
		margin-top: 80upx;
	}

	.uni-but-item {
		width: 160upx;
		height: 160upx;
		background-color: #2FB6A7;
		border-radius: 50%;
		text-align: center;
	}

	.uni-but-item uni-icon {
		text-align: center;
		margin-top: 57upx;
	}

	.uni-fb-but {
		font-size: 30upx;
		color: #010101;
		text-align: center;
	}

	.uni-fb-but text {
		line-height: 80upx;
	}

	.uni-fb-but:first-child {
		margin-right: 150upx;
	}

	.uni-rw-list {
		padding: 0 25upx;
	}

	.uni-rw-list {
		margin-top: 80upx;
	}

	.uni-rw-item {
		width: 640upx;
		height: 100upx;
		background-color: #ffffff;
		box-shadow: 0px 0px 25upx 0upx rgba(0, 0, 0, 0.06);
		border-radius: 20upx;
		margin-bottom: 35upx;
		font-size: 32upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 25upx 0 35upx;
		color: #000000;
	}
	.message{
		width: 45upx;
		height: 45upx;
		margin-left:  395upx;
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 46upx;
		text-align: center;
		background-color: #2FB6A7;
		border-radius: 50%;
	}

	.nui-nav-bot {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background-color: #ffffff;
		box-shadow: 11upx 17upx 38upx 0upx rgba(0, 0, 0, 0.66);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nui-nav-item {
		width: 45upx;
		font-size: 20upx;
		text-align: center;
	}

	.nui-nav-item image {
		width: 45upx;
		height: 40upx;
	}

	.nui-nav-item:nth-child(1) {
		margin-left: 50upx;
	}

	.nui-nav-item:nth-child(3) {
		margin-right: 50upx;
	}

	.nui-nav-item:nth-child(2) image {
		width: 40upx;
		height: 40upx;
	}
</style>
