<template>
	<view class="">
		<txv-video vid="w4rxoyysxr7p5b5" playerid="txv1"></txv-video>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				VideoId: ""
			};
		}
	}
</script>

<style scoped>
	txv-video {
		display: inline-block;
		width: 300px;
		height: 100px;
		border: 1px solid red;
	}
</style>
