<template>
	<view class="content">
		<view class="uni-item">
			<view class="uni-domain-list" v-for="(item,index) in PlanArray" :key="index" :data-bzid="item.ID" @click="opendomain">
				<text class="Text_Nowrap">{{item.Title}}</text>
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
			};
		},
		onLoad() {
			this.Domaininfo();
			
		},
		onShow() {
			this.Domaininfo()
		},
		methods: {
			// 获取图文列表
			Domaininfo() {
				uni.showLoading({
						title: "加载中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'help/getheples',
						method: 'GET',
						data: helper.postdata({}),
						success: res => {
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
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						}
					});
			},
			//进入图文详情页
			opendomain(e) {
				uni.navigateTo({
					url: 'helptext-content?bzid=' + e.currentTarget.dataset.bzid 
				});
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
		flex-wrap: wrap-reverse;
		justify-content: center;
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
		text-align: left;
		display: inline-block;
		width: 100%;
	}

	.uni-domain-list .uni-pt {
		color: #909090;
		flex-grow: 2;
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
