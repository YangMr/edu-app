<template>
	<view>
		<view @click="handleToPlay(item.id)" class="course-item center" v-for="(item,index) in studyList" :key="index">
			<view class="left-item column">
				<text class="title text-ellipsis">{{item.title}}</text>
				<view class="column">
					<text class="per">已学{{item.percent}}%</text>
					<progress :percent="item.percent" stroke-width="2" activeColor="#345DC2" />
				</view>
			</view>
			<view class="right-item">
				<image :src="item.mainImage" lazy-load mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import studyApi from "@/api/study.js"
	export default {
		data() {
			return {
				studyList : []
			}
		},
		onLoad() {
			this.getStudyList()
		},
		methods: {
			async getStudyList(){
				try{
					const response = await studyApi.getStudyList()
					console.log("response=>", response)
					
					if(response && response.length > 0)  this.studyList = response
				}catch(e){
					//TODO handle the exception
					console.log("e", e)
				}
			},
			handleToPlay(id){
				this.navTo("/pages/course/course-play?id=" + id)
			}
		}
	}
</script>

<style lang="scss">
	.course-item {
		width: 100%;
		padding: 30rpx 20rpx;

		.left-item {
			width: 435rpx;
			height: 150rpx;
			justify-content: space-between;
			margin-right: 20rpx;

			.title {
				-webkit-line-clamp: 1;
				line-height: 35rpx;
				font-size: 28rpx;
				font-weight: bold;
			}

			.per {
				font-size: 28rpx;
				color: $i-text-color-grey;
				line-height: 50rpx;
			}
		}

		.right-item {
			image {
				width: 245rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
