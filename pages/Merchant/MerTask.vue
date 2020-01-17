<template>
	<view class="content">
		<!-- 活动菜单选项导航 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#2FB6A7"></uni-segmented-control>
		<!-- 平台说明 -->
				<view class="platform-box">
					<!-- 平台 -->
					<view class="platform">
						<view>平台:</view>
						<view class="platform-w">
							 <text v-for="(item,index) in platformArray" :key="index" @tap="optionPlatform(index)">{{item}}</text>
						</view>
					</view>
					<view class="platform top" v-if="typeArray.length>0">
						<view>类型:</view>
						<view class="platform-w">
							 <text v-for="(item,index) in typeArray" :key="index" @tap="optionType(index)">{{item.Name}}</text>
						</view>
					</view>
				</view>
		<view class="content">
			<!-- 待领取 -->
			<view v-show="current === 0">
				<view class="uni-rw-list" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-rw-cont" @tap="openqb" :data-rwid="item.ID">
						<image :src="item.thumbnail"></image>
						<view class="uni-rw-text ">
							<text class="Text_Nowrap uni-rw-text1">{{item.Title}}</text>
							<view class="uni-rw-sl Text_Nowrap">
								<view>共<text class="uni-sy">{{item.Count}}</text>份</view>
								<view>已领<text class="uni-sy">{{item.Recipients}}</text>份</view>
								<view>还剩<text class="uni-sy">{{item.Count-item.Recipients}}</text>份</view>
							</view>
						</view>
						<button type="primary" :id="item.IsGet" @click="openid">查看</button>
					</view>
				</view>
			</view>
			<!-- 已领取 -->
			<view v-show="current === 1">
				<view class="uni-rw-list" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-rw-cont" @tap="openlq" :data-rwid="item.ID">
						<image :src="item.thumbnail"></image>
						<view class="uni-rw-text ">
							<text class="Text_Nowrap uni-rw-text1">{{item.Name}}</text>
							<view class="uni-rw-sl Text_Nowrap">
								<view>共<text class="uni-sy">{{item.Count}}</text>份</view>
								<view>已领<text class="uni-sy">{{item.Recipients}}</text>份</view>
								<view>还剩<text class="uni-sy">{{item.Count-item.Recipients}}</text>份</view>
							</view>
						</view>
						<button type="primary" :id="item.IsGet" @click="openid">查看</button>
					</view>
				</view>
			</view>
			<!--待审核  -->
			<view v-show="current === 2">
				<view class="uni-rw-list" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-rw-cont" @tap="openDe" :data-rwsid="item.ID">
						<image :src="item.thumbnail"></image>
						<view class="uni-rw-text ">
							<text class="Text_Nowrap uni-rw-text1">{{item.Name}}</text>
							<view class="uni-rw-sl Text_Nowrap">
								<view>共<text class="uni-sy">{{item.Count}}</text>份</view>
								<view>已领<text class="uni-sy">{{item.Recipients}}</text>份</view>
								<view>还剩<text class="uni-sy">{{item.Count-item.Recipients}}</text>份</view>
							</view>
						</view>
						<button type="primary" :id="item.IsGet" @click="openid">查看</button>
					</view>
				</view>
			</view>
			<!-- 已完成 -->
			<view v-show="current === 3">
				<view class="uni-rw-list" v-for="(item,index) in rwlistArray" :key="index">
					<view class="uni-rw-cont" @tap="openDone" :data-rwid="item.ID">
						<image :src="item.thumbnail"></image>
						<view class="uni-rw-text ">
							<text class="Text_Nowrap uni-rw-text1">{{item.TaskName}}</text>
							<view class="uni-rw-sl Text_Nowrap">
								<view class="uni-rw-bx Text_Nowrap">{{item.Requirement}}</view>
								<view>已完成<text class="uni-sy">{{item.Done}}</text>份</view>
							</view>
						</view>
						<button type="primary" :id="item.IsGet" @click="openid">查看</button>
					</view>
				</view>
			</view>
			<text  :class="{tisi:Tishi == '暂无活动'}" >{{Tishi}}</text>
			<text class="uni-ti-shi">{{bottomtisi}}</text>
		</view>
		<!-- 底部导航 -->
		<view class="nui-nav-bot">
			<view class="nui-nav-item" @click="openindex">
				<image src="../../static/Home.png" mode=""></image>
				<text>首页</text>
			</view>
			<view class="nui-nav-item">
				<image src="../../static/tesks.png" mode=""></image>
				<text>活动</text>
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
				items: ['待领取', '已领取', '待审核', '已完成'],
				platformArray: ['全部','大众点评', '微信','QQ','抖音', '知乎', '微博', '小红书'],
				typeArray:[],
				platform:0,
				type:0,
				current: 0,
				rwlistArray: [], 
				Tishi: '',
				num: '9', 
				bottomtisi: '',
			}
		},
		onLoad() {
			 this.requestTask(this.current,this.type,5)
		},
		onShow() {
			// this.requestTask()
		},
		onPullDownRefresh: function() {
			this.requestTask(this.current,this.type,this.num)
			uni.showLoading({
				title: "刷新中....",
				mask: true
			})
		},
		//触底事件
		onReachBottom() {
			var tas1 = 5; //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.requestTask(this.current,this.type,this.num);
		},
		methods: {
			//获取type
			optionPlatform(e){
				this.platform=e
				const that=this
				if (e===0){
					that.typeArray=[]
				    that.requestTask(this.current,0,9)
					return
				} 
				uni.request({
					url:helper.websiteUrl+"yiru/sdl/mertask/getbyplan",
					method:'POST',
					data:helper.postdata({
					plan:e
					}),
					success(res){
					
						if(res.data.code===200){
							that.typeArray=res.data.data.baseinfo
						}
					}
					
				})
			},
			optionType(type){
				this.type=type
				this.requestTask(this.current,type,this.num)
			},
			//--------------------------
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				this.requestTask(this.current,index,this.num)
			},
			// 请求活动列表
			requestTask(current,type,num) {
				const that=this
				uni.request({
					url: helper.websiteUrl + 'yiru/sdl/mertask/tasklist',
					method: 'POST',
					data: helper.postdata({
						"plan":that.platform,
						"page":"1",
						"num":num,
						"MId":helper.getstate().userid,
						"cate":type,
						"sate":current+1
					}),
					success(res) {
						if (res.data.code == 200) {
							that.rwlistArray = res.data.data.tasklist;
							
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
						if (res.data.data.tasklist.length >= that.num) {
							that.bottomtisi = '正在加载...'
						} else {
							that.bottomtisi = '没有更多数据了'
						}
						if (res.data.data.tasklist.length === 0) { 
							that.Tishi = "暂无活动";
							that.bottomtisi = ''
						} else {
							that.Tishi = "";
						}
						uni.hideLoading();
					},
					fail() {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常，请下拉刷新'
						});
					}
				});
			},
			//获取待领取活动的id
			openlq(e) {
				uni.navigateTo({
					url: 'ToReceive?rwid=' + e.currentTarget.dataset.rwid
				});
			},
			//获取全部活动的id
			openqb(e) {
				uni.navigateTo({
					url: 'Taskdetail?rwid=' + e.currentTarget.dataset.rwid
				});
			},
			//获取已领取活动的id
			openDe(e) {
				console.log(e)
			},
			//获取已完成活动的id
			openDone(e) {
				uni.navigateTo({
					url: 'TaskDone?rwid=' + e.currentTarget.dataset.rwid
				});
			},
			//打开商家活动
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
	
.uni-rw-sl{display: flex;align-items: center;}
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
		padding-bottom: 60upx;
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
	.uni-rw-bx{
		max-width:250rpx !important;

	}
	.segmented-control view:last-child:after {
		content: "";
		width: 0upx;
	}

	/* 分类列表样式 */
	/* 活动列表 */
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
	
	
	.platform-box{
		width: 694upx;
		color: #000000;
		font-weight: 500;
		margin: 0 auto;
		margin-top: 20upx;
		border-radius: 16upx;
		background-color: #FFFFFF;
	}
	.platform{
		display: flex;
	}
	.platform-w{
		width: 610upx;
	}
	.platform-w text{
		font-weight: 500;
		font-size: 36upx;
		line-height: 60upx;
		margin: 0 32upx;
	}
	.platform-w text:nth-child(4){
		margin-right: 0;
	}
	.top{
		margin-top: 25upx;
	}
	
</style>
