<template>
	<view>
		<!-- 提现金额按钮 -->
		<view>
			<text class="uni-zf-text uni-text">选择充值金额</text>
			<view class="uni-tx-but">
				<text :class="{active:AmountArray[index].ID == Id}" v-for="(item,index) in AmountArray" :key="index" :id="AmountArray[index].ID"
				 @click="open">{{AmountArray[index].Amount}}</text>
			</view>
			<view class="content">
				<text class="uni-zf-text">选择支付方式</text>
				<!-- 选择支付方式 -->
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-radio">
							<uni-icon class='uni-wxs-icon'></uni-icon>
							<uni-icon type=""></uni-icon>
							<text>微信</text>
							<view>
								<radio value="1" />
							</view>
						</label>
						
					</radio-group>
				</view>
				<!-- 确认充值-->
				<button class="uni-cz-but" @tap="recharge">确认充值</button>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				userfoArray:'',
				AmountArray: [],
				paymentid:'',
				Id: '',
				type:"",
				current: '1',
				items: [{
						value: '1',
					}, {
						value: '2',
					},
					{
						value: '3',
					},
				]
			};
		},
		onLoad() {
			this.userinfo()
		},
		onShow() {

		},
		methods: {
			open(e) {;
				this.Id = e.currentTarget.id
			},
			// 选择支付平台
			radioChange: function(evt) {
				this.type=evt.target.value
			},
			// 获取金额列表
			userinfo() {
				uni.request({
					url: helper.websiteUrl + 'yiru/sdl/translation/gettranslation',
					method: 'GET',
					data: helper.postdata({
					}),
					success: res => {
						 console.log(res)
						if (res.data.code == 200) {
							this.userfoArray = res.data.data.Member;
							
							this.AmountArray = res.data.data.baseinfo;
							this.paymentid = res.data.data.baseinfo.ID;
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
				if (this.Id == '') {
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
							"type": "2",
							"paymentid": this.Id,
						}),
						success: res => {
							if (res.data.code == 200) {
								this.liebiao()
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
			},
			
			recharge(){
				console.log("充值")
				if(this.Id==''){
					uni.showToast({
						icon: 'none',
						title: '请选择充值金额！'
					});
				}else if(this.type==''){
					uni.showToast({
						icon: 'none',
						title: '请选择支付平台！'
					})
				}else{
					
					uni.request({
							url: helper.websiteUrl + 'yiru/sdl/translation/savetranslation',
							method: 'GET',
							data: helper.postdata({
								"tid": this.Id,
								"type": this.type,
								"mid":helper.getstate().userid,
							}),
							success: res => {
								if (res.data.code == 200) {
									this.liebiao()
									uni.showToast({
										icon: 'none',
										title: res.data.info
									});
									
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.info
									});
								}
								this.Id='',
								this.type=''
								
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
		background-color: #2FB6A7 !important;
		color: #FFFFFF !important;
	}

	.uni-cz-but {
		width: 700upx;
		background: #2FB6A7;
		border-radius: 20upx;
		line-height: 80upx;
		color: #FFFFFF;
		margin-top: 140upx;
	}

	.uni-tx-but {
		margin-top: 22upx;
	}

	.uni-text {
		background: #EEEEEE;
		width: 100%;
		height: 75upx;
		display: inline-block;
	}

	.content {
		height: 1010upx;
	}

	.uni-zf-text {
		font-size: 26upx;
		line-height: 75upx;
		padding-left: 25upx;
		color: #4a4a4a;
	}

	.uni-list-radio {
		display: flex;
		align-items: center;
	}

	radio .wx-radio-input {
		position: absolute;
		width: 35upx;
		height: 35upx;
		background: url(http://lx97.cn/static/dui.png) no-repeat center;
		background-size: 35upx 35upx;
		border-radius: 50%;
		box-sizing: border-box;
	}

	radio .wx-radio-input.wx-radio-input-checked {
		background: url(http://lx97.cn/static/duis.png) no-repeat center;
		overflow: hidden;
		background-color: #FFFFFF;
		box-sizing: border-box;
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
		color: #CCCCCC;
		width: 220upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 15upx;
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

	.uni-list {
		background: #FFFFFF;
		padding: 0 25upx;
	}

	.uni-list .uni-list-radio {
		border-bottom: 1px solid #e6e6e6;
		font-size: 28upx;
		height: 90upx;
		position: relative;
	}

	.uni-list .uni-list-radio text {
		margin-left: 15upx;
		color: #1a1a1a;
	}

	.uni-list .uni-list-radio radio {
		position: absolute;
		right: 50upx;
		top: 20upx;
	}
</style>
