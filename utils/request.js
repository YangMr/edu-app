import config from "@/config/index.js"

import store from "@/store/index.js"

const request = (options) => {
	
	const hasLogin = store.getters.hasLogin || ""
	
	return new Promise((resolve,reject)=>{
		
		const whileList = ['/system/sms/code','/auth/login', '/auth/login/provider',
		'/auth/user/mobile']
		
		// 需要登录之后才能访问的页面 请求的url地址 到没有 /api/
		if(whileList.indexOf(options.url) === -1 && options.url.indexOf('/api/') < 0 && !hasLogin){
			uni.navigateTo({
				url : "/pages/auth/login"
			})
		}
		
		uni.request({
			url :config.baseUrl + options.url,
			method : options.method || 'GET',
			header : {
				authorization : store.state.accessToken || "",
				...options.header
			},
			data : options.data || {},
			success : (res)=>{
				if(res.data.code === 20000){
					resolve(res.data.data)
				}
				
			},
			fail : (error)=>{
				reject(error)
			}
		})
	})
}

export default request
