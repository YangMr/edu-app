<template>
	<view class="search-container">
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序搜索框 -->
		<uni-search-bar  v-model="content"  :focus="focus" placeholder="搜索您想要的内容" @confirm="handleSearch" @cancel="navBack()" radius="100"
			clearButton="auto" cancelButton="always">
			<template v-slot:searchIcon>
				<text class="iconfont icon-search"></text>
			</template>
			<template v-slot:clearIcon>
				<text class="iconfont icon-roundclosefill"></text>
			</template>
		</uni-search-bar>
		<!-- #endif -->
		
		<!-- 热门搜索与历史搜索 -->
		<keyword @handleSearch="handleSearch" v-if="!searched"></keyword>
		
		<!-- tabbar组件 标签导航栏组件 -->
		<i-tab-bar v-model.sync="tabIndex" v-if="searched"></i-tab-bar>
		
		
		<block v-if="searched">
			<course-list ref="mescrollItem0" :i="0" :index="tabIndex" :params="params" :content="content"></course-list>
			<article-list ref="mescrollItem1" :i="1" :index="tabIndex" :params="params" :content="content"></article-list>
			<question-list ref="mescrollItem2" :i="2" :index="tabIndex"  :params="params" :content="content"></question-list>
		</block>
		
	</view>
</template>

<script>
	import {HISTORY_KEY} from "@/enum/keyword-key.js"
	import keyword from "@/pages/search/components/keyword.vue"
	import iTabBar from "@/components/common/i-tab-bar.vue"
	import courseList from "@/pages/search/components/course-list.vue"
	import articleList from "@/pages/search/components/article-list.vue"
	import questionList from "@/pages/search/components/question-list.vue"
	
	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js"
	
	export default {
		mixins : [MescrollMoreMixin],
		data() {
			return {
				params: null,
				content: "",
				
				focus : false,
				
				searched : false,
				
				// 设置默认选中的tab
				tabIndex : 0,
				
				
				// #ifdef APP-PLUS
				currentWebview: null,
				// #endif
			}
		},
		components : {
			keyword,
			iTabBar,
			courseList,
			articleList,
			questionList
		},
		onLoad(options) {

			this.listenerParams(options)
		},
		// 点击导航栏按钮触发的方法
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.navBack()
			}
		},
		// 监听输入实时输入的内容
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
		},
		// 监听是否在手机上点击了搜索按钮 / pc点回车键
		onNavigationBarSearchInputConfirmed() {
			// #ifdef APP-PLUS
			this.currentWebview.setTitleNViewSearchInputFocus(false)
			// #endif

			this.handleSearch()
		},
		methods: {
			// 监听跳转到搜索页的时候有没有传递参数
			listenerParams(options) {
				// #ifdef APP-PLUS
				this.currentWebview = this.$mp.page.$getAppWebview()
				// #endif

				// 有参数, 进行搜索查询
				if (JSON.stringify(options) !== "{}") {
					this.params = options
					
					// 调用设置搜索框值的方法
					this.handleSetSearchValue()
					
					// 调用搜索查询的方法的
					this.handleSearch()
				} else {
					// #ifdef APP-PLUS
					// 没有参数,则需要让搜索框获取到焦点
					this.currentWebview.setTitleNViewSearchInputFocus(true)
					// #endif
					
					// #ifdef MP-WEIXIN
					this.focus = true
					// #endif
				}
			},

			// 搜索框查询方法
			handleSearch(obj) {
				
				
				// 获取输入框输入的内容 -- h5&app端可以 小程序端需要重新处理
				this.content = obj && obj.value ? obj.value : this.content

				
				
				// 让历史记录与热门搜索的内容进行隐藏
				this.searched = true
				
				
				// 调用courseList组件的查询方法
				// 父组件如何调用子组件  
				
				
				this.$nextTick(()=>{
					this.$util.throttle(()=>{
						this.$refs[`mescrollItem${this.tabIndex}`].search()
					})
				})
				
				
				
				

				// 查询的时候, 调用存储搜索历史记录方法,将输入框输入的内容存储到本地
				this.handleSetLocalHistoryData()
				
				
			},
			
			// 存储搜索的历史记录
			handleSetLocalHistoryData(){
				uni.getStorage({
					key: HISTORY_KEY,
					// 本地已经存储过了
					success : (res)=>{
						this.content && res.data.indexOf(this.content) < 0 && res.data.unshift(this.content)
						uni.setStorageSync(HISTORY_KEY, res.data)
					},
					// 本地没有存储过
					fail : (err)=>{
						this.content && uni.setStorageSync(HISTORY_KEY,[this.content])
						console.log("err=>" , err)
					} 
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		// background-color: $i-color-grey;
	}

	.search-container {
		// width: 750rpx;
		/* 全屏，不然后面`下拉筛选粘组件`粘顶会失效 */
		margin: 0;
		padding: 0;
	}
</style>
