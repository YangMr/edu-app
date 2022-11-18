<template>
	<view>
		<!-- 主图和简介 -->
		<course-header :item="courseDetail"></course-header>
		
		<!-- tab模块 -->
		<view class="course-details" :style="{height : pageHeight + 'px'}">
			<i-tab-bar  :tabs="courseDetailsTabs" v-model="index"></i-tab-bar>
	
			<swiper class="swiper-box" @change="handleChangeCurrent" :indicator-dots="true" circular  :current="index" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,i) in 4" :key="i">
					<scroll-view upper-threshold="0" @scrolltoupper="scrolltoupper"  class="scroll-view" :scroll-y="enableScroll" >
						<view class="details-info">
							<course-info :detailUrls="courseDetail.detailUrls" v-if="index === 0"></course-info>
							<course-dir @playVideo="handlePlayVideo" :isBuy="isBuy" :chapterList="chapterList" v-if="index === 1"></course-dir>
							<course-comment :commentList="commentList" v-if="index === 2"></course-comment>
							<course-group :groupList="groupList" v-if="index === 3"></course-group>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		<bottom-btn @clickBottom="handleClickBottom" courseId="1" :name="isBuy || courseDetail.isFree === 1 ? '立即观看' : '立即购买'"></bottom-btn>
		
		
		<!-- 视频播放 -->
		<view @click="coursePlayStatus = false" v-if="coursePlayStatus" class="mask" style="color : #fff; text-align: center; line-height: 300rpx;">视频播放</view>
	</view>
</template>

<script>
import courseHeader from "@/pages/course/components/course-header.vue"
import iTabBar from "@/components/common/i-tab-bar.vue"
import courseDetailsTabs from "@/config/course-details-tabs.js"
import courseInfo from "@/pages/course/components/course-info.vue"
import courseDir from "@/pages/course/components/course-dir.vue"
import courseComment from "@/pages/course/components/course-comment.vue"
import courseGroup from "@/pages/course/components/course-group.vue"
import bottomBtn from "@/pages/course/components/bottom-btn.vue"
import courseDetailApi from "@/api/course-detail.js"
export default {
	data(){
		return {
			courseId : null, // 保存的是课程id
			courseDetailsTabs,
			index : 0,
			pageHeight : 300,
			enableScroll : false,
			detailTop : 0,
			statusNavHeight : 0, // 状态栏  +  导航栏的高度
			courseDetail : {}, // 保存课程详情数据
			chapterList : [],  // 保存章节数据
			commentList : [], // 保存评价数据
			groupList : [],  // 保存套餐数据
			isBuy : false,  // 保存的是课程是否已购买
			coursePlayStatus : false
		}
	},
	

	// 页面滚动到底部 (滚动条滚动到底部)
	onReachBottom(){  // 默认滚动到页面据底部还有50的时候会触发onReachBottom
		this.enableScroll = true
	},
	components : {
		courseHeader,
		iTabBar,
		courseInfo,
		courseDir,
		courseComment,
		courseGroup,
		bottomBtn
	},
	onLoad(options) {
		console.log('options===>',options)
		this.getCourseId(options.id)
		this.getPageHeight()
		this.loadRequest()
		
	},
	onReady() {
	
		const view = uni.createSelectorQuery().in(this).select('.course-details')
		console.log("view=>",view)
		view.fields({
			rect : true
		},(data)=>{
			console.log("data=>", data)
			this.detailTop = data.top
		}).exec();
		
		
	},
	methods : {
		// 点击试看触发的方法
		handlePlayVideo(){
			this.coursePlayStatus = true
		},
		
		// 立即购买按钮方法
		handleClickBottom(){
			// 如果是课程已购买或者免费 , 则跳转到课程播放页面
			if(this.isBuy || this.courseDetail.isFree === 1){
				// 跳转已购买视频播放页(后面创建页面)
				this.navTo('/pages/course/course-play?id' + this.courseId )
			}else{ // 课程未购买, 跳转到课程购买页面
				// this.navTo("")
			}
		},
		
		// 获取课程id
		getCourseId(id){
			this.courseId = id
		},
		
		// 初始化加载所有数据
		loadRequest(){
			this.getCourseDetail()
			this.getChapterList()
			this.getCommentList()
			this.getGroupList()
			this.getCourseStatus()
		},
		
		//获取课程状态 (查询课程是否已购买)
		async getCourseStatus(){
			try{
				// 获取本地是否存在token
				const token = uni.getStorageSync("edu-app-token")
				if(token){
					const res = await courseDetailApi.findCourseStatus(this.courseId)
					this.isBuy = res.isBuy
					console.log("课程是否已购买", this.isBuy)
				}
			}catch(e){
				//TODO handle the exception
				console.log("error", e)
			}
		},
		
		// 获取课程详情数据
		async getCourseDetail(){
			try{
				this.courseDetail = await courseDetailApi.getCourseDetail(this.courseId)
				console.log("课程详情:", this.courseDetail)
				
				uni.setNavigationBarTitle({
					title : this.courseDetail.title
				})
			}catch(e){
				//TODO handle the exception
				console.log("error", e)
			}
		},
		// 获取章节数据
		async getChapterList(){
			try{
				this.chapterList = await courseDetailApi.getChapterList(this.courseId)
				console.log("课程章节:", this.chapterList)
			}catch(e){
				//TODO handle the exception
				console.log("error", e)
			}
		},
		// 获取评价数据
		async getCommentList(){
			try{
				this.commentList = await courseDetailApi.getCommentList(this.courseId)
				console.log("课程评价:", this.commentList)
			}catch(e){
				//TODO handle the exception
				console.log("error", e)
			}
		},
		// 获取套餐数据
		async getGroupList(){
			try{
				this.groupList = await courseDetailApi.getGroupList(this.courseId)
				console.log("课程套餐:", this.groupList)
			}catch(e){
				//TODO handle the exception
				console.log("error", e)
			}
		},
		handleChangeCurrent(event){
			this.index= event.detail.current
			const res = uni.getSystemInfoSync()
			uni.pageScrollTo({
				scrollTop: res.windowHeight,
				duration: 150
			})
		},
		// 监听scroll-view滚动条滚动到距离顶部还剩50px的时候触发
		scrolltoupper(){
			uni.pageScrollTo({
				scrollTop: 0, 
				duration: 300
			})
			this.enableScroll = false
		},
		getPageHeight(){
			// 获取系统信息
			const res = uni.getSystemInfoSync()
			// 获取平台
			const system = res.platform
			// 获取状态栏的高度
			const statusBarHeight = res.statusBarHeight
			// 获取状态栏 + 导航栏的高度
			this.pageHeight = res.windowHeight
			
			// 判断是安卓还是ios
			if(system === 'android'){
				this.statusNavHeight = statusBarHeight + 48
			}else if(system === 'ios'){
				this.statusNavHeight = statusBarHeight + 44
			}
			
			this.pageHeight = res.windowHeight - this.statusNavHeight
		}
	}
}
</script>

<style lang="scss">
.course-details{
	overflow: hidden;
	
	.swiper-box , .scroll-view{
		height : 100%;
	}
	
	.details-info{
		padding-bottom:180rpx;
	}
}
</style>