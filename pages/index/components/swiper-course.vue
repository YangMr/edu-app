<template>
	<list-box>
		<i-course-item v-for="(item,index) in 8" :key="index"></i-course-item>
	</list-box>
</template>

<script>
import listBox from "@/pages/index/components/list-box.vue"
import iCourseItem from "@/components/common/i-course-item.vue"
export default {
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