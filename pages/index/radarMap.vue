<template>
	<view class='radarContainer'>
		<view class="pintailist">
			<block v-for="(item, index) in catelist" :key="index">
				<text :style="{'background': index == plat ? '#F5C63C' : '#ffffff'}" @click="platList(index)">{{item}}</text>
			</block>
		</view>
		<view class="radars">
			<view class="radarContent">
				<view class="radarTitle">
					<image :src="baseinfo[plat].Logo" mode=""></image>
					<view>{{baseinfo[plat].PlanName}}</view>
				</view>
				<view class="radarMain">
					<image :src="baseinfo[plat].Pic" mode="" class="radarImg" @click="previewImage(baseinfo[plat].Pic)"></image>
					<view class="scProcess">上传流程：</view>
					<view>1.选择平台</view>
					<view>2.添加相应平台的个人截图</view>
					<view>3.上传</view>
					<view class="radarUnload" @click="picUnload()">上传认证</view>
					<text class="scRemarks">
						注：点击查看视频解说
					</text>
				</view>
			</view>
			<view class="side sideLeft"></view>
			<view class="side sideRight"></view>
		</view>
		<view class="radarTop">
			根据以下平台粉丝数或等级决定您的VIP等级
		</view>
		<view class="radarCanvasMap">
			<canvas class='radarCanvas' canvas-id='radarCanvas'></canvas>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	var numCount = 7; //元素个数
	var numSlot = 6; //一条线上的总节点数
	var mW = 320; //Canvas的宽度
	var mCenter = mW / 2; //中心点
	var mAngle = Math.PI * 2 / numCount; //角度
	var mRadius = mCenter - 60; //半径(减去的值用于给绘制的文本留空间)
	//获取指定的Canvas
	var radCtx = uni.createCanvasContext("radarCanvas")

	export default {
		data() {
			return {
				catelist: ['大众点评', '微信', '抖音', '小红书', '微博', 'QQ', '头条'],
				plat: 0,
				chanelArray: [
					["微信", 88],
					["抖音", 88],
					["小红书", 30],
					["微博", 66],
					["QQ", 90],
					["美团", 95],
					["头条", 88]
				],
				baseinfo: "",
				logolist: [],
				gradelist: []
			}
		},
		onLoad() {
			// this.drawRadar()
			this.drawList()
		},
		methods: {
			// 平台列表切换
			platList(i) {
				this.plat = i;
			},
			// 图片上传
			picUnload() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: res => {
						uni.uploadFile({
							url: helper.websiteUrl + 'annexes/uploadimgbyplan',
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								"plantype": _this.baseinfo[_this.plat].Id
							}),
							success: res => {
								var data = JSON.parse(res.data);
								// console.log(data)
								if (data.code == 200) {
									_this.submit(data.data.path, data.data.baseinfo)
								} else {
									uni.showToast({
										icon: 'none',
										title: '请上传正确图片！'
									});
								}
							}
						})
					}
				});
			},
			submit(pic, baseData) {
				uni.showLoading({
					title: "上传中....",
					mask: true
				})
				pic = helper.imgUrl + pic
				var PlanBindId = this.baseinfo[this.plat].PlanBindId;
				var type = PlanBindId ? 2 : 1;
				var ptId = type == 1 ? '' : PlanBindId;
				uni.request({
					url: helper.websiteUrl + 'plan/planinfo',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						type: type,
						plans: this.baseinfo[this.plat].Id,
						username: baseData.username || "",
						pics: pic,
						grade: baseData.grade,
						fans: baseData.fans || 0,
						remark: '',
						state: 1,
						id: ptId
					}),
					success: res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							//this.baseinfo[this.plat].Pic = pic
							uni.showToast({
								icon: 'none',
								title: '上传成功！'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '上传失败，请重试！'
						});
					}
				});
			},
			// 初始化页面
			drawList() {
				uni.showLoading({
					title: "加载中....",
					mask: true
				})
				uni.request({
					url: helper.websiteUrl + 'usertask/radamap',
					method: 'POST',
					data: helper.postdata({
						"userid": helper.getstate().userid,
					}),
					success: res => {
						if (res.data.code == 200) {
							var data = res.data.data;
							console.log(data)
							this.baseinfo = data.baseinfo;
							this.catelist = data.catelist;
							this.logolist = data.logolist;
							this.gradelist = data.gradelist;
							this.chanelArray = [];
							for (let i = 0, len = this.gradelist.length; i < len; i++) {
								let newArr = [];
								newArr.push(this.catelist[i])
								newArr.push(this.gradelist[i])
								this.chanelArray.push(newArr)
							}
							this.drawRadar()
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
							title: '网络异常！'
						});
					}
				});
			},
			//预览图片
			previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			// 雷达图函数调用
			drawRadar: function() {
				var sourceData = this.chanelArray
				//调用
				this.drawEdge() //画六边形
				//this.drawArcEdge() //画圆
				this.drawLinePoint()
				//设置数据
				this.drawRegion(sourceData, 'rgba(155,223,255, 0.5)')
				//设置文本数据
				this.drawTextCans(sourceData)
				//设置节点
				this.drawCircle(sourceData, '#30A4DD')
				//开始绘制
				radCtx.draw()
			},
			// 绘制6条边
			drawEdge: function() {
				radCtx.setStrokeStyle("#CCCCCC")
				radCtx.setLineWidth(1) //设置线宽
				for (var i = 0; i < numSlot; i++) {
					//计算半径
					radCtx.beginPath()
					var rdius = mRadius / numSlot * (i + 1)
					//画6条线段
					for (var j = 0; j < numCount; j++) {
						//坐标
						var x = mCenter + rdius * Math.cos(mAngle * j);
						var y = mCenter + rdius * Math.sin(mAngle * j);
						radCtx.lineTo(x, y);
					}
					radCtx.closePath()
					radCtx.stroke()
				}
			},
			// 绘制连接点
			drawLinePoint: function() {
				radCtx.beginPath();
				for (var k = 0; k < numCount; k++) {
					var x = mCenter + mRadius * Math.cos(mAngle * k);
					var y = mCenter + mRadius * Math.sin(mAngle * k);
					radCtx.moveTo(mCenter, mCenter);
					radCtx.lineTo(x, y);
				}
				radCtx.stroke();
			},
			//绘制数据区域(数据和填充颜色)
			drawRegion: function(mData, color) {
				var maxNumber = Math.max(...this.gradelist) || 100;
				radCtx.beginPath();
				for (var m = 0; m < numCount; m++) {
					var x = mCenter + mRadius * Math.cos(mAngle * m) * mData[m][1] / maxNumber;
					var y = mCenter + mRadius * Math.sin(mAngle * m) * mData[m][1] / maxNumber;
					radCtx.lineTo(x, y);
				}
				radCtx.closePath();
				radCtx.setFillStyle(color)
				radCtx.fill();
			},
			//绘制文字
			drawTextCans: function(mData) {
				radCtx.setFillStyle("#444444")
				radCtx.font = '16px' //设置字体
				for (var n = 0; n < numCount; n++) {
					var x = mCenter + mRadius * Math.cos(mAngle * n);
					var y = mCenter + mRadius * Math.sin(mAngle * n);
					//通过不同的位置，调整文本的显示位置
					if (mAngle * n >= 0 && mAngle * n <= Math.PI / 2) {
						radCtx.fillText(mData[n][0], x + 5, y + 5);
					} else if (mAngle * n > Math.PI / 2 && mAngle * n <= Math.PI) {
						radCtx.fillText(mData[n][0], x - radCtx.measureText(mData[n][0]).width - 7, y + 5);
					} else if (mAngle * n > Math.PI && mAngle * n <= Math.PI * 3 / 2) {
						radCtx.fillText(mData[n][0], x - radCtx.measureText(mData[n][0]).width - 5, y);
					} else {
						radCtx.fillText(mData[n][0], x + 7, y + 2);
					}
				}
			},
			//画点
			drawCircle: function(mData, color) {
				var r = 2; //设置节点小圆点的半径
				for (var i = 0; i < numCount; i++) {
					var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
					var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;
					radCtx.beginPath();
					radCtx.arc(x, y, r, 0, Math.PI * 2);
					radCtx.fillStyle = color;
					radCtx.fill();
				}
			}
		}
	}
</script>

<style scoped>
	.radarContainer {
		background-color: #FFFFFF;
	}

	.radarCanvasMap {
		width: 100%;
		height: 320px;
	}

	.radarCanvas {
		width: 320px;
		height: 320px;
		margin: 0 auto;
	}

	.pintailist {
		position: fixed;
		top: 0;
		font-size: 30upx;
		width: 100%;
		white-space: nowrap;
		overflow-x: auto;
		z-index: 9;
	}

	.pintailist::-webkit-scrollbar {
		display: none
	}

	.pintailist text {
		display: inline-block;
		width: 150upx;
		line-height: 72upx;
		text-align: center;
	}

	.radars {
		position: relative;
		margin-top: 72upx;
		padding: 50upx 0;
		width: 100%;
		background-color: #F5F5F5;
		box-shadow: 0px 0px 5px #DDDDDD inset;
	}

	.radarContent {
		margin: 0 auto;
		padding: 40upx 30upx 60upx;
		width: 360upx;
		border-radius: 10upx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 5px #DDDDDD;
		font-size: 22upx;
	}

	.radarTitle {
		text-align: center;
		font-size: 30upx;
	}

	.radarTitle image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background-color: #DDDDDD;
	}

	.radarTitle view {
		height: 40upx;
	}

	.radarMain {
		position: relative;
		width: 100%;
		height: 400upx;
		margin-top: 20upx;
	}

	.radarImg {
		float: left;
		width: 200upx;
		height: 400upx;
		border-radius: 10upx;
		background-color: #EEEEEE;
	}

	.radarMain view {
		margin-left: 220upx;
		line-height: 36upx;
	}

	.scProcess {
		color: #F5C63C;
	}

	.radarMain .radarUnload {
		margin-top: 20upx;
		text-align: center;
		line-height: 40upx;
		background-color: #F5C63C;
		color: #FFFFFF;
		border-radius: 8upx;
	}

	.scRemarks {
		position: absolute;
		left: 220upx;
		bottom: 0;
		color: #888888;
	}

	.radarTop {
		margin-top: 80upx;
		text-align: center;
		font-size: 28upx;
		line-height: 0;
	}

	.side {
		position: absolute;
		left: 0;
		top: 50upx;
		bottom: 50upx;
		width: 100upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		box-shadow: 0px 0px 5px #DDDDDD;
	}

	.sideRight {
		left: auto;
		right: 0;
	}
</style>
