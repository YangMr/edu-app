<template>
	<view class="container-list">
		<!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
		<me-tabs :height="80" v-model="tabIndex" :tabs="tabs" :tab-width="150"></me-tabs>

		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
				<mescroll-item  ref="mescrollItem" :i="i" :index="tabIndex" :tabs="tabs" :height="height"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./components/mescroll-swiper-item.vue";
	import indexApi from "@/api/index.js"
	export default {
		data() {
			return {
				height: "", // 需要固定swiper的高度
				tabIndex : 0,
				tabs: [],
			}
		},
		components : {
			MescrollItem
		},
		onNavigationBarSearchInputClicked() {
			this.navTo("/pages/search/search")
		},
		onLoad() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
			this.getCategoryList()
			
		},
		onShow() {
			this.$nextTick(()=>{
				console.log(this.$refs["mescrollItem"])
			})
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.tabIndex = e.detail.current
			},
			// 获取分类列表
			async getCategoryList(){
				try{
					uni.showLoading({title : '加载中', mask: true})
					let response = await indexApi.getCategory()
					response.unshift({id : null, name : '推荐'})
					console.log("response=>", response)
					this.tabs = response
					
					uni.hideLoading()
				}catch(e){
					//TODO handle the exception
					console.log("error",e)
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style>
page,.container-list{
	height : 100%;
	overflow: hidden;
}
</style>
