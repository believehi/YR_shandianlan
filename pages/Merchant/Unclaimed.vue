<template>
	<view class="uni-swiper-box">
		<view class="content">
			<view class="uni-rw-list" v-for="(item,index) in sbArray" :key="index">
				<view class="uni-rw-cont" @tap="openqb" :data-rwid="item.ID">
					<image :src="item.thumbnail"></image>
					<view class="uni-rw-text ">
						<text class="Text_Nowrap uni-rw-text1">{{item.TaskName}}</text>
						<view class="uni-rw-sl Text_Nowrap">
							<view class="uni-rw-bx Text_Nowrap">{{item.Requirement}}</view>
							<view>共<text class="uni-sy">{{item.Count}}</text>份</view>
						</view>
					</view>
					<button type="primary" :id="item.IsGet" @click="openid">查看</button>
				</view>
			</view>
		</view>
		<text  :class="{tisi:Tishi == '暂无任务'}" >{{Tishi}}</text>
		<text class="uni-ti-shi">{{bottomtisi}}</text>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control.vue";
	import helper from '../../common/helper.js';
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				sbArray: [],
				num: '10', //默认显示9条任务数据
				Tishi: '',
				bottomtisi:''
			}
		},
		onLoad() {
			// this.fllist();
			
		},
		onShow() {
			// this.fllist()
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.fllist(true);
			uni.showLoading({
				title: "刷新中....",
				mask: true
			})
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.fllist();
		},
		methods: {
			// 请求任务列表
			fllist(isdown) {
				helper.islogin_Mer(true);
				uni.request({
					url: helper.websiteUrl + '/yiru/sdl/mtask/gettask',
					method: 'GET',
					data: helper.postdata({
						"page": "1",
						"num": this.num,
						"State": 5,
						"merchantid": helper.getstate().userid,
					}),
					success: res => {
						if (res.data.code == 200) {
							this.sbArray = res.data.data.baseinfo;
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
			},
			// 获取待领取任务的id
			openqb(e) {
				uni.navigateTo({
					url: 'ToReceive?rwid=' + e.currentTarget.dataset.rwid
				});
			},
		}
	}
</script>

<style>
	.uni-rw-text1{width: 425upx;display: inline-block;align-items:flex-end;}
	.uni-rw-bx {
		max-width: 250upx !important;
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
	.uni-rw-sl{display: flex;align-items: center;}
</style>
