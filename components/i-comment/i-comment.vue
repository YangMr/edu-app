<template>
	<view class="comment-box" >
		<view v-if="isShow" class="mask" @click="show"></view>
		
		<view  v-if="isShow"  class="course-comment center column">
			<uni-rate @change="getValue" :size="22" activeColor="rgb(0, 122, 255)" :value="comment.score"></uni-rate>
			<view class="desc">{{descArr[comment.score - 1]}}</view>
			<view class="input-box center">
				<textarea :value="comment.content" placeholder="请输入评价内容..."  @input="getContent"></textarea>
				<text @click="submitComment">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-comment",
		props : {
			comment : {
				type : Object,
				default : () => ({
					userId : 1,
					nickName : 'yangmr',
					userImage : 'avatar.png',
					content : '',
					score : 0
				})
			},
			descArr : {
				type : Array,
				default : () => ([
					'极差,课程很糟糕，我要吐槽。',
					'差,我对课程不满意。',
					'中评,课程一般。',
					'良好,课程还可以。',
					'推荐,课程非常棒。',
				])
			}
		},
		data() {
			return {
				text : '',
				isShow : false
			};
		},
		methods : {
			show(){
				this.isShow = !this.isShow
				
				// 设置评价内容为空
				this.comment.content = ""
				
				// 设置没有评分
				this.comment.score = 0
			},
			getContent(e){
				this.comment.content = e.detail.value
			},
			getValue(e){
				this.comment.score = e.value
			},
			submitComment(){
				this.comment.content = this.comment.content.trim()
				this.$emit("submitComment", this.comment)
			}
		}
	}
	
/**
 * 
 * 1. 导入uni-app扩展ui中的评分组件
 * 2. 创建评价弹窗组件
 * 3. 实现布局
 * 4. 设置弹窗组件显示/隐藏方法
 * 5. 获取评价内容
 * 6. 获取评价评分
 * 7. 点击提交按钮,将评论的数据传递给父组件
 * 8. 父组件接收到评分的数据,调用接口
 * 9. 接口调用成功之后,让评分弹窗消失, 并且提示评分成功, 失败的话,则提示评论失败
 * 
 */
	
</script>

<style lang="scss">
.course-comment{
	position: fixed;
	left :0;
	right :0;
	bottom: 50%;
	z-index : 100;
	background-color: #fff;
	width: 650rpx;
	border-radius: 20rpx;
	padding:30rpx;
	margin: 0 auto;
	font-size:30rpx;
	
	.desc{
		letter-spacing: 2px;
		padding: 20rpx 0;
		color: $i-text-color-black;
	}
	
	
	
	.input-box{
		border-top: $i-underline;
		width: 100%;
		white-space: nowrap;
		
		textarea{
			font-size: 30rpx;
			 padding: 10rpx;
			 width: 100%;
			 height: 100rpx;
			 background-color: #F8F9FB;
			 border-radius: 0 0 0 16rpx;
		}
		
		text{
			padding: 0 15rpx;
			color: $i-text-color-blue;
		}
	}
}
</style>