<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端搜索框 -->
		<i-search-input></i-search-input>
		<!-- #endif -->
		
		<!-- 轮播图 -->
		<i-new-banner :bannerList="bannerList"></i-new-banner>
		
		<mescroll-body 
		ref="mescrollRef" 
		@init="mescrollInit" 
		@down="downCallback" 
		@up="upCallback" 
		:down="downOption" 
		:up="upOption"
		>
			<!-- 课程分类 -->
			<course-category :categoryList="categoryList"></course-category>
			
			<!-- 热门推荐、近期上新、免费精选 、付费精品、 -->
			<view class="list-container">
				<!-- 热门推荐 -->
				<swiper-course name="热门推荐" word="HOT" :courseData="hotCourseList"></swiper-course>
				<!-- 近期上新 -->
				<scoll-course name="近期上新" word="NEW" :courseData="newCourseList"></scoll-course>
				<!-- 免费精选 -->
				<swiper-course name="免费精选" word="FREE" :courseData='freeCourseList'></swiper-course>
				<!-- 付费精品 -->
				<list-course name="付费精品" word="NICE" :courseData="niceCourseList"></list-course>
			</view>
		</mescroll-body>
		
		
		
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
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
		// 使用mixin
		mixins: [MescrollMixin], 
		data() {
			return {
				bannerList : [],
				categoryList : [],
				hotCourseList : [],
				newCourseList : [],
				freeCourseList : [],
				niceCourseList : [],
				downOption : {
					offset : 30
				},
				upOption : {}
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
			
			// this.loadData()
		},
		methods: {
			async loadData(){
				// 调用获取轮播图接口数据方法
				this.getBannerList()
				// 调用获取分类接口数据
				this.getCategoryList()
				// 调用获取热门推荐数据
				this.getHotCourseList()
				// 调用获取近期上新数据
				this.getNewCourseList()
				// 调用获取免费精选数据
				this.getFreeCourseList()
				// 调用获取付费精品数据
				this.getNiceCourseList()
			},
			
			// 获取轮播图接口数据
			async getBannerList(){
				try {
					const res = await indexApi.getBanner()
					this.bannerList = res
				}catch(e){
					console.log("err", e)
				}
			},
			// 获取分类接口数据
			async getCategoryList(){
				try{
					const res = await indexApi.getCategory()
					this.categoryList = res
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			// 热门推荐、近期上新、免费精选 、付费精品
			// 获取热门推荐数据
			async getHotCourseList(){
				try{
					const res = await IndexModel.getCourseList({sort : 'hot'})
					this.hotCourseList = res
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			// 获取近期上新数据
			async getNewCourseList(){
				try{
					const res = await IndexModel.getCourseList({sort : 'new'})
					this.newCourseList = res
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			// 获取免费精选数据
			async getFreeCourseList(){
				try{
					const res = await IndexModel.getCourseList({isFree : 0})
					this.freeCourseList = res
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			// 获取付费精品数据
			async getNiceCourseList(){
				try{
					const res = await IndexModel.getCourseList({isFree : 1})
					this.niceCourseList = res
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			/*上拉加载的回调*/
			async upCallback(page) {
				// console.log(page)
				await this.loadData()
				// 请求成功之后让下拉刷新或者上拉加载消失
				this.mescroll.endSuccess()
				/**
				 * 
				 *  下拉刷新: 
				 * 		1. 把页码重置为1 , 并且重新请求数据
				 * 		2. 当数据请求成功之后, 我们需要隐藏下拉刷新
				 * 
				 * 
				 * 	上拉加载: 
				 * 		1. 当页面滚动到底部的时候, 我们需要触发上拉加载方法
				 * 		2. 上拉加载方法触发之后,我们需要在方法内让页码 每上拉一次,  页码 进行加 1
				 * 		3. 如果当我们当前加载的页码等于 最后一页, 我们提示已经到底底部, 不再重新发送请求
				 * 
				 * **/
				
			}
		}
	}
</script>

<style lang="scss">
.list-container{
	padding : 0 30rpx;
}
</style>
