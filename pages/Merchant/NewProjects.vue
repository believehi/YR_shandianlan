<template>
	<view class="app">
		<view class="content">
			<!-- 选择名称 -->
			<view class="box">
				<view class="uni-list">
					<view class="uni-list-cell platform-box">
						<view class="uni-list-cell-left">
							选择平台 :
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChangePlatform" :value="platformIndex" :range="platformArray">
								<view class="uni-input platform">{{platformArray[platformIndex]}}
									<image src="../../static/xiala.png"></image>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 选择类型 -->
				<view class="uni-list">
					<view class="uni-list-cell platform-box">
						<view class="uni-list-cell-left">
							选择类型 :
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChangeType" :value="typeIndex" :range="typeArray">
								<view class="uni-input platform">{{typeArray[typeIndex]}}
									<image src="../../static/xiala.png"></image>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 选择区域 -->
				<view class="uni-list">
					<view class="uni-list-cell platform-box">
						<view class="uni-list-cell-left">
							选择区域 :
						</view>
						<view class="uni-list-cell-db">
							<view class="uni-input platform" @tap="toggleTab">{{resultInfo}}
								<image src="../../static/xiala.png"></image>
							</view>
						</view>
					</view>
				</view>

				<w-picker mode="linkage" :level="2" :defaultVal="['浙江省','宁波市']" @confirm="onConfirm()" ref="linkage" :linkList="linkList"
				 themeColor="#f00"></w-picker>
			</view>
		</view>

		<!-- 对应平台 -->
		<!-- 大众点评 -->
		<view class="box1" v-show="currentPlatform==0">
			<!-- 对应类型 -->
			<view v-show="typeIndex==0">
				<view class="text-box">
					<text>标题 :</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box">
					<text>福利内容 :</text>
					<textarea value="" placeholder="填写福利内容" />
					</view>
				<view class="text-box upload-box">
					<text>图片上传 :</text>
					<view class="upload" @tap="upload">
						<image src="../../static/jias.png" ></image>
					</view>
					<text class="upload-text">第一张图片为封面图</text>
					<view class="imgbox" >
						<image v-for="(item,index) in imgSrc" :src="item" :key="index" ></image>
					</view>
				</view>
				<view class="text-box">
					<text>报名要求 :</text>
					<textarea value="" placeholder="填写要求说明" />
				</view>
				<view class="text-box">
					<text>接待数 :</text>
					<input class="input-item" type="text" value="" placeholder="一天内最高接待数"/>
				</view>
				<view class="text-box">
					<text>接待时间 :</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box">
					<text>联系电话 :</text>
					<input class="input-item" type="text" value="" placeholder="调用商户资料的联系号码"/>
				</view>
				<view class="text-box">
					<text>店铺地址 :</text>
					<input class="input-item" type="text" value="" placeholder="调用商户资料的地址"/>
				</view>
				<!-- <view class="text-box">
					<text>选择套餐 :</text>
				    <checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />
					<text class="tc-text">(包含：V1-V3 5条； V4-V6 4条；V7以上 1条)</text>
				</view> -->
				<view class="text-box">
					<text>套餐数量 :</text>
					<input class="input-item" type="number" value="" />
				</view>
				<view class="text-box rmb">
					<text>金额:</text>
					<view class="pic">
						100元
					</view>
				</view>
				<view class="zf" @tap="payment">
					确认支付
				</view>
			</view>
			<!-- 对应类型 -->
			<!-- 店铺收藏 -->
			<view v-show="typeIndex==1">
				<view class="text-box">
					<text>店铺名称:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box">
					<text>分享链接:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box">
					<text>数量:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box rmb">
					<text>金额:</text>
					<view class="pic">
						1000元
					</view>
				</view>
				<view class="zf">
					确认支付
				</view>
			</view>
			<!-- 点赞 -->
			<view v-show="typeIndex==2">
				<view class="text-box">
					<text>点赞链接:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box">
					<text>次数:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box rmb">
					<text>金额:</text>
					<view class="pic">
						1000元
					</view>
				</view>
				<view class="zf">
					确认支付
				</view>
			</view>
		
	
		<!-- 微信 -->
	</view>
			<!-- 微信 -->
		<view class="box1" v-show="currentPlatform==1">
			<view class="text-box">
				<text>标题:</text>
				<input class="input-item" type="text" value="" />
			</view>
				<view class="text-box">
					<text>文本内容 :</text>
					<textarea value="" placeholder="填写要求说明" />
				</view>
				<view class="text-box upload-box">
					<text>图片上传 :</text>
					<view class="upload" @tap="upload">
						<image src="../../static/jias.png" ></image>
					</view>
					<view class="" >
						<text class="upload-text">最多九张</text>
						<!-- <image v-for="(item,index) in imgSrc" key="index" :src="item"></image> -->
					</view>
				</view>
				<view class="text-box">
					<text>曝光次数:</text>
					<input class="input-item" type="text" value="" />
				</view>
				<view class="text-box rmb">
					<text>金额:</text>
					<view class="pic">
						1000元
					</view>
				</view>
		</view>
			<!-- QQ -->
		<view class="box1" v-show="currentPlatform==2">
			<!-- 说说 -->
			<view v-show="typeIndex==0">
				<view class="text-box">
					<text>标题:</text>
					<input class="input-item" type="text" value="" />
				</view>
					<view class="text-box">
						<text>文本内容 :</text>
						<textarea value="" placeholder="填写要求说明" />
					</view>
					<view class="text-box upload-box">
						<text>图片上传 :</text>
						<view class="upload" @tap="upload">
							<image src="../../static/jias.png" ></image>
						</view>
						<view class="" >
							<text class="upload-text">最多九张</text>
							<!-- <image v-for="(item,index) in imgSrc" key="index" :src="item"></image> -->
						</view>
					</view>
					<view class="text-box">
						<text>曝光次数:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box rmb">
						<text>金额:</text>
						<view class="pic">1000元</view>
					</view>
			</view>
		</view>
			<!-- 抖音 -->
		<view class="box1" v-show="currentPlatform==3">
				<!-- 关注 -->
				<view v-show="typeIndex==0">
					<view class="text-box">
						<text>标题:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>链接地址:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>数量:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box rmb">
						<text>金额:</text>
						<view class="pic">1000元</view>
					</view>
				</view>
				<!-- 点赞 -->
				<view v-show="typeIndex==1">
					<view class="text-box">
						<text>标题:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>链接地址:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>数量:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box rmb">
						<text>金额:</text>
						<view class="pic">1000元</view>
					</view>
				</view>
				<!-- 评论 -->
				<view v-show="typeIndex==2">
					<view class="text-box">
						<text>标题:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>链接地址:</text>
						<input class="input-item" type="text" value="" />
					</view>
					<view class="text-box">
						<text>数量:</text>
						<view>
							  <sunui-stepper :label='1' :max="999" :val="0" :min="0" @change="getCounter"></sunui-stepper>
						</view>
						
					</view>
				</view>
		</view>
		
			<!-- 知乎 -->
		<view class="box1" v-show="currentPlatform==4">
			<!-- 回答 -->
			<view v-show="typeIndex==0">回答</view>
		</view>
			<!-- 微博 -->
		<view class="box1" v-show="currentPlatform==5">微博</view>
			<!-- 小红书 -->
		<view class="box1" v-show="currentPlatform==6">小红书</view>
			
	</view>
</template>


<script>
	import citys from '../../common/city.data.js'
	import helper from '../../common/helper.js'
	import wPicker from "@/components/w-picker/w-picker.vue"
	import sunuiStepper from "../../components/sunui-stepper/sunui-stepper.vue"
	export default {
		components: {
			wPicker,
			sunuiStepper
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 选中平台
				currentPlatform:0,
				platformArray: ['大众点评', '微信','QQ','抖音', '知乎', '微博', '小红书'],
				platformIndex: 0,
				platformDate: currentDate,

				typeArray: ['请选择类型'],
				typeIndex: 0,
				typeDate: currentDate,

				//选择区域
				linkList: citys,
				resultInfo: "大众",
				
				//图片上传地址
				imgSrc:[]
			}
		},

		onLoad() {

		},
		methods: {
			payment(){
				const that=this
				console.log("发布任务")
				uni.request({
					url:helper.websiteUrl+"mertask/releasetask",			   
					method:'POST',
					data:
						helper.postdata({
							"PlanType":"1",
							"Cate":"1",
							"Title":"测试标题",
							"Thum":"",
							"Count":"1",
							"Amount":"1",
							"BeginTime":"2019-12-30",
							"endtime":"",
							"MemberCoin":"5",
							"Recipients":"0",
							"Finish":"0",
							"Pics":"",
							"type":"0",
							"Check":"0",
							"Province":"",
							"City":"",
							"Area":"",
							"Contents":"",
							"Explain":"测试数据",
							"Phone":"15115828895",
							"Adress":"",
							"MName":"我在长沙等你",
							"Link":"",
							"MId":"e3646a1b-4163-4060-9bf6-ba58fe91727a",
							"DayHigh":"2"}
						),
					success(res){
						console.log(res)
					}
				})
			},
			bindPickerChangePlatform:function (e){
				const that=this
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.platformIndex = e.target.value
				this.currentPlatform=e.target.value
				
				//根据对应平台请求类型
				uni.request({
					url:helper.websiteUrl+"yiru/sdl/mertask/getbyplan",
					method:'POST',
					data: helper.postdata({
						plan: e.target.value*1+1,
					}),
					success(res) {
						console.log(res.data)
						if(res.data.data.baseinfo.length>0){
							that.typeArray=[]
							for(var i=0;i<res.data.data.baseinfo.length;i++){
								that.typeArray.push(res.data.data.baseinfo[i].Name)
							}
						}else{
						that.typeArray=[]
						that.typeArray.push('请选择类型')
						}
						
					}
				})
				
				
			},
			bindPickerChangeType: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.typeIndex = e.target.value
			},
			toggleTab: function(str) {
				this.$refs.linkage.show()
			},
			onConfirm(val) {
				console.log(val);
				this.resultInfo = val.result
			},
			//上传图片
			upload(){
				uni.chooseImage({
    success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        uni.uploadFile({
            url: helper.websiteUrl+"/yiru/sdl/annexes/UploadImg",
            filePath: tempFilePaths[0],
            name: 'file',
            formData: helper.postdata({
    
            }),
            success: (uploadFileRes) => {
                console.log(JSON.parse(uploadFileRes.data));
					this.imgSrc.push(JSON.parse(uploadFileRes.data).info)
				  console.log(this.imgSrc);
            }
        });
    }
});
			},
			// 计数器
			getCounter(e){
				   console.log(e.val)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 50upx;
	}
	.content {
		padding: 0 3%;
		margin-top: 25upx;
		background-color: #FFFFFF;
		
	}

	.box{
		padding-top: 45upx;
		padding-bottom: 35upx;
		margin-bottom: 45upx;
	}

	.box .uni-list {
		height: 75upx;
		margin-bottom: 25upx;
		border-bottom: 1px solid #EEEEEE;
	}

	.platform-box {
		display: flex;
		justify-content: space-between;
	}

	.platform {
		position: relative;
		width: 485upx;
		padding-left: 15upx;
		font-size: 26upx;
		line-height: 50upx;
		border: 1upx solid #ccc;
		border-radius: 8upx;
	}
	.platform image{
		position: absolute;
		right: 30upx;
		top: 18upx;
		width:20upx;
		height: 18upx;
	}

	/* 盒子1 */
	.box1 {
		padding: 0 3%;
		padding-top:35upx ;
		padding-bottom: 100upx;
		background-color: #FFFFFF;
	}

	.text-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 45upx;
		border-bottom:1upx solid #EEEEEE ;
		padding-bottom: 35upx;
	}
	.text-box textarea{
		width: 484upx;
		height: 184upx;
		padding: 16upx;
		font-size: 30upx;
		border: 1upx solid #ccc;
		border-radius: 8upx;
	}
	.input-item {
		width: 485rpx;
		font-size: 26upx;
		padding-left: 15rpx;
		line-height: 50rpx;
		border: 1rpx solid #ccc;
		border-radius: 8rpx;
	}
	.text-content{
		
	}
	.upload-box{
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	.upload-box image{
		width: 100upx;
		height: 100upx;
	}
	.upload{
		position: relative;
		width: 70upx;
		height: 65upx;
		margin: 0 30upx;
		border: 1upx solid #ccc;
	}
	.upload image{
		position: absolute;
		right: 18upx;
		top: 18upx;
		width:35upx;
		height: 35upx;
	}
	.imgbox{
		width: 100%;
		padding: 15upx;
	}
	.imgbox image{
		margin-right: 15upx;
	}
	.upload-text{
		font-size: 30upx;
		color: #C8C7CC;
	}
	.tc-text{
		font-size: 22upx;
		color: #C8C7CC;
		}
		.rmb{
			justify-content: flex-start;
		}
		.pic{
			margin-left: 115upx;
			color: #00B26A;
		}
		.zf{
			width: 65%;
			text-align: center;
			line-height: 70upx;
			background-color: #2FB6A7;//颜色
			border-radius: 8upx;
			margin:  100upx auto;
		}
		
</style>
