<template>
	<view class="course-header">
		<!-- 课程封面 -->
		<image class="cover" :src="item.mainImage"></image>
		
		
		<!-- 课程信息 -->
		<view class="header-info">
			<view class="price-info">
				<text v-if="item.priceDiscount">￥{{item.priceDiscount}}</text>
				<text :class="{price : item.priceDiscount}">￥{{item.priceOriginal}}</text>
				<text v-if="item.priceDiscount" class="preferential">优惠价</text>
			</view>
			<view class="title text-ellipsis">
				{{item.title}}
			</view>
			<view class="count row">
				<text class="iconfont icon-haoping2">{{item.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{item.studyTotal}}人在学</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props : {
		item : {
			type : Object,
			default : () => ({
				"id": 10,
				"title": "Uniapp兼容多端在线教育项目实战",
				"studyTotal": 590, //在学人数
				"goodRate": '100%', //好评率
				"mainImage":"https://gd4.alicdn.com/imgextra/i4/3603079088/O1CN01dczOSM2H0LvTowhkl_!!3603079088.png",
				"isFree": 0, // 0 付费，1免费
				"priceOriginal": 614.51, //原价
				"priceDiscount": 281.91 // 优惠
			})
		}
	}
}
</script>

<style lang="scss">
.course-header{
	
	.cover{
		width: 100%;
		height : 420rpx;
	}

	.header-info{
		border:25rpx solid $i-color-grey;
		background: #fff;
		border-left : 0;
		padding: 25rpx;
		border-right: 0;
		
		
		.price-info{
			text{
				margin-right: 15rpx;
				
				&:first-child{
					font-size:  46rpx;
					font-weight: bold;
					color : $i-text-color-red;;
				}
			}
			
			.price{
				color: #B6BBBF;
				font-size: 30rpx;
				text-decoration: line-through; // 删除线
			}
			
			.preferential{
				color: $i-text-color-red;
				font-size: 20rpx;
				border: 1px solid $i-text-color-red;
				border-radius: 10rpx; 
				padding : 0 3rpx;
			}
		}
		
		
		.title{
			font-size : 35rpx;
			font-weight: bold;
			color: #1d1d1f;
			-webkit-line-clamp: 1; //最多1行
			padding-left: 8rpx;
		}
		
		.count{
			padding:15rpx 0;
			
			text{
				font-size: 20rpx;
				color: #7d828f;
				border-radius: 30rpx;
				background-color: $i-color-grey;
				margin-right:15rpx;
				padding : 15rpx;
			}
		}
	}
	
	
}

</style>