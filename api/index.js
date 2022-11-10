// 引入http请求文件
import request from "@/utils/request.js"

// 轮播图接口
const getBanner = () => {
	return request({url : '/article/api/advert/show/1', method : 'GET'})
}

// 导出所有的api方法
export default {
	getBanner
}