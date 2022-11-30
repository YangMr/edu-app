import request from "@/utils/request.js"

// 获取文章列表接口
const getArticleList = (data) => {
	return request({
		url : '/article/api/article/search',
		method : 'POST',
		data
	})
}

// 获取文章详情接口
const getArticleDetail = (id) => {
	return request({url : `/article/api/article/${id}`, method : 'GET'})
}

// 获取文章评论数据接口
const getComment = (id) => {
	return request({url : `/article/api/comment/list/${id}`, method : 'GET'})
}

// 提交文章评论接口
const submitComment = (data) => {
	return request({url : '/article/comment', method : 'POST', data})
}

// 导出文章模块所有接口
export default {
	getArticleList,
	getArticleDetail,
	getComment,
	submitComment
}