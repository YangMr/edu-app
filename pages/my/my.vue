<template>
	<view class="my-page">
		<view class="my-header">
			<view  @click="hasLogin ? navTo('/pages/my/user', {login : true}) : navTo('/pages/auth/login')" class="header-content space-between center">
				<view class="left row center" > 
					<image :src="userInfo.imageUrl || '../../static/logo.png'" mode=""></image>
					<view v-if="hasLogin" class="header-info column">
						<text class="nickname">{{userInfo.nickName}}</text>
						<text class="username">用户名：{{userInfo.username}}</text>
					</view>
					
					<text v-else class="header-info">请登录</text>
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		
		<i-list :list="myListBar"></i-list>
	</view>
</template>

<script>
	import {mapState, mapGetters} from "vuex"
	import myListBar from "@/config/my-list-bar.js"
	export default {
		data() {
			return {
				myListBar : myListBar()
			}
		},
		computed : {
			...mapState(['userInfo']),
			...mapGetters(['hasLogin'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.my-page{
	
	
	.my-header{
		background-color: $i-color-primary;
		padding-top: 100rpx;
		
		.header-content{
			padding: 50rpx 39rpx;
			background-color: #fff;
			border-radius: 30px 30px 0 0;
			// background-color: #fff;
			
			.left{
				
				image{
					width: 150rpx;
					height: 150rpx;
					border-radius: 60px;
				}
				
				.header-info{
					margin-left: 30rpx;
					font-weight: bold;
					font-size: 39rpx;
					
					.nickname{
						font-size: 39rpx;
						 font-weight: 500;
					}
					
					.username{
						font-size: 33rpx;
						 color: $i-text-color-grey;
					}
				}
			}
			
			.icon-right{
				font-size: 17px;
				color: #959da5;
			}
		}
		
	}
}
</style>
