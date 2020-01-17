<template>
	<view class="content">
		<view class="uni-jl-list">
			<view class="uni-jl-item">
				<text class="uni-jl">{{Dailylogin.TaskName}}</text>
				<button type="primary" @click="Lqbut" :data-Taskid="Dailylogin.ID" :data-States="Dailylogin.States" >{{Dailylogin.States == 2  ? '已领取' : '领取' }}</button>
			</view>
		</view>
		<view class="uni-jl-list uni-jl-list1">
			<view class="uni-jl-item" v-for="(item,index) in AwardArraylist" :data-Taskid="item.ID" :data-TaskName="item.TaskName"  :data-States="item.States" :key="index" @click="Lqbut">
				<text class="uni-jl">{{item.TaskName}}</text>
				<text class="uni-jl-sum">+ {{item.Reward}}闪电币</text>
				<uni-icon class="iconfont-2 icon-you"></uni-icon>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				AwardArraylist: [{
						TaskName: "绑定手机号奖励",
						Reward: 0.5
					},
					{
						TaskName: "绑定银行卡奖励",
						Reward: 0.5
					},
					{
						TaskName: "绑定支付宝奖励",
						Reward: 0.5
					},
					{
						TaskName: "绑定身份证奖励",
						Reward: 0.5
					},
				
				],
				Dailylogin:{
					TaskName:"每日登陆奖励",
					}, // 每日登录
				chooseday:'',
				tishi:'领取'
			};
		},
		onLoad() {
			// this.award()
		},
		methods: {			
			award() {
				var States = this.Dailylogin.States;
				uni.showLoading({
						title: "加载中....",
						mask: true
					}),
					uni.request({
						url: helper.websiteUrl + 'reward/getrewardlist',
						method: 'GET',
						data: helper.postdata({
							"userid": helper.getstate().userid,
						}),
						success: res => {	
							if (res.data.code == 200) {	
								uni.hideLoading()
								this.Dailylogin = res.data.data.userinfo;     //每日登陆	
								this.AwardArraylist =res.data.data.baseinfo			//奖励列表数组	
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
			},
			awards(e){
				uni.request({
					url: helper.websiteUrl + 'reward/savereward',
					method: 'GET',
					data: helper.postdata({
						"userid": helper.getstate().userid,
						"taskid":e.currentTarget.dataset.taskid
					}),
					success: res => {
						if (res.data.code == 200) {								
								uni.showToast({
									icon: 'none',
									title: '领取成功'
								});	
								this.Dailylogin.States = '2'
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
			},
			Lqbut(e){
				if (e.currentTarget.dataset.states== '0') {
					uni.showToast({
						icon: 'none',
						title: '请'+e.currentTarget.dataset.taskname
					});	
				} else if(e.currentTarget.dataset.states== '2'){
					uni.showToast({
						icon: 'none',
						title: '已领取奖励'
					});
					this.tishi='已领取'
				}else if(e.currentTarget.dataset.states== '1'){
					this.awards(e)
					this.tishi='已领取'
				}
			}
		
		}
	}
</script>

<style>
	.content {
		height: 1200upx;
		padding-top: 20upx;
	}

	.uni-jl-list {
		background-color: #FFFFFF;
	}

	.content .uni-jl-list:first-child {
		margin-bottom: 20upx;
	}

	.uni-jl-list .uni-jl-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 90upx;
		padding: 0 25upx;
		font-size: 30upx;
		background-color: #FFFFFF;
	}

	.uni-jl-list1 {
		background: #FFFFFF;
	}

	.uni-jl-list1 .uni-jl-item {
		border-bottom: 1upx solid #e6e6e6;
		width: 700upx;
		margin: 0 auto;
		padding: 0upx !important;
	}

	.uni-jl-list1 .uni-jl-item:last-child {
		border-bottom: none;
	}

	.uni-jl-item .uni-jl {
		flex-grow: 2;
	}

	.uni-jl-item .uni-jl-sum {
		font-size: 28upx;
		color: #2FB6A7;
	}

	.uni-jl-item button {
		height: 55upx;
		background-color: #2FB6A7;
		border-radius: 28upx;
		font-size: 30upx;
		color: #FFFFFF;
		line-height: 55upx;
	}
</style>
