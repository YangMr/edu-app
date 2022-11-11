<template>
	<view class="category-box">
		<view v-for="(item,index) in categoryList.slice(0,7)" :key="item.id">
			{{item.name}}
		</view>
		<view>全部分类</view>
	</view>
</template>

<script>
	export default {
		props: {
			categoryList: {
				type: Array,
				default: () => [
					// {
					// 	id: 1,
					// 	name: 'Java',
					// },
					// {
					// 	id: 2,
					// 	name: '前端',
					// },
					// {
					// 	id: 3,
					// 	name: 'Python',
					// },
					// {
					// 	id: 4,
					// 	name: 'UI设计',
					// },
					// {
					// 	id: 5,
					// 	name: '运维',
					// },
					// {
					// 	id: 6,
					// 	name: '人工智能',
					// },
					// {
					// 	id: 7,
					// 	name: '实战课程',
					// },
					// {
					// 	id: 8,
					// 	name: '数字孪生平台',
					// },
					// {
					// 	id: 9,
					// 	name: '3D园区',
					// }
				]
			}
		}
	}
</script>

<style lang="scss">
.category-box{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 30rpx 0 30rpx;
	justify-content: space-between;
	
	> view{
		width: 160rpx;
		height:70rpx;
		background-color: $i-color-grey;
		text-align: center;
		line-height: 70rpx;
		border-radius: 20rpx;
		margin-top: 15rpx;
		font-size: 26rpx;
	}
}
</style>
