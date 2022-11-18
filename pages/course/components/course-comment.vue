<template>
	<view>
		<i-no-data v-if="!commentList || commentList.length <= 0 "></i-no-data>
		
		<view class="comment" v-else>
			<view class="comment-item" v-for="(item,index) in commentList" :key="index">
				<view class="info space-between center">
					<view class="row center">
						<image class="avatar" :src="item.userImage || '/static/tab/my.png'"></image>
						<view class="user column">
							<text>{{item.nickName}}</text>
							<text>{{item.createDate}}</text>
						</view>
					</view>
					<text v-if="item.isGood === 1" class="iconfont icon-haoping2 good"></text>
					<text v-if="item.isGood === 0" class="iconfont icon-haoping2 grey"></text>
				</view>
				<view class="content">{{item.content}}</view>
				<view class="replay" v-if="item.children && item.children.content">
					<text>讲师回复:</text>
					<text>{{item.children.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentList: {
				type: Array,
				default: () => ([{
						"id": 1,
						"parentId": "-1",
						"nickName": "萧强",
						"userImage": null,
						"isGood": 1, // 1好评，0差评
						"content": "很认可梦学谷，这套课程项目与企业开发流程功能一样",
						"createDate": Date.now(), //wx小程序不支持new Date()
						"children": null
					},
					{
						"id": "2",
						"parentId": "-1",
						"nickName": "江秀英",
						"userImage": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
						"isGood": 0, // 1好评，0差评
						"content": "但非约事京或改各史习反候至百。",
						"createDate": "2008-03-12 09:08:06",
						"children": {
							"id": "3",
							"parentId": "2",
							"nickName": "李涛",
							"userImage": null,
							"content": "感谢你一直以来的支持！梦学谷-陪你学习，伴你梦想！",
							"createDate": "2008-03-12 09:08:06",
						}
					}
				])
			}
		}
	}
</script>

<style lang="scss">
.grey{
	color :#959da5;
}	
.good{
	color: #ff001b;
}

.comment{
	padding : 0 36rpx;
	background-color: #fff;
	font-size: 30rpx;
	
	.info{
		
		text:last-child{
			font-size :  35rpx;
			
		}
	}
	
	.comment-item{
		margin-top: 36rpx;
		border-bottom: $i-underline;
		
		.avatar{
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.user{
			font-weight: bold;
			line-height: 33rpx;
			
			text:last-child{
				color: #999;
				font-size: 25rpx;
				font-weight:normal;
				margin-top: 5rpx;
			}
		}

		.content{
			margin: 25rpx 0;
		}
		
		.replay{
			background-color: #F8F9FB;
			padding: 15rpx;
			border-radius: 8rpx;
			color: #7d828f;
			margin-bottom: 30rpx;
		}
	}
}
</style>
