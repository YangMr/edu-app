export default {
	data(){
		return {
			
		}
	},
	methods : {
		// 页面跳转的方法
		navTo(url, options = {}){
			if(!url) return
			
			if(options.login){
				uni.navigateTo({
					url : '/pages/auth/login'
				})
			}
			
			uni.navigateTo({
				url
			})
		},
		
		// 页面后退
		navBack(delta = 1){
			uni.navigateBack({
				delta
			})
		},
		
		// 设置搜索框的默认值
		handleSetSearchValue(item){
			if(item){
				// #ifdef APP-PLUS
				// APP设置搜索框的值
				const currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(item)
				// #endif
				
				// #ifdef H5
				// H5设置搜索框的值
				// 获取 ·搜索您想要的内容· 这段文本的父元素
				this.$nextTick(()=>{
					const placeholder = document.querySelector('.uni-page-head-search-placeholder')
					// 设置父元素的内容为空
					placeholder.innerHTML = ''
					// 获取搜索的输入框
					const inputSearch = document.querySelector('.uni-input-input[type=search]')
					// 设置输入框的内容为所点击的内容
					inputSearch.value = item
				})
				// #endif
			}
		}
	}
}