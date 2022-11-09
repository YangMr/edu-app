<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端搜索框 -->
		<i-search-input></i-search-input>
		<!-- #endif -->
		
		<i-banner></i-banner>
	</view>
</template>

<script>
	// 引入搜索框组件
	import iSearchInput from "@/components/common/i-search-input.vue"
	// 引入轮播图组件
	import iBanner from "@/components/common/i-banner.vue"
	
	// 引入搜索框模型
	import SearchModel from "@/model/searchModel.js"
	export default {
		data() {
			return {
				
			}
		},
		components : {
			iSearchInput,
			iBanner
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 这个方法只在APP端有效
			SearchModel.handleUpdatePlaceholderText(this)
			// #endif
			
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
