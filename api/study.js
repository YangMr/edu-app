import request from "@/utils/request.js"

//  查询我的学习列表接口
const getStudyList = () => {
	return request({url : '/course/course/study/list', method : 'GET'})
}

export default {
	getStudyList
}