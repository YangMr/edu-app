const rightIcon = 'iconfont icon-right' // 右侧图标
export default () => {
	return [
		[
			{
				icon: 'mxg-icon mxg-icon-host-color', //  左侧图标
				title: '我的订单' ,// 左侧标题
				rightIcon, // 右侧图标
				page: '/pages/order/order', //目标页面，配置了点击此行会进行跳转
				login: true, // true登录后才可访问
				/* 
				event: 'add', //点击触发事件名
				checked: fasle, //是否有switch开头，且是否选中
				src: '/static/logo.png' , //是否有图片，图片地址
				text: '10KB', //右侧文字
				*/
			},
			{
				icon: 'mxg-icon mxg-icon-lock-color',
				title: '我的余额',
				rightIcon,
				page: '/pages/order/my-balance',
				login: true,
			},
			{
				icon: 'mxg-icon mxg-icon-warn',
				title: '我的学习',
				rightIcon,
				page: '/pages/my/study',
				login: true,
			}
		],
		[
			{
				icon: 'mxg-icon mxg-icon-set-color',
				title: '设置',
				rightIcon,
				page: '/pages/my/setting',
			},
			{
				icon: 'mxg-icon mxg-icon-notice-color',
				title: '意见反馈',
				rightIcon,
				page: '/pages/my/feedback',
			}
		],
		[
			{
				icon: 'mxg-icon mxg-icon-model-color',
				title: '关于我们',
				rightIcon,
				page: '/pages/my/about',
			}
		]
	]
}