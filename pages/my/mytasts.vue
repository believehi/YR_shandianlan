<template>
	<view class="=content">
		
	
    <view class="page">
        <view class="">
            <view class="">
                <block v-for="(list,index) in lists" :key="index">
                    <view class="uni-list-cell-box">
                        <view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
                            {{list.title}}
                        </view>
                        <view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
                            <view v-if="list.type === 'font'" class="page-pd">
                                <view class="uni-h4">漫长人生，忽而半生。一路走来的我们，生命平凡而坚毅，一颗心也相对安稳。一切的拥有，懂得了珍惜，若有生之年没有大的变故，也便再无苛求。</view>
                                <view class="uni-h4">所谓人生，就是一个人从出生至死亡所经历的过程。在这个过程中，我们都要经历波折坎坷，经历喜怒哀乐、悲欢离合。</view>
                            </view>							
							<view v-if="list.type === 'font1'" class="page-pd">
								<view class="uni-h5">hello uni-app</view>
							</view>
							<view v-if="list.type === 'font2'" class="page-pd">
								<view class="uni-h5">hello uni-app</view>
							</view>
							<view v-if="list.type === 'font3'" class="page-pd">
								<view class="uni-h5">hello uni-app</view>
							</view>
							<view v-if="list.type === 'font4'" class="page-pd">
								<view class="uni-h5">hello uni-app</view>
							</view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'accordion',
                lists: [
                    {
                        title: "怎么完成任务？",
                        type: 'font',
                        show: false
                    },
					{
						title: "任务没完成怎么办？",
						type: 'font1',
						show: false
					},
					{
						title: "做任务的正确方法？",
						type: 'font2',
						show: false
					},
					{
						title: "任务过期怎么办？",
						type: 'font3',
						show: false
					},
					{
						title: "忘记用户名密码怎么办？",
						type: 'font4',
						show: false
					}
                ]
            }
        },
        methods: {
            trigerCollapse(e) {
                for (let i = 0, len = this.lists.length; i < len; ++i) {
                    if (e === i) {
                        this.lists[i].show = !this.lists[i].show;
                    } else {
                        this.lists[i].show = false;
                    }
                }
            }
        }
    }
</script>

<style>
	@import "../../common/uni.css";
	.content{height: 1200upx;padding-top: 15upx;}
	.page{width: 700upx;border-radius: 20upx;margin: 0 auto;}
	/* .uni-list-cell-box{background: #FFFFFF;} */
	.uni-collapse.uni-list-cell{border-radius: 20upx !important;}
	.uni-list-cell-navigate{background: #FFFFFF;border-radius: 20upx;margin-bottom: 15upx;}
	.uni-active{border-bottom-right-radius: 0upx;border-bottom-left-radius: 0upx;background: #FFFFFF;}
	.uni-collapse-content.uni-active{margin-top: -15upx;border-bottom-right-radius: 20upx;border-bottom-left-radius: 20upx;margin-bottom: 15upx;padding:25upx 45upx;font-size: 28upx;width:610upx;}
    .uni-h4{font-size: 28upx;color:#717171;text-align:justify;line-height: 40upx;}
</style>
