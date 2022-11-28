import request from "@/utils/request.js"

// 发送验证码接口 
/**
 * data : {
	 mobile
	 templateCode
 }
 */
const sendSmsCode = (data) => {
	return request({url : '/system/sms/code', method : 'POST', data})
}

// 手机号登录
/**
 * data : {
	 mobile
	 code
 }
 **/
const login = (data) => {
	return request({url : '/auth/login', method : 'POST', data})
}

// 退出登录
const logout = (accessToken) => {
	return request({url : '/auth/logout', method : 'GET' , data : {accessToken}})
}

export default {
	sendSmsCode,
	login,
	logout
}