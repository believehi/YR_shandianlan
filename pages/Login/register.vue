<template>
	<view class="uni-reg-content">
		<form class="uni-reg-list" @submit="formSubmit">
			<!-- 手机号 -->
			<view class="uni-form-item">
				<input type="number" name="mobile" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<!-- 验证码 -->
			<view class="uni-form-item">
				<input type="number" name="yzm" :value="code" v-model="code" placeholder="请输入验证码" />
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
			<!-- 请选择相应平台 -->
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>
					<view class="uni-pt" style="padding-top: 5upx;">请选择平台</view>
					<view class="uni-list-cell-db uni-form-item uni-form-items">
						<picker @change="bindPickerChange" :id="index" :range="choosedaylist" class="picker">
							<input type="text" name='plans' v-model="plans" class="uni-input" :value="choosedaylist[index]" disabled="disabled" />
						</picker>
					</view>
				</view>

				<view class="uni-domain-list uni-form-item">
					<view class="uni-pt">请填写平台账号</view>
					<view>
						<input name='account' type="text" class="uni-pts" v-model="account" />
					</view>
				</view>
			</view>
			<view class="uni-item">

			</view>
			<!-- 注册按钮 -->
			<view class="uni-zc-but">
				<button type="primary" form-type="submit">注册</button>
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
				mobile: '', //手机号
				password: '', //密码
				conpassword: '', //确认密码
				nikename: '', //昵称
				account: '', //平台账号
				plans: '', //选择的平台
				code: "", //输入的验证码
				codestr: '', //获取的随机数
				choosedaylist: [], //平台选择数组
				index: 0, //平台初始值
				tipsCode: "获取验证码",
				timeNum: 60,
				clikType: false,
				timeOut: 60,
			};

		},
		onLoad() {
			_self = this;
			uni.request({
				url: helper.websiteUrl + '/user/getplantype',
				method: 'GET',
				data: {},
				success: res => {
					if (res.data.code == 200) {
						this.choosedaylist = res.data.data.plans;
					}
				}
			});
		},
		methods: {
			// 平台选择
			bindPickerChange: function(e) {
				this.index = e.target.value;
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
					console.log(that.clikType)
					that.codestr = helper.MathRand(4);
					that.clikType = true;
					console.log(that.clikType)
					uni.request({
						url: 'http://utf8.api.smschinese.cn/',
						method: 'GET',
						data: {
							Uid: "xingjiushenqi",
							Key: "d41d8cd98f00b204e980",
							smsMob: that.mobile,
							smsText: "您的验证码为：" + that.codestr + "，有效期5分钟"
						},
						success: res => {
							if (res.data == "1") {
								that.getTime()
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
				var Plans = e.detail.value.plans
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
				if (this.code == "" ||this.code != this.codestr || this.codestr !=
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
					url: helper.websiteUrl + 'user/reg',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"mobile": "' + self.mobile + '","password": "' + self.password + '","account":"' + self.account +
							'","plans":"' + e.detail.value.plans + '"}'
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '注册成功，请登陆'
							});
							uni.removeStorageSync('sdlstate1');
							uni.redirectTo({
								url: 'login'
							});
						} else {
							//console.log(res.data.info);
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

				})
			},
			openlogin() { //打开登录页面 
				uni.navigateTo({
					url: 'login'
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
		top: -20upx;
		right: 0;
		height: 60upx;
		background-color: #ffca30;
		border-radius: 30upx;
		font-size: 28upx;
		border: solid 1upx #dbdbdc;
		color: #3c3c3c;
		text-align: center;
		line-height: 60upx;
		z-index: 999;
			padding: 0 20upx;
	}

	.uni-reg-list .uni-form-item input {
		width: 610upx;
		border-bottom: 1upx solid #9a9a9a;
		padding-bottom: 5upx;
		font-size: 30upx;
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
		background-color: #ffca2f;
		border-radius: 38upx;
		line-height: 76upx;
		letter-spacing: 2upx;
		font-size: 34upx;
		margin: 225upx 0 33upx 0;
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
