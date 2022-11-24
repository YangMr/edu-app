<template>
	<view class="course-dir">
		<block v-for="(item,index) in chapterList" :key="index">
			<view class="chapters text-ellipsis">
				<text>第{{index + 1}}章 {{item.name}}</text>
			</view>
			
			<view 
			@click="handleCousePlay(index,i,sections)" 
			class="sections row"
			:class="{active : index === activeObject.chapterIndex && i === activeObject.sectionsIndex}"
			v-for="(sections,i) in item.sectionList" 
			:key="i">
				<text class="iconfont icon-roundrightfill"></text>
				<view class="row">
					<text>{{index +1}}-{{i+1}}</text>
					<text class="title text-ellipsis">{{sections.name}}</text>
				</view>
				<!-- 如果是未购买并且是收费的情况下显示试看 -->
				<text v-if="!isBuy && sections.isFree === 0" class="see">试看</text>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		props: {
			isBuy : {
				type : Boolean,
				default : false
			},
			activeObject : {
				type : Object,
				default : () => ({
					chapterIndex : -1,
					sectionsIndex : -1
				})
			},
			chapterList: {
				type: Array,
				default: () => ([{
					id: 1,
					name: '课程介绍',
					sectionList: [ //课节信息
						{
							id: 1,
							name: '什么是uni-app框架',
							isFree: 1, // 是否付费（0付费，1免费）
						},
						{
							id: 2,
							name: '安装HBuilderX和插件',
							isFree: 0, // 是否付费（0付费，1免费）
						},
						{
							id: 3,
							name: '创建uni-app项目和运行Web浏览器',
							isFree: 0, // 是否付费（0付费，1免费）
						}
					]
				}, {
					id: 2,
					name: '初始化梦学谷在线教育APP项目',
					sectionList: [ //课节信息
						{
							id: 1,
							name: '创建运行项目和完善项目目录',
							isFree: 0, // 是否付费（0付费，1免费）
						},
						{
							id: 2,
							name: '拷贝静态资源到项目和mixin混合讲解',
							isFree: 1, // 是否付费（0付费，1免费）
						}
					]
				}])
			}
		},
		methods : {
			handleCousePlay(chapterIndex, sectionIndex,data){
				// 当 课程需要购买 或者 当前课程没有购买的时候
				if(data.isFree === 0 || this.isBuy){
					const activeObject = {chapterIndex,sectionIndex}
					this.$emit("playVideo", {data,activeObject})
				}else{
					this.$util.msg('请先购买')
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.text-ellipsis {
		-webkit-line-clamp: 1; //最多1行
	}

	.course-dir {

		padding: 0 36rpx;

		.chapters {
			margin-top: 30rpx;
			margin-bottom: 10rpx;
			font-weight: bold;
			color: $i-text-color-black;
			font-size: 35rpx;
		}

		.sections {
			padding: 20rpx 0;
			font-size: 30rpx;
			border-bottom: $i-underline;
			line-height: 40rpx;
			color: #3d3c40;
			
			

			text {
				margin-right: 10rpx;
			}

			.title {
				width: 470rpx;
			}

			.see {
				color: $i-text-color-blue;
				font-size: 25rpx;
				// 靠右
				flex: 1;
				text-align: right;
			}
		}
	}
	
	.active{
		color : $i-text-color-blue !important;
	}
</style>
