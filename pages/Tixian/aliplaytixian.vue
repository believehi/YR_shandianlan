<template>
	<view class="">
		<!-- 用户可提现的金额 -->
		<view class="uni-tx-sum">
			<text>可提现金额：</text>
			<text class="tx-sum">{{userfoArray.suncoin}}太阳币</text>
			<text class="uni-tx-gz">1太阳币=1元</text>
		</view>
		<!-- 用户账户信息 -->
		<view class="uni-user-content">
			<text>姓名:{{userfoArray.truename}}</text>
			<text>支付宝账户:{{userfoArray.alipay}}</text>
		</view>
		<!-- 提现金额按钮 -->
		<view class="">
			<view class="uni-tx-but">
				<text :class="{active:AmountArray[index].ID == Id}" v-for="(item,index) in AmountArray" :key="index" :id="AmountArray[index].ID"
				 @click="open">{{AmountArray[index].Amount}}</text>
			</view>
			<button @click="tixian" class="uni-but">提交</button>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				userfoArray: '',
				AmountArray: '',
				Id: '',
				paymentid: "",
			};
		},
		onLoad() {
			this.userinfo();
			
		},

		methods: {
			open(e) {;
				this.Id = e.currentTarget.id
			},
			// 获取金额列表
			userinfo() {
				uni.request({
					url: helper.websiteUrl + 'withdrawals/getpaymentlist',
					method: 'GET',
					data: helper.postdata({
						"userid": helper.getstate().userid,
						"type": "1"
					}),
					success: res => {
						if (res.data.code == 200) {
							this.userfoArray = res.data.data.Member;
							this.AmountArray = res.data.data.baseinfo;
							this.paymentid = res.data.data.baseinfo.ID;
							if (this.userfoArray.alipay == null) {
								this.userfoArray.alipay ='请填写账号';			
							}
							if(this.userfoArray.truename == ''){
								this.userfoArray.truename ='请填写姓名';
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
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
			tixian() {
				if (this.userfoArray.alipay == "请填写账号") {
					uni.showToast({
						icon: 'none',
						title: '请填写账号！'
					});
				}else if (this.Id == '') {
					uni.showToast({
						icon: 'none',
						title: '请选择提现金额！'
					});
				} else {
					uni.request({
						url: helper.websiteUrl + '/withdrawals/savewithdrawals',
						method: 'GET',
						data: helper.postdata({
							"userid": helper.getstate().userid,
							"type": "1",
							"paymentid": this.Id,
						}),
						success: res => {
							if (res.data.code == 200) {
								helper.goout(res.data.info);
								uni.showToast({
									icon: 'none',
									title: res.data.info
								});
								this.userinfo()
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

	}
</script>

<style>
	.active {
		background-color: #ffca2f !important;
		color: #FFFFFF  !important;
	}

	.uni-tx-sum {
		font-size: 32upx;
		color: #1a1a1a;
		padding: 0 40upx 0 36upx;
		display: flex;
		justify-content: space-between;
		background: #ebebeb;
		height: 90upx;
		align-items: center;
	}

	.uni-tx-sum .tx-sum {
		color: #fb8d44;
		flex-grow: 2;
	}

	.uni-tx-sum .uni-tx-gz {
		text-align: right;
		color: #a7a7a7;
	}

	.uni-user-content {
		font-size: 32upx;
		color: #A7A7A7;
		margin-left: 36upx;
		padding: 40upx 0;
	}

	.uni-user-content text:last-child {
		margin-left: 32upx;
	}

	.uni-tx-but {
		display: flex;
		padding: 0 25upx;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.uni-tx-but text {
		font-size: 28upx;
		color: #1a1a1a;
		width: 220upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 15upx;
		border: 1px solid #fbb42d;
		background: white;
		margin-bottom: 22upx;
		text-align: center;
		margin-right: 10upx;
		display: inline-block;

	}


	.button-hover {
		background-color: rgba(55, 44, 144, 0.1);
		opacity: 0.7;
	}

	.uni-but {
		margin: 0 25upx;
		background: #fbb42b;
		border-radius: 20upx;
		color: #ffffff;
		font-size: 38upx;
		margin-top: 170upx;
	}
</style>
