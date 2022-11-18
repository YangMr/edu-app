<template>
	<view class="center column">
		<image src="/static/images/no.png" lazy-load mode="aspectFill"></image>
		<text class="title">{{desc}}</text>
	</view>
</template>

<script>
	export default {
		name:"i-no-data",
		props : {
			desc : {
				type : String,
				default : '暂无评论'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.title{
	color: #999;
	font-size: 30rpx;
	margin-top: 30rpx;
}
</style>