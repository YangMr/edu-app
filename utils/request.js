import config from "@/config/index.js"

const request = (options) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url :config.baseUrl + options.url,
			method : options.method || 'GET',
			header : {
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
