<template>
	<view class="content">
		<!-- 收入记录 -->
		<view @click="openshouchang">
			<text>收支明细</text>
			<uni-icon  class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 提现记录 -->
		<view @click="opentixian">
			<text>提现记录</text>
			<uni-icon  class="iconfont-2 icon-you"></uni-icon>
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
			openshouchang(){                //打开收入记录
				uni.navigateTo({
					url: 'myincome',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			opentixian(){                    //打开提现记录
				uni.navigateTo({
					url: 'mytixian',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.content{padding-top: 15upx;height: 1200upx;}
	.content view{padding:25upx 25upx 25upx 30upx;background: #FFFFFF;margin-bottom: 15upx;display: flex;align-items: center;justify-content: space-between;}
	.content view text{font-size: 32upx;}
</style>
