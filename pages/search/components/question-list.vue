<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">
		<i-down-bar @search="search" :params="params"></i-down-bar>
		<!-- top="120"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
		<mescroll-body 
		:ref="'mescrollRef'+i" 
		@init="mescrollInit" 
		:down="downOption" 
		@down="downCallback"
		:up="upOption" 
		@up="upCallback" 
		>
			<!-- 数据列表 -->
			<!-- <view v-for="(item,index) in 100" :key="index">hello - {{index}}</view> -->			
			问答列表
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
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
			}
		},
		methods: {
			// 搜索
			search(data) {
				console.log("question")
				this.mescroll.resetUpScroll(true)
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log("page=>", page)

				// this.i: 每个tab页的专属下标
				// this.index: 当前tab的下标
		
				this.mescroll.endSuccess(0)
			},

		}
	}
</script>

<style lang="scss">

</style>
