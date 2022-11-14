<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序端搜索框 -->
		<i-search-input @click.native="navTo('/pages/search/search')"></i-search-input>
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
				<list-course name="付费精品" word="NICE" :courseData="payCourseList"></list-course>
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
				bannerList: [],
				categoryList: [],
				hotCourseList: [],
				newCourseList: [],
				freeCourseList: [],
				payCourseList: [],
				downOption: {
					offset: 30
				},
				upOption: {
					textLoading: '亲亲，在查询下页数据中',
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
					},
					textNoMore: '-- 已加载完所有数据 --', 
				}
			}
		},
		// 点击APP端扫码按钮会触发的方法
		onNavigationBarButtonTap: function(e) {
			const index = e.index
			if (index === 0) {
				IndexModel.handleOpenScanCode()
			}
		},
		// 点击搜索框会触发的方法
		onNavigationBarSearchInputClicked() {
			this.navTo("/pages/search/search")
		},
		components: {
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
			test(){
				console.log("123")
			},
			async loadData() {
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
			},

			// 获取轮播图接口数据
			async getBannerList() {
				try {
					const res = await indexApi.getBanner()
					this.bannerList = res
				} catch (e) {
					console.log("err", e)
				}
			},
			// 获取分类接口数据
			async getCategoryList() {
				try {
					const res = await indexApi.getCategory()
					this.categoryList = res
				} catch (e) {
					//TODO handle the exception
					console.log("err", e)
				}
			},
			// 热门推荐、近期上新、免费精选 、付费精品
			// 获取热门推荐数据
			async getHotCourseList() {
				try {
					this.hotCourseList = await IndexModel.getCourseList({
						sort: "hot"
					})
				} catch (e) {
					//TODO handle the exception
					console.log("err", e)
				}
			},
			// 获取近期上新数据
			async getNewCourseList() {
				try {
					this.newCourseList = await IndexModel.getCourseList({
						sort: "new"
					})
				} catch (e) {
					//TODO handle the exception
					console.log("err", e)
				}
			},
			// 获取免费精选数据
			async getFreeCourseList() {
				try {
					this.freeCourseList = await IndexModel.getCourseList({
						isFree: 0
					})
				} catch (e) {
					//TODO handle the exception
					console.log("err", e)
				}
			},
			// 获取付费精品数据
			async getPayCourseList(page){
				try{
					const res = await indexApi.getCourseList({current : page.num, size : page.size, isFree : 1})
					const currentList = res.records	
					this.payCourseList = this.payCourseList.concat(currentList)
					this.mescroll.endBySize(currentList.length, res.total)
				}catch(e){
					//TODO handle the exception
					console.log("err",e)
				}
			},
			/*下拉刷新与上拉加载的回调*/
			async upCallback(page){
				
				
				// 判断page.num === 1 , 则说明我们执行的是下拉刷新
				if(page.num === 1){
					this.loadData()
					this.payCourseList = []
				}

				this.getPayCourseList(page)
				
			}
		}
	}
</script>

<style lang="scss">
	.list-container {
		padding: 0 30rpx;
	}
</style>
