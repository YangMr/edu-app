import indexApi from "@/api/index.js"
class IndexModel {
	
	// 页码
	static current = 1
	// 条数
	static size = 8
	
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
	
	// 获取(热门推荐/近期上新/免费精选)课程列表数据
	static async getCourseList(data = {}) {
		try{
			const res = await indexApi.getCourseList({
				current : IndexModel.current,
				size : IndexModel.size,
				...data
			})
			return res.records
			console.log("res=>", res)
		}catch(e){
			//TODO handle the exception
			console.log("err", e)
		}
	}

}

export default IndexModel
