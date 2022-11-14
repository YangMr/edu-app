<template>
	<view class="keyword-container">
		<view class="title">
			热门搜索
		</view>
		<view class="tag-list">
			<view @click="handleClickTag(item)" v-for="(item,index) in hotList" :key="index">
				{{item}}
			</view>
			
		</view>
		
		<view class="title space-between">
			<text>历史记录</text>
			<text @click="clearHistory">清空</text>
		</view>
		<view class="tag-list">
			<view @click="handleClickTag(item)" v-for="(item,index) in historyList" :key="index">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
import {HISTORY_KEY} from "@/enum/keyword-key.js"
export default {
	data(){
		return {
			// 热门搜索数据
			hotList : ['Java', 'SpringBoot', 'SpringCloud', 'Python', 'Vue', 'React'],
			// 历史记录
			historyList : wx.getStorageSync(HISTORY_KEY)
		}
	},
	methods : {
		// 清空搜索的历史记录
		clearHistory(){
			// 清空data中historyList里面的数据
			this.historyList = []
			// 清空本地存储的数据
			uni.removeStorageSync(HISTORY_KEY);
		},
		// 点击标签触发的方法
		handleClickTag(item){

			// 调用设置搜索框值的方法
			this.handleSetSearchValue(item)
			
			// 将当前所点击的标签的内容传递给父组件
			this.$emit("handleSearch", {value : item})
		}
	}
}
</script>

<style lang="scss">
.keyword-container{
	padding: 25rpx;
	
	.title{
		font-size: 30rpx;
		color: #222222;
		
		text:last-child{
			color : #999;
		}
	}
	
	.tag-list{
		display: flex;
		 flex-wrap: wrap;
		 // margin-top: 20rpx;
		 // margin-bottom: 60rpx;
		 margin: 20rpx 0 60rpx 0;
		view{
			font-size: 28rpx;
			color: #999;
			border: 1rpx solid #999;
			border-radius: 8rpx;
			padding: 6rpx 15rpx;
			margin: 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>