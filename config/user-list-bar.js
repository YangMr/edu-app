import store from '@/store'

const rightIcon = 'iconfont icon-right'
export default () => {
	const userInfo = store.state.userInfo
	/* console.log('userInfo', userInfo) */
	return [
		[
			{
				title: '头像',
				event: 'chooseImg',
				src:  userInfo.imageUrl || '/static/logo.png',
				rightIcon,
			},
			{
				title: '用户名',
				event: 'editUsername',
				text: userInfo.username,
				rightIcon,
			},
			{
				title: '手机号',
				event: 'editMobile',
				text: userInfo.mobile,
				rightIcon,
			}
		],
		
		[
			{
				title: '昵称',
				event: 'editName',
				text: userInfo.nickName,
				rightIcon,
			},
			{
				title: '性别',
				event: 'chooseSex',
				text: userInfo.sex ? '女': '男',
				rightIcon,
			}
		]
	]
}