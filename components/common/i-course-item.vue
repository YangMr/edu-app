<template>
	<view class="course-item">
		<view class="item-left">
			<image class="course-cover" src="https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBctGyNKeVFHvodavrFNyoPnicMiczYSFpAz3Eu17nibpDe0VgSCswPhIOLGQnO7K1hp4/510" ></image>
			<view class="course-time">
				06:55:54
			</view>
		</view>
		<view class="item-right">right</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
.course-item{
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f60;
	
	.item-left{
		width: 290rpx;
		height: 160rpx;
		position: relative;
		margin-right: 20rpx;
		overflow: hidden;
		
		.course-cover{
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
		.course-time{
			position: absolute;
			right : 5rpx;
			bottom : 5rpx;
			color : #fff;
			background-color: rgba(0,0,0,0.8);
			border-radius: 20rpx;
			font-size: 22rpx;
			padding :0 6px;
		}
	}
}
</style>