export default () => {
	return [
		{
			type: 'sort', // 标识什么类型
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
			type: 'isFree',
			name: '全部课程',
			active: false,
			list: [{
					id: null,
					name: '全部课程'
				},
				{
					id: 0,
					name: '付费课程'
				},
				{
					id: 1,
					name: '免费课程'
				}
			]
		},
		{
			type: 'label',
			name: '全部分类',
			active: false,
			isCategory: true
		}
	]
}
