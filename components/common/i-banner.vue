<template>
	<view class="banner-box">
		<view 
		class="banner-bg" 
		:style="{'background-image': `linear-gradient(${backGroundColor || '#345dc2'} 50%, #F8F9FB)` }">
			<swiper 
			class="banner-swiper" 
			:indicator-dots="true" 
			indicator-color="rgba(255, 255, 255, 0.5)"
			indicator-active-color="#fff"
			circular
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:current="current"
			@change="handleCurrentChange"
			>
				<swiper-item class="banner-item" v-for="(item,index) in bannerList" :key="item.id">
					<image :src="item.imageUrl"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bannerList: {
				type: Array,
				default: () => [{
						id: 1,
						imageUrl: "/static/images/banner1.jpg",
						background: "#45328c",
						advertUrl: '/pages/course/course-details'
					},
					{
						id: 2,
						imageUrl: "/static/images/banner2.jpg",
						background: "#006C00",
						advertUrl: '/pages/course/course-details'
					},
					{
						id: 3,
						imageUrl: "/static/images/banner3.jpg",
						background: "#0072B7",
						advertUrl: '/pages/course/course-details'
					}
				]
			}
		},
		data(){
			return {
				// 轮播图下标
				current : 0, 
				// 保存背景颜色
				backGroundColor : ''
			}
		},
		methods : {
			handleCurrentChange(e){
				this.current = e.detail.current
				this.backGroundColor = this.bannerList[this.current].background
			}
		}
	}
</script>

<style lang="scss">
	.banner-box {
		padding-top: 120rpx;
		position: relative;
		/* #ifdef APP-PLUS */
		 /* 增加app状态栏高度，这样app、h5、小程序距离就一样 */
		 padding-top: calc(var(--status-bar-height) + 120rpx);
		 /* #endif */


		.banner-bg {
			width: 100%;
			height: 470rpx;
			position: absolute;
			top: 0;
			padding-top: 120rpx;
			
			/* #ifdef APP-PLUS */
			 padding-top: 200rpx;
			 height: calc(var(--status-bar-height) + 470rpx);
			 /* #endif */
			
			
			.banner-swiper {
				height: 350rpx;
				width: 100%;

				.banner-item {
					width: 100%;
					height: 100%;
					overflow: hidden;
					padding: 0 30rpx;
					
					/* #ifdef APP-PLUS */
					padding: 0 10rpx;
					 /* #endif */

					image {
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}
				}
			}
		}
	}
</style>
