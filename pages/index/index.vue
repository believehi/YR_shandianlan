<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="uni-card-header">
			<view class="uni-card-content">
				<view class="uni-user-content">
					<view class="uni-user-img">
						<!-- 用户头像 -->
						<image :src="baseinfoArray.headimgurl"></image>
						<!-- 用户昵称 -->
						<text class="uni-user-name">{{baseinfoArray.nikename}}</text>
					</view>
					<!-- 用户太阳币数量 -->
					<view class="col uni-Taiyanbi">
						<view class="Qian_icon"></view>
						<text>{{baseinfoArray.suncoin}}</text>
					</view>
					<!-- 用户收益 -->
					<view class="uni-shouyi col">
						<text>今日收益：{{baseinfoArray.todayIncome}}<text class='uni-fgx'></text></text>
						<text>累计收益：{{baseinfoArray.cumulative}}</text>
					</view>
					<!-- 提现按钮 -->
					<view class="uni-Tx-But">
						<button type="primary" @tap="openTixian">提现</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户信息结束 -->
		<!-- 活动信息 -->
		<view class="uni-hd-content">
			<!-- 活动图片 -->
			<view class="uni-hd-img col">
				<image src="../../static/index1.jpg" mode=""></image>
				<image src="../../static/index2.jpg" mode=""></image>
			</view>
			<!-- 按钮 -->
			<view class="uni-but-list">
				<view class="uni-rw uni-but" @click="openmytask">
					<uni-icon class="uni-rw-but"></uni-icon>
					<view>
						<text>我的任务</text>
					</view>
				</view>
				<view class="uni-bw uni-but" @click="openbawangcan">
					<uni-icon class="uni-bw-but"></uni-icon>
					<view>
						<text>霸王餐</text>
					</view>
				</view>
				<view class="uni-lq uni-but" @click="openJianli">
					<uni-icon class="uni-lq-but"></uni-icon>
					<view>
						<text>领取奖励</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动信息结束 -->
		<!-- 任务领取 -->
		<view class="uni-rw-list" v-for="(item,index) in renwuArray" :key="index">
			<view class="uni-rw-cont" @tap="openinfo" :data-rwid="item.ID">
				<image :src="item.thumbnail"></image>
				<view class="uni-rw-text">
					<text class="Text_Nowrap">{{item.TaskName}}</text>
					<view class="uni-rw-sl">
						<view>{{item.PeopleMin}}-{{item.PeopleMax}}人</view>
						<view>{{item.Days}}内</view>
						<view>还剩<text class="uni-sy">{{item.Surplus}}</text>份</view>
					</view>
				</view>
				<button type="primary" :id="item.IsGet" @click="openid" :class="{butactive:item.IsGet > 0 }">{{ item.IsGet > 0 ? '已领取' : '领取' }}</button>
			</view>
		</view>
		<!-- 任务领取结束-->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				baseinfoArray: {},
				renwuArray: {},
			};
		},
		onLoad() {
			this.getdata();
		},
		onPullDownRefresh: function() { //下拉刷新
			this.getdata(true);
		},
		onShow() {
			this.getdata()
		},
		methods: {
			getdata(isdown) {
				helper.islogin(true);
				uni.showLoading({
					mask: true
				})
				var userId = helper.getstate().userid;
				uni.request({
					url: helper.websiteUrl + '/index/getindex',
					method: 'GET',
					data: helper.postdata({
						userid: userId,
						page: 1,
						num: 10,
						category: '',
						istop: 1
					}),
					success: (res) => {
						if (res.data.code == 200) {
							
							this.baseinfoArray = res.data.data.baseinfo;
							this.renwuArray = res.data.data.tasklist;
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}

						if (res.data.data.tasklist.IsGet > 0) { //该任务用户是否已经领取过
							this.IsGet = '已领取'
						} else {
							this.IsGet = '领取'
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
					complete: () => {
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			openTixian() { //打开提现页面
				uni.navigateTo({
					url: '../Tixian/tixianindex',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openJianli() { //打开领取奖励页面
				uni.navigateTo({
					url: 'lingqujiangli',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openbawangcan() { //打开霸王餐页面
				uni.navigateTo({
					url: 'bawangcan',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openmytask() { //打开我的任务页面
				uni.navigateTo({
					url: '../task/mytask',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openinfo(e) {
				uni.navigateTo({
					url: '../task/Taskdetails?rwid=' + e.currentTarget.dataset.rwid
				});
			}
		}
	}
</script>
<style>
	/* 用户信息 */
	.uni-card-header {
		background: #f4c336;
		height: 130upx;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.uni-card-content {
		padding: 10upx 30upx 20upx 50upx;
		width: 620upx;
		height: 215upx;
		background: red;
		background-color: #ffffff;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.06);
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		border-bottom-left-radius: 20upx;
		border-bottom-right-radius: 20upx;
		position: relative;
	}

	.uni-user-img {
		align-content: stretch;
		display: flex;
	}

	.uni-Taiyanbi {
		align-items: center;
		margin: 24upx 0;
	}

	.uni-Taiyanbi text {
		font-size: 45upx;
		color: #fb8d44;
		margin-left: 20upx;
	}

	.uni-user-img image {
		width: 63upx;
		height: 63upx;
		border-radius: 50%;
	}

	.uni-user-img text {
		margin-top: 14upx;
		font-size: 31upx;
		color: #606060;
		margin-left: 15upx;
	}

	.uni-Tx-But button {
		height: 52upx;
		border-radius: 25upx;
		font-size: 28upx;
		line-height: 52upx;
		background-color: #fb8d44;
		border: none;
		font-family: SourceHanSansSC-Regular;
		width: 115upx;
		position: absolute;
		top: 73upx;
		right: 38upx;
		padding: 0 15upx;
	}

	.uni-shouyi {
		font-size: 24upx;
		color: #b6b6b6;
	}

	.uni-rw-sl vie .uni-fgx:after {
		content: "";
		width: 1upx;
		height: 16upx;
		position: absolute;
		top: 13upx;
		right: 0%;
		background: #b6b6b6;
	}

	.uni-shouyi text:nth-child(1) {
		padding-right: 25upx;
		position: relative;
		display: inline-block;
	}

	.uni-shouyi text:nth-child(2) {
		padding-left: 35upx;
	}

	/* 活动信息 */
	.uni-hd-content {
		padding-top: 137upx;
	}

	.uni-but-list {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding: 45upx 0;
	}

	.uni-but-list .uni-but {
		width: 33.33%;
		text-align: center;
	}

	.uni-but-list .uni-but view {
		margin-top: -16upx;
	}

	.uni-but-list .uni-but view text {
		color: #111a35;
		line-height: 0upx;
		font-size: 24upx;
	}

	.uni-hd-img {
		display: flex;
		justify-content: center;
	}

	.uni-hd-img image {
		width: 337upx;
		height: 186upx;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.06);
		border-radius: 20upx;
	}

	.uni-hd-img image:nth-child(1) {
		margin-right: 25upx;
	}
</style>
