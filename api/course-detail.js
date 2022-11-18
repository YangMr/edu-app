import request from "@/utils/request.js"

// 课程详情接口
const getCourseDetail = (id) => {
	return request({url : `/course/api/course/${id}`, method : "GET"})
}
// 课程章节接口
const getChapterList = (id) => {
	return request({url : `/course/api/chapter/section/list/${id}`, method : 'GET'})
}

// 课程评论接口
const getCommentList = (id) => {
	return request({url : `/course/api/comment/list/${id}`, method : 'GET'})
}

// 课程套餐接口
const getGroupList = (id) => {
	return request({url : `/course/api/group/list/${id}`,method : 'GET'})
}

// 查询课程是否已购买
const findCourseStatus = (id) => {
	return request({url : `/course/course/is-buy/${id}`, method : 'GET'})
}

// 导出封装的api

export default {
	getCourseDetail,
	getChapterList,
	getCommentList,
	getGroupList,
	findCourseStatus
}