<template>
	<view class="content">
		<view class="uni-but-item uni-zp-but" @click="opentext">
			<image src="../../static/zpicon.png" ></image>
			<view class="">
				<text>图片版</text>
			</view>
		</view>
		<view class="uni-but-item uni-sp-but" @click="openvideo">
			<image src="../../static/spicon.png"></image>
			<view class="">
				<text>视频版</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			opentext(){                       //打开图文版
				uni.navigateTo({
					url: 'help-text',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openvideo(){                       //打开视屏版
				uni.navigateTo({
					url: 'help-video',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	.content{display: flex;justify-content: center;padding-top:55upx;height: 1150upx;}
	.uni-but-item{width: 270upx;height: 210upx;background-color: #ffffff;border-radius: 20upx;text-align: center;padding-top: 60upx;}
	.uni-but-item:last-child{margin-left: 60upx;}
	.uni-zp-but image{width: 104upx;height: 84upx;}
	.uni-sp-but image{width: 84upx;height: 80upx;}
	.uni-sp-but view{width: 100%;line-height: 70upx;}
	.uni-zp-but view{width: 100%;line-height: 62upx;}
</style>
