<template>
	<view class="content">
		<!-- 修改手机号 -->
		<view @click="openxiugai" >
			<text>修改手机号</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 修改密码 -->
		<view @click="amendpassword">
			<text>修改密码</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 重置密码 -->
		<view @click="Fillgpassword">
			<text>重置密码</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
			};
		},
		methods: {	
			// 绑定手机号
			Fillphone(){
				uni.navigateTo({
					url: 'Tiephone',
				})
			},
			openxiugai() { //打开修改手机号
				uni.navigateTo({
					url: 'Changephone',
				});
			},
			amendpassword() { //打开修改密码
				uni.navigateTo({
					url: 'Changepassword',
				});
			},
			Fillgpassword() { //打开填写密码
				uni.navigateTo({
					url: 'MerResetpass',
				});
			}

		}
	}
</script>

<style>
	.lqactive{display: none;}
	.content {
		padding-top: 15upx;
		height: 1200upx;
	}

	.content view {
		padding: 25upx 25upx 25upx 30upx;
		background: #FFFFFF;
		margin-bottom: 15upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content view text {
		font-size: 32upx;
	}
</style>
