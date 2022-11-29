import request from "@/utils/request.js"

// 发送验证码接口 
const sendSmsCode = (data) => {
	return request({url : '/system/sms/code', method : 'POST', data})
}

// 手机号登录
const login = (data) => {
	return request({url : '/auth/login', method : 'POST', data})
}

// 退出登录
const logout = (accessToken) => {
	return request({url : '/auth/logout', method : 'GET' , data : {accessToken}})
}

// 更新用户信息接口
const updateUserInfo = (data) => {
	return request({url : '/system/user', method : 'PUT', data})
}

// 更新手机号接口
const updateMobile = (data) => {
	return request({url : '/auth/user/mobile', method : 'PUT', data})
}

// 意见反馈
const sendFeedBack = (data) => {
	return request({url : '/system/api/feedback', method : 'POST', data})
}

export default {
	sendSmsCode,
	login,
	logout,
	updateUserInfo,
	updateMobile,
	sendFeedBack
}