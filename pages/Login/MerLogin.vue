<template>
	<view>
		<!-- 登陆 -->
		<form @submit="formSubmit" @reset="formReset" class="uni-login-content">
			<!-- 用户账号 -->
			<view class="uni-form-item col">
				<uni-icon type="" class='uni-zh-input'></uni-icon>
				<input type="number" class="uni-input" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<!-- 用户密码 -->
			<view class="uni-form-item col">
				<uni-icon type="" class='uni-pw-input'></uni-icon>
				<input type="password" v-model="password" class="uni-input" placeholder="请输入密码" />
			</view>
			<view class="uni-form-box">
				<!-- 商家登录 -->
				<view class="">
					<view @click="MerchabtBut">会员登录</view>
				</view>
				<!-- 忘记密码 -->
				<view class="uni-form-items">
					<view @click="openpage">忘记密码？</view>
				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="uni-login-but">
				<button @tap="loginbtn">商家版登录</button>
			</view>
		</form>
		<!-- 登陆结束-->
		<!-- 注册与快捷登陆 -->
		<view class="uni-login-list">
			<view class="uni-kj">
				<text @tap="openphonelogin">短信快捷登录</text>
				<text @tap="openregister">新商户注册</text>
			</view>
		</view>
	</view>
</template>
<script>
	import helper from '../../common/helper.js';
	var _self;
	export default {
		data() {
			lists: [],
			self = this
			return {
				mobile: 15115828895,
				password: 123456,
				openids: '',
				openid: ''
			};
		},
		onLoad: function() {
			// _self = this;
			// if (helper.islogin_Mer()) {
			// 	uni.switchTab({
			// 		url: '../Merchant/MerIndex'
			// 	})
			// }
		},
		methods: {
			openregister() { //打开注册页面
				uni.navigateTo({
					url: 'MerRegister',
				});
			},
			openphonelogin() { //打开手机短信短信登录页面 
				uni.navigateTo({
					url: 'MerPhoneLogin',
				});
			},
			MerchabtBut() {           //打开会员登录页面
				uni.navigateTo({
					url: 'login'
				});
			},
			loginbtn() { //手机登录按钮
				if (this.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入登录手机号',
						duration: 2000,
					});
					return;
				}
				if (!helper.checkmobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 2000,
					});
					return;
				}
				if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12个字符的密码',
						duration: 2000,
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '登录中，请稍候'
				});
				uni.request({
					url: helper.websiteUrl + 'remerchant/LoginByPhone',
					data:{
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"phone": "' + self.mobile + '","password": "' + self.password + '","type":"2"}'
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.data.code == 200) {
							var userinfo = res.data.data.baseinfo;
							uni.setStorageSync("token", userinfo.token);
							helper.setstate(userinfo.userId,self.password, userinfo.mobile, userinfo.nickName, 2);
							uni.showToast({
								title: '登录成功'
							});
							uni.reLaunch({
								url: '../Merchant/MerIndex'
							});
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.data.info
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
					}
				});
			},

			openpage() {
				uni.navigateTo({
					url: '../Merchant/MerResetpass',
				});
			}
		}
	}
</script>
<style>
	.uni-form-box {
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		color: #2FB6A7;
	}

	.uni-form-items {
		text-align: right;
		font-size: 30upx;
	}

	.uni-login-content {
		display: flex;
		justify-content: center;
		margin-top: 140upx;
	}

	.uni-login-content .uni-form-item {
		align-items: center;
		border-bottom: 1upx solid #bfbfbf;
		padding: 15upx 0;
		margin-bottom: 50upx;
	}

	.uni-login-content .uni-form-item input {
		width: 540upx;
		font-size: 32upx;
		margin-left: 39upx;
	}

	.uni-login-but {
		padding: 55upx 0 50upx 0;
	}

	.uni-login-but button {
		width: 610upx;
		border-radius: 38upx;
		background-color: #2FB6A7;
		color: #fff;
		font-size: 34upx;
		letter-spacing: 2upx;
	}

	.uni-login-list,
	.uni-wx-tit,
	.uni-wx-but {
		display: flex;
		justify-content: center;
		border: none !important;
	}

	.uni-kj {
		width: 580upx;
		display: flex;
		justify-content: space-between;
		color: #3c3c3c;
		font-size: 30upx;
	}

	.uni-wx-tit {
		align-items: center;
		padding-top: 140upx;
		margin-bottom: 20upx;
	}

	.uni-wx-tit .uni-wx-item {
		border-bottom: 1upx solid #c0c0c0;
		width: 210upx;
	}

	.uni-wx-tit text {
		color: #c0c0c0;
		font-size: 30upx;
		padding: 0 40upx;
	}

	.uni-wx-but {
		display: flex;
		justify-content: center;
		margin: 20upx auto 0 auto 0;
	}

	.uni-wx-but {
		padding: 0upx 0;
		width: 81upx;
		height: 81upx;
		border-radius: 50%;
	}

	.button-hover {
		background-color: rgba(0, 0, 0, 0.1);
		opacity: 0.7;
	}

	.uni-wx-icon {
		margin: 0upx auto;
	}
</style>
