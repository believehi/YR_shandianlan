<template>
	<view class="content">
		<view class="uni-rw-time">
			<view class="uni-rw-title">
				<text>{{rwArray.TaskName}}</text>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务说明：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.explain}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务要求：</view>
				<view class="uni-rw-yq">
					<text>{{rwArray.Requirement}}人</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家名称：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Merchant}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">商家位置：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Position}}</text>
				</view>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家照片：</view>
				<view class="uni-rw-m">
					<image :src="item" mode="" v-for="(item,index) in Merimg" :key="index"></image>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">日期</view>
			</view>
			<view class="uni-time-list">
				<view class="uni-time-item">
					<text>{{rwArray.Receivedate}}</text>
					<text class="uni-time1">{{dateDes }}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">操作步骤</view>
			</view>
			<view class="uni-cz-bz">
				<view class="uni-cz-item">
					<text>{{rwbzArray[0]}}</text>
					<text>{{rwbzArray[1]}}</text>
					<text>{{rwbzArray[2]}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-cz-item">
				<view class="uni-rw-ms col uni-sj-wz">
					<view class="uni-rw-sm">核销二维码</view>
				</view>
				<!-- 获取二维码 -->
				<view class="" style="padding: 20upx 50upx;">
					<cover-view>
						<canvas canvas-id="myQrcode"></canvas>
					</cover-view>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-cz-item">
				<view class="uni-rw-ms col uni-sj-wz">
					<view class="uni-rw-sm">上传截图</view>
				</view>
				<view class="uni-cz-item" style="display: flex;justify-content:space-between;padding: 20upx 0;">
					<!-- 上传图片按钮 -->
					<view class="uni-sctp-icon" @click="scbut"></view>
					<view class="uni-mer-img">
						<image :src="item" v-for="(item,index) in merimg" :key="index" @click="openMerimg"></image>
					</view>

				</view>
			</view>
		</view>
		<view class="uni-but-item">
			<view class="uni-sc-but" @click="fanqibut">
				<text>放弃任务</text>
			</view>
			<view class="uni-lqs-but" @click="tjbut">
				<text>提交任务</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	import drawQrcode from '../../common/weapp-qrcode.js';
	var _self;
	export default {

		data() {
			return {
				shows: 0,
				rwArray: {},
				rwbzArray: {},
				dateDes: "",
				TaskId: "",
				lqid: '',
				imageSrc: '',
				img: '',
				date: '',
				Merimg: [],
				merimg: [],
				index: '',
				pictures: ''
			}
		},
		onLoad(e) { //e接收任务的id
			// _self = this;
			// this.lqrwlist(e);
			// this.lqid = e.lqid;
			// this.qrcode()

		},
		methods: {
			// 生成二维码
			qrcode() {
				drawQrcode({
					width: 150,
					height: 150,
					canvasId: 'myQrcode',
					text: this.lqid
				})
				this.index = '0'
			},
			// 领取任务列表
			lqrwlist(e) {
				var endtime = this.data;
				helper.islogin(true);
				uni.showLoading({
					title: "加载中....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + 'task/getmytask',
					method: "GET",
					data: helper.postdata({
						id: e.lqid,
						"userid": helper.getstate().userid,
					}),
					success: (res) => {
						if (res.data.code == 200) {
							this.TaskId = res.data.data.baseinfo.TaskId;
							this.date = res.data.data.baseinfo.Receivedate;
							this.Merimg = res.data.data.baseinfo.Pictures.split(';')
							var endtimes = this.date.replace(/\-/g, "/")
							var datetest = new Date(endtimes); //获取当前任务的结束时间 
							var Month = datetest.getMonth() + 1;
							var lazyday = parseInt(parseInt(datetest.getTime() - new Date().getTime()) / (24 * 3600 * 1000)) + 1; //获取剩余天数
							res.data.data.baseinfo.Receivedate = datetest.getFullYear() + "年" + Month + "月" +
								datetest.getDate() +
								"日"; //格式化任务结束时间
							if (lazyday > 0) //判断任务时间是否到期 显示不同的内容
							{
								this.dateDes = lazyday + "天后，即可免费享用霸王餐";
							} else {
								this.dateDes = "该活动已经结束！";
							}
							this.rwArray = res.data.data.baseinfo;
							this.rwbzArray = res.data.data.baseinfo.Instruction.split(";");
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请返回重试！'
						});
					}
				})
			},
			// 查看缩略图
			openMerimg() {
				uni.previewImage({
					urls: this.merimg
				});
			},
			// 放弃任务
			fanqibut() {
				uni.showModal({
					title: '提示',
					content: '是否放弃该任务！',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: helper.websiteUrl + 'task/submitreview',
								method: 'GET',
								data: helper.postdata({
									"taskid": _self.TaskId,
									"id": _self.lqid,
									"userid": helper.getstate().userid,
									"type": "2",
									"IsGet": '0'
								}),
								success: res => {
									if (res.data.code == 200) {
										uni.navigateBack({
											delta: 1
										});
									}
								},
								fail: () => {
									uni.showToast({
										icon: 'none',
										title: '网络异常,请重试！'
									});
									uni.hideToast()
								},
							});
						}
					}
				});
			},
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key])
				});
			},
			scbut() {
				var _this = this
				if (_this.merimg.length >= "2") {
					uni.showToast({
						icon: 'none',
						title: '截图最多上传两张',
					});
				} else {
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
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
									"folderId": "123465",
								}),
								success: function(resup) {
									var resdata = JSON.parse(resup.data);
									if (resdata.code == 200) {
										var url = 'https://cszx.yiruit.net';
										var imgurl = url + resdata.info;
										_this.img = imgurl;
										uni.showToast({
											icon: 'none',
											title: '上传成功！'
										});
									} else {
										uni.hideLoading();
										uni.showToast({
											icon: 'none',
											title: resdata.info
										});
									}
									uni.hideLoading();
									_this.merimg.push(_this.img);
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
				}

			},
			// 任务提交按钮
			tjbut() {
				if (_self.dateDes == "该活动已经结束！") {
					uni.showToast({
						icon: 'none',
						title: "该活动已结束！"
					})
				} else if (_self.merimg == '') {
					uni.showToast({
						icon: 'none',
						title: "请上传截图！"
					})
				} else {
					_self.pictures = _self.merimg.join(';');
					uni.showLoading({
						title: "任务提交中...",
					})
					uni.request({
						url: helper.websiteUrl + 'task/submitreview',
						method: 'GET',
						data: helper.postdata({
							"id": _self.lqid,
							"pics": _self.pictures,
							"userid": helper.getstate().userid,
							"type": 1,
							"taskid": _self.TaskId,
						}),
						success: res => {
							uni.hideLoading()
							if (res.data.code == 200) {
								uni.navigateBack({
									delta: 1
								});
							} else {

								uni.showModal({
									title: '提示',
									content: res.data.info,
									showCancel: false,
									confirmText: "关闭",
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
	}
</script>

<style>

	view {
		line-height: 35upx;
	}

	.uni-sctp-icon {
		margin: 15upx 0;
	}

	.uni-mer-img image {
		width: 150upx;
		height: 250upx;
		margin-right: 30upx;
	}

	.uni-img {
		width: 200upx;
		height: 350upx;
	}

	.uni-ew-but {
		width: 239upx;
		height: 56upx;
		background-color: #f4c336;
		border-radius: 10px;
		font-size: 28upx;
		line-height: 55upx;
		color: #FFFFFF;
		text-align: center;
	}

	.content {
		padding-top: 15upx;
		padding-bottom: 107upx;
	}

	.uni-rw-time {
		background-color: #FFFFFF;
		padding: 0 25upx;
		width: 700upx;
		margin-top: 15upx;
	}

	.uni-time-item .uni-time1 {
		font-size: 26upx;
		color: #ffca2f;
	}

	.uni-rw-time .uni-rw-title {
		text-align: center;
		font-size: 32upx;
		color: #0b0b0b;
		padding: 20upx 0;
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-ms {
		display: flex;
		font-size: 30upx;
		padding: 25upx 0;
	}

	.uni-cz-item {
		width: 100%;
	}

	.uni-rw-ms .uni-rw-sm {
		width: 154upx;
		color: #212121;
	}

	.uni-rw-ms .uni-rw-m {
		flex-grow: 2;
		width: 565upx;
		text-align: justify;
		color: #616161;
	}

	.uni-rw-yq {
		color: #f3571a;
	}

	.uni-rw-yq text:first-child {
		margin-right: 40upx;
	}

	.uni-sj-wz {
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-m image {
		width: 267upx;
		height: 178upx;
		margin-top: 10upx;
	}

	.uni-rw-m image:first-child {
		margin-right: 15upx;
	}

	.uni-cz-bz text:first-child {
		margin-top: 25upx;
	}

	.uni-cz-bz text {
		font-size: 30upx;
		color: #616161;
		display: inline-block;
		margin-bottom: 25upx;
	}

	.uni-time-list {
		display: flex;
		justify-content: space-between;
	}

	.uni-time-item {
		font-size: 30upx;
		color: #212121;
		text-align: left;
	}

	.uni-time-item text {
		display: inline-block;
		width: 100%;
		margin-bottom: 15upx;
	}

	.uni-time-item text:first-child {
		margin-top: 15upx;
	}

	.active {
		border-bottom: 2upx solid #fbb42b;
		color: #fbb42b;
	}

	.uni-but-item {
		position: fixed;
		bottom: 0;
		z-index: 9999999;
		display: flex;
	}

	.uni-but-item view {
		width: 375upx;
		text-align: center;
		line-height: 107upx;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.uni-but-item .uni-sc-but {
		background-color: #d1d1d1;
	}

	.uni-but-item .uni-lqs-but {
		background-color: #fbb42b;
	}
</style>
