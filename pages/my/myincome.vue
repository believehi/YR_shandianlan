<template>
	<view class="content">
		<view class="uni-inconme-content">
			<view class="uni-inconme col"  v-for="(item,index) in userfoArray" :key="index">
				<view>
					<text class="uni-inconme-tit">{{item.Remark}}</text>
					<view class="uni-time">
						<text>{{item.CreateDate}}</text>
					</view>
				</view>
				<view class="uni-tyb">
					<text>+{{item.Amount}}太阳币</text>
				</view>
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
				num: '13',        //默认显示9条任务数据
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
					url: helper.websiteUrl + '/reward/getlist',
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
						}
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
	.content {
		padding-top: 15upx;
		height: 1200upx;
	}

	.uni-inconme-content {
		width: 650upx;
		border-radius: 20upx;
		min-height: 1275upx;
		background: #FFFFFF;
		margin: 0 auto;
		padding: 0 25upx;
	}

	.uni-inconme {
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #676767;
		font-size: 30upx;
		justify-content: space-between;
		padding: 25upx 0;
		color: #676767;
	}

	.uni-inconme:last-child {
		border-bottom: none;
	}

	.uni-inconme-tit {
		width: 371upx;
		flex-wrap: wrap;
		display: inline-block;
		line-height: 34upx;
	}

	.uni-time {
		font-size: 26upx;
	}

	.uni-tyb text {
		color: #fe4c4c;
		margin-right: 10upx;
	}
</style>
