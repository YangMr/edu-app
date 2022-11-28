<template>
	<view>
		<i-list :list="userListBar"></i-list>
		
		<button type="default" class="logout-btn" @click="handleUserLogout">退出登录</button>
	</view>
</template>

<script>
	
	/**
	 * 
	 * 1. 实现了个人资料页面布局  使用i-list组件 并且 结合数据源对数据进行渲染 
	 * 
	 * 2. 实现button按钮布局
	 * 
	 * 3. 点击button按钮实现退出登录功能
	 * 
	 * 4. 当我们在浏览器地址输入登录之后才能访问的页面路由, 跳转到登录页
	 * 
	 * 5. 实现当进入页面, 进行数据请求时, 判断当前页面请求的接口地址 是否 在白名单中 以及 请求的接口地址 是够包含 /api/ 以及 是否登录, 如果请求的
	 * 
	 * 		url不在白名单当中, 并且请求的url 没有 /api/ , 以及 也没有登录, 这个时候我们就让他进入到登录页
	 * 
	 * 最好的解决方案: 
	 * 		
	 * 		能够类似于想 vue 中的路由守卫一样, 当页面跳转的时候, 能够进行拦截
	 * 
	 * 	那么uni-app有没有提供对应的解决方案? 没有提供原生的api
	 * 
	 * 		我们可以通过扩展插件去实现 : uni-simple-router
	 * 
	 * **/
	
	import userListBar from "@/config/user-list-bar.js"
	import systemApi from "@/api/system.js"
	export default {
		data() {
			return {
				userListBar : userListBar()
			}
		},
		onLoad() {
			this.handleToLogin()
	// 		const hasLogin = this.$store.getters.hasLogin
	// 		if(!hasLogin){
	// 			this.navTo("/pages/auth/login")
	// 		}
	
		},
		
		onShow(){
			this.userListBar = userListBar()
		},
		
		methods: {
			// 用户退出登录
			handleUserLogout(){
				uni.showModal({
					title: '确定退出登录?',
					content: '退出后不会删除任何历史数据',
					success: async (res) => {
						if (res.confirm) {
							try{
								const accessToken = this.$store.state.accessToken
								const response = await systemApi.logout(accessToken)
								
								this.$store.commit("logout")
								
								this.$util.msg('成功退出登录')
								
								
								setTimeout(()=>{
									this.navBack()
								},300)
							}catch(e){
								//TODO handle the exception
								this.$util.msg("退出登录失败")
							}

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $i-color-grey;
}

.logout-btn{
	margin-top: 25rpx;
	background-color: #fff !important;
	border-radius: 0 !important;
	color: $i-text-color-black;
	
	&:after{
		border: 0 !important; 
	}
}
</style>
