<template>
	<view class="content">
		<view class="uni-content">
			<view class="uni-title">
				<text class="uni-title-1">{{PlanArray.Title}}</text>
			</view>
			<view class="uni-text-content">
				<text>{{PlanArray.Pictures}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				time: '',
				PlanArray: ''
			};
		},
		onLoad(e) {
			this.xxscontent(e)
		},
		methods: {
			// 请求系统消息内容
			xxscontent(e) {
				uni.showLoading({
						title: "加载中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'help/gethelp',
						method: 'GET',
						data: helper.postdata({
							"id": e.bzid,
							"Type":2
						}),
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
			}
		}
	}
</script>

<style>
	.content {
		padding-top: 15upx;
		height: 1200upx;
	}

	.uni-content {
		width: 656upx;
		min-height: 1150upx;
		border-radius: 20upx;
		background: #FFFFFF;
		margin: 0 auto;
		padding: 0 22upx;
	}

	.uni-title {
		border-bottom: 1upx solid #E6E6E6;
		font-size: 32upx;
		color: #1a1a1a;
		text-align: center;
		padding-bottom: 15upx;
	}

	.uni-title-1 {
		padding: 20upx 0 15upx 0;
		display: inline-block;
	}

	.uni-title .uni-time {
		font-size: 26upx;
		text-align: right;
		color: #c6c6c6;
		margin-right: 10upx;
	}

	.uni-text-content {
		font-size: 30upx;
		color: #717171;  	
	}
	.uni-text-content text{
		 display: inline-block;
		 padding: 30upx 20upx;
		 word-wrap: break-word;
		 
	}
</style>
