<template>
	<page>
		<view class="content">
			<view class="itme">
				<text>平台：</text>
				<view class="uni-pintai uni-size">大众</view>
			</view>
			<view class="itme">
				<text>选择类型：</text>
				<picker @change="bindPickerChangeType" :value="typeIndex" :range="typeArray">
					<view class="uni-input platform uni-size" >{{typeArray[typeIndex]}}
						<image src="../../static/xiala.png"></image>
					</view>
				</picker>
			</view>
			<view class="itme">
				<text>区域：</text>
				<view class="uni-pintai uni-size">湖南</view>
				<view class="uni-pintai uni-sheng uni-size">长沙</view>
			</view>
		</view>
	</page>
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
		onLoad() {
			this.getleixinlist();
		},
		onShow() {
			this.getleixinlist();
		},
		data() {
			return {
				// 选中平台
				typeArray: ['请选择类型'],
				typeIndex: 0,
			};
		},
		methods: {
			getleixinlist() {
				const that = this;
				uni.request({
					url: helper.websiteUrl + "mertask/getbyplan",
					method: 'POST',
					data: helper.postdata({
						plan: "1",
					}),
					success(res) {
						console.log(res.data)
						if (res.data.data.baseinfo.length > 0) {
							that.typeArray = [];
							for (var i = 0; i < res.data.data.baseinfo.length; i++) {
								that.typeArray.push(res.data.data.baseinfo[i].Name);
							}
						} else {
							that.typeArray = [];
							that.typeArray.push('请选择类型');
						}
					}
				})
			},
			// 选择类型
			bindPickerChangeType: function(e) {
				this.typeIndex = e.target.value;
			},
		},
	}
</script>


<style>
	.itme {
		padding: 15upx 2%;
		background: #fff;
		display: flex;
		align-items: center;
		font-size: 36rpx;
		border-bottom: 1px solid #EEEEEE;
	}
	.uni-size{
		font-size: 34rpx;
	}

	.uni-pintai,
	.uni-input {
		border: 1px solid #ccc;
		padding: 0 20upx;
	}

	.uni-input image {
		width: 20upx;
		height: 18upx;
		margin-left: 15rpx;
	}
	.uni-sheng{
		margin-left: 20upx;
	}
</style>
