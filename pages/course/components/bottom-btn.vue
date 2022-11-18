<template>
	<view class="bottom" @click="handleClik">
		<text>{{name}}</text>
	</view>
</template>

<script>
export default {
	props : {
		name : {
			type : String,
			default : ""
		},
		courseId : [String, Number]
	},
	methods : {
		handleClik(){
			
			this.$emit("clickBottom")
		}
	}
}
</script>

<style lang="scss">
.bottom{
	position: fixed;
	bottom : 0;
	left :0;
	right : 0;
	// padding: 20rpx 40rpx;
	background-color: #fff;
	height: 100rpx;
	border-top: $i-underline;
	box-sizing: border-box;
	padding: 10rpx 40rpx;
	
	text{
		background-color: #345DC2;
		font-size:35rpx;
		text-align: center;
		display: block;
		height :80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		color : #fff;
	}
}
</style>