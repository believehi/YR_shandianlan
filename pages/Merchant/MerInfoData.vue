<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uni-data-content">
				<!-- 头像 -->
				<view class="uni-user-img uni-data-item" @click="getImage">
					<text>头像</text>
					<input type="text" name='Id' :value="UserId" style="display: none;" />
					<input type="text" name='Headimgurl' :value="Headimgurl" style="display: none;" />
					<input type="" value="" />
					<view>
						<image :src="img"></image>
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 商家名称 -->
				<view class="uni-input-item uni-data-item">
					<text>商家名称</text>
					<view>
						<input type="text" name='MerchantName' v-model="nickname" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 法人代表 -->
				<view class="uni-input-item uni-data-item">
					<text>法人代表</text>
					<view>
						<input type="text" name='ArtiPerson' v-model="ArtiPerson"  placeholder="请填写真实的法人" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 营业执照 -->
				<view class="uni-input-item uni-data-item">
					<text>营业执照</text>
					<view @click="DiscernImage">
						<image :src="imgss" mode=""></image>
						<input type="text" name='BusinessLicense' :value="MerImg" style="display: none;" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 地址 -->
				<view class="uni-input-item uni-data-item">
					<text>地址</text>
					<view>
						<textarea class="uni-phone-color"  name="Position" v-model="Position"  placeholder="请填写商家地址" />
					</view>
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
				<!-- 银行卡卡号 -->
				<view class="uni-input-item uni-data-item">
					<text>银行卡卡号</text>
					<view>
						<input type="number" name='AccountBank' :value="userfoArray.AccountBank" placeholder="请填写真实的银行卡卡号" />
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
		</form>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		components: {},
		data() {
			return {
				UserId: '',
				userfoArray: '',
				nickname: '',
				mobile: '',
				userdata: "",
				loginMark: "",
				token: "",
				Headimgurl: '',
				Position:'',
				img:'',
				imgss:'',
				MerImg:'',
				ArtiPerson:'',
				MerPer:'' , //法人名称
				MerName:'' ,//商家名称
				
			};
		},
		onLoad() {
			this.userinfo();
			this.UserId = helper.getstate().userid;
			this.loginMark = uni.getStorageSync('loginMark')
			this.token = uni.getStorageSync('token')
		},
		methods: {
			// 获取个人信息
			userinfo() {
				uni.showLoading({
					title:'加载中'
				});
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + 'merchantcenter/getmerchantinfo',
					method: 'GET',
					data: helper.postdata({
						mid: userId,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.img = res.data.data.baseinfo.Headimgurl;
							this.userfoArray = res.data.data.baseinfo;
							this.imgss = this.userfoArray.BusinessLicense;
						}else{
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
						uni.showLoading({
							title: '上传中'
						});
						uni.uploadFile({
							url: helper.websiteUrl + '/annexes/UploadImg', 
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								
							}),
							success: function(resdata) {
								var resdatas = JSON.parse(resdata.data);
								if (resdatas.code == 200) {
									var url = 'https://cszx.yiruit.net';
									var imgurls = url + resdatas.info;
									_this.Headimgurl = imgurls;
									uni.showToast({
										icon: 'none',
										title: '上传成功'
									});
								} else{
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: '上传失败,请重试'
									});
								}
								uni.hideLoading();
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '上传失败,请重试'
								});
							}
						})
						_this.setData({
							img: res.tempFilePaths[0],
						})
					},
				})
			},
			// 营业执照识别
			DiscernImage: function() {
				var _this = this;
				uni.chooseImage({
					success: function(res) {
						_this.imgss = res.tempFilePaths[0];
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
									var imgurls = url + resdata.data.path;
									_this.MerImg = imgurls;
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
							imgss: res.tempFilePaths[0],
						});
					},
				})
			},
			// 修改个人信息表单提交
			formSubmit: function(e) {
				var _this = this
				uni.showModal({
					title: '提示',
					content: '是否确定修改！',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '修改中'
							});
							_this.userdata = e.detail.value
							uni.request({
								url: helper.websiteUrl + '/merchantcenter/updatemerchantcenter',
								method: 'GET',
								data: {
									"loginMark": _this.loginMark,
									"token": _this.token,
									"data": _this.userdata
								},
								success: res => {
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
						} 
					}
				});
				
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
	textarea{
		width: 455upx;
		padding-left: 45upx;
		height: 95upx !important;
		text-align: left !important;
	}
	.content {
		height: 1190upx;
		padding-top: 15upx;
	}

	.uni-phone-color {
		color: #1a1a1a;
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

	.uni-data-item image {
		width: 116upx;
		height: 80upx;
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
		background-color: #2FB6A7;
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
