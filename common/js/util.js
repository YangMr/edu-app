

// 节流方法
let _throttleRunning = false  // 用来检测有没有开启节流

export const throttle = (callback, delay = 500) => {
	
	
	if(_throttleRunning){
		return
	}
	
	_throttleRunning = true
	
	setTimeout(()=>{
		callback()
		_throttleRunning = false
	},delay)
}