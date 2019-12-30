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
				<input name='UserNames' type="text" class="uni-pt" :value="PlanArray.UserName" :placeholder="PlanArray.UserName"
				 v-model="UserNames" />
				<uni-icon class="iconfont-1 icon-you"></uni-icon>
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
				UserNames: '',
				ptid: ''
			};
		},
		onLoad(e) {
			this.Domaininfo(e);
			this.ptid = e.ptid
		},
		onShow() {

		},
		methods: {
			// 获取绑定平台信息
			Domaininfo(e) {
				uni.showLoading({
						title: "加载中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'plan/getplan',
						method: 'GET',
						data: helper.postdata({
							"userid": helper.getstate().userid,
							"id": e.ptid
						}),
						success: res => {
								console.log(res)
							if (res.data.code == 200) {
								uni.hideLoading()
								this.PlanArray = res.data.data.baseinfo
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
			},
			// 修改绑定平台信息
			adddomain(e) {
				uni.showLoading({
						title: "保存中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'plan/planinfo',
						method: 'GET',
						data: helper.postdata({
							"userid": helper.getstate().userid,
							"id": this.ptid,
							"type": 2,
							"UserName": this.UserNames
						}),
						success: res => {
							if (res.data.code == 200) {
							
								uni.hideLoading()
								uni.showToast({
									title: "修改成功。",
									duration: 2000
								})
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
			},
			// 删除平台
			deletedomain() {
				uni.showLoading({
						title: "删除中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'plan/deleteplan',
						method: 'GET',
						data: helper.postdata({
							"id":this.ptid,
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
	}
</script>

<style>
	.content {
		height: 1200upx;
	}
	.uni-sc-but{
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
