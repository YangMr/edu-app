import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {USER_INFO_KEY, TOKEN_KEY} from "@/enum/user-key.js"

const store = new Vuex.Store({
	state : {
		// 用户信息
		userInfo : uni.getStorageSync(USER_INFO_KEY) || {},
		// 用户登录之后的令牌(token)
		accessToken :  uni.getStorageSync(TOKEN_KEY) || ""
	},
	getters : {
		// 获取登录的状态
		hasLogin(state){
			// !! 可以将其他数据类型转化布尔类型
			return !!state.accessToken
		}
	},
	mutations : {
		// 存储token以及用户信息
		setToken(state, data){
			//解构出token 以及 用户信息
			const {access_token, userInfo} = data
			
			// 判断用户信息是否有值
			if(userInfo){
				// 将用户信息存储到vuex
				state.userInfo = userInfo
				// 将用户信息存储到本地
				uni.setStorageSync(USER_INFO_KEY, userInfo)
			}
			
			// 判断token是否存在
			if(access_token){
				// 将token存储到vuex
				state.accessToken = access_token
				// 将token存储到本地
				uni.setStorageSync(TOKEN_KEY, access_token)
			}
		},
		//退出登录
		logout(state){
			// 清空vuex里面存储的用户信息以及token
			state.userInfo = {}
			state.accessToken = ""
			// 清空本地存储的用户信息以及token
			uni.removeStorageSync(USER_INFO_KEY)
			uni.removeStorageSync(TOKEN_KEY)
			
		}
	},
	actions : {
		
	},
	modules : {
		
	}
})

export default store