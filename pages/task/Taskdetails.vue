<template>
	<view class="content">
		<view class="uni-rw-time">
			<view class="uni-rw-title">
				<text>{{rwArray.TaskName}}</text>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务说明：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.explain}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">任务要求：</view>
				<view class="uni-rw-yq">
					<text>{{rwArray.Requirement}}人</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家名称：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Merchant}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">商家位置：</view>
				<view class="uni-rw-m">
					<text>{{rwArray.Position}}</text>
				</view>
			</view>
			<view class="uni-rw-ms col">
				<view class="uni-rw-sm">商家照片：</view>
				<view class="uni-rw-m">
					<image :src="item" mode=""  v-for="(item,index) in Merimg" :key="index"></image>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">日期选择</view>
			</view>
			<view class="uni-time-list">
				<view class="uni-time-item" :id='item.monthday' :class="{active:item.monthday ==isActive}" @click="active" v-for="(item,index) in choosedaylist"
				 :key="index">
					<text>{{item.cndes}}</text>
					<text>{{item.monthday}}</text>
				</view>
			</view>
		</view>
		<view class="uni-rw-time">
			<view class="uni-rw-ms col uni-sj-wz">
				<view class="uni-rw-sm">操作步骤</view>
			</view>
			<view class="uni-cz-bz" v-for="(item,index) in rwbzArray" :key="index">
				<text>{{item}}</text>
			</view>
		</view>
		<view class="uni-but-item">
			<view class="uni-sc-but" :class="{lqactives:rwArray.CState > 0 }" @click="scbut" :data-id="rwArray.CState">
				<uni-icon class='uni-x1-icon'></uni-icon>
				<text>{{rwArray.CState > 0  ? '取消收藏' : '收藏任务' }}</text>
			</view>
			<view class="uni-lqs-but" :id="rwArray.RState" :class="{lqactive:rwArray.RState > 0 }" @click="lqbut">
				<text>{{rwArray.RState > 0  ? '已领取' : '领取任务' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	var _self;
	export default {
		data() {
			return {
				shows: 0,
				rwArray: [
					{
						ID:0,
						TaskName:"小龙坎美团五星好评送五折卷",
						PeopleMin:1,
						PeopleMax:2,
						Days:5,
						Surplus:21
					},
					{
						ID:1,
						TaskName:"西贝美团五星好评送五折卷",
						PeopleMin:1,
						PeopleMax:2,
						Days:5,
						Surplus:21
					},
					{
						ID:2,
						TaskName:"小龙坎美团五星好评送五折卷",
						PeopleMin:1,
						PeopleMax:2,
						Days:5,
						Surplus:21
					}
					
				],
				rwbzArray: {},
				rwid: '',
				tisi: '',
				tisis: '',
				TaskId: '',
				choosedaylist: [],
				isActive: -1,
				activedata:'',
				date:'',
				Merimg:[]

			}
		},
		onLoad(e) { //e接收任务的id
			// _self = this;
			// this.rwid = e.rwid;
			// this.rwlist(this.rwid);
			// helper.islogin(true);
		},
		methods: {
			//渲染任务列表
			rwlist(id) {
			// 	uni.showLoading({
			// 		title: "加载中....",
			// 		mask: true
			// 	})
			// 	uni.request({
			// 		url: helper.websiteUrl + 'task/gettask',
			// 		method: "GET",
			// 		data: helper.postdata({
			// 			id: id,
			// 			"userid": helper.getstate().userid,
			// 		}),
			// 		success: (res) => {
			// 			if (res.data.code == 200) {
			// 				var datetoday = new Date();
			// 				this.TaskId = res.data.data.baseinfo.TaskId;
			// 				this.rwArray = res.data.data.baseinfo;
			// 				this.rwbzArray = res.data.data.baseinfo.Instruction.split(";");
			// 				this.Merimg = res.data.data.baseinfo.Pictures.split(';');	
			// 				this.date = res.data.data.baseinfo.EndDate;
			// 				var endtimes = this.date.replace(/\-/g, "/")
			// 				var datetest = new Date(endtimes); //获取当前任务的结束时间 
			// 				var lazyday = parseInt(parseInt(datetest.getTime() - datetoday.getTime()) / (24 * 3600 * 1000)) + 1; //获取剩余天数
			// 				var maxday = lazyday > 5 ? 5 : lazyday;
			// 				var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			// 				for (var i = 0; i < maxday; i++) {
			// 					var chooseday = new Object();
			// 					var day = new Date((parseInt(datetoday.getTime()) + (24 * 3600 * 1000) * i));
			// 					if (i == 0) {
			// 						chooseday.cndes = "今天";
			// 						chooseday.monthday = day.getMonth() + 1 + "-" + day.getDate();
			// 					} else if (datetoday.getDay() + i > 6) {
			// 						chooseday.cndes = week[datetoday.getDay() + i - 7];
			// 						chooseday.monthday = day.getMonth() + 1 + "-" + (day.getDate());
			// 					} else {
			// 						chooseday.cndes = week[datetoday.getDay() + i];
			// 						chooseday.monthday = day.getMonth() + 1 + "-" + (day.getDate());
			// 					}
			// 					this.choosedaylist.push(chooseday);
			// 				}
			// 			} else {
			// 				helper.goout(res.data.info);
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: res.data.info
			// 				});
			// 			}
			// 			uni.hideLoading();
			// 		},
			// 		fail: (res) => {
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '网络异常,请下拉刷新重试！'
			// 			});
			// 		}
			// 	})
			},
			// 领取按钮
			lqbut(e) {
				this.choosedaylist.length = 0;
				this.rwlist(this.rwid)
				var newdata = new Date();
				var RState = this.rwArray.RState;
				var RStatetxt = RState > 0 ? "取消" : "领取";
				if (this.activedata=='') {
					uni.showToast({
						icon: 'none',
						title: '请选择日期！'
					});
				} else{
					uni.request({
						url: helper.websiteUrl + 'task/ReceiveTask',
						method: 'GET',
						data: helper.postdata({
							"taskid": this.rwid,
							"userid": helper.getstate().userid,
							"receivedate":this.activedata,
							"type": "1",
							"CState": RState > 0 ? "0" : "1"
						}),
						success: res => {
							if (res.data.code == 200) {
								
								this.choosedaylist.length = 0;
								this.rwlist(this.rwid);
								uni.showToast({
									title: RStatetxt + "成功。"
								});
							} else {
								helper.goout(res.data.info);
								uni.showModal({
									title: '提示',
									content:  res.data.info,
									showCancel: false,
									confirmText: "关闭",
								});
							}
						},
						fail: () => {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '网络异常,请重试！'
							});
						},
					});
				}
			},
			//收藏按钮
			scbut() {
				this.choosedaylist.length = 0;
				var cstate = this.rwArray.CState;
				var cstatetxt = cstate > 0 ? "取消" : "收藏";
				uni.request({
					url: helper.websiteUrl + 'task/ReceiveTask',
					method: 'GET',
					data: helper.postdata({
						"taskid": _self.rwid,
						"userid": helper.getstate().userid,
						"type": "2",
						"CState": cstate > 0 ? "0" : "1"
					}),
					success: res => {
						
						if (res.data.code == 200) {
							
							this.rwlist(this.rwid);
							uni.showToast({
								title: cstatetxt + "成功。"
							});

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
							title: '网络异常,请重试！'
						});
					},
				});
			},
			// 日期选中状态
			active(e) {
				this.isActive = e.currentTarget.id;
				this.activedata = e.currentTarget.id;
			}
		}
	}
</script>

<style>
	view {
		line-height: 35upx;
	}

	.content {
		padding-top: 15upx;
		padding-bottom: 107upx;
	}

	.uni-rw-time {
		background-color: #FFFFFF;
		padding: 0 25upx;
		width: 700upx;
		margin-top: 15upx;
	}

	.uni-rw-time .uni-rw-title {
		text-align: center;
		font-size: 32upx;
		color: #0b0b0b;
		padding: 20upx 0;
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-ms {
		display: flex;
		font-size: 30upx;
		padding: 25upx 0;
	}

	.uni-rw-ms .uni-rw-sm {
		width: 154upx;
		color: #212121;
	}

	.uni-rw-ms .uni-rw-m {
		flex-grow: 2;
		width: 565upx;
		text-align: justify;
		color: #616161;
	}

	.uni-rw-yq {
		color: #f3571a;
	}

	.uni-rw-yq text:first-child {
		margin-right: 40upx;
	}

	.uni-sj-wz {
		border-bottom: 1upx solid #e6e6e6;
	}

	.uni-rw-m image {
		width: 267upx;
		height: 178upx;
		margin-top: 10upx;
	}

	.uni-rw-m image:first-child {
		margin-right: 15upx;
	}

	.uni-cz-bz text:first-child {
		margin-top: 25upx;
	}

	.uni-cz-bz text {
		font-size: 30upx;
		color: #616161;
		display: inline-block;
		margin-bottom: 25upx;
	}

	.uni-time-list {
		display: flex;
		justify-content: flex-start;
	}

	.uni-time-item {
		font-size: 30upx;
		color: #212121;
		width: 20%;
		flex-wrap: nowrap;
		text-align: center;
	}

	.uni-time-item text {
		display: inline-block;
		width: 100%;
		margin-bottom: 15upx;
	}

	.uni-time-item text:first-child {
		margin-top: 15upx;
	}

	.active {
		border-bottom: 2upx solid #fbb42b;
		color: #fbb42b;
	}

	.uni-but-item {
		position: fixed;
		bottom: 0;
		display: flex;
	}

	.uni-but-item view {
		width: 375upx;
		text-align: center;
		line-height: 107upx;
		font-size: 32upx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.uni-but-item uni-icon {
		margin-right: 10upx;
		background: url(http://lx97.cn/static/x1.png) no-repeat center;
		background-size: 43upx 41upx;
		width: 43upx;
		height: 41upx;
		display: inline-block;
	}

	.uni-but-item text {
		margin-top: 5upx;
	}

	.uni-but-item .uni-sc-but {
		background-color: white;
		color: #b3b3b3;
		border: 1upx solid #bfbfbf
	}

	.uni-but-item .uni-lqs-but {
		background-color: #fbb42b;
	}
</style>
