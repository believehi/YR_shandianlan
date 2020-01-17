<template>
	<view>
		<view class="material_benefits">
			<view class="material_benefits_title">人气测评福利大放送</view>
			<view class="material_benefits_number">
				<text>共10份</text>
				<text>未领3份</text>
				<text>已领7份</text>
				<text>完成5份</text>
			</view>
		</view>
		
		<view class="check_list">
			<view class="check_list_title">
				<text>完成审核列表</text>
				
			</view>
			<view class="check_list_box">
				<view class="check_list_box_task">
					<text class="task_finishi">大众会员LV3完成任务</text>
					<view class="check_list_box_btn"><view>审核</view></view>
				</view>
				<view class="check_list_box_task">
					<text class="task_finishi">大众会员LV3完成任务</text>
					<view class="check_list_box_btn"><view>审核</view></view>
				</view>
				<view class="check_list_box_task">
					<text class="task_finishi">大众会员LV3完成任务</text>
					<view class="check_list_box_btn"><view>审核</view></view>
				</view>
			</view>
			<view class="care_box">
				<text>请及时查看任务并审核，24消失不审核则自动通过!</text>
			</view>
		</view>
		
		<view class="task_finishi_box">
			<view class="center_box">
				<view class="close_box">
					<view class="fl">大众会员LV3完成任务</view>
					<view class="fr"><view class="icon_close">x</view></view>
				</view>
				<view class="progress_box">
					<image src="../../static/pic.jpg"></image>
				</view>
				<view class="task_finishi_box_btn">
					<text class="fl"><button>不可以</button></text>
					<text class="fl btn_allow"><button>可以</button></text>
				</view>
			</view>
		</view>
		
		<view class="bottom_box">
			<view>全部通过</view>
			<view>编辑任务内容</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	
	.material_benefits{
		overflow: hidden;
		height: 180upx;
		background-color: white;
		margin: 20upx 0;
	}
	.material_benefits_title{
		width: 336upx;
		color:#2FB6A7;
		font-size: 36upx;
		margin: 30upx auto;
	}
	.material_benefits_number{
		display: flex;
		height:100upx;
	}
	.material_benefits_number text{
		flex: 1;
		text-align: center;
	}
	.check_list{
		background-color: white;
		margin:40upx 0;
	}
	.check_list_title{
		text-align: center;
		color:#2FB6A7;
		margin: 30upx 0;
		
	}
	.check_list_box_task{
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #d7d7d7;
	}
	.check_list_box_btn view{
		line-height: 44upx;
		text-align: center;
		background-color: #2FB6A7;
		border-radius: 14upx;
		color: #FFFFFF;
		font-size: 28upx;
	}
	.check_list_box_btn{
		width: 14%;
		margin-right: 50upx;
		
	}
	.check_list_box_btn button{
		width: 100px;
		background-color: #2FB6A7;
		margin-top: 20upx;
	}
	.task_finishi{
		margin-left: 40upx;
	}
	.care_box{
		
		line-height:50upx;
		font-size:26upx;
		padding:40upx
	}
	.task_finishi_box{
		height: 800upx;
	}
	.center_box{
		overflow: hidden;
		width:600upx;
		height: 650upx;
		margin: 60upx auto;
		background-color:white;
	}
	.close_box{
		height: 100upx;
		padding: 30upx 20upx;
		
	}
	.close_box view:nth-child(2){
		position: relative;
		width: 50upx;
		height: 50upx;
		border:1px solid #ccc;
		border-radius: 50%;
		margin-left: 120upx;
		
	}
	.icon_close{
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 48upx;
		color: #ccc;
		margin-top: -36upx;
		transform: translate(-50%);
   }
	.progress_box{
		width: 500upx;
		height: 300upx;
		background-color: #D7D7D7;
		margin: 0 auto;
	}
	.progress_box image{
		width: 100%;
		height: 100%;
	}
	.task_finishi_box_btn{
		width: 500upx;
		height: 150upx;
		margin: 50upx auto;
	}
	.task_finishi_box_btn button{
		width: 200upx;
		background-color: #2FB6A7;
		color: white;
	}
	.btn_allow{
		margin-left: 96upx;
	}
		
	.bottom_box{
		display: flex;
	}
	.bottom_box view{
		width: 50%;
		line-height: 100upx;
		text-align: center;
	}
	.bottom_box view:nth-child(1){
		background-color: #FFFFFF;
		color:#2FB6A7;
	}
	.bottom_box view:nth-child(2){
		background-color: #2FB6A7;
		color:#FFFFFF;
	}
</style>
