<template>
	<view class="category-box">
		<scroll-view class="left noScorll" scroll-y="true" >
			<view class="title column center">
				<view  @click.stop="handleSelectCategory(index, item)" :class="{active : index === activeIndex}" v-for="(item,index) in categoryList" :key="index">
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
		props : {
			value : {
				type : Object,
				default : () => {}
			}
		},
		data() {
			return {
				categoryList : [],
				activeIndex : 0,
				labelList : []
			}
		},
		mounted(){
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
				
				if(this.value){
					this.categoryList.forEach(item=>{
						item.labelList.unshift({id : null, name : "不限", cname : item.name,
categoryId: item.id})
					})
					this.categoryList.unshift({id : null, name : "全部分类"})
					
				
					this.activeIndex = this.value.activeIndex > -1 ? parseFloat(this.value.activeIndex) + 1 : this.activeIndex
				
					
				}
				
				this.handleSelectCategory(this.activeIndex)
			},
			searchPageChangeLabel(item){
				if(this.value.name !== item.name && this.value.name !== item.cname){
					// 赋值给搜索面显示名称，如果有分类名就取分类名，没有就取标签名
					this.value.name = item.cname || item.name
					// 标签id
					this.value.id = item.id || null
					// 分类id (点击`不限`是分类id，)
					this.value.categoryId = item.categoryId || null
		
					// 解决父组件，搜索新数据
					this.$emit('searchByLabel', this.value)
				}
				this.value.active = false
			},
			handleSelectCategory(index, item){
				
				if(item && item.name === "全部分类"){
					this.searchPageChangeLabel(item)
					return
				}
				
				this.activeIndex = index
				this.labelList = this.categoryList[index].labelList
			},
			handleToSearch(item){
				
				if(this.value){

					this.searchPageChangeLabel(item)
					return
					
				}
				
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
