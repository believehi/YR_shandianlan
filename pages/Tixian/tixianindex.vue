<template>
	<view class="content">
		<!-- 微信提现 -->
		<view class="uni-but-itme" @tap="wxtixianbut">
			<uni-icon class='uni-wxs-icon'></uni-icon>
			<text>微信提现</text>
			<uni-icon  class="iconfont icon-you"></uni-icon>
		</view>
		<!-- 支付宝提现 -->
		<view class="uni-but-itme" @tap="aliplaybut">
			<uni-icon class='uni-ali-icon'></uni-icon>
			<text>支付宝提现</text>
			<uni-icon  class="iconfont icon-you"></uni-icon>
		</view>
		<!--提现须知-->
		<view class="uni-tx-content">
			<text class="uni-tx-notice">提现须知：</text>
			<text>1、提现需要3个工作日审核后到账</text>
			<text>2、需要绑定手机号和微信才可以提现</text>
			<text>3、太阳币相当于您的余额，1太阳币=1元</text>
			<text>4、如果有问题请联系客服反映</text>
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
			wxtixianbut(){
				uni.navigateTo({
					url: 'wxtixian',
				});
			},
			aliplaybut(){
				uni.navigateTo({
					url: 'aliplaytixian',
				});
			}
		}
		
	}
</script>

<style>
	.content{padding-top: 15upx;height: 1200upx;}
	.uni-but-itme{background: white;padding: 0 44upx 0 40upx;width: 666upx;margin-bottom: 15upx;height: 90upx;display: flex;align-items: center;justify-content:  flex-start;}
	.uni-but-itme text{font-size: 34upx;color: #1a1a1a;margin-left: 22upx;}
	.uni-but-itme uni-icon{text-align: right;}
	.uni-but-itme .icon-you{flex-grow: 4;}
	.uni-tx-content{display: flex;flex-direction:column;font-size: 30upx;color: #4a4a4a;padding-left: 40upx;line-height: 46upx;}
	.uni-tx-content .uni-tx-notice{font-size: 32upx;color: #fb8d44;margin:50upx 0 25upx 0;}
</style>
