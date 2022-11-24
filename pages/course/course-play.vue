<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video id="myVideo" class="video-box" :src="videoSrc" :poster="videoPoster"></video>
		<!-- #endif -->
		
		<!-- 课程信息 -->
		<view class="course-info space-between">
			<text class="title text-ellipsis">{{course.title}}</text>
			<view class="right" @click="navTo(`/pages/course/course-details?id=${id}`)">
				<text>详情</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<!-- 课程章节 -->
		<course-dir @playVideo="handleChangeVideo" :activeObject="activeObject" :chapterList="courseList"  :isBuy="isBuy"></course-dir>

		<!-- 底部按钮:分享与评价 -->
		<view class="bottom row">
			<!-- #ifdef APP-PLUS -->
			<view class="one center column">
				<text class="iconfont  icon-Share-Outline"></text>
				<text>分享</text>
			</view>
			<!-- #endif -->
			
			<view class="one center column">
				<text class="iconfont  icon-edit"></text>
				<text>评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入课程章节组件
	import courseDir from "@/pages/course/components/course-dir.vue"
	// 引入api 接口
	import courseDetailApi from "@/api/course-detail.js"
	// 初始化视频的实例对象
	let videoInstance = null
	export default {
		data() {
			return {
				// 课程id
				id : null,
				// 视频播放的url地址
				videoSrc : '',
				// 视频的封面地址
				videoPoster : '/static/images/banner1.jpg',
				// 可是是否已购买 true 已购买 false 未购买
				isBuy : true,
				// 保存已购买的课程列表
				courseList : [],
				// 控制章节的选中高亮
				activeObject : {
					chapterIndex : 0, 
					sectionsIndex : 0
				},
				// 保存的课程信息
				course : {}
			}
		},
		onLoad(options) {
			
			// 调用设置选中的章节方法
			this.handleSetChapter(options)
			
			//获取课程id
			this.id = options.id
			// 调用获取已购买的课程视频列表接口
			this.getCourseBuyList()
			// 获取课程详细信息
			this.getCourseDetail()
			
		},
		onReady() {
			videoInstance = uni.createVideoContext('myVideo', this)
		},
		components : {
			courseDir
		},
		methods: {
			// 切换视频播放
			handleChangeVideo(data){
				this.activeObject.chapterIndex = data.activeObject.chapterIndex
				this.activeObject.sectionsIndex = data.activeObject.sectionIndex
		
				// 播放之前先让上一视频暂停
				videoInstance.pause()
				this.videoSrc = data.data.videoUrl
				setTimeout(()=>{
					videoInstance.play()	
				},300)
			},
			
			// 查询课程信息
			async getCourseDetail(){
				this.course =  await courseDetailApi.getCourseDetail(this.id)
				console.log('course', this.course)	
			},
			
			// 获取已购买的课程视频列表
			async getCourseBuyList(){
				this.courseList = await courseDetailApi.getCourseByList(this.id)
				console.log("courseList=>", this.courseList)
				
				// #ifndef APP-PLUS
				this.videoPoster = this.course.mainImage
				// 获取选中的章的数据
				const chapter = this.courseList[this.activeObject.chapterIndex]

				// 获取选中的节的数据
				const sections = chapter && chapter.sectionList[this.activeObject.sectionsIndex]
				// 设置初始化时视频要播放的地址
				this.videoSrc = sections && sections.videoUrl
				
				console.log('this.videoUrl =>', this.videoSrc )
				// #endif
			},
			
			// 设置选中的章节
			handleSetChapter(options){
				this.activeObject.chapterIndex = parseInt(options.chapterIndex) 
				this.activeObject.sectionsIndex =parseInt(options.sectionsIndex) 
			}
		}
	}
</script>

<style lang="scss">
.video-box{
	width: 100%;
	height : 423rpx;
}
.course-play{
	padding-bottom : 100rpx;
	.course-info{
		padding : 30rpx;
		font-weight: bold;
		border-bottom:$i-underline;
		
		.title{
			font-size : 35rpx;
			width: 500rpx;
			line-height: 60rpx;
			color : $i-text-color-black;
			-webkit-line-clamp: 1;
		}
		
		.right > text{
			font-size: 28rpx;
			line-height: 60rpx;
			color: $i-text-color-black;
		}
	}
	
	.bottom{
		position: fixed;
		background-color: #fff;
		bottom : 0;
		left : 0; 
		right : 0;
		height: 100rpx;
		border-top: $i-underline;
		
		.one {
			text {
				color: $i-text-color-grey;
				font-size: 25rpx;
			}
			
			.iconfont {
				font-size : 35rpx;
			}
		}
	}
}
</style>
