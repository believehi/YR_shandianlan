<template>
	<view class="content">
		<view class="uni-password-but">
			<form @submit="formSubmit" @reset="formReset">
				<input type="text" value="" password="" v-model="Newpassword" placeholder="请输入新密码" />
				<input type="text" value="" password="" name="Newpassword" v-model="conpassword" placeholder="请确认新密码" />
				<button type="primary" formType="submit" @click="submitdbut">提交</button>
			</form>
		</view>
	</view>
</template>
<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				Newpassword:'',
				conpassword:'',
				userdata:''
			};
		},
		methods: {
			formSubmit: function(e) {
				if (this.Newpassword.length < 6 || this.Newpassword.length > 12) {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12个字符的密码'
					});
					return;
				}
				if (this.Newpassword != this.conpassword ) {
					uni.showToast({
						icon: 'none',
						title: '密码确认错误'
					});
					return;
				}
				this.userdata = e.detail.value
				uni.request({
					url:helper.websiteUrl+'usercenter/updatepw' ,
					method: 'GET',
					data:helper.postdata({
						"userid": helper.getstate().userid,
						"Newpassword": this.userdata.Newpassword,
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '修改成功,请重新登录。',
								duration:3000,
							});
							helper.logout();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		height: 1200upx;
	}

	.uni-password-but {
		margin: 0upx auto;
		width: 700upx;
		padding: 53upx 0;
	}

	.uni-password-but input {
		width: 655upx;
		height: 80upx;
		background-color: #ffffff;
		border-radius: 40px;
		border: solid 1px #dbdbdc;
		padding-left: 45upx;
		font-size: 32upx;
		margin-bottom: 25upx;
	}

	.uni-password-but button {
		margin-top: 75upx;
		border-radius: 40upx;
		background-color: #ffca30;
		font-size: 32upx;
		color: #3C3C3C;
		letter-spacing: 2upx;
	}
</style>
