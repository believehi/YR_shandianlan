<template>
	<view class="content">
		<!-- 修改手机号 -->
		<view :style="{display:array == 1  ? 'flex' : 'none' }" @click="openxiugai" >
			<text>修改手机号</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 绑定手机号 -->
		<view  :style="{display:array == 0  ? 'flex' : 'none' }" @click="Fillphone">
			<text>绑定手机号</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 修改密码 -->
		<view :style="{display:ispws == 1  ? 'flex' : 'none' }" @click="amendpassword">
			<text>修改密码</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
		<!-- 填写密码 -->
		<view :style="{display:ispws == 0  ? 'flex' : 'none' }" @click="Fillgpassword">
			<text>填写密码</text>
			<uni-icon class="iconfont-2 icon-you"></uni-icon>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				array:'',
				ispws:'',
				Phonetext:''
			};
		},
		onLoad(){
			this.Isphone()
		},
		onShow(){
			this.Isphone()
		},
		methods: {
			// 判断用户是否绑定手机号和用户是否有密码、
			Isphone() {
				uni.request({
					url: helper.websiteUrl+'usercenter/account',
					method: 'GET',
					data: helper.postdata({
						"id": helper.getstate().userid,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.array = res.data.data.baseinfo.isphone 
							this.ispws = res.data.data.baseinfo.ispw
						} else{
							
						}
					},
					fail: () => {},
				});
			},
			// 绑定手机号
			Fillphone(){
				uni.navigateTo({
					url: 'Tiephone',
				})
			},
			openxiugai() { //打开修改手机号
				uni.navigateTo({
					url: 'xiugaiphone',
				});
			},
			amendpassword() { //打开修改密码
				uni.navigateTo({
					url: 'xiugaipassword',
				});
			},
			Fillgpassword() { //打开填写密码
				uni.navigateTo({
					url: 'tianxiepassword',
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
