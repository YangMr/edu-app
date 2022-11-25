<template>
	<view class="confirm-buy">
		<!-- 商品信息 -->
		<view class="goods">
			<text>商品信息</text>
			
			<view v-if="course && course.list && course.list.length > 0">
				<i-course-item v-for="(item,index) in course.list" :key="index" :item="item"></i-course-item>
			</view>
			<i-course-item v-else :item="course"></i-course-item>
		</view>
		
		<!-- 支付方式 -->
		<view class="card option-pay">
			<view class="title">支付方式</view>
			
			<!-- ios APP 端支付的布局 展示 -->
			<view class="ios" v-if="isIos">
				<text>余额：</text>
				 <text>0.00 币(不足支付)</text>
			</view>
			
			<!-- 非ios支付的布局 -->
			<radio-group v-else @change="handlePayChange">
				
				<!-- #ifndef MP-WEIXIN -->
				<label class="pay-item space-between">
					<view class="left center row">
						<image src="@/static/pay/alipay.png" mode=""></image>
						<text>支付宝</text>
					</view>
					<radio value="alipay" :checked="provider === 'alipay'" />
				</label>
				<!-- #endif -->
				
				<!-- #ifndef MP-ALIPAY -->
				<label class="pay-item space-between">
					<view class="left center row">
						<image src="@/static/pay/wxpay.png" mode=""></image>
						<text>微信支付</text>
					</view>
					<radio value="wxpay" :checked="provider === 'wxpay'" />
				</label>
				<!-- #endif -->
				
			</radio-group>
		</view>
		
		<!-- 商品金额 -->
		<view class="card price">
			<view class="space-between">
				<text>商品金额</text>
				<text>￥{{course.priceOriginal}}</text>
			</view>
			<view class="space-between">
				<text>优惠价</text>
				<text>￥{{course.priceDiscount}}</text>
			</view>
		</view>
		
		<view style="height:130rpx;"></view>
		
		<!-- 实付金额 -->
		<view class="pay space-between">
			<view>
				<text>实付金额：</text>
				<text>{{course.priceDiscount}}</text>
			</view>
			<view>
				<button v-if="isIos" class="btn" @click="iosPayHandler">充值并支付</button>
				
				<!-- #ifndef MP-WEIXIN -->
				<button v-else :loading="loading" :disabled="loading" class="btn" @click="payHandler">提交订单</button>
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN -->
				<button v-else class="btn" @click="wxPayHandler">提交订单</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import iCourseItem from "@/components/common/i-course-item.vue"
	export default {
		data() {
			return {
				// 保存的是商品的详情数据
				course : {},
				// 判断是否运行在ios 的app端 true则是 false 则不是
				isIos : false,
				// 默认选中的支付
				provider : 'alipay',
				// loading加载
				loading : false
			}
		},
		components:{
			iCourseItem
		},
		onLoad(options) {
			// #ifndef MP-WEIXIN
			if(options.course){
				const course =  decodeURIComponent(options.course.replace(/%/g, '%25'))
				this.course = JSON.parse(course)
			}
			
			if(options.groupList){
				const course =  decodeURIComponent(options.groupList.replace(/%/g, '%25'))
				this.course = JSON.parse(course)
			}
			// #endif
			
			// #ifdef MP-WEIXIN
			if(options.course){
				const course =  decodeURIComponent(options.course)
				this.course = JSON.parse(course)
			}
			if(options.groupList){
				const course =  decodeURIComponent(options.groupList.)
				this.course = JSON.parse(course)
			}
			// #endif
			
			console.log("course=>", this.course)
			
			
			// #ifdef APP-PLUS
			this.checkIsIos()
			// #endif
			
			
			// #ifdef MP-WEIXIN
			this.checkIsWx()
			// #endif
		},
		methods: {
			// 检测当前项目运行到那个平台
			checkIsIos(){
				this.isIos = uni.getSystemInfoSync().platform === 'ios'
			},
			// 获取选择的支付方式
			handlePayChange(e){
				console.log('e=>', e.detail.value)
			},
			// 检测当前项目是否运行到小程序
			checkIsWx(){
				this.provider = "wxpay"
			},
			// ios 端 点击支付按钮触发的方法
			iosPayHandler(){
				console.log("ios")
			},
			// h5 点击支付按钮触发的方法
			payHandler(){
				this.loading = true
				console.log("h5")
				
				setTimeout(()=>{
					this.loading = false
				},2000)
			},
			// 微信小程序端点击支付按钮触发的方法
			wxPayHandler(){
				console.log("wx")
			}
		}
	}
</script>

<style lang="scss">
.confirm-buy{
	color : #333;
	font-size : 29rpx;
	
	.goods{
		padding : 20rpx 30rpx 0 30rpx;
		background-color: #fff;
	}
	
	.card{
		border-radius: 20rpx;
		margin-top: 30rpx;
		background-color: #fff;
		padding: 0 30rpx;
		box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.08);
	}
	
	.option-pay{
		line-height: 90rpx;
		border-bottom: $i-underline;
		
		.ios{
			line-height: 90rpx;
			text:last-child{
				color : $i-text-color-red;
			}
		}
		
		.pay-item{
			line-height: 90rpx;
			
			.left{
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					font-size:33rpx;
					padding-left : 20rpx;
				}
			}
			
			radio{
				transform: scale(0.8);
			}
		}
	}
	
	.price{
		view:first-child{
			border-bottom: 1px solid #F8F9FB;
		}
		
		view{
			line-height: 90rpx;
		}
	}
	
	.pay{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height : 100rpx;
		padding: 0 30rpx;
		background-color: #fff;
		border-top: $i-underline;
		align-items: center;
		
		view:nth-child(1) text:nth-child(2){
			color: $i-text-color-red;
			font-size: 35rpx;
		}
		
		.btn{
			background-color: $i-color-primary;
			color: #fff;
			border-radius: 50rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			 
			&::after {
				// 加载中时，隐藏边框
				border: none;
			}
		}
	}
	
}
</style>
