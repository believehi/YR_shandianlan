<template>
	<view class="content">
		<!-- 任务菜单选项导航 -->
		<view class="uni-rw-nav">
			<view class="" v-for="(item,index) in fenleiArray" :key="index">
				<text :id="item.ID" @click="open" :class="{active:item.ID == isActive}">{{item.Name}}</text>
			</view>
		</view>
		<!-- 平台说明 -->
		<view class="uni-rw-list">
			<view class="uni-rw-cont h">
				<view class="platform-box">
					<view class="platform">
						<text>平台 :</text>
						<text>全部</text>
						<text>大众点评</text>
						<text>微信</text>
					</view>
					<view class="platform-type">
						<text>类型 :</text>
						<text>人气测评</text>
						<text>店铺收藏</text>
						<text>点赞</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 任务领取 -->
		<view class="uni-rw-list" v-for="(item,index) in rwlistArray" :key="index">
			<view class="uni-rw-cont" @tap="openrwid" :data-rwid="item.ID">
				<image :src="item.thumbnail"></image>
				<view class="uni-rw-text">
					<text class="Text_Nowrap">{{item.TaskName}}</text>
					<view class="uni-rw-sl">
						<view>{{item.PeopleMin}}-{{item.PeopleMax}}人</view>
						<view>{{item.Days}}天内</view>
						<view>还剩<text class="uni-sy">{{item.Surplus}}</text>份</view>
					</view>
				</view>
				<button type="primary" :id="item.IsGet" @click="openid" :class="{butactive:item.IsGet > 0 }">{{ item.IsGet > 0 ? '已领取' : '领取' }}</button>
			</view>
		</view>
		<text class="tisi">{{Tishi}}</text>
		<text class="uni-ti-shi">{{bottomtisi}}</text>
	</view>

</template>

<script>
	//import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				fenleiArray: [{
						ID: 0,
						Name: "待领取"
					},
					{
						ID: 1,
						Name: "已领取"
					},
					{
						ID: 2,
						Name: "待审核"
					},
					{
						ID: 3,
						Name: "已完成"
					},
				], //分类列表菜单
				isActive: "1", //分类列表初始选中状态
				rwlistArray: [{
						ID: 0,
						TaskName: "小龙坎美团五星好评送五折卷",
						PeopleMin: 1,
						PeopleMax: 2,
						Days: 5,
						Surplus: 21
					},
					{
						ID: 1,
						TaskName: "西贝美团五星好评送五折卷",
						PeopleMin: 1,
						PeopleMax: 2,
						Days: 5,
						Surplus: 21
					},
					{
						ID: 2,
						TaskName: "小龙坎美团五星好评送五折卷",
						PeopleMin: 1,
						PeopleMax: 2,
						Days: 5,
						Surplus: 21
					}

				], //任务列表数据
				Tishi: '',
				num: '9', //默认显示9条任务数据
				bottomtisi: ''
			}
		},
		onReady() {

		},
		onLoad() {
			// this.fenleilist()
			// this.rwdata();
		},
		onShow() {
			// this.fenleilist();
		},
		onPullDownRefresh: function() { //下拉刷新
			// this.fenleilist(true);
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.fenleilist();
		},
		methods: {
			open(e) { //分类列表点击获取任务分类id
				console.log(e)
				this.isActive = e.currentTarget.id;
				// this.fenleilist(e)
			},
			// 获取任务的id
			openrwid(e) {

				// uni.navigateTo({
				// 	url: '../task/Taskdetails?rwid=' + e.currentTarget.dataset.rwid,
				// });
			},
			// 请求任务分类
			// rwdata(isdown) {
			// 	uni.request({
			// 		url: helper.websiteUrl + 'task/getcategory',
			// 		method: 'GET',
			// 		data: helper.postdata({}),
			// 		success: (res) => {
			// 			if (res.data.code == 200) {
			// 				uni.stopPullDownRefresh(); //刷新停止
			// 				this.fenleiArray = res.data.data.baseinfo;
			// 				this.fenleiID = this.fenleiArray.ID
			// 			} else {
			// 				helper.goout(res.data.info);
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: res.data.info
			// 				});
			// 			}
			// 			uni.hideLoading();
			// 		},
			// 		fail: () => {
			// 			uni.hideLoading();
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '网络异常,请下拉刷新重试！'
			// 			});
			// 		},
			// 	});
			// },
			fenleilist(e, isdown) {
				// helper.islogin(true);
				uni.showLoading({
					title: "加载中.....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + 'task/gettasklist',
					method: 'GET',
					data: helper.postdata({
						"page": "1",
						"num": this.num,
						"category": this.isActive,
						"userid": helper.getstate().userid,
					}),
					success: (res) => {
						uni.stopPullDownRefresh(); //刷新停止
						if (res.data.code == 200) {
							this.rwlistArray = res.data.data.baseinfo;
						} else {
							helper.goout(res.data.info);
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
			}

		}
	}
</script>

<style>
	.uni-ti-shi {
		font-size: 30upx;
		color: #C0C0C0;
		text-align: center;
		width: 100%;
		display: inline-block;
		padding: 10upx 0;
	}

	.active {
		color: #2FB6A7 !important;
	}

	/* 内容背景色 */
	.content {
		background: #f5f5f5;
	}
	.platform-box{
	height: 120upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	}
	.platform-box text{
		font-size: 36upx;
		margin-left: 35upx;
	}
	.h{
		height: 160upx;
		margin-top: 25upx!important;
	}
	.platform-box text:nth-child(1){
		margin-left: 0;
	}

	/* 选项卡样式 */
	.uni-rw-nav {
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

	.uni-rw-nav view {
		flex: 1;
		text-align: center;
		line-height: 60upx;
		box-sizing: border-box;
		position: relative;
	}

	.uni-rw-nav view text {
		display: inline-block;
		width: 100%;
		height: 100%;
	}

	.uni-rw-nav view:after {
		content: "";
		width: 2upx;
		height: 22upx;
		position: absolute;
		top: 20upx;
		right: 1upx;
		background: #b6b6b6;
	}

	.uni-rw-nav view:last-child:after {
		content: "";
		width: 0upx;
	}

	/* 分类列表样式 */
	/* 任务列表 */
	.uni-rw-cont:first-child {
		margin-top: 15upx;
	}
</style>
