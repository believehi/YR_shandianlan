<template>
	<view class="content">
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item,index) in listData" :key="index" :data-xxid="item.ID" @click="openmascontent">
				<text class="uni-title Text_Nowrap">{{item.Title}}</text>
				<text class="uni-time">{{item.CreateDate}}</text>
				<uni-icon class="iconfont-2 icon-you"></uni-icon>
			</view>

		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	var dateUtils = require('../../common/util.js').dateUtils;
	export default {
		data() {
			return {
				infoArray: '',
				listData: [],
				datatime: '',
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			openmascontent(e) { //打开系统消息内容页
				uni.navigateTo({
					url: 'messages-content?xxid=' + e.currentTarget.dataset.xxid 
				});
			},
			getList() {
				var data = {
					column: "Content,CreateDate,ID,Title,"     //需要的字段名
				};
				uni.request({
					url: helper.websiteUrl + 'message/getmessagelist',
					method: 'GET',
					data: helper.postdata({
						"num": 10,
						"page": 1,
					}),
					success: (res) => {
						if (res.data.code == 200) {
							let list = this.setTime(res.data.data.baseinfo);
							this.listData = this.reload ? list : this.listData.concat(list);
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					}
				})
			},

			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						Content: e.Content,
						ID: e.ID,
						CreateDate: dateUtils.format(e.CreateDate),
						Title: e.Title
					});
				});
				return newItems;
			}
		},

	}
</script>

<style>
	.content {
		padding-top: 15upx;
		height: 1190upx;
	}
	.iconfont-2{margin-top: 0 !important;}
	.uni-product {
		background: #FFFFFF;
		border-radius: 20upx;
		height: 90upx;
		display: flex;
		align-items: center;
		width: 650upx;
		margin: 0 auto 15upx auto;
		line-height: 90upx;
		padding: 0 20upx 0 30upx;
		justify-content: space-between;
	}

	.uni-product .uni-title {
		width: 380upx;
		overflow: hidden;
		font-size: 32upx;
		color: #1a1a1a;
	}

	.uni-product .uni-time {
		font-size: 30upx;
		color: #c6c6c6;
		flex-grow: 2;
		text-align: right;
		margin-right: 10upx;
	}

	.iconfont-2 {
		margin-top: 6upx;
	}
</style>
