<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">
		<i-down-bar @search="search" :downBars="downBars" :params="params"></i-down-bar>
		<!-- top="120"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
		<mescroll-body 
		:ref="'mescrollRef'+i" 
		
		:down="downOption" 
		@down="downCallback"
		:up="upOption" 
		@up="upCallback" 
		>
			<view style="padding:0 30rpx;">
				<!-- 数据列表 -->
				<i-course-item :item="item" v-for="(item,index) in courseList" :key="index"></i-course-item>
			</view>
			
		</mescroll-body>
	</view>
</template>

<script>
	import indexApi from "@/api/index.js"
	import iCourseItem from "@/components/common/i-course-item.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import downBars from "@/config/course-down-bar.js"
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		props: {
			i: Number,
			index: {
				type: Number,
				default () {
					return 0
				}
			},
			params: {
				type: Object,
				default: () => {}
			},
			content: { //搜索框内容
				type: String,
				default: '',
			},
		},
		components : {
			iCourseItem
		},
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty : {
						icon : "",
						tip : "暂无相关数据~" ,
					}
				},
				downBars: downBars(),
				// 用来保存请求到的课程列表数据
				courseList : [],
				// 用来保存搜索的参数
				searchData : {
					content : '', // 要查询的内容
					current : 1, // 分页的页码
					size : 10,   // 分页的条数
					sort : null, // 排序
					isFree : null, // 0 付费 1免费 null 全部课程
					labelId : null,  // 标签id
					categoryId : null  // 类别id
				}
			}
		},
		mounted() {
			// console.log("params", this.params)
			this.params && Object.keys(this.searchData).forEach(key=>{
				// console.log("key=>", key)
				this.searchData[key] = this.params[key] || null
			})
			
			console.log("search=>",this.searchData)
		},
		methods: {
			// 搜索
			search(data) {
				
				if(data){
					Object.assign(this.searchData, data)
				}
				this.mescroll.resetUpScroll(true)
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				this.searchData.content = this.content && this.content.trim() || ""
				this.searchData.current = page.num
				this.searchData.size = page.size
				
				const res = await indexApi.getCourseList(this.searchData)	
				const list = res.records
					
				if(page.num === 1){
					this.courseList = []
					this.mescroll.scrollTo(0,0)
				}	
				
				this.courseList = this.courseList.concat(list)

		
				this.mescroll.endBySize(list.length, res.total);
			},

		}
	}
</script>

<style lang="scss">

</style>
