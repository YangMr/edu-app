<template>
	<view class="login">
		<text class="iconfont icon-close back-btn"></text>
		<view class="left-top-sign">LOGIN</view>
		<view class="welcome">欢迎回来!</view>

		<view class='input-content'>
			
			<view class="input-item">
				<text class="title">手机号码</text>
				<view class="row">
					<input type="number" v-model="mobile" maxlength="11" placeholder="请输入手机号码" placeholder-style="color: #909399" />
				</view>
			</view>
			
			<view class="input-item">
				<text class="title">验证码</text>
				<view class="row">
					<input v-model="code" type="input" maxlength="11" placeholder="请输入手机验证码" placeholder-style="color: #909399" />
					<i-code :mobile="mobile" :templateCode="templateCode"></i-code>
				</view>
			</view>
			
			<button class="login-button" type="primary" :loading="loading" @click="handleUserLogin">登录</button>
		</view>
	
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="other-wrapper">
			<view class="line center">
				<text class="title">社交账号登录</text>
			</view>
			<view class="row">
				<image class="icon"  src="@/static/share/weixin.png" mode=""></image>
				<!-- #ifdef APP-PLUS -->
				<image class="icon" src="@/static/share/qq.png" mode=""></image>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
		
		{{$store.state.count}}
		
		<view class="agreement center">
			<text class="iconfont  icon-roundcheckfill" :class="{active : agreement}" @click="handleCheckAgreement"></text>
			<text @click="handleCheckAgreement">请认真阅读并同意</text>
			<text class="title" @click="navTo('/pages/public/xieyi')">《用户服务协议》</text>
			<text class="title" @click="navTo('/pages/public/yinsi')">《隐私权政策》</text>
		</view>
	</view>
</template>

<script>
	import systemApi from "@/api/system.js"
	/**
	 * 1. 创建登录页面
	 * 2. 取消 h5 app 小程序 三端的自定义导航栏
	 * 3. 实现登录页面布局
	 * */
	export default {
		data() {
			return {
				// 手机号
				mobile : '',
				// 验证码
				code : '',
				// loading加载
				loading : false,
				// 是否同意协议
				agreement : true,
				// 短信模版
				templateCode : 'MSM_1999123123'
			}
		},
		methods: {
			// 登录
			async handleUserLogin(){
				
				// 检测用户是否同意安全协议
				if(!this.agreement){
					this.$util.msg("请阅读并同意用户服务及隐私协议")
					return
				}
				
				// 检测手机号格式是否正确
				if(!this.$util.checkStr(this.mobile, 'mobile')){
					this.$util.msg("请输入有效手机号码")
					return
				}
				
				// 检测验证码是否正确
				if(!this.$util.checkStr(this.code, 'mobileCode')){
					this.$util.msg("验证码输入错误")
					return
				}
				
				// 开启loading
				this.loading = true
				
				// 提示登录中
				uni.showLoading({
					title : '登录中',
					mask : true
				})
				
				// 调用登录接口
				try{
					// 发送请求
					const data = {mobile : this.mobile, code : this.code}
					const response = await systemApi.login(data)

					// 隐藏loading
					this.loading = false
					uni.hideLoading()
					
					// 登录成功之后调用当前方法将用户信息以及token存储到vuex
					this.loginSuccessCallBack(response)
				}catch(e){
					//TODO handle the exception
					// 隐藏loading
					this.loading = false
					uni.hideLoading()
				}
				
			},
			// 设置是否同意隐私协议
			handleCheckAgreement(){
				this.agreement = !this.agreement
			},
			// 当前方法将用户信息以及token存储到vuex
			loginSuccessCallBack(data){

				// 提示用户登录成功
				this.$util.msg("登录成功")
				
				// 将用户信息以及token存储到vuex
				this.$store.commit('setToken', data)
				
				// 返回到上一页
				setTimeout(()=>{
					this.navBack()
				},500)
			}
		}
	}
</script>

<style lang="scss">
	.login {


		padding-top: 200rpx;

		.back-btn {
			padding: 20rpx;
			position: absolute;
			left: 20rpx;
			top: calc(var(--status-bar-height) + 20rpx);
			font-size: 39rpx;
			color: #606266;
		}

		.left-top-sign {
			font-size: 120rpx;
			color: #f8f8f8;
		}

		.welcome {
			position: relative;
			top: -90rpx;
			padding-left: 60rpx;
			font-size: 46rpx;
			color: #555;
			text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
		}

		.input-content {

			padding: 0 60rpx;

			.input-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				padding-left: 30rpx;
				background: #f8f6fc;
				height: 120rpx;
				border-radius: 4px;
				margin-bottom: 50rpx;

				.row {
					width: 100%;
				}

				.title {
					height: 50rpx;
					line-height: 56rpx;
					font-size: 26rpx;
					color: #606266;
				}

				input {
					flex: 1;
					height: 60rpx;
					font-size: 30rpx;
					color: #303133;
					width: 100%;
				}
		
			}
			
		}
		.login-button{
			background-color: $i-color-primary;
		}
		
		.other-wrapper{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 20rpx;
			margin-top: 80rpx;
			
			
			
			.line{
				margin-bottom: 40rpx;
				&::before, &::after{
					content: "";
					// display: block;
					width: 160rpx;
					height : 0;
					border-top: 1px solid  #e0e0e0;;
				}
				
				.title{
					margin: 0 32rpx;
					font-size: 24rpx;
					color: #606266;
				}
			
			}
			
			.icon{
				width: 80rpx;
				height: 80rpx;
				margin: 0 50rpx;
			}
		}
		
		.agreement{
			position: absolute;
			 left: 0;
			 right:0;
			 bottom: 10rpx;
			 // width: 750rpx;
			 height: 90rpx;
			 font-size: 24rpx;
			 color: #999;
			 
			 .iconfont{
				font-size: 36rpx;
				color: #ccc;
				margin-right: 8rpx;
				
				&.active{
					color : $i-color-primary;
				}
			 }
			 
			 .title{
				 color: #40a2ff;
			 }
		}
	}
	
	
</style>
