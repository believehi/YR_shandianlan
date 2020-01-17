<template>
	<view class="content">
		<!-- 任务菜单选项导航 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
		<view class="content">
			<!-- 最新领取 -->
			<view v-show="current === 0">
				<view class="uni-ts-box" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-ts-item">
						<image :src="item.Headimgurl"></image>
						<view class="uni-text-box">
							<view class="uni-top-text">
								<text class="uni-ts-title Text_Nowrap">{{item.NickName}}</text>
								<text class="uni-ts-title Text_Nowrap1">领取时间{{item.Receivedate}}</text>
							</view>
							<view class="uni-item-box">
								<view class="uni-time-item">
									<uni-icon class='uni-time-icon'></uni-icon>
									<text>{{item.Createdate}}</text>
								</view>
								<view class="uni-time-item">
									<uni-icon class='uni-phones-icon'></uni-icon>
									<text>{{item.phone == null  ? '未绑定手机号码' : item.phone }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 到店时间 -->
			<view v-show="current === 1">
				<view class="uni-ts-box" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-ts-item">
						<image :src="item.Headimgurl"></image>
						<view class="uni-text-box">
							<view class="uni-top-text">
								<text class="uni-ts-title Text_Nowrap">{{item.NickName}}</text>
								<text class="uni-ts-title Text_Nowrap1">到店时间{{item.Receivedate}}</text>
							</view>
							<view class="uni-item-box">
								<view class="uni-time-item">
									<uni-icon class='uni-time-icon'></uni-icon>
									<text>{{item.Createdate}}</text>
								</view>
								<view class="uni-time-item">
									<uni-icon class='uni-phones-icon'></uni-icon>
									<text>{{item.phone == null  ? '未绑定手机号码' : item.phone }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<text :class="{tisi:Tishi == '暂无任务'}">{{Tishi}}</text>
		<text class="uni-ti-shi">{{bottomtisi}}</text>
		<!-- 底部导航 -->
		<view class="nui-nav-bot">
			<view class="nui-nav-item" @click="openindex">
				<image src="../../static/Home.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="nui-nav-item">
				<image src="../../static/tesks.png" mode=""></image>
				<text>任务</text>
			</view>
			<view class="nui-nav-item" @click="openInfo">
				<image src="../../static/my.png" mode=""></image>
				<text>我的</text>
			</view>
		</view>
	</view>

</template>

<script>
	import helper from '../../common/helper.js';
	import uniSegmentedControl from "@/components/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['最新领取', '到店时间'],
				current: 0,
				rwlistArray: "", //任务列表数据
				Tishi: '',
				num: '9', //默认显示9条任务数据
				bottomtisi: '',
				type: '1', //任务类型
				rwid: '' //任务id
			}
		},
		onLoad(e) {
			this.requestTask()
			this.rwid = e.rwsid;
		},
		onShow() {
			this.requestTask()
		},
		onPullDownRefresh: function() {
			this.requestTask(true)
			uni.showLoading({
				title: "刷新中....",
				mask: true
			})
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.requestTask();
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if (this.current === 0) { //点击列表改变接口type的值
					this.type = "1"
					this.requestTask();
				} else if (this.current === 1) {
					this.type = "2"
					this.requestTask();

				}
			},
			// 请求任务列表
			requestTask(isdown) {
				helper.islogin_Mer(true);
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				uni.request({
					url: helper.websiteUrl + 'mtask/gettasklistbytime',
					method: 'GET',
					data: helper.postdata({
						"taskid": this.rwid,
						"page": '1',
						"num": this.num,
						"type": this.type
					}),
					success: (res) => {
						if (res.data.code == 200) {
							this.rwlistArray = res.data.data.baseinfo;
							res.data.data.baseinfo.forEach((e) => {
								e.Receivedate = e.Receivedate.substr(0, 10);
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						if (res.data.data.baseinfo.length >= this.num) { //判断触底加载是否到底最后一条 否则提示没有更多数据了
							this.bottomtisi = '正在加载...'
						} else {
							this.bottomtisi = '没有更多数据了'
						}
						if (res.data.data.baseinfo.length === 0) { //判断分类数据是否为空 否则提示暂无任务
							this.Tishi = "暂无任务";
							this.bottomtisi = ''
						} else {
							this.Tishi = "";
						}
						uni.hideLoading();
					},
					fail() {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常，请下拉刷新'
						});
					},
					complete: () => {
						if (isdown) {
							uni.stopPullDownRefresh(); //刷新停止
						}
					}
				});
			},
			// 获取待领取任务的id
			openlq(e) {
				uni.navigateTo({
					url: 'ToReceive?rwid=' + e.currentTarget.dataset.rwid
				});
			},
			// 获取全部任务的id
			openqb(e) {
				uni.navigateTo({
					url: 'Taskdetail?rwid=' + e.currentTarget.dataset.rwid
				});
			},
			// 打开商家任务
			openindex() {
				uni.redirectTo({
					url: 'MerIndex'
				});
			},
			// 打开首页
			openInfo() {
				uni.redirectTo({
					url: 'MerInfo'
				});
			}

		}
	}
</script>

<style>
	page{
		padding-bottom: 60upx;
	}
	.uni-ti-shi {
		font-size: 30upx;
		color: #C0C0C0;
		text-align: center;
		width: 100%;
		display: inline-block;
		padding: 10upx 0;
	}

	.active {
		color: #ffca2f !important;
	}

	.uni-ts-box {
		display: flex;
		justify-content: center;
		margin-top: 15upx;
	}

	.uni-ts-box:last-child {
		margin-bottom: 15upx;
	}

	.uni-ts-item {
		width: 660upx;
		height: 132upx;
		background-color: #ffffff;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		padding: 0 20upx;
	}

	.uni-ts-item image {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.uni-text-box {
		width: 560upx;
		margin-left: 15upx;
	}

	.uni-text-box .uni-top-text {
		display: flex;
		width: 100%;
		font-size: 28upx;
	}

	.uni-text-box .uni-ts-title {
		max-width: 48%;
		display: inline-block;
		position: relative;
	}

	.uni-text-box .uni-ts-title:first-child {
		padding-right: 2%;
	}

	.uni-text-box .uni-ts-title:last-child {
		padding-left: 1%;
	}

	.uni-text-box .uni-ts-title:last-child:after {
		content: "";
		width: 2upx;
		height: 25upx;
		position: absolute;
		top: 10upx;
		left: 0upx;
		background: #b6b6b6;
	}

	.uni-item-box {
		display: flex;
		font-size: 23upx;
		color: #B6B6B6;

	}

	.uni-item-box text {
		margin-left: 15upx;
	}

	.uni-time-item {
		display: flex;
		align-items: center;
		margin-top: 15upx;
	}

	.uni-time-item:last-child {
		margin-left: 25upx;
	}

	/* 内容背景色 */
	.content {
		background: #f5f5f5;
	}

	/* 选项卡样式 */
	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 30upx;
		border-radius: 10upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		letter-spacing: 2upx;
		padding: 25upx 0;
		background: #FFFFFF;
	}

	.segmented-control view {
		flex: 1;
		text-align: center;
		line-height: 60upx;
		box-sizing: border-box;
		position: relative;
	}

	.segmented-control view text {
		display: inline-block;
		width: 100%;
		height: 100%;
	}

	.segmented-control view:after {
		content: "";
		width: 2upx;
		height: 22upx;
		position: absolute;
		top: 20upx;
		right: 1upx;
		background: #b6b6b6;
	}

	.segmented-control view:last-child:after {
		content: "";
		width: 0upx;
	}

	/* 分类列表样式 */
	/* 任务列表 */
	.uni-rw-cont:first-child {
		margin-top: 15upx;
	}

	/* 底部导航 */
	.nui-nav-bot {
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background-color: #ffffff;
		box-shadow: 11upx 17upx 38upx 0upx rgba(0, 0, 0, 0.66);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nui-nav-item {
		width: 45upx;
		font-size: 20upx;
		text-align: center;
	}

	.nui-nav-item image {
		width: 45upx;
		height: 40upx;
	}

	.nui-nav-item:nth-child(1) {
		margin-left: 50upx;
	}

	.nui-nav-item:nth-child(3) {
		margin-right: 50upx;
	}

	.nui-nav-item:nth-child(2) image {
		width: 40upx;
		height: 40upx;
	}
</style>
