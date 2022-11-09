<template>
	<view class="search-box">
		<input class="search-input" type="text" placeholder="搜索你想要的内容" disabled>
	</view>
</template>

<script>
</script>

<style lang="scss">
.search-box{
	width: 100%;
	position: absolute;
	left :0;
	top:30rpx;
	z-index : 9999;
	.search-input{
		background-color: #f8f8f8;
		height:70rpx;
		line-height: 70rpx;
		border-radius: 30rpx;
		margin:0 20rpx;
		text-align: center;
	}
}

	
</style>