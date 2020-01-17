<template>
	<view class="content">
		<!-- 任务领取 -->
		<view class="uni-rw-list" v-for="(item,index) in listArray" :key="index">
			<view class="uni-rw-cont" @tap="openrwid" :data-rwid="item.TaskID">
				<image :src="item.thumbnail"></image>
				<view class="uni-rw-text">
					<text class="Text_Nowrap uni-rw-text1">{{item.TaskName}}</text>
					<view class="uni-rw-sl">
						<text>{{item.PeopleMin}}-{{item.PeopleMax}}人</text>
						<view>{{item.Days}}天内</view>
						<view>还剩<text>{{item.Surplus}}</text>份</view>
					</view>
				</view>
				<button type="primary" :class="{butactive:item.IsGet > 0 }">{{ item.IsGet > 0 ? '已领取' : '领取' }}</button>
			</view>
			
		</view>
		<text  :class="{tisi:tishi == '暂无收藏记录'}" >{{tishi}}</text>
		<!-- 任务领取结束-->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				listArray:'',
				tishi:''
			};
		},
		onLoad() {
			// this.sclist()
			
		},
		onShow(){
			// this.sclist()
		},
		methods: {
			// 获取任务的id
			openrwid(e) {
				uni.navigateTo({
					url: '../task/Taskdetails?rwid=' + e.currentTarget.dataset.rwid,
				});
			},
			// 收藏任务列表
			sclist() {
				uni.showLoading({
					title: "加载中....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + 'task/collectiontasklist',
					method: 'GET',
					data: helper.postdata({
						"page":"1",
						"num":"10",
						"userid": helper.getstate().userid,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.listArray = res.data.data.baseinfo;
							if (this.listArray == "") {
								this.tishi = '暂无收藏记录'
							} else{
								this.tishi = ''
							}
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请下拉刷新重试！'
						});
					}
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
