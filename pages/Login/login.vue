<template>
	<view>
		<!-- 登陆 -->
		<form class="uni-login-content">
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
					<view @click="MerchabtBut">商家登录</view>
				</view>
				<!-- 忘记密码 -->
				<view class="uni-form-items">
					<view @click="openpage">忘记密码？</view>
				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="uni-login-but">
				<button @tap="loginbtn">登录</button>
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
				<text>快捷登录</text>
				<view class="uni-wx-item"></view>
			</view>
		</view>
		<!-- 微信快捷登陆按钮 -->
		<button class="uni-wx-but" open-type="getUserInfo" @click="getuserinfo" lang="zh_CN" withCredentials="true" style="background: none;border: #fff 1upx solid !important;">
			<uni-icon class="uni-wx-icon"></uni-icon>
		</button>
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
				appid: 'wxf3faac5f46f05b2e',
				secret: '31dab934c364c3ce9f1a355ccd9cfe1f'
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
			MerchabtBut() { //打开商家登录页面
				uni.navigateTo({
					url: 'MerLogin'
				});
			},
			loginbtn() { //手机登录按钮
				if (this.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入登录手机号',
						duration: 1500,
					});
					return;
				}
				if (!helper.checkmobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 1500,
					});
					return;
				}
				if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12个字符的密码',
						duration: 1500,
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
						data: '{"mobile": "' + self.mobile + '","password": "' + self.password + '","type":"1"}'
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
							uni.reLaunch({
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
					title: '登录中，请稍候'
				});
				//获取微信会员信息
				uni.login({
					provider: 'weixin',
					success: function(res) {
						var objz = {};
						if (res.code || res.authResult.openid) {
							uni.getUserInfo({
								success: function(resuserinfo) {
									//APP登陆
									// #ifdef APP-PLUS
									//console.log(JSON.stringify(resuserinfo));
									uni.request({
										url: helper.websiteUrl + 'user/reg',
										data: {
											loginMark: helper.getloginMark(),
											token: '',
											data: '{"openid": "' + resuserinfo.userInfo.openId + '","unionid": "' + resuserinfo.userInfo.unionId +
												'","headimgurl":"' + resuserinfo.userInfo.avatarUrl +
												'","nikename":"' +
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
												uni.showToast({
													icon: 'none',
													title: data.data.info
												});
											}
										},
										fail: (res) => {
											uni.hideLoading();
											uni.showToast({
												icon: 'none',
												title: res.data.info,
											});
										}
									});
									// #endif
									//小程序登陆
									// #ifdef MP-WEIXIN
									//console.log(JSON.stringify(resuserinfo));
									uni.request({
										url: helper.websiteUrl + 'user/getopenidbycode',
										data: {
											loginMark: helper.getloginMark(),
											token: '',
											data: '{"code": "' + res.code + '"}'
										},
										method: 'GET',
										dataType: 'json',
										success: function(ress) {
											if (ress.data.code == 200) {
												var openid = ress.data.data.openinfo.openid;
												//console.log(openid);
												//注册和登录
												uni.request({
													url: helper.websiteUrl + 'user/reg',
													data: {
														loginMark: helper.getloginMark(),
														token: '',
														data: '{"openid": "' + openid + '","headimgurl":"' + resuserinfo.userInfo.avatarUrl +
															'","nikename":"' +
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
															console.log(userinfo)
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
																title: data.data.info,
																duration: 1500,
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
											} else {
												uni.hideLoading();
												uni.showToast({
													icon: 'none',
													title: '获取会员信息失败！'
												});
											}
										},
										fail: function() {
											uni.hideLoading();
											uni.showToast({
												icon: 'none',
												title: '获取信息出错！'
											});
										}

									});
									// #endif
								},
								fail: function() {
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: '获取用户信息失败！'
									});
								}
							});
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '获取用户登录状态失败！' + JSON.stringify(res)
							});
						}
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络错误，请稍后再试'
						});
					}
				});
			},
			openpage() {
				uni.navigateTo({
					url: '../my/resetpassword',
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
		color: #FFF;
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
