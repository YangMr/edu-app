<template>
	<view class="i-code center">
		<text class="code-btn" @click="getSensSmsCode">
			{{codeDuration ? codeDuration + 's' : '获取验证码'}}
		</text>
	</view>
</template>

<script>
	export default {
		name: "i-code",
		props: {
			// 手机号
			mobile: {
				type: String,
				default: ""
			},
			// 短信模版
			templateCode: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				codeDuration: null,
				interval: null,
				disabled : false
			};
		},
		methods: {
			getSensSmsCode() {
				// 如果正在倒计时,则不继续往下执行
				if(this.disabled){
					return
				}

				// 如果输入框内容为空,则提示手机号不能为空
				if (!this.mobile) {
					this.$util.msg("手机号不能为空")
					return
				}
				// 如果输入框的手机号不符合规范, 则提示手机号格式不正确
				const rules = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

				if (!rules.test(this.mobile)) {
					this.$util.msg("手机号格式不正确")
					return
				}


				// 先调用发送验证码接口

				// 调用成功之后在进行倒计时
				this.codeDuration = 60
				this.disabled = true
				this.interval = setInterval(() => {
					
					this.codeDuration--
					
					if (this.codeDuration <= 0) {
						if (this.interval) {
							clearInterval(this.interval)
							this.interval = null
							this.disabled = false
						}
					}
				}, 1000)



			}
		}
	}
</script>

<style lang="scss">
	.i-code {
		width: 160rpx;
		background-color: #345dc2;
		border-radius: 10rpx;
	}

	.code-btn {
		padding: 10rpx 0;
		font-size: 25rpx;
		color: #FFFFFF;
	}
</style>
