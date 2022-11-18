<template>
	<view class="course-group">
		<view class="group" v-for="(group,i) in groupList" :key="i">
			<view class="group-title">
				{{group.title}}
			</view>
			
			<view class="group-list">
				<i-course-item :item="item" v-for="(item,index) in group.list" :key="index"></i-course-item>
			</view>
			
			<view class="group-footer center space-between">
				<view class="price">
					<text>￥{{group.groupPrice}}</text>
					<text>￥{{group.totalPrice}}</text>
				</view>
				<text>购买套餐</text>
			</view>
		</view>
	</view>
</template>

<script>
import iCourseItem from "@/components/common/i-course-item.vue"
import courseGroupData from "@/mock/courseGroupData.js"
export default {
	props : {
		groupList : {
			type : Array,
			default : () => {
				return courseGroupData
			}
		}
	},
	components : {
		iCourseItem
	}
}
</script>

<style lang="scss">
.course-group{
	padding : 0 36rpx;
	
	.group{
		box-shadow: 2px 0 10px 0 rgba(0,0,0, 0.1);
		padding: 0 20rpx;
		margin: 36rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		
		.group-title{
			font-size: 35rpx;
			font-weight: 500;
			padding-top: 20rpx;
		}
		
		.group-footer{
			color: $i-text-color-red;
			font-size: 30rpx;
			line-height: 80rpx;
			font-weight: bold;
			
			.price{
				text:first-child{
					font-size:37rpx;
					margin-right: 10rpx;
				}
				
				text:last-child{
					color: #999;
					font-weight: normal;
					text-decoration: line-through;
				}
			}
		}
	}
}
</style>