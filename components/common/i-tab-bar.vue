<template>
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<view class="bar-view center">
			<view class="bar-item" @click="handleChangeTab(index)" :class="{current : index === value}" v-for="(item,index) in tabs" :key="index">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value : {
				type : Number,
				default : 0
			},
			tabs: {
				type: Array,
				default: () => [{
					id: '1',
					name: '课程'
				}, {
					id: '2',
					name: '文章'
				}, {
					id: '3',
					name: '问答'
				}]
			}
		},
		methods : {
			handleChangeTab(index){
				this.$emit("input", index)
			}
		}
	}
</script>

<style lang="scss">
	.tab-bar {
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		border-bottom: 1px solid #efeff4;

		.bar-view {
			width: 100%;
			text-align: center;

			.bar-item {
				flex: 1;
				font-size: 30rpx;
				line-height: 80rpx;
				position: relative;

				&::after {
					display: block;
					content: "";
					width: 0;
					height: 0;
					position: absolute;
					border-bottom: 6rpx solid $i-text-color-blue;
					left: 50%;
					bottom: 6rpx;
					border-radius: 20rpx;
					transform: translateX(-50%);
					transition: .3s;
				}
			}

			.current {
				color: $i-text-color-blue;

				&::after {
					width: 60rpx;
				}
			}
		}

	}
</style>
