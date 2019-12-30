<template>
	<view class="un-video-box">
	<view class="un-video-list">
		<view class="un-video-item" v-for="(item,index) in PlanArray" :key="index" :data-bzid="item.ID" @click="openfb">
			<image :src="item.Thumbnail" mode=""></image>
			<view class="un-video-text">
				<text class="Text_Nowrap">{{item.Title}}</text>
			</view>
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
			openfb(e) {
				uni.navigateTo({
					url: 'help-video-content?bzid=' + e.currentTarget.dataset.bzid 
				});
			},
		}
	}
</script>

<style>
	.un-video-box{padding-top: 27upx;}
	.un-video-list{display: flex;justify-content: space-between;flex-wrap: wrap ;padding: 0 15upx;}
	.un-video-item{margin-bottom: 40upx;}
	.un-video-item image{width: 329upx;height: 183upx;border-radius: 15upx;overflow: hidden;}
	.un-video-text text{width: 329upx;overflow: hidden;display: inline-block;}
	.un-video-item view text{font-size: 28upx;color: #3e3e3e;}
	.un-video-item view {line-height: 32upx;}
</style>
