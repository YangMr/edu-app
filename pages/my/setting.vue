<template>
	<view class="setting-box">
		<i-list 
		:list="settingListBar"
		@setWifiPlay="setWifiPlay"
		@setWifiDownload="setWifiDownload"
		@setAutoPlay="setAutoPlay"
		@clearStorage="clearStorage"
		></i-list>
	</view>
</template>

<script>
	import settingListBar from "@/config/setting-list-bar.js"
	export default {
		data() {
			return {
				settingListBar : settingListBar()
			}
		},
		methods: {
			// 允许非WIFI网络播放
			setWifiPlay(){
				alert("1")
			},
			// 允许非WIFI网络缓存
			setWifiDownload(){
				alert("2")
			},
			// 视频自动连续播放
			setAutoPlay(){
				alert("3")
			},
			// 清除应用缓存
			clearStorage(data){
				uni.showModal({
					title: '您确定清除应用缓存吗?',
					content: '(该操作不会删除缓存课程)',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync()
							this.$set(data, "text", "0kb")
							this.$util.msg("清除成功")
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $i-color-grey;
}
</style>
