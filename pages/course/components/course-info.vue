<template>
	<view class="center column">
		<image mode="widthFix" lazy-load @load="load" v-for="(item,index) in detailUrls" :key="index" :src="item"></image>
	
		<image v-if="loading" class="loading" src="/static/images/loading.gif" ></image>
		
		<text v-else class="footer-text">已经到达底部，没有更多内容了</text>
	</view>
</template>

<script>
export default {
	props : {
		detailUrls : {
			type : Array,
			default : () => ([
				'https://img.alicdn.com/imgextra/i2/3603079088/O1CN01V8VO2y2H0M5Bx33L3_!!3603079088.jpg'
			])
		}
	},
	data(){
		return {
			loading : true
		}
	},
	methods : {
		load(){
			this.loading = false
		}
	}
}
</script>

<style lang="scss">
image{
	width: 100%;
}
.loading{
	width: 90rpx;
	height : 90rpx;
	margin-top: 50rpx;
}
.footer-text{
	font-size: 30rpx;
	color: #777777;
	margin: 20rpx 0;
}
</style>