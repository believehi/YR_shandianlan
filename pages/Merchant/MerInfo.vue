<template>
	<page class='content'>
		<!-- 用户信息 -->
		<view class="uni-user-content uni-user-item col" @click="opendata">
			<image :src="userfoArray.Headimgurl" mode="" class="uni-user-img"></image>
			<view class="uni-user-name">
				<text class="user-name">{{userfoArray.MerchantName}}</text>
				<view class="user-name-fs">
					<text>余额<text class="uni-size-color">{{userfoArray.Mcoin}}喵币</text></text>
					<!-- <text>粉丝10万+</text> -->
				</view>
			</view>
			<uni-icon class="iconfont icon-you"></uni-icon>
		</view>
		<!-- 用户账户信息 -->
		<view class="uni-user-item uni-xx-content">
			<!-- 我的账户 -->
			<view class="uni-xx-item" @click="openaccount">
				<uni-icon class="iconfonts icon-tubiaozhizuo-"></uni-icon>
				<text>充值记录</text>
			</view>
			<!-- 系统信息 -->
			<view class="uni-xx-item" @click="openmessages">
				<uni-icon class="iconfonts icon-tubiaozhizuo-2"></uni-icon>
				<text>系统信息</text>
			</view>
		</view>
		<!-- 帮助中心 -->
		<view class="uni-user-item uni-bz-content">
			<!-- 帮助中心 -->
			<view class="uni-xx-item" @click="openhelp">
				<uni-icon class="iconfonts icon-tubiaozhizuo-3"></uni-icon>
				<text>帮助中心</text>
			</view>
			<!-- 联系客服 -->
			<view class="uni-xx-item">
				<uni-icon class="iconfonts icon-tubiaozhizuo-4"></uni-icon>
				<button class="uni-kf-but" open-type='contact'>联系客服</button>
			</view>
			<!-- 账户安全 -->
			<view class="uni-xx-item" @click="openzhanghu">
				<uni-icon class="iconfonts icon-tubiaozhizuo-5"></uni-icon>
				<text>账户安全</text>
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="uni-user-item uni-tc-but" @click="logout">
			<view class="uni-xx-item">
				<uni-icon class="iconfonts icon-tubiaozhizuo-6"></uni-icon>
				<text>退出登录</text>
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="nui-nav-bot">
			<view class="nui-nav-item" @click="openindex">
				<image src="../../static/Home.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="nui-nav-item" @click="opentask">
				<image src="../../static/tesk.png" mode=""></image>
				<text>任务</text>
			</view>
			<view class="nui-nav-item">
				<image src="../../static/mys.png" mode=""></image>
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
				userfoArray: '',
			};
		},
		onLoad() {
			 this.userinfo()
		},
		onShow() {
			// this.userinfo()
		},
		onPullDownRefresh: function() { //下拉刷新
			this.userinfo(true);
		},
		methods: {
			// 获取个人信息
			userinfo(isdown) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				});
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + 'yiru/sdl/merchantcenter/getmerchantinfo',
					method: 'GET',
					data: helper.postdata({
						mid : helper.getstate().userid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.userfoArray = res.data.data.baseinfo;
						}else{
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {
						uni.hideLoading();
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			opendata() { // 打开个人资料
				uni.navigateTo({
					url: 'MerInfoData',
				});
			},
			openaccount() { //打开我的账户
				uni.navigateTo({
					url: 'MerPayRank',
				});
			},
			openmessages() { //打开系统消息
				uni.navigateTo({
					url: '../my/messages',
				});
			},
			openhelp() { //打开帮助中心
				uni.navigateTo({
					url: '../my/help',
				});
			},
			openzhanghu() { //打开账户安全
				uni.navigateTo({
					url: 'MerSafety',
				});
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出登录！',
					success: function(res) {
						if (res.confirm) {
							helper.logout_Mer();
							uni.showToast({
								icon: 'none',
								title: '您已退出登录'
							})
						}
					}
				});
			},
			// 打开商家任务
			opentask() {
				uni.redirectTo({
					url: 'MerTask'
				});
			},
			// 打开首页
			openindex() {
				uni.redirectTo({
					url: 'MerIndex'
				});
			}

		}
	}
</script>

<style>
	.content {
		padding-top: 15upx;
		height: 1100upx;
	}

	button::after {
		border: none;
	}

	.uni-kf-but {
		background: #FFFFFF;
		border: 1px solid #fff;
		font-size: 32upx;
		padding: 0 !important;
		margin: 0 0 0 25upx !important;
		line-height: 32upx !important;
		overflow: initial;
	}

	.uni-user-item {
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0upx auto 15upx auto;
	}

	.uni-user-content {
		width: 663upx;
		height: 179upx;
		padding: 0 20upx 0 15upx;
		display: flex;
		align-items: center;
		margin-top: 15upx;
	}

	.uni-user-content .uni-user-img {
		width: 133upx;
		height: 133upx;
		background-color: #f5f5f5;
		border-radius: 50%;
	}

	.uni-user-name {
		margin-left: 29upx;
		flex-grow: 2;
	}

	.uni-user-name .user-name {
		font-size: 32upx;
		color: #1A1A1A;
	}

	.uni-user-name .user-name-fs text {
		font-size: 28upx;
		color: #1a1a1a;
		height: 40upx;
		line-height: 40upx;
	}

	.uni-user-name .user-name-fs text:first-child {
		margin-right: 25upx;
	}

	.uni-user-content .icon-you {
		text-align: right;
	}

	.uni-rw-content {
		width: 630upx;
		height: 121upx;
		display: flex;
		justify-content: space-between;
		padding: 0 35upx;
		display: flex;
		align-items: center;
	}

	.uni-rw-content text {
		font-size: 26upx;
		color: #1A1A1A;
	}

	.uni-icon-item {
		width: 80upx;
		text-align: center;
		align-items: center;
	}

	.uni-icon-item view {
		line-height: 17upx;
	}

	.uni-xx-content {
		width: 700upx;
	}

	.uni-xx-item {
		width: 625upx;
		border-bottom: 1upx solid #e6e6e6;
		display: flex;
		align-items: center;
		font-size: 32upx;
		padding: 25upx 20upx;
		margin: 0 20upx;
	}

	.uni-xx-item text {
		margin-left: 25upx;
	}

	.uni-xx-item:last-child {
		border-bottom: none;
	}

	.uni-bz-content {
		width: 700upx;
	}

	.uni-tc-but {
		width: 700upx;
		height: 90upx;
	}
	.uni-size-color{
		color: #fb8d44 !important;
		margin-left: 5upx;
	}
	/* 底部导航 */
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
