<template>
	<view class="category-box">
		<scroll-view class="left noScorll" scroll-y="true" >
			<view class="title column center">
				<view  @click="handleSelectCategory(index)" :class="{active : index === activeIndex}" v-for="(item,index) in categoryList" :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="right noScorll" scroll-y="true" >
			<view class="tag">
				<view @click="handleToSearch(item)" v-for="(item,index) in labelList" :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import indexApi from "@/api/index.js"
	export default {
		data() {
			return {
				categoryList : [],
				activeIndex : 0,
				labelList : []
			}
		},
		onLoad(){
			this.getCategoryList()
		},
		onNavigationBarButtonTap(e){
			if(e.index === 0) {
				this.navTo("/pages/search/search")
			}
		},
		methods: {
			async getCategoryList(){
				this.categoryList = await indexApi.getCategory()
				this.labelList = this.categoryList[this.activeIndex].labelList
			},
			handleSelectCategory(index){
				this.activeIndex = index
				this.labelList = this.categoryList[index].labelList
			},
			handleToSearch(item){
				// const params = {
				// 	labelId : item.id,
				// 	labelName : item.name,
				// 	activeIndex : this.activeIndex
				// }
				// this.navTo("/pages/search/search?params=" + JSON.stringify(params))
				this.navTo(`/pages/search/search?labelId=${item.id}&labelName=${item.name}&activeIndex=${this.activeIndex}`)
			}
		}
	}
</script>

<style lang="scss">
page{
	height : 100%;
}	
.category-box{
	height : 100%;
	display: flex;
	
	.left{
		width: 200rpx;
		background-color: #F8F9FB;
		
		.title{
			> view{
				color: #000;
				text-align: center;
				font-size: 30rpx;
				color: #888888;
				width: 200rpx;
				line-height: 40rpx;
				padding :  55rpx 30rpx;
				position: relative;
				
				&:before{
					position: absolute;
					content: '';
					width: 0rpx;
					height: 0rpx;
					border-right: 6rpx solid $i-color-primary;
					border-radius: 30rpx;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					transition: .3s;
				}
			}
			
			.active{
				color: $i-text-color-blue;
				font-size: 33rpx;
				font-weight: bold; 
				&:before{
					height : 50rpx;
				}
			}
		}
		
	}
	
	.right{
		background-color: #fff;
		 padding-left: 15rpx;
		.tag{
			display: flex;
			flex-wrap: wrap;
			padding : 35rpx 0 0 10rpx;
			
			view{
				min-width : 160rpx;
				border: 1rpx solid #999;
				padding: 0 5rpx;
				margin: 15rpx 5rpx;
				border-radius: 30rpx;
				font-size: 25rpx;
				line-height: 60rpx;
				text-align: center;
			}
		}
		
		
	}
}
</style>
