// 引入http请求文件
import request from "@/utils/request.js"

// 轮播图接口
const getBanner = (position = 1) => {
	return request({url : `/article/api/advert/show/${position}`, method : 'GET'})
}


// 分类接口
const getCategory = () => {
	return request({url : '/article/api/category/label/list', method : 'GET'})
}

// 课程列表接口
const getCourseList = (data) => {
	return request({url : '/course/api/course/search', method : 'POST', data })
}


// 导出所有的api方法
export default {
	getBanner,
	getCategory,
	getCourseList
}