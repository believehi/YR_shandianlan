<template>
	<view>
		<!-- 手机号登陆 -->
		<form @submit="formSubmit" @reset="formReset" class="uni-login-content">
			<!-- 输入手机号 -->
			<view class="uni-form-item col">
				<uni-icon type="number" class='uni-zh-input'></uni-icon>
				<input type="text" class="uni-input" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<!-- 验证码 -->
			<view class="uni-form-item col">
				<uni-icon type="" class='uni-phone-input'></uni-icon>
				<input type="number" v-model="code" class="uni-phone" placeholder="请输入验证码" />
				<view class="message_code_gain" @click="openCodeDialog">获取验证码</view>
			</view>
			<!-- 登录按钮 -->
			<view class="uni-login-but">
				<button form-type="submit">登录</button>
			</view>
		</form>
		<!-- 登陆结束-->
		<!-- 注册与快捷登陆 -->
		<view class="uni-login-list">
			<view class="uni-kj">
				<text @tap="openlogin">手机密码登录</text>
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
			self = this
			return {
				mobile: '',
				code: '',
				codestr: '',
				codes:'',
				timeNum: 60,
				clikType: false,
				timeOut: 60,
			};
		},
		methods: {
			// 获取验证码
			openCodeDialog: function() {
				var that = this
				if (that.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入你的手机号码'
					});
					return;
				} else if (!helper.checkmobile(that.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				} else if (!that.clikType) {
					that.getTime();
					that.codestr = helper.MathRand(4);
					that.clikType = true;
					uni.request({
						url:helper.websiteUrl+'send/sendcode',
						method: 'GET',
						data: {
							loginMark: helper.getloginMark(),
							token: '',
							data: '{"phone": "' + self.mobile + '"}'
						},
						success: res => {
							if (res.data.code == 200) {
								
								this.codes = res.data.info;

							} else {
								uni.showToast({
									icon: 'none',
									title: '获取验证码失败,请重试'
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
				}
			},
			// 验证码倒计时
			getTime() {
				var that = this
				var timer = setInterval(function() {
					that.timeNum--;
					if (that.timeNum <= 0) {
						that.tipsCode = "重新获取验证码";
						that.timeNum = that.timeOut;
						that.clikType = false;
						clearInterval(timer);
					} else {
						that.tipsCode = "重新发送" + that.timeNum + "秒";
					}
				}, 1000)
			},
			formSubmit: function(e) {
				if (this.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入你的手机号码'
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
				if (this.code == "" || this.code != this.codes || this.codes !=
					this.code) {
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
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
						data: '{"mobile": "' + self.mobile + '","type":"1"}'
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
					title: '登录中，请稍候'
				});
				//获取微信会员信息
				uni.login({
					provider: 'weixin',
					success: function(res) {
						var objz = {};
						if (res.code||res.authResult.openid) {
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
											data: '{"openid": "' + resuserinfo.userInfo.openId + '","unionid": "' + resuserinfo.userInfo.unionId + '","headimgurl":"' + resuserinfo.userInfo.avatarUrl +
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
										fail: () => {
											uni.hideLoading();
											uni.showToast({
												icon: 'none',
												title: '网络异常,请稍后重试'
											});
										}
									});
									// #endif
									//小程序登陆
									// #ifdef MP-WEIXIN
									//console.log(JSON.stringify(resuserinfo));
									uni.request({
										url: helper.websiteUrl + '/user/getopenidbycode',
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
								title: '获取用户登录状态失败！'+JSON.stringify(res)
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
			openregister() { //打开注册页面
				uni.navigateTo({
					url: 'register',
				});
			},
			openlogin() { //打开登录页面 
				uni.navigateTo({
					url: 'login',
				});
			}
		}
	}
</script>
<style>
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

	.uni-form-item {
		position: relative;
	}

	.uni-form-item view {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0 20upx;
		height: 60upx;
		background-color: #2FB6A7;
		border-radius: 30upx;
		font-size: 30upx;
		border: solid 1upx #dbdbdc;
		color: #fff;
		text-align: center;
		line-height: 60upx;
		z-index: 999;
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
