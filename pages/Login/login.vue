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
						<!-- 用户密码 -->
			<view class="uni-form-items">
				<view @click="openpage">忘记密码？</view>
			</view>
			<!-- 登录按钮 -->
			<view class="uni-login-but">
				<button formType="submit" @tap="loginbtn">登录</button>
			</view>
		</form>
		<!-- 登陆结束-->
		<!-- 注册与快捷登陆 -->
		<view class="uni-login-list">
			<view class="uni-kj">
				<text @tap="openphonelogin">短信快捷登录</text>
				<text @tap="openregister">新用户注册</text>
			</view>
		</view>
		<!-- 微信快捷登陆 -->
		<view class="uni-wx-login">
			<view class="uni-wx-tit">
				<view class="uni-wx-item"></view>
				<text>快捷登陆</text>
				<view class="uni-wx-item"></view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<!-- 微信快捷登陆按钮 -->
		<view class="uni-wx-but" @click="appLogin">
			<uni-icon class="uni-wx-icon"></uni-icon>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- 微信快捷登陆按钮 -->
		<button class="uni-wx-but" open-type="getUserInfo" @click="getuserinfo" withCredentials="true" style="background: none;border: #fff 1upx solid !important;">
			<uni-icon class="uni-wx-icon"></uni-icon>
		</button>
		<!-- #endif -->
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
				mobile: '',
				password: '',
				openids: '',
				openid: '',
				appid:'wxf3faac5f46f05b2e',
				secret:'31dab934c364c3ce9f1a355ccd9cfe1f'
			};
		},
		onLoad: function() {
			_self = this;
			if (helper.islogin()) {
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		methods: {
			openregister() { //打开注册页面
				uni.navigateTo({
					url: 'register',
				});
			},
			openphonelogin() { //打开手机短信短信登录页面 
				uni.navigateTo({
					url: 'phonelogin',
				});
			},
			loginbtn() { //手机登录按钮
				if (this.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入登录手机号'
					});
					return;
				}
				if (!helper.checkmobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				}
				if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12个字符的密码'
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '登录中，请稍候'
				});
				uni.request({
					url: helper.websiteUrl + '/user/loginbymobile',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"mobile": "' + self.mobile + '","password": "' + self.password + '","type":"2"}'
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							//console.log(JSON.stringify(res))
							var userinfo = res.data.data.baseinfo;
							uni.setStorageSync("token", userinfo.token);
							helper.setstate(userinfo.userId, userinfo.mobile, userinfo.nickName);
							uni.showToast({
								title: '登录成功'
							});
							uni.switchTab({
								url: '../index/index'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
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
			getuserinfo() { // 微信快捷登录
				uni.showLoading({
					mask: true,
					title: '登陆中，请稍候'
				});
				//获取登录code
				uni.login({
					provider: 'weixin',
					success: function(res) {						
						uni.hideLoading();
						var objz = {};
						if (res.code) {
							uni.showLoading({
								mask: true,
								title: '登录中，请稍候'
							});
							//获取微信会员信息
							uni.getUserInfo({
								success: function(resuserinfo) {
									//获取openid
									uni.request({
										url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + self.appid + '&secret=' + self.secret +
											'&js_code=' +
											res.code + '&grant_type=authorization_code',
										data: {},
										method: 'GET',
										dataType: 'json',
										success: function(ress) {
											//console.log(JSON.stringify(ress));
											var openid = ress.data.openid;
											//注册和登录
											uni.request({
												url: helper.websiteUrl + 'user/reg',
												data: {
													loginMark: helper.getloginMark(),
													token: '',
													data: '{"openid": "' + openid + '","headimgurl":"' + resuserinfo.userInfo.avatarUrl + '","nikename":"' +
														resuserinfo.userInfo.nickName +
														'","province":"' + resuserinfo.userInfo.province + '","country":"' + resuserinfo.userInfo.country +
														'","city":"' + resuserinfo.userInfo.city +
														'","sex":"' + resuserinfo.userInfo.gender + '"}'
												},
												method: 'GET',
												dataType: 'json',
												success: (data) => {
													uni.hideLoading();
													
													if (data.data.code == 200) {
														var userinfo = data.data.data.baseinfo;
														uni.setStorageSync("token", userinfo.token);
														helper.setstate(userinfo.userId, userinfo.mobile, userinfo.nickName);
														uni.showToast({
															title: '登录成功'
														});
														uni.switchTab({
															url: '../index/index'
														});
													} else {
														console.log(data.data.info)
														uni.showToast({
															icon:'none',
															title: data.data.info
														});
													}
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

									});
								},
								fail: function() {
									uni.hideLoading();
								}
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取用户登录态失败！' + res.errMsg
							});
						}
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络错误，请稍后再试'
						})
					}
				});
			},
			openpage(){
				uni.navigateTo({
					url: '../my/resetpassword',
				});
			}
		}
	}
</script>
<style>
	.uni-form-items{
		text-align: right;
		font-size: 30upx;
		color: #ffca2f;
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
		background-color: #ffca2f;
		color: #050505;
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
		padding-top: 340upx;
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
	.uni-wx-but{display: flex;justify-content: center;margin: 20upx auto 0 auto 0;}
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
	.uni-wx-icon{
		margin: 0upx auto;
	}
</style>
