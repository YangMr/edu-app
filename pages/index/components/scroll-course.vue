<template>
	<list-box :name="name" :word="word">
		<scroll-view class="list-scroll noScorll" scroll-x="true">
			<view class="list-scroll-view"  v-for="(item,index) in courseData" :key="index">
				<courseItem :isColumn="true" :item="item"></courseItem>
			</view>
		</scroll-view>
	</list-box>
</template>

<script>
import listBox from "@/pages/index/components/list-box.vue"
import courseItem from "@/components/common/i-course-item.vue"
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
		courseData: {
			 type: Array,
			 default: ()=> []
		}
		// courseData: {
		// 	 type: Array,
		// 	 default: ()=> courseData
		// }
	},
	components : {
		listBox,
		courseItem
	}
}
</script>

<style lang="scss">
.list-scroll{
	white-space: nowrap;
	height: 380rpx;
	
	.list-scroll-view{
		display: inline-flex;
		width: 310rpx;
		background-color: #fff;
		 padding: 0 10rpx;
		 margin-right: 20rpx;
		 border-radius: 20rpx;
		 box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
	}
}	
</style>