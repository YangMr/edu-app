export default {
	data(){
		return {
			
		}
	},
	methods : {
		// 页面跳转的方法
		navTo(url, options = {}){
			if(!url) return
			console.log("456")
			
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
		}
	}
}