import config from "@/config/index.js"
import store from "@/store/index.js"
const upload = (options) => {
	
	return new Promise((resolve,reject)=>{
		
		const accessToken = store.state.accessToken
		console.log("accessToken=>", accessToken)
		if(!accessToken){
			uni.showLoading({
				title : '请先登录',
				icon : "none"
			})
			
			return setTimeout(()=>{
				uni.navigateTo({
					url : '/pages/auth/login'
				})
			},500)
		}
		console.log("options=>", options)
		uni.uploadFile({
			url : config.baseUrl + options.url,
			filePath : options.file || "",
			method : 'POST',
			name : options.name || "file",
			header : options.header || {},
			formData : options.data || {},
			timeout : 8000,
			header : {
				"Authorization" : 'Bearer ' + accessToken 
			},
			success : res=>{
				if(res.statusCode === 200){
					resolve(JSON.parse(res.data))
				}
			},
			fail : err => {
				reject(err)
			}
		})
	})
}

export default upload