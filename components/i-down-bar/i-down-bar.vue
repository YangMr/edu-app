<template>
	<view class="down-bar row sticky-box">
		<view class="one" @click="handleSortView(item)" v-for="(item,index) in downBarList" :key="index">
			<view class="center" :class="{active : item.active || (item.id)}">
				<text>{{item.name}}</text>
				<text class="iconfont icon-up" v-if="item.active"></text>
				<text class="iconfont icon-down1" v-if="!item.active"></text>
			</view>
			<view class="item-list" v-show="item.active">
				<category class="category" v-if="item.isCategory"></category>
				<view @click="handleChangeSort(item, m)" class="name" v-for="(m,i) in item.list" :key="i">{{m.name}}</view>
			</view>
			<view v-if="item.active" class="cover"></view>
		</view>

		
	</view>
</template>

<script>
	import category from "@/pages/category/category.vue"
	export default {
		name: "i-down-bar",
		props: {
			downBars: {
				type: Array,
				default: () => [{
					type: 'sort',
					name: '综合排序',
					active: false,
					list: [{
							id: null,
							name: '综合排序'
						},
						{
							id: 'new',
							name: '最新排序'
						},
						{
							id: 'hot',
							name: '热门排序'
						}
					]
				},
				{
					type: 'label',
					name :  '全部分类',
					active: false,
				    isCategory: true
				}
				]
			}
		},
		data() {
			return {
				downBarList : null
			};
		},
		created() {
			this.downBarList = this.downBars
		},
		components: {
			category
		},
		methods : {
			handleSortView(item){
				this.downBarList.forEach(i=>{
					i.active = (item.type === i.type) ?  !item.active : false
				})
			},
			handleChangeSort(item,m){

				if(item.name === m.name){
					return
				}
				
				item.name = m.name
				item.id = m.id
				
				this.$emit("search", {[item.type] : item.id})
			}
		}
	}
</script>

<style lang="scss">
	.down-bar {
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;

		.item-list {
			background-color: #fff;
			position: absolute;
			left: 0;
			right: 0;
			z-index: 100;

			.name {
				padding-left: 108rpx;
			}

			.category {
				height: 580rpx;
			}
		}

		.active {
			color: $i-text-color-blue;
		}
	}

	.sticky-box {
		position: -webkit-sticky;
		position: sticky;
		/* 其他浏览器 */
		top: var(--window-top);
	}

	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		// top : 170rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.2 !important;
	}
</style>
