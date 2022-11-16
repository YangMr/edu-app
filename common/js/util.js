import dayjs from "dayjs"
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言


// 节流方法
let _throttleRunning = false // 用来检测有没有开启节流

export const throttle = (callback, delay = 500) => {


	if (_throttleRunning) {
		return
	}

	_throttleRunning = true

	setTimeout(() => {
		callback()
		_throttleRunning = false
	}, delay)
}

// 手写日期格式化方法
export const format = (date, fmt) => {
	if (!date) return ''

	const $this = new Date(date) == 'Invalid Date' ? new Date(date.substr(0, 19)) : new Date(date)
	var o = {
		"M+": $this.getMonth() + 1, //月份 
		"d+": $this.getDate(), //日 
		"h+": $this.getHours(), //小时 
		"m+": $this.getMinutes(), //分 
		"s+": $this.getSeconds(), //秒 
		"q+": Math.floor(($this.getMonth() + 3) / 3), //季度 
		"S": $this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;

}

// 第三方日期格式化方法
export const dateFormat = (val,format = 'YYYY-MM-DD') => {
	return dayjs(val).format(format);
}
