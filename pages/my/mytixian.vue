<template>
	<view class="content">
		<view class="uni-tx-title">
			<text>金额</text>
			<text>时间</text>
			<text>路径</text>
			<text>状态</text>
		</view>
		<view class="uni-tx-content">
			<view class="uni-tx-item"  v-for="(item,index) in userfoArray" :key="index">
				<text class="uni-tx-sum">{{item.Amount}}元</text>
				<text class="uni-tx-time">{{item.CreateDate}}</text>
				<text class="uni-tx-lj">{{item.Remark}}</text>
				<text class="uni-tx-zt">审核中</text>
			</view>
			<text  :class="{tisi:tishi == '暂无提现记录'}" >{{tishi}}</text>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				userfoArray:'',
				num: '13',        //默认显示9条任务数据
				tishi:''
			};
		},
		onLoad() {
			this.srlist()
		},
		onPullDownRefresh: function() { //下拉刷新
			this.srlist(true);
		},
		//触底事件
		onReachBottom() {                     
			var tas1 = new String('5');         //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.srlist();
		},
		methods: {
			srlist() {
				uni.showLoading({
					title: "加载中.....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + '/withdrawals/getlist',
					method: 'GET',
					data: helper.postdata({
						"userid": helper.getstate().userid,
						"page": "1",
						"num":  this.num,
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							uni.stopPullDownRefresh(); //刷新停止
							this.userfoArray = res.data.data.baseinfo;
							if (this.userfoArray=="") {
								this.tishi = '暂无提现记录'
							} else{
								this.tishi = ''
							}
						}else{
							uni.showToast({
								icon: 'none',
								title: '网络异常,请下拉刷新重试！'
							});
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请下拉刷新重试！'
						});
					},
				});

			}
		}
	}
</script>

<style>
	.content{height: 1200upx;}
	.tisi{
		padding: 80upx 0 !important;
	}
	.uni-tx-title{font-size: 32upx;color: #606060;width: 656upx;margin: 0 auto;padding: 20upx 0;}
	.uni-tx-title text:first-child{width: 20%;}
	.uni-tx-title text:nth-child(2){width: 40%;}
	.uni-tx-title text:nth-child(3){width: 20%;}
	.uni-tx-title text:nth-child(4){width: 20%;}
	.uni-tx-title text{text-align: center;display: inline-block;}
	.uni-tx-content{width: 656upx;background: #FFFFFF;border-radius: 20upx;margin: 0 auto;padding: 0 22upx;}
	.uni-tx-item{display: flex;justify-content: center;border-bottom: 1upx solid #e6e6e6;align-items: flex-end;font-size: 30upx;padding: 20upx 0;display:flex;justify-content: space-between;text-align: center;align-items: center;}
	.uni-tx-item:last-child{border-bottom: none;}
	.uni-tx-sum{width: 20%;}
	.uni-tx-time{font-size: 28upx;color: #969696;width: 40%;}
	.uni-tx-lj{font-size: 30upx;color: #969696;width: 20%;}
	.uni-tx-zt{font-size: 30upx;color:#525252;width: 20%;}
</style>
