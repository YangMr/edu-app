<template>
	<view class="feed-back">
		<radio-group class="radio-group" @change="radioChange">
			<label class="label" v-for="(item, index) in items" :key="item.value">
				<radio style="transform: scale(0.7);" :value="item.value" :checked="item.value === current" />
				<text>{{item.name}}</text>
			</label>
		</radio-group>

		<textarea v-model="formData.content" maxlength="500" placeholder="请填写具体内容帮助我们了解您的意见和建议" />

		<input v-model="formData.qq" type="number" maxlength="15" placeholder="填写您的QQ">
		<input v-model="formData.weixin" type="text" maxlength="25" placeholder="填写您的微信">

		<!-- #ifdef APP-PLUS -->
		<view class="location">
			<view>您的当前位置：</view>
			<text>{{ location || '获取信息中'}}</text>
		</view>
		<!-- #endif -->
		

		<button type="primary" hover-class="button-hover" @click="submitHandler">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				location: "",
				formData: {
					content: "",
					qq: "",
					weixin: ""
				},
				items: [{
						value: "1",
						name: '内容意见',
						checked: 'true'
					},
					{
						value: "2",
						name: '产品建议'
					},
					{
						value: "3",
						name: '其他'
					}
				],
				current: "1"
			}
		},
		onLoad(){
			
			// #ifdef APP-PLUS
			uni.getLocation({
				type : 'wgs84',
				geocode: true, //解析地址信息
				success : (res)=>{
					this.location =  res.address.province + res.address.city
				}
			})
			// #endif
			
		},
		methods: {
			radioChange(e) {
				console.log("e==>", e)
			},
			submitHandler() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $i-color-grey;
	}

	.feed-back {
		padding: 0 40rpx;
	}

	.radio-group {
		margin: 30rpx 0;
		text-align: center;

		.label {
			margin-right: 30rpx;
			font-size: 30rpx;
		}
	}

	textarea {
		width: 100%;
		border: 1px solid #E9E9E9;
		padding: 10rpx;
		line-height: 60rpx;
	}

	input {
		width: 100%;
		margin-top: 30rpx;
		border: 1px solid #E9E9E9;
		height: 70rpx;
		padding: 10rpx;
	}

	button[type=primary] {
		width: 100%;
		margin-top: 50rpx;
		background-color: $i-text-color-blue;
	}


	.button-hover[type=primary] {
		width: 100%;
		margin-top: 50rpx;
		background-color: $i-color-primary;
	}

	.location {
		margin: 50rpx 0;
		align-self: flex-start;
		/* 左对齐 */
		font-size: 30rpx;
		color: $i-text-color-grey;
		line-height: 50rpx;

		text {
			color: $i-text-color-black;
		}
	}
</style>
