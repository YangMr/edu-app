<template>
	<view class="article-item">
		<view class="article-content row space-between">
			<view class="left-text column ">
				<text class="title text-ellipsis">
					{{item.title}}
				</text>
				<text class="summary text-ellipsis">
					{{item.summary}}
				</text>
			</view>
			<view class="right-image">
				<image v-if="item.imageUrl" :src="item.imageUrl"></image>
			</view>
		</view>
		<view class="article-info ">
			<text>{{item.nickName}}</text>
			<text>· {{updateDate}}</text>
			<text>· {{item.thumhup}} 赞</text>
		</view>
	</view>
</template>

<script>
export default {
	props : {
		item : {
			type : Object,
			default : () => {
				return {
				id: 1,
				title : 'SpringBoot项目实战教程分布式微服务架构项目实战教程分布式微服务架构项目实战教程分布式微服务架构',
				summary : 'SpringCloud OAuth2 Vue分布式微服务架构项目实战教程分布式微服务架构分布式微服务架构项目实战教程分布式微服务架构分布式微服务架构项目实战教程分布式微服务架构分布式微服务架构项目实战教程分布式微服务架构',
				imageUrl : 'http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600',
				nickName : '梦老师',
				thumhup :100,
				updateDate : new Date(),
			}
			}
		}
	},
	computed : {
		updateDate(){
			return this.$util.dateFormat(this.item.updateDate,'YYYY年MM月DD日')
		}	
	},
	mounted() {
		// console.log("old time", this.item.updateDate)
		// console.log("for", this.$util.dateFormat(this.item.updateDate))
	}
}
</script>

<style lang="scss">
.article-item{
	padding : 30rpx;
	border-bottom: 1px solid  #f1f1f1;
	
	.article-content{
		
		.left-text{
			padding-right:10rpx;
			
			.title{
				font-size: 35rpx;
				font-weight: bold;
			}
			
			.summary{
				padding-top: 5rpx;
				font-size: 26rpx;
				color: #999;
				-webkit-line-clamp: 1; //最多1行
			}
		}
		
		.right-image{
			width: 220rpx;
			height : 140rpx;
			margin-lefgt: 5rpx;
			image{
				width: 220rpx;
				height : 140rpx;
				border-radius: 10rpx;
			}
		}
	}


	.article-info{
		
		text{
			font-size: 26rpx;
			color: #999;
			padding-right: 10rpx;
			
			&:first-child {
				color : #222;
			}
		}
		
		
		
	}
}
</style>