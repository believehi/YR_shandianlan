<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uni-data-content">
				<!-- 头像 -->
				<view class="uni-user-img uni-data-item" @click="getImage">
					<text>头像</text>
					<input type="text" name='id' :value="UserId" style="display: none;" />
					<input type="text" name='img' :value="img" style="display: none;" />
					<input type="" value="" />
					<view>
						<image :src="img"></image>
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 昵称 -->
				<view class="uni-input-item uni-data-item">
					<text>昵称</text>
					<view>
						<input type="text" name='Nickname' v-model="nickname" :value="userfoArray.Nickname" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 真实姓名 -->
				<view class="uni-input-item uni-data-item">
					<text>真实姓名</text>
					<view>
						<input type="text" name='Truename' :value="userfoArray.Truename" placeholder="请填写真实的姓名" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 性别 -->
				<view class="uni-input-item uni-data-item">
					<text>性别</text>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" name='Sex' :value="index" :range="array" class="picker">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>

				<!-- 手机号码 -->
				<view class="uni-input-item uni-data-item">
					<text>手机号码</text>
					<view>
						<input class="uni-phone-color" type="number" name="Phone" v-model="mobile" :value="userfoArray.Phone" placeholder="请填写手机号码"
						 @click="openphone" disabled="disabled" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 身份证号码 -->
				<view class="uni-input-item uni-data-item">
					<text>身份证号码</text>
					<view>
						<input type="idcard" name='IdCard' :value="userfoArray.IdCard" placeholder="请填写真实的身份证号码" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 银行卡卡号 -->
				<view class="uni-input-item uni-data-item">
					<text>银行卡卡号</text>
					<view>
						<input type="number" name='Bankcard' :value="userfoArray.Bankcard" placeholder="请填写真实的银行卡卡号" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 支付宝账号 -->
				<view class="uni-input-item uni-data-item">
					<text>支付宝账号</text>
					<view>
						<input type="number" name='Alipay' :value="userfoArray.Alipay" placeholder="请填写真实的支付宝账号" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>

			</view>
			<button type="" formType="submit" class="uni-bc-but">保存</button>
			<!-- 			<button type="" class="uni-bc-but" @click="amendbut">保存</button> -->
		</form>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import helper from '../../common/helper.js';
	export default {
		components: {},
		data() {
			return {
				UserId: '',
				userfoArray: '',
				nickname: '',
				array: ['女', '男', ''],
				index: 0,
				mobile: '',
				userdata: "",
				loginMark: "",
				token: "",
				img: ''
			};
		},
		onLoad() {
			this.userinfo();
			this.UserId = helper.getstate().userid;
			this.loginMark = uni.getStorageSync('loginMark')
			this.token = uni.getStorageSync('token')
		},
		methods: {
			// 修改个人信息表单提交
			formSubmit: function(e) {
				this.userdata = e.detail.value
				var _this = this
				uni.request({
					url: helper.websiteUrl + '/usercenter/UpdateUserCenter',
					method: 'GET',
					data: {
						"loginMark": _this.loginMark,
						"token": _this.token,
						"data": _this.userdata
					},
					success: res => {
						var a = {
							"loginMark": _this.loginMark,
							"token": _this.token,
							"data": _this.userdata
						}
					   console.log(a)
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '修改成功'
							});
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
			},
			// 性别选择
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			// 获取个人信息
			userinfo() {
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + '/usercenter/getuserinfo',
					method: 'GET',
					data: helper.postdata({
						id: userId,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.img = res.data.data.baseinfo.Headimgurl
							this.index = res.data.data.baseinfo.Sex
							this.userfoArray = res.data.data.baseinfo;
						}

					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					}
				});
			},
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key])
				});
			},
			// 获取用户上传头像地址
			getImage: function() {
				var _this = this
				uni.chooseImage({
					success: function(res) {
						uni.uploadFile({
							url: helper.websiteUrl + '/annexes/UploadImg', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								"folderId": "123465",
							}),
							success: function(res) {
								var arr = JSON.parse(res.data)
								var arrs = arr.info
								var url = 'https://cszx.yiruit.net'
								var imgurl = url + arrs
								_this.img = imgurl
							}
						})
						_this.setData({
							img: res.tempFilePaths[0],
						})
					},
				})
			},
			openphone() {
				uni.navigateTo({
					url: 'zhanghuanquan',
				});
			}
		}
	}
</script>

<style>
	.content {
		height: 1190upx;
		padding-top: 15upx;
	}

	.uni-phone-color {
		color: #C6C6C6;
	}

	.uni-input {
		height: 47upx;
		width: 100%;
		display: inline-block;
		line-height: 44upx !important;
	}

	.uni-data-content {
		width: 700upx;
		background: #FFFFFF;
		margin: 0 auto;
		border-radius: 20upx;
	}

	.uni-data-content .uni-data-item:last-child {
		border-bottom: none;
	}

	.uni-data-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 0upx 20upx 20upx;
		width: 628upx;
		border-bottom: 1px solid #E6E6E6;
		margin: 0 auto;
		font-size: 32upx;
	}

	.uni-user-img text {
		font-size: 32upx;
		color: #1A1A1A;
	}

	.uni-data-item view {
		flex-grow: 2;
		text-align: right;
		line-height: 20upx;
	}

	.uni-user-img image {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		text-align: right;
	}

	.uni-user-img uni-icon {
		margin-left: 31upx !important;
	}

	.uni-data-item input {
		text-align: right;
	}

	.uni-input-item uni-icon {
		margin-left: 11upx;
	}

	.uni-bc-but {
		background-color: #FBB42B;
		border-radius: 20upx;
		font-size: 34upx;
		letter-spacing: 3upx;
		color: #FFFFFF;
		border: none;
		margin-top: 110upx;
		width: 700upx;
		height: 90upx;
	}
</style>
