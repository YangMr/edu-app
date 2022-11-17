<template>
	<view>
		<!-- 主图和简介 -->
		<course-header></course-header>
		
		<!-- tab模块 -->
		<view class="course-details" :style="{height : pageHeight + 'px'}">
			<i-tab-bar  :tabs="courseDetailsTabs" v-model="index"></i-tab-bar>
	
			<swiper class="swiper-box" @change="handleChangeCurrent" :indicator-dots="true" circular  :current="index" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,i) in 4" :key="i">
					<scroll-view upper-threshold="0" @scrolltoupper="scrolltoupper"  class="scroll-view" :scroll-y="enableScroll" >
						<view class="details-info">
							<course-info v-if="index === 0"></course-info>
							<course-dir v-if="index === 1"></course-dir>
							<course-comment v-if="index === 2"></course-comment>
							<course-group v-if="index === 3"></course-group>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
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
export default {
	data(){
		return {
			courseDetailsTabs,
			index : 0,
			pageHeight : 300,
			enableScroll : false,
			detailTop : 0,
			statusNavHeight : 0, // 状态栏  +  导航栏的高度
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
		courseGroup
	},
	onLoad() {
		this.getPageHeight()
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