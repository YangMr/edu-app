<template>
	<view>
		search
	</view>
</template>

<script>

	export default {
		data() {
			return {
				params : null,
				content : "",
				// #ifdef APP-PLUS
				currentWebview : null,
				// #endif
			}
		},
		onLoad(options) {
			this.listenerParams(options)
		},
		// 点击导航栏按钮触发的方法
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.navBack()
			}
		},
		// 监听输入实时输入的内容
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
		},
		// 监听是否在手机上点击了搜索按钮
		onNavigationBarSearchInputConfirmed() {
			// #ifdef APP-PLUS
			this.currentWebview.setTitleNViewSearchInputFocus(false)
			// #endif
			
			this.handleSearch()
		},
		methods: {
			// 监听跳转到搜索页的时候有没有传递参数
			listenerParams(options){
				// #ifdef APP-PLUS
				this.currentWebview = this.$mp.page.$getAppWebview()
				// #endif
				
				// 有参数, 进行搜索查询
				if(JSON.stringify(options) !== "{}"){
					this.params = options
					this.handleSearch()
				}else{
					// #ifdef APP-PLUS
					// 没有参数,则需要让搜索框获取到焦点
					this.currentWebview.setTitleNViewSearchInputFocus(true)
					// #endif
				}	
			},
			
			// 搜索框查询方法
			handleSearch(){
				console.log("进行查询")
			}
		}
	}
</script>

<style>

</style>
