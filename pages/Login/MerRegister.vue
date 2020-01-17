<template>
	<view class="uni-reg-content">
		<form class="uni-reg-list" @submit="formSubmit">
			<!--企业名-->
			<view class="uni-form-item">
				<input type="text" name="merchantname" v-model="merchantname" placeholder="请输入店铺名" />
			</view>
			<!--法人代表-->
			<view class="uni-form-item">
				<input type="text" name="artiperson" v-model="artiperson" placeholder="请输入法人代表" />
			</view>
			<!-- 上传营业执照 -->
			<view class="uni-form-item uni-form-zz">
				<text>请上传营业执照</text>
				<image :src="imgs"></image>
				<input type="text" name='businesslicense' :value="img" style="display: none;" />
				<view class="message_code_gain" @click="getImage">
					点击上传
				</view>
			</view>
			<!-- 手机号 -->
			<view class="uni-form-item">
				<input type="number" name="mobile" v-model="mobile" placeholder="请输入手机号" />
			</view>

			<!-- 验证码 -->
			<view class="uni-form-item">
				<input type="number" name="yzm"  v-model="code" placeholder="请输入验证码" />
				<view class="message_code_gain" @click="openCodeDialog">
					{{tipsCode}}
				</view>
			</view>
			<!-- 请输入密码 -->
			<view class="uni-form-item">
				<input password name="password" v-model="password" type="text" placeholder="请输入密码" />
			</view>
			<!-- 确认密码 -->
			<view class="uni-form-item">
				<input password v-model="conpassword" type="text" placeholder="确认密码" />
			</view>
			<!-- 注册按钮 -->
			<view class="uni-zc-but">
				<button type="primary" form-type="submit">商家注册</button>
				<!-- 跳转到登录页面 -->
				<view class="uni-login-but" @tap="openlogin">
					<text>已有账号？立即登录</text>
				</view>
			</view>
		</form>
	</view>
</template>
<script>
	import helper from '../../common/helper.js';
	var _self;
	export default {
		data() {
			self = this;
			return {
				merchantname: '', //企业名
				artiperson: '', //法人代表
				mobile: '', //手机号
				password: '', //密码
				businesslicense: '', //营业执照
				conpassword: '', //确认密码
				nikename: '', //昵称
				code: "", //输入的验证码
				codes:'',
				codestr: '', //获取的随机数
				tipsCode: "获取验证码",
				timeNum: 60,
				clikType: false,
				timeOut: 60,
				img: '',
				imgs: '',    //识别后的营业执照地址
				MerName:'' ,// 识别出的企业名
				MerPer:'' // 识别出的企业名
			};

		},
		onLoad() {
			_self = this;
		},
		methods: {
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key]);
				});
			},
			// 营业执照识别
			getImage: function() {
				var _this = this;
				uni.chooseImage({
					success: function(res) {
						_this.imgs = res.tempFilePaths[0];
						uni.showLoading({
							title: '识别中'
						});
						uni.uploadFile({
							url: helper.websiteUrl + 'annexes/businesslicense',
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: {
								loginMark: helper.getloginMark(),
								token: '',
								data: '{}'
							},
							success: function(resup) {
								var resdata = JSON.parse(resup.data);
								if (resdata.code == 200) {
									var url = 'https://cszx.yiruit.net';
									var imgurl = url + resdata.data.path;
									_this.img = imgurl;
									_this.MerName = resdata.data.name;    // 商家名称
									_this.MerPer = resdata.data.person;    // 法人名称
									uni.showToast({
										icon: 'none',
										title: '识别成功！'
									});
								} else {
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: resdata.info
									});
								}
								uni.hideLoading();
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '识别失败'
								});
							}
						});
						_this.setData({
							img: res.tempFilePaths[0],
						});
					},
				})
			},
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
				var Plans = e.detail.value.plans;
				if (this.merchantname == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入企业名'
					});
					return;
				}
				if (this.artiperson == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入法人代表'
					});
					return;
				}
// 				if (this.artiperson != this.MerPer) {
// 					uni.showToast({
// 						icon: 'none',
// 						title: '请填写与营业执照上相同的法人'
// 					});
// 					return;
// 				}
			
				if (this.imgs == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传营业执照'
					});
					return;
				}
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
				if (this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12个字符的密码'
					});
					return;
				}
				if (this.password != this.conpassword) {
					uni.showToast({
						icon: 'none',
						title: '密码确认错误'
					});
					return;
				}
				if (this.account == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入平台账号'
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '注册中，请稍候'
				});
				uni.request({
					url: helper.websiteUrl + 'remerchant/registration',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"phone": "' + self.mobile + '","artiperson": "' + self.artiperson + '","password": "' + self.password +
							'","merchantname":"' + self.merchantname +
							'","businesslicense":"' + self.img + '"}'
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '注册成功，请登录',
								duration: 2500,
							});
							uni.removeStorageSync('sdlstate1');
							setTimeout(function() {
								uni.redirectTo({
									url: 'MerLogin'
								});
							}, 2800)
						} else {
							//console.log(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info,
								duration: 2000,
							});
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试',
							duration: 2000,
						});
					}
				})
			},
			openlogin() { //打开登录页面 
				uni.navigateTo({
					url: 'MerLogin'
				});
			},

		},
	}
</script>

<style>
	.button-item {
		text-align: center !important;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.uni-domain-list input {
		width: 400upx !important;
	}

	.uni-form-item image {
		width: 215upx;
		height: 115upx;
		margin-left: 20upx;
	}

	.uni-form-items input {
		width: 150upx !important;
		text-align: center;
		border: 1px solid #9a9a9a;
		border-radius: 30upx;
		font-size: 25upx;
		height: 50upx !important;
	}

	.uni-pt {
		color: #8f8f94 !important;
	}

	.uni-pts {
		color: #000000 !important;
	}

	.uni-reg-content {
		display: flex;
		justify-content: center;
	}

	.uni-reg-list {
		padding-top: 80upx;
	}

	.uni-reg-list .uni-form-item {
		margin-bottom: 45upx;
		position: relative;
	}

	.uni-reg-list .message_code_gain {
		position: absolute;
		bottom: 20upx;
		right: 0;
		height: 60upx;
		background-color: #2FB6A7;
		border-radius: 30upx;
		font-size: 28upx;
		border: solid 1upx #2FB6A7;
		color: #fff;
		text-align: center;
		line-height: 60upx;
		z-index: 999;
		padding: 0 20upx;
	}

	.uni-form-zz,
	.uni-reg-list .uni-form-item input {
		width: 610upx;
		border-bottom: 1upx solid #9a9a9a;
		padding-bottom: 5upx;
		font-size: 30upx;
	}

	.uni-form-zz text {
		color: #8a8a8a;
	}

	.uni-menu-box {
		display: flex;
		justify-content: space-between;
		padding-top: 40upx;
	}

	.uni-pt {
		font-size: 30upx;
		color: #9a9a9a;
	}

	.uni-menu-mt {
		align-items: center;
	}

	.uni-menu-mt text {
		font-size: 30upx;
		color: #3c3c3c;
		margin-right: 20upx;
	}

	.uni-menu-mt .uni-menu-but {
		width: 155upx;
		height: 52upx;
		background-color: #ffca2f;
		border-radius: 26upx;
		font-size: 28upx;
		line-height: 52upx;
		padding-left: 20upx;
	}

	.uni-zc-but button {
		height: 76upx;
		background-color: #2FB6A7;
		border-radius: 38upx;
		line-height: 76upx;
		letter-spacing: 2upx;
		font-size: 34upx;
		margin: 160upx 0 33upx 0;
	}

	.button-hover {
		background-color: rgba(0, 0, 0, 0.1);
		opacity: 0.7;
	}

	.uni-login-but {
		font-size: 28upx;
		color: #3C3C3C;
		text-align: center;
	}
</style>
