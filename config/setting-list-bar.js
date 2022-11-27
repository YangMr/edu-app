export default () => {
	return [
		[
			{
				title: '允许非WIFI网络播放',
				event: 'setWifiPlay', // 点击触发的事件名
				checked: uni.getStorageSync('wifi-play') || false
			},
			
			{
				title: '允许非WIFI网络缓存',
				event: 'setWifiDownload', // 点击触发的事件名
				checked: uni.getStorageSync('wifi-download') || false
			},
			
			{
				title: '视频自动连续播放',
				event: 'setAutoPlay', // 点击触发的事件名
				checked: uni.getStorageSync('auto-play') || false
			}
			
		],
		
		[
			{
				title: '清除应用缓存',
				event: 'clearStorage', // 点击触发的事件名
				text: uni.getStorageInfoSync().currentSize < 1024
					? uni.getStorageInfoSync().currentSize+'KB'
					: (uni.getStorageInfoSync().currentSize/1024.00).toFixed(2)+'MB'
			}
		]
	]
}