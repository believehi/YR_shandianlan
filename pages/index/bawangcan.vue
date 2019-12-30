<template>
	<view class="content">
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
		<text class="uni-ti-shi">{{bottomtisi}}</text>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				fenleiArray: {}, //分类列表菜单
				isActive: "1", //分类列表初始选中状态
				rwlistArray: "", //任务列表数据
				num: '9',        //默认显示9条任务数据
				bottomtisi:''
			}
		},
		onLoad() {
			this.fenleilists()
		},
		onShow(){
			this.fenleilists()
		},
		onPullDownRefresh: function() { //下拉刷新
			this.fenleilists(true);
		},
		//触底事件
		onReachBottom() {                     
			var tas1 = new String('5');         //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.fenleilists();
		},
		methods: {
			// 获取任务的id
			openrwid(e) {
				uni.navigateTo({
					url: '../task/Taskdetails?rwid=' + e.currentTarget.dataset.rwid,
				});
			},
			fenleilists(e,isdown) {
				helper.islogin(true);
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
						"category":"1",
						"userid": helper.getstate().userid,
					}),
					success: (res) => {
						if (res.data.code == 200) {
							this.rwlistArray = res.data.data.baseinfo
						} else {
							helper.goout(res.data.info);
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						if (res.data.data.baseinfo.length>=this.num) {
							this.bottomtisi = '正在加载...'
						} else{
							this.bottomtisi = '没有更多数据了'
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
	.active {
		color: #ffca2f !important;
	}

	/* 内容背景色 */
	.content {
		background: #f5f5f5;
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
	.uni-ti-shi{font-size: 30upx;color: #C0C0C0;text-align: center;width: 100%;display: inline-block;padding: 10upx 0;}

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
