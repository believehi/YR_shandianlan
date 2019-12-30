<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uni-item">
				<view class="uni-domain-list">
					<text>请选择平台</text>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :id="index" :range="choosedaylist" class="picker">
							<input type="text" name='Plans' class="uni-input" :value="choosedaylist[index]" disabled="disabled" />
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-item">
				<view class="uni-domain-list">
					<text class="uni-domain-text">填写平台账号</text>
					<input name='UserNames' type="text" class="uni-pt" v-model="UserNames" />
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
			</view>
			<!-- <view class="uni-cz-item">
				
				<view class="uni-sctp-icon" @click="getImage"></view>
				<image :src="imageSrc" class="uni"></image>
			</view> -->
			<view class="uni-item">
				<button formType="submit" class="uni-item-list uni-tj-but ">
					保存
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				PlanArray: '',
				UserNames: '',
				ptid: '',
				choosedaylist: [],
				index: 0,
				Plans: '',
				userdata: ''
			};
		},
		onLoad(e) {
			this.ptid = e.ptid;
			// 获取后台添加的平台
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
		onShow() {

		},
		methods: {
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key])
				});
			},
			// 获取用户上传头像地址
// 			getImage: function() {
// 				var _this = this
// 				uni.chooseImage({
// 					success: function(res) {
// 						// console.log(res.tempFilePaths[0])
// 						uni.uploadFile({ 
// 							url: helper.websiteUrl + '/annexes/uploadimgbyplan', 
// 							filePath: res.tempFilePaths[0],
// 							fileType: "uploadFile",
// 							name: 'upload',
// 							formData: helper.postdata({							
// 							}),
// 							success: function(res) {
// 								
// 							}
// 						})
// 						_this.setData({
// 							img: res.tempFilePaths[0],
// 						})
// 					},
// 				})
// 			},
			// 平台选择
			bindPickerChange: function(e) {
				this.index = e.target.value;
			},
			// 保存添加平台信息
			formSubmit: function(e) {
				var Plans = e.detail.value.Plans
				var UserNames = e.detail.value.UserNames
				if (this.UserNames == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入平台账号！',
						duration: 2500,
					});
				} else {
					uni.showLoading({
							title: "保存中....",
							mask: true
						}),
						uni.request({
							url: helper.websiteUrl + 'plan/planinfo',
							method: 'GET',
							data: helper.postdata({
								"type": 1,
								"userid": helper.getstate().userid,
								"Plans": Plans,
								"UserName": UserNames
							}),
							success: res => {
								uni.hideLoading()
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									title: '网络异常,请稍后重试'
								});
							}
						});
				}
// 				this.userdata = e.detail.value
// 				var _this = this
			},
		}
	}
</script>

<style>
	.content {
		height: 1200upx;
	}

	.uni-item {
		display: flex;
		justify-content: center;
	}

	.uni-domain-text {
		width: 260upx;
	}

	.uni-domain-list {
		width: 635upx;
		height: 90upx;
		background: #FFFFFF;
		border-radius: 20upx;
		align-items: center;
		display: flex;
		padding: 0 25upx 0 40upx;
		justify-content: space-between;
		margin-bottom: 15upx;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.06);
	}

	.uni-domain-list:last-child {
		margin-top: 15upx;
	}

	.uni-domain-list text,
	.uni-input {
		font-size: 32upx;
		color: #1a1a1a;

	}

	.uni-input {
		text-align: right;
	}

	.uni-domain-list .uni-pt {
		color: #1a1a1a;
		text-align: right;
	}

	.uni-item-list {

		width: 700upx;
		height: 90upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20upx;
		font-size: 34upx;
		color: #FFFFFF;
	}

	.uni-item-list text {
		margin-left: 10upx;
		line-height: 90upx;
	}

	.uni-tj-but {
		margin-top: 15upx;
		background-color: #fbb42b;
	}
</style>
