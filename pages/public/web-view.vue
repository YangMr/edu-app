<template>
	<view>
		<web-view v-if="isOpen()" :src="url"></web-view>
		<view v-else class="tip column">
			<text>如需浏览，请长按网址复制后使用浏览器访问：</text>
			<text selectable>{{url}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad(options) {
			this.url = options.url
		},
		methods: {
			isOpen() {
				if (this.url) {
					return this.url.indexOf("hxwendeng.com") !== -1
				}
			}
		}
	}
</script>

<style lang="scss">
	.tip {
		position: relative;
		top: 200rpx;
		width: 300px;
		margin: 0 auto;
		text-align: center;
		// 自动换行
		word-wrap: break-word;
		font-size: 30rpx;

		text:first-child {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
	}
</style>
