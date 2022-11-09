class SearchModel {
	// 动态切换APP端搜索提示信息
	static handleUpdatePlaceholderText(instance){
		// 2. 定义导航栏搜索框的数据源
		const arr = [ 'APP · 微信小程序', 'Java · SprinBoot', 'SpringCloud · SpringSecurity', 'Vue · React']
		let i = 0;
		// 3. 调用设置导航栏的方法
		SearchModel.handleSetPlaceholderText(instance,arr[i])
		// 4. 动态切换搜索框提示文本
		setInterval(()=>{
			i = i < 3 ? ++i : 0
			SearchModel.handleSetPlaceholderText(instance,arr[i])
		},3000)
	}
	// 动态设置搜索框提示文本
	static handleSetPlaceholderText(instance,data){
		// 1. 获取到页面实例
		const webview = instance.$scope.$getAppWebview();
		webview.setStyle({
			"titleNView" : {
				"searchInput" : {
					"placeholder" : data
				}
			}
		})
	}
}

export default SearchModel