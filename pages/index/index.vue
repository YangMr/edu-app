<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端搜索框 -->
		<i-search-input></i-search-input>
		<!-- #endif -->
		
		<!-- 轮播图 -->
		<i-new-banner :bannerList="bannerList"></i-new-banner>

		<!-- 课程分类 -->
		<courseCategory></courseCategory>
		
		<!-- 热门推荐、近期上新、免费精选 、付费精品、 -->
		<view class="list-container">
			<!-- 热门推荐 -->
			<swiper-course name="热门推荐" word="HOT"></swiper-course>
			<!-- 近期上新 -->
			<scoll-course name="近期上新" word="NEW"></scoll-course>
			<!-- 免费精选 -->
			<swiper-course name="免费精选" word="FREE"></swiper-course>
			<!-- 付费精品 -->
			<list-course name="付费精品" word="NICE"></list-course>
		</view>
		
	</view>
</template>

<script>
	// 引入搜索框组件
	import iSearchInput from "@/components/common/i-search-input.vue"
	// 引入轮播图组件
	import iNewBanner from "@/components/common/i-new-banner.vue"
	// 引入分类组件
	import courseCategory from "@/pages/index/components/course-category.vue"
	// 引入课程列表组件
	import swiperCourse from "@/pages/index/components/swiper-course.vue"
	// 引入近期上新组件
	import scollCourse from "@/pages/index/components/scroll-course.vue"
	// 引入付费精品组件
	import listCourse from "@/pages/index/components/list-course.vue"
	
	// 引入搜索框模型
	import SearchModel from "@/model/searchModel.js"
	// 引入首页模型
	import IndexModel from "@/model/indexModel.js"
	// 导入封装的首页api
	import indexApi from "@/api/index.js"
	export default {
		data() {
			return {
				bannerList : []
			}
		},
		onNavigationBarButtonTap : function (e) {
			const index = e.index
			if(index === 0){
				IndexModel.handleOpenScanCode()
			}
		},
		components : {
			iSearchInput,
			iNewBanner,
			courseCategory,
			swiperCourse,
			scollCourse,
			listCourse
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 这个方法只在APP端有效
			SearchModel.handleUpdatePlaceholderText(this)
			// #endif
			
			// 调用获取轮播图数据方法
			this.getBannerList()
		},
		methods: {
			// 获取轮播图数据
			async getBannerList(){
				try {
					const res = await indexApi.getBanner()
					this.bannerList = res
				}catch(e){
					console.log("err", e)
				}
			}
		}
	}
</script>

<style lang="scss">
.list-container{
	padding : 0 30rpx;
}
</style>
