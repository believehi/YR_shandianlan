<template>
	<view class="content">
		<view class="uni-password-but">
		<form @submit="formSubmit" @reset="formReset">
			<input type="text" value="" password="" placeholder="请输入新密码"/>
			<input type="text" value="" password="" placeholder="请确认新密码"/>
			<button type="primary">提交</button>
		</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.content{height: 1200upx;}
	.uni-password-but{margin: 0upx auto;width: 700upx;padding: 53upx 0;}
	.uni-password-but input{width: 655upx;height: 80upx;background-color: #ffffff;border-radius: 40px;border: solid 1px #dbdbdc;padding-left: 45upx;font-size: 32upx;margin-bottom: 25upx;}
	.uni-password-but button{margin-top: 75upx;border-radius: 40upx;background-color: #ffca30;font-size: 32upx;color: #3C3C3C;letter-spacing: 2upx;}

</style>
