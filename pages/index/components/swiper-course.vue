<template>
	<list-box :name="name" :word="word">
		<swiper 
		class="list-swiper" 
		:style="{height : `${200 * rows}rpx`}" 
		
		>
			<swiper-item v-for="(n,i) in column" :key="i">
				<view class="swiper-item">	
					<i-course-item :item="item" v-for="(item,index) in courseData.slice(i*rows, (i+1)*rows)" :key="item.id"></i-course-item>
				</view>
			</swiper-item>
		</swiper>
	</list-box>
</template>

<script>
import listBox from "@/pages/index/components/list-box.vue"
import iCourseItem from "@/components/common/i-course-item.vue"
// import courseData from "@/mock/courseData.js"
export default {
	props : {
		name : {
			type : String,
			default : ""
		},
		word : {
			type : String,
			default : ""
		},
		column : {
			type : Number,
			default : 2
		},
		rows : {
			type : Number,
			default : 5
		},
		courseData : {
			type : Array,
			default : () => []
		}
		// courseData : {
		// 	type : Array,
		// 	default : () => courseData
		// }
	},
	data(){
		return {
			
		}
	},
	components : {
		listBox,
		iCourseItem
	}
}
</script>

<style>
</style>