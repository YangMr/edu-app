<template>
	<view>
		<!-- 主图和简介 -->
		<course-header></course-header>
		
		<view class="course-details">
			<i-tab-bar :tabs="courseDetailsTabs" v-model="index"></i-tab-bar>
			
			<swiper @change="handleChangeCurrent" :indicator-dots="true" circular  :current="index" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in 4" :key="index">
					<view class="swiper-item">{{index}}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import courseHeader from "@/pages/course/components/course-header.vue"
import iTabBar from "@/components/common/i-tab-bar.vue"
import courseDetailsTabs from "@/config/course-details-tabs.js"
export default {
	data(){
		return {
			courseDetailsTabs,
			index : 0
		}
	},
	components : {
		courseHeader,
		iTabBar
	},
	methods : {
		handleChangeCurrent(event){
			this.index= event.detail.current
		}
	}
}
</script>

<style>
</style>