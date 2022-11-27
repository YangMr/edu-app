export default {
	data(){
		return {
			
		}
	},
	methods : {
		// 部分页面鉴权
		// 所有页面鉴权 
		// 部分页面鉴权
		
		// 页面跳转的方法
		// options ==  {login : data.login}
		navTo(url, options = {}){
			if(!url) return
			
			// 判断当前页面跳转的时候 需不需要检测有没有 登录, 如果options.login 的
			// 值为true的情况下,那么则需要获取vuex中登录的状态
			// 如果vuex中hasLogin 的值为false的话,则表示用户没有登录,那么这个
			// 时候,我们则跳转到登录页
			if(options.login && !this.$store.getters.hasLogin){
				uni.navigateTo({
					url : '/pages/auth/login'
				})
				return
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