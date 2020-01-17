<template>
	<page>
		<view class="content">
			<view class="uni-but-itme" @tap="dazhong">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>大众</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="meituan">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>美团</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="xiaohongshu">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>小红书</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="qq">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>QQ</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="weibo">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>微博</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="douyin">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>抖音</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
			<view class="uni-but-itme" @tap="weixin">
				<!-- 				<uni-icon class='uni-ali-icon'></uni-icon> -->
				<text>微信</text>
				<uni-icon class="iconfont icon-you"></uni-icon>
			</view>
		</view>
	</page>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
			
			};
		},
		methods: {
			// 打开大众
			dazhong() {
				uni.navigateTo({
					url: 'dazhong'
				});
			},
			// 打开小红书
			xiaohongshu() {
				uni.navigateTo({
					url: 'xiaohongshu'
				});
			},
			// 打开qq
			qq() {
				uni.navigateTo({
					url: 'QQ'
				});
			},
			// 打开美团
			meituan() {
				uni.navigateTo({
					url: 'meituan'
				});
			},
			// 打开微博
			weibo() {
				uni.navigateTo({
					url: 'weibo'
				});
			},
			// 打开抖音
			douyin() {
				uni.navigateTo({
					url: 'douyin'
				});
			},
			// 打开微信
			weixin() {
				uni.navigateTo({
					url: 'weixin'
				});
			},
		},
	}
</script>


<style>
	.content {
		padding-top: 15upx;
	}

	.uni-but-itme {
		background: white;
		padding: 0 44upx 0 40upx;
		width: 666upx;
		margin-bottom: 15upx;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.uni-but-itme text {
		font-size: 34upx;
		color: #1a1a1a;
		margin-left: 5upx;
	}

	.uni-but-itme uni-icon {
		text-align: right;
	}

	.uni-but-itme .icon-you {
		flex-grow: 4;
	}

	.uni-tx-content {
		display: flex;
		flex-direction: column;
		font-size: 30upx;
		color: #4a4a4a;
		padding-left: 40upx;
		line-height: 46upx;
	}

	.uni-tx-content .uni-tx-notice {
		font-size: 32upx;
		color: #fb8d44;
		margin: 50upx 0 25upx 0;
	}
</style>
