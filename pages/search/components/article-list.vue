<template>
	<view>		
		<i-down-bar @search="search" :params="params"></i-down-bar>
	</view>
</template>

<script>
export default {
	props : {
		params : {
			type : Object,
			default : () => {}
		},
		content: { //搜索框内容
			type: String,
			default: '',
		},
	},
	methods : {
		// 搜索
		 search(data) {
		
		 }
	}
}
</script>

<style>
</style>