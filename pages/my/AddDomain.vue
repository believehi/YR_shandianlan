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
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
			</view>
			<view>
				<view class="uni-domain-box">
					<text class="uni-domain-text">截图步骤：</text>
				</view>
				<view class="uni-domain-box uni-domain-texts">
					<text class="uni-domain-text">美团：我的>会员中心</text>
				</view>
				<view class="uni-domain-box uni-domain-texts">
					<text class="uni-domain-text">大众点评：我的</text>
				</view>
			</view>
			<view class="uni-cz-box">
				<view class="uni-cz-item">
					<view class="uni-sctp-icon" @click="getImage"></view>
					<!-- <image :src="imageSrc" class="uni"></image> -->
				</view>
				<view class="uni-cz-item" :style="{display:index == 0  ? 'block' : 'none' }">
					<text>美团示意图</text>
					<image :src="imgalist[0]" :data-src="imgalist[0]" @click="previewImage($event)"></image>
				</view>
				<view class="uni-cz-item" :style="{display:index == 1  ? 'block' : 'none' }">
					<text>大众点评示意图</text>
					<image :src="imgalist[1]" :data-src="imgalist[1]" @click="previewImage($event)"></image>
				</view>
				<view class="uni-cz-item" :style="{display:index == 2 ? 'block' : 'none' }">
					<text>饿了么示意图</text>
					<image src="../../static/mt.jpg"></image>
				</view>
				<view class="uni-cz-item">
					<text>上传的截图</text>
					<image :src="img" mode="" @click="openimg"></image>
				</view>
			</view>
			<view class="uni-item">
				<view class="uni-domain-list">
					<text class="uni-domain-text">平台用户名</text>
					<input name='UserNames' v-model="UserNames" type="text" class="uni-pt" placeholder="填写用户名" />
					<uni-icon class="iconfont-1 icon-you"></uni-icon>
				</view>
			</view>
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
				userdata: '',
				img: '',
				imgs: [],
				grades: '',
				usernames_box: '',
				imgalist: ["http://lx97.cn/static/mt.png", "http://lx97.cn/static/dz.png"],
				imgalists: [],
				state: ''
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
		methods: {
			previewImage: function(e) {
				this.imgalists.splice(0, this.imgalists.length);
				this.imgalists.push(e.target.dataset.src);
				wx.previewImage({
					urls: this.imgalists
				})

			},
			openimg: function() {
				wx.previewImage({
					urls: this.imgs
				})

			},


			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key]);
				});
			},
			// 获取用户上传截图
			getImage: function() {
				var User = this.choosedaylist;
				var index = this.index;
				var _this = this;
				uni.chooseImage({
					success: function(res) {
						_this.setData({
							img: res.tempFilePaths[0],
						});
						uni.showLoading({
							title: '识别中'
						});
						// console.log(res.tempFilePaths[0]);
						uni.uploadFile({
							url: helper.websiteUrl + '/annexes/uploadimgbyplan',
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								plantype: User[index]
							}),
							success: function(resup) {
								var resdata = JSON.parse(resup.data);
								if (resdata.code == 200) {
									var url = 'https://cszx.yiruit.net';
									var imgurl = url + resdata.data.path;
									_this.img = imgurl;
									_this.imgs.push(imgurl);
									_this.grades = resdata.data.baseinfo.grade;
									var usernames_boxs = resdata.data.baseinfo.username;
									_this.UserNames = usernames_boxs.replace(/\s*/g, "");
									uni.showToast({
										icon: 'none',
										title: '识别成功！'
									});
									if (_this.UserNames == '' || _this.grades == '0') {
										_this.state = '1';
									} else {
										_this.state = '2';
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: resdata.info,
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
					},
				})
			},
			// 平台选择
			bindPickerChange: function(e) {
				this.index = e.target.value;
			},
			// 保存添加平台信息
			formSubmit: function(e) {
				var Plans = e.detail.value.Plans;
				if (this.img == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传截图！',
						duration: 2500,
					});
				} else if(this.UserNames == ''){
					uni.showToast({
						icon: 'none',
						title: '请填写用户名！',
						duration: 2500,
					});
				}else {
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
								"username": this.UserNames,
								"pics": this.img,
								"grade": this.grades,
								"state": this.state,
							}),
							success: res => {
								if (res.data.code == 200) {
									if (this.state == '1') {
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
											content: "保存成功",
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
								uni.hideLoading();
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
	.content {
		height: 1200upx;
	}

	.uni-domain-box {
		width: 90%;
		margin: 20upx auto;
		text-align: left;
		font-size: 32upx;
		color: #fbb42b;
	}

	.uni-domain-texts {
		font-size: 28upx;
		color: #1a1a1a;
		padding-left: 30upx;
	}

	.uni-sctp-icon {
		margin-top: 65upx;
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

	.uni-item {
		display: flex;
		justify-content: center;
	}

	.uni-domain-text {
		width: 270upx;
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
		font-size: 32upx;
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
