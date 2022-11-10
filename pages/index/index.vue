<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端搜索框 -->
		<i-search-input></i-search-input>
		<!-- #endif -->
		
		<!-- 轮播图 -->
		<i-new-banner></i-new-banner>

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
	
	// 引入搜索框模型
	import SearchModel from "@/model/searchModel.js"
	export default {
		data() {
			return {
				
			}
		},
		components : {
			iSearchInput,
			iNewBanner,
			courseCategory,
			swiperCourse,
			scollCourse
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 这个方法只在APP端有效
			SearchModel.handleUpdatePlaceholderText(this)
			// #endif
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.list-container{
	padding : 0 30rpx;
}
</style>
