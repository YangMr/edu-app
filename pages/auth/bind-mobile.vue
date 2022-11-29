<template>
	<view class="content">
		<view class="input-group">
			
			<view class="center">
				<text class="title">手机号: </text>
				<view class="row">
					<input v-model="mobile" class="i-input" placeholder="请输入手机号码"  type="text" value="" />
				</view>
				
			</view>
			
			<view class="center">
				<text class="title">验证码: </text>
				<view class="row">
					<input v-model="code" class="i-input" placeholder="请输入验证码" type="text" value="" />
					<i-code :mobile="mobile" templateCode="SMS_1993234234"></i-code>
				</view>
			</view>
			
			<button type="primary" @click="handleSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	import systemApi from "@/api/system.js"
	export default {
		data() {
			return {
				userInfo : null,
				mobile : '',
				code : ''
			}
		},
		onLoad(options) {
			if(options.title){
				uni.setNavigationBarTitle({
					title:options.title
				})
			}
			const data = JSON.parse(decodeURIComponent(options.data))
			this.userInfo = data.userInfo
		},
		methods: {
			async handleSubmit(){
				console.log(this.mobile)
				// 校验手机号
				if(!this.$util.checkStr(this.mobile, 'mobile')){
					this.$util.msg("手机号码格式不正确")
					return
				}
				// 校验验证码
				if(!this.$util.checkStr(this.code,'mobileCode')){
					this.$util.msg("验证码错误")
					return
				}
				
				// 调用更新手机号接口
				try{
					uni.showLoading({
						mask:true
					})
					
					const data = {mobile : this.mobile, code : this.code}
					const response = await systemApi.updateMobile(data)
					
					uni.hideLoading()
					
					this.$util.msg("更新成功")
					
					console.log("response=>", response)
					
					this.handleUpdateSuccess(response)
					
				}catch(e){
					uni.hideLoading()
					//TODO handle the exception
					console.log("e", e)
					
					this.$util.msg('操作失败')
				}
			},
			
			handleUpdateSuccess(data){
				this.$store.commit("setToken", data)
				setTimeout(()=>{
					this.navBack(2)
				},300)
				
			}
		}
		
	}
</script>

<style lang="scss">
page{
	background-color: $i-color-grey;
}
.content{
	margin: 80rpx 20rpx;
}
.input-group{
	background-color: #fff;
	padding: 0 25rpx;
	border-radius: 10rpx;
	
	.title{
		width: 190rpx;
		font-size: 35rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	.row{
		width: 100%;
	}
	
	.i-input{
		flex: 1;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 35rpx;
	}
	
	button[type = 'primary']{
		margin-top: 80rpx;
		background-color: $i-color-primary;
	}
}
</style>
