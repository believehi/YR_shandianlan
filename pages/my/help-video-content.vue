<template>
	<view>
		<view class="video-content">
			<view class="video-title">
				<text>{{PlanArray.Title}}</text>
			</view>
			<video :src="PlanArray.Viedio" controls></video>
			<view class="uni-help-text-but" @click="openhelptext">
				<uni-icon class='uni-zps-icon'></uni-icon>
				<text>查看图片版本</text>
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
							"Type":1
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
			},
			openhelptext(){
			   	uni.redirectTo({
			   		url: 'help-text'
			   	});
			}
		}
	}
</script>

<style>
	.video-content{width: 700upx;margin: 0 auto;}
	.video-content video{width: 700upx;height: 390upx;border-radius: 20upx;}
	.video-content .video-title{margin: 25upx 0;font-size: 32upx;}
	.uni-help-text-but{display: flex;align-items: center;margin-top: 10upx;}
	.uni-help-text-but text{font-size: 30upx;color: #29b2c6;margin-left: 15upx;}
</style>
