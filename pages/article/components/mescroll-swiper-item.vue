<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	 <mescroll-uni 
	 :ref="'mescrollRef'+i" 
	 @init="mescrollInit" 
	 :height="height" 
	 :down="downOption"
	  @down="downCallback" 
	  :up="upOption"
	   @up="upCallback" >
		<!-- 数据列表 -->
		<!-- <good-list :list="goods"></good-list> -->
		<iArtileItem @click.native="handleToDetails(item.id)" :item="item" v-for="(item,index) in articleList" :key="index"></iArtileItem>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import iArtileItem from "@/components/common/i-article-item.vue"
	// import {apiGoods} from "@/api/mock.js"
	import articleApi from "@/api/article.js"
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			iArtileItem
		},
		data() {
			return {
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						// btnText: '去看看'
					}
				},
				articleList: [] //列表数据
			}
		},
		props:{
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default(){
					return []
				}
			},
			height: [Number,String] // mescroll的高度
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				//联网加载数据
				
				
				const current = page.num 
				const size = page.size
				
				console.log("page=>", page)
				
				try{
					const categoryId = this.tabs[this.index].id
					const data = {current,size,categoryId }
					const response  = await articleApi.getArticleList(data)
					const list = response.records
					console.log("response=>", response)
				
					if(page.num === 1){
						this.articleList = []
						this.mescroll.scrollTo(0,0)
					}
					
					this.articleList = this.articleList.concat(list)
					
					this.mescroll.endBySize(list.length, response.total)
					
				}catch(e){
					//TODO handle the exception
					console.log("error=>", e)
				}
			},
			handleToDetails(id){
				this.navTo("/pages/article/details?id=" + id)
			}
		}
	}
</script>
