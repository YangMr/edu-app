import indexApi from "@/api/index.js"
class IndexModel {
	static current = 1
	static size = 8
	static total = 0
	static data = []
	
	// 开启扫码
	static async handleOpenScanCode() {
		try {
			// 调用扫码项目, 获取二维码结果
			const res = await uni.scanCode()
			// 跳转到webview页面
			uni.navigateTo({
				url: `/pages/public/web-view?url=${res.result}`
				// url : `/pages/public/web-view?url=https://wap.hxwendeng.com/index`
			})
		} catch (e) {
			//TODO handle the exception
			console.log("error=>", e)
		}
	}
	
	// 获取课程列表数据
	static async getCourseList(data = {}) {
		try{
			// if(IndexModel.data.length === IndexModel.total){
			// 	return
			// }
			
			const res = await indexApi.getCourseList({
				current : IndexModel.current, 
				size : IndexModel.size, 
				...data
			})
			
			
			IndexModel.current+=1
			IndexModel.total = res.total
			console.log("records", res.records)
		
			IndexModel.data.push(...res.records)
			console.log(IndexModel.data)
			return IndexModel.data
		}catch(e){
			//TODO handle the exception
			console.log("err",e)
		}
	}
}

export default IndexModel
