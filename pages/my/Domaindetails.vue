<template>
	<view class="content">
		<view class="uni-item">
			<view class="uni-domain-list">
				<text>平台</text>
				<text>{{PlanArray.PlanName}}</text>
			</view>
		</view>
		<view class="uni-item">
			<view class="uni-domain-list">
				<text class="uni-domain-text">修改平台账号</text>
				<input name='UserName' type="text" class="uni-pt"  v-model="UserName" />
				<uni-icon class="iconfont-1 icon-you"></uni-icon>
			</view>
		</view>
		<view class="uni-cz-box">
			<view class="uni-cz-item">
				<view class="uni-sctp-icon" @click="getImage"></view>
				<!-- <image :src="imageSrc" class="uni"></image> -->
			</view>
			<view class="uni-cz-item">
				<text>美团示意图</text>
				<image src="http://lx97.cn/static/mt.png"></image>
			</view>
			<view class="uni-cz-item">
				<text>大众点评示意图</text>
				<image src="http://lx97.cn/static/dz.png"></image>
			</view>
			<view class="uni-cz-item" :style="{display:index == 2 ? 'block' : 'none' }">
				<text>饿了么示意图</text>
				<image src="../../static/mt.jpg"></image>
			</view>
		</view>
		<view class="uni-cz-item uni-cz">
			<text>上传截图</text>
			<view>
				<image :src="img" mode=""></image>
			</view>
		</view>
		<view class="uni-item">
			<view class="uni-item-list uni-tj-but " @click="adddomain">
				<text>保存</text>
			</view>
		</view>
		<view class="uni-item">
			<view class="uni-item-list uni-sc-but " @click="deletedomain">
				<text>删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				PlanArray: '',
				UserName: '',
				ptid: '',
				pics: '',
				grades: '',
				img: '',
				imgs: [],
				usernames_box: '',
				state: ''
			};
		},
		onLoad(e) {
			this.Domaininfo(e);
			this.ptid = e.ptid
		},
		onShow() {

		},
		methods: {
			openimg: function() {
				wx.previewImage({
					urls: this.imgs
				})
			},
			// 获取绑定平台信息
			// Domaininfo(e) {
			// 	uni.showLoading({
			// 			title: "加载中....",
			// 			mask: true
			// 		}),
			// 		uni.request({
			// 			url: helper.websiteUrl + 'plan/getplan',
			// 			method: 'GET',
			// 			data: helper.postdata({
			// 				"userid": helper.getstate().userid,
			// 				"id": e.ptid
			// 			}),
			// 			success: res => {
			// 				if (res.data.code == 200) {
			// 					uni.hideLoading()
			// 					this.PlanArray = res.data.data.baseinfo;
			// 					this.UserName = res.data.data.baseinfo.UserName;
			// 				} else {
			// 					helper.goout(res.data.info);
			// 					uni.showToast({
			// 						icon: 'none',
			// 						title: res.data.info
			// 					});
			// 				}
			// 			},
			// 			fail: () => {
			// 				uni.hideLoading()
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: '网络异常,请稍后重试'
			// 				});
			// 			}
			// 		});
			// },
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key])
				});
			},
			// 获取用户上传截图
			getImage: function() {
				var User = this.choosedaylist
				var index = this.index
				var _this = this
				uni.chooseImage({
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						uni.showLoading({
							title: '识别中'
						});
						uni.uploadFile({
							url: helper.websiteUrl + '/annexes/uploadimgbyplan',
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								plantype: _this.PlanArray.PlanName
							}),
							success: function(resup) {
								var resdata = JSON.parse(resup.data);
								if (resdata.code == 200) {
									var url = 'https://cszx.yiruit.net';
									var imgurl = url + resdata.data.path;
									_this.img = imgurl;
									_this.imgs.push(imgurl);
									_this.grades = resdata.data.baseinfo.grade;
									_this.UserName = resdata.data.baseinfo.username;
									if (_this.UserName == '' || _this.grades == '0') {
										_this.state = '1';
									} else {
										_this.state = '2';
									}
									uni.showToast({
										icon: 'none',
										title: '识别成功！'
									});
								} else {
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
						})
						_this.setData({
							img: res.tempFilePaths[0],
						})
					},

				})
			},
			// 修改绑定平台信息
			adddomain(e) {
				var _this = this;
				if (_this.img == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传截图！',
						duration: 2500,
					});
				} else if (_this.UserName == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写用户名！',
						duration: 2500,
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '是否确定修改',
						success: function(res) {
							if (res.confirm) {
								uni.showLoading({
									title: "保存中....",
									mask: true
								})
								uni.request({
									url: helper.websiteUrl + 'plan/planinfo',
									method: 'GET',
									data: helper.postdata({
										"userid": helper.getstate().userid,
										"id": _this.ptid,
										"type": 2,
										"UserName": _this.UserName,
										"pics": _this.img,
										"grade": _this.grades,
										"plans": _this.PlanArray.PlanName,
										"state": _this.state,
									}),
									success: res => {
										if (res.data.code == 200) {
											if (_this.state == '1') {
												uni.showModal({
													title: '提示',
													content: "请等待客服人员审核",
													showCancel: false,
													confirmText: "确定",
													success: function(res) {
														if (res.confirm) {
															uni.navigateBack({
																delta: 1
															});
														}
													}
												});
											} else {
												uni.showModal({
													title: '提示',
													content: "修改成功",
													showCancel: false,
													confirmText: "确定",
													success: function(res) {
														if (res.confirm) {
															uni.navigateBack({
																delta: 1
															});
														}
													}
												});
								
											}
										} else {
											uni.showModal({
												title: '提示',
												content: res.data.info,
												showCancel: false,
												confirmText: "关闭",
											});
										}
										uni.hideLoading();
									},
									fail: () => {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: '网络异常,请稍后重试'
										});
									}
								});
							} else if (res.cancel) {
								uni.showToast({
									icon:"none",
									title:"取消修改"
								})
							}
						}
					});
					
				}

			},
			// 删除平台
			deletedomain() {
				var paid = this.ptid
				uni.showModal({
					title: '提示',
					content: '是否确认删除该平台！',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
									title: "删除中....",
									mask: true
								}),
								uni.request({
									url: helper.websiteUrl + 'plan/deleteplan',
									method: 'GET',
									data: helper.postdata({
										"id": paid,
									}),
									success: res => {
										if (res.data.code == 200) {
											uni.hideLoading()
											uni.showToast({
												title: "删除成功。",
												duration: 2000
											})
											uni.navigateBack({
												delta: 1
											});
										} else {
											helper.goout(res.data.info);
											uni.showToast({
												icon: 'none',
												title: res.data.info
											});
										}
									},
									fail: () => {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: '网络异常,请稍后重试'
										});
									}
								});
						}
					}
				});

			}
		}
	}
</script>

<style>
	.content {
		height: 1200upx;
		padding-bottom: 100upx;
	}

	.uni-sctp-icon {
		margin-top: 65upx;
	}

	.uni-cz {
		width: 200upx;
		margin-left: 165upx;
		margin-top: 10upx;
	}

	.uni-cz-box {
		padding: 0 4%;
		display: flex;
		justify-content: space-between;
	}

	.uni-cz-item:nth-child(2),
	.uni-cz-item:nth-child(3) {
		margin-left: 30upx;
	}

	.uni-cz-item image {
		width: 175upx;
		height: 320upx;
		margin-top: 10upx;
	}

	.uni-cz-item text {
		font-size: 32upx;
		color: #1a1a1a;

	}

	.uni-sc-but {
		background: red !important;
		margin-top: 15upx;
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

	.uni-domain-list text {
		font-size: 32upx;
		color: #1a1a1a;
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
