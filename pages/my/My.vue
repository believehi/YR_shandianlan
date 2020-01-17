<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="uni-user-content uni-user-item col" @click="opendata">
			<image :src="userfoArray.Headimgurl" mode="" class="uni-user-img"></image>
			<view class="uni-user-name">
				<text class="user-name">{{userfoArray.Nickname}}</text>
				<view class="user-name-fs">
					<text>{{Tagss}}</text>
					<!-- <text>粉丝10万+</text> -->
				</view>
			</view>
			<uni-icon class="iconfont icon-you"></uni-icon>
		</view>
		<!-- 用户账户任务信息 -->
		<view class="uni-user-item uni-rw-content">
			<!-- 已领取 -->
			<view class="uni-icon-item" @click="openyilingqu">
				<uni-icon class='uni-lqu-icon'></uni-icon>
				<view>
					<text>已领取</text>
				</view>
			</view>
			<!-- 待审核 -->
			<view class="uni-icon-item" @click="opendaishenhe">
				<uni-icon class='uni-sh-icon'></uni-icon>
				<view>
					<text>待审核</text>
				</view>
			</view>
			<!-- 已完成 -->
			<view class="uni-icon-item" @click="openyiwancheng">
				<uni-icon class='uni-ywc-icon'></uni-icon>
				<view>
					<text>已完成</text>
				</view>
			</view>
			<!-- 已失败 -->
			<view class="uni-icon-item" @click="openyishibai">
				<uni-icon class='uni-ysb-icon'></uni-icon>
				<view>
					<text>已失败</text>
				</view>
			</view>
		</view>
		<!-- 用户账户信息 -->
		<view class="uni-user-item uni-xx-content">
			<!-- 我的账户 -->
			<view class="uni-xx-item" @click="openaccount">
				<uni-icon class="iconfonts icon-tubiaozhizuo-"></uni-icon>
				<text>我的账户</text>
			</view>
			<!--达人认证 -->
			<view class="uni-xx-item" @click="opencollect">
				<uni-icon class="iconfonts icon-tubiaozhizuo-1"></uni-icon>
				<text>达人认证</text>
			</view>
			<!-- 擅长领域 -->
			<!-- <view class="uni-xx-item" @click="openlingyu">
				<uni-icon class="iconfonts icon-tubiaozhizuo-1"></uni-icon>
				<text>擅长领域</text>
			</view> -->
			<!-- 系统消息 -->
			<view class="uni-xx-item" @click="openmessages">
				<uni-icon class="iconfonts icon-tubiaozhizuo-2"></uni-icon>
				<text>系统消息</text>
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
				<button class="uni-kf-but" open-type='contact' session-from="weapp">联系客服</button>
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
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				userfoArray: '',
				Tagss:''
				
			};
		},
		onLoad() {
			this.userinfo()
			
		},
		onShow() {
			this.userinfo()
		},
		onPullDownRefresh: function() { //下拉刷新
			this.userinfo(true);
		},
		methods: {
			// 获取个人信息
			userinfo(isdown) {
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + '/usercenter/getuserinfo',
					method: 'GET',
					data: helper.postdata({
						id: userId,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.userfoArray = res.data.data.baseinfo;
							this.Tagss = this.userfoArray.Tags
							if(this.Tagss == '' || this.Tagss == null){
								this.Tagss  ="未绑定平台，请在擅长领域绑定"
							}
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			opendata() { // 打开个人资料
				uni.navigateTo({
					url: 'personaldata',
				});
			},
			openaccount() { //打开我的账户
				uni.navigateTo({
					url: 'myaccount',
				});
			},
			opencollect() { //打开我的收藏
				uni.navigateTo({
					url: '../index/radarMap',
				});
			},
			openmessages() { //打开系统消息
				uni.navigateTo({
					url: 'messages',
				});
			},
			// 打开擅长领域
			openlingyu() {
				uni.navigateTo({
					url: 'Domain',
				});
			},
			openhelp() { //打开帮助中心
				uni.navigateTo({
					url: 'help',
				});
			},
			openzhanghu() { //打开账户安全
				uni.navigateTo({
					url: 'zhanghuanquan',
				});
			},
			openyilingqu() { //打开已领取页面
				uni.navigateTo({
					url: 'yilingqu',
				});
			},
			opendaishenhe() { //打开待审核页面
				uni.navigateTo({
					url: 'daishenhe',
				});
			},
			openyishibai() { //打开已失败页面
				uni.navigateTo({
					url: 'yishibai',
				});
			},
			openyiwancheng() { //打开已完成页面
				uni.navigateTo({
					url: 'yiwancheng',
				});
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出登录！',
					success: function(res) {
						if (res.confirm) {
							helper.logout();
							uni.showToast({
								icon: 'none',
								title: '您已退出登录'
							})
						} 
					}
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
	.uni-kf-but{
		background: #FFFFFF;
		border: 1px solid #fff;
		font-size: 32upx;
		padding: 0 !important;
		margin: 0  0 0 25upx!important;
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
		font-size: 24upx;
		color: #f9aa00;
		border: 1px solid #f9aa00;
		padding: 0 20upx;
		height: 40upx;
		border-radius: 20upx;
		line-height: 40upx;
		display: inline-block;
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
</style>
