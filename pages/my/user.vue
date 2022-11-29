<template>
	<view>
		<i-list 
		:list="userListBar"
		@chooseImg="handleChooseImg"
		@editUsername="handleEditUsername"
		@editMobile="handleEditMobile"
		@editName="handleEditName"
		@chooseSex="handleChooseSex"
		></i-list>
		
		<button type="default" class="logout-btn" @click="handleUserLogout">退出登录</button>
	
		<!-- 修改昵称布局 -->
		<view v-if="isUpdate" class="update-nickname row">
			<input type="text"  v-model="content" />
			<text @click="updateNickName">修改</text>
		</view>
	
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
	import uploadApi from "@/api/upload.js"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				userListBar : userListBar(),
				isUpdate : false,
				content : ''
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
		
		computed : {
			...mapState(["userInfo"])
		},
		
		
		methods: {
			onBackPress(){
				if(this.isUpdate){
					this.isUpdate = false
					return true
				}
				
			},
			
			// 修改用户头像
			handleChooseImg(){
				uni.chooseImage({
					count: 1, //默认9
					success:  async (res) => {
						// 获取到上传的文件信息
						const file = res.tempFilePaths[0]

						// 开启loading加载
						uni.showLoading({
							title : '更换头像中',
							mask : true
						})
						
						try{
							const response = await uploadApi.uploadImg(file)
							if(response.code === 20000){
								
								// 更新vuex中上传之后的头像
								this.userInfo.imageUrl = response.data
								
								// 调用更新用户信息方法
								this.handleUpdataUserInfo()
							}else{
								uni.hideLoading()
							}
							
						}catch(e){
							uni.hideLoading()
							console.log("e",e)
						}
					}
				});
			},
			
			// 更新用户信息
			async handleUpdataUserInfo(){
				const response = await systemApi.updateUserInfo(this.userInfo)	
				console.log("response=>", response)
				
				this.$store.commit('setToken', {userInfo : this.userInfo})
				
				this.userListBar = userListBar()
				
				uni.hideLoading()
			},
			
			// 修改用户名
			handleEditUsername(){
				this.$util.msg("用户名不允许被修改")
			},
			
			// 修改手机号
			handleEditMobile(){
				const data = encodeURIComponent(JSON.stringify({userInfo : this.userInfo}))
				this.navTo(`/pages/auth/bind-mobile?title=修改手机号&data=${data}`)
			},
			// 修改昵称
			handleEditName(data){
				this.isUpdate = true
				console.log("data", data)
				this.content = data.text
			},
			
			async updateNickName(){
				const content = this.content.trim()
				console.log("content", content)
				if(!content){
					this.$util.msg('昵称不能为空，请重新填写')
					return
				}
				
				uni.showLoading({
					mask : true
				})
				
				this.userInfo.nickName = content
				this.$store.commit("userInfo", {userInfo : this.userInfo})
				await systemApi.updateUserInfo(this.userInfo)
				
				this.userListBar = userListBar()
				uni.hideLoading()
				
				this.isUpdate = false
			},
			
			// 修改性别
			handleChooseSex(){
				const item = ['男', '女']
				uni.showActionSheet({
					itemList: item,
					success: async (res) => {
						const index = res.tapIndex
						
						this.userInfo.sex = index
						
						this.$store.commit("setToken", {userInfo : this.userInfo})
						
						await systemApi.updateUserInfo(this.userInfo)
						
						this.userListBar = userListBar()
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			
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

.update-nickname{
	position: fixed;
	background-color: #fff;
	left :0;
	right : 0;
	top : var(--window-top);
	bottom : 0;
	z-index : 99;
	
	input{
		width: 650rpx;
		 height: 90rpx;
		 font-size: 35rpx;
		 padding: 0 20rpx;
		 background-color: #FFFFFF;
		 border: $i-underline;
		 margin: 0 10rpx;
	}
	
	text{
		z-index: 100;
		 width: 100rpx;
		 height: 90rpx;
		 line-height: 90rpx;
		 text-align: center;
		 color: $i-text-color-blue;
	}
}
</style>
