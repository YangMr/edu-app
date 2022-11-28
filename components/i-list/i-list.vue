<template>
	<view class="list-box">
		
		<view class="list" v-for="(item,index) in list" :key="index">
			<!-- 右侧是箭头 -->
			<view  
			v-for="(m,i) in item" :key="i" 
			class="list-item row space-between" 
			hover-class="active"
			@click="handleClickItem(m)"
			>
				<view class="left center">
					<text v-if="m.icon" :class="m.icon"></text>
					<text class="title">{{m.title}}</text>
				</view>
				<view class="right center">
					<text v-if="m.text">{{m.text}}</text>
					<image v-if="m.src" :src="m.src" mode=""></image>
					<text v-if="m.rightIcon" :class="m.rightIcon"></text>
					<switch v-if="m.checked || m.checked === false"  :checked="m.checked"  />
				</view>
			</view>
			
			<!-- 右侧是文字 -->
			<!-- <view class="list-item row space-between">
				<view class="left center">
					<text class="title">清除应用缓存</text>
				</view>
				<view class="right">
					<text>1KB</text>
				</view>
			</view> -->
			
			<!-- 右侧是开关 -->
			<!-- <view class="list-item row space-between">
				<view class="left center">
					<text class="title">允许非WIFI网络播放</text>
				</view>
				<view class="right">
					<switch :checked="false"  />
				</view>
			</view> -->
			
			<!-- 右侧有头像和箭头 -->
			<!-- <view class="list-item row space-between">
				<view class="left center">
					<text class="title">头像</text>
				</view>
				<view class="right center">
					<image src="../../static/logo.png" mode=""></image>
					<text class="iconfont icon-right"></text>
				</view>
			</view> -->
			
			<!-- 右侧有文本和箭头 -->
			<!-- <view class="list-item row space-between">
				<view class="left center">
					<text class="title">用户名</text>
				</view>
				<view class="right center">
					<text>Shirley Jones</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view> -->
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name:"i-list",
		props : {
			list : {
				type : Array,
				default : () => ([])
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleClickItem(data){
				if(data.page){
					this.navTo(data.page, {login : data.login})
					return
				}
				
				if(data.event){
					this.$emit(data.event, data)
					return
				}
			}
		}
	}
</script>

<style lang="scss">
.list-box{
	background-color: $i-color-grey;
	padding-top: 20rpx;
	
	.list{
		background-color: #fff;
		margin-bottom: 20rpx;
		
		.list-item{
			padding: 26rpx 39rpx;
			border-bottom:$i-underline;
			
			.left{
				font-size: 33rpx;
				
				text:first-child{
					margin-right: 20rpx;
				}
			}
			
			.right{
				text{
					font-size: 35rpx;
					color: $i-text-color-grey;
					margin-left: 15rpx;
				}
				
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 60px;
				}
				
				switch{
					margin-right: -10rpx;
				}
			}
		}
	}
	
	.active{
		background-color: #fafafa;
	}
}
</style>