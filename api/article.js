import request from "@/utils/request.js"

// 获取文章列表接口
const getArticleList = (data) => {
	return request({
		url : '/article/api/article/search',
		method : 'POST',
		data
	})
}

// 导出文章模块所有接口
export default {
	getArticleList
}