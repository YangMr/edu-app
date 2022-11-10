class IndexModel {
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
}

export default IndexModel
