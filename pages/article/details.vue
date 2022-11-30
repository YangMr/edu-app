<template>
	<view>
		<!-- 分类布局 -->
		<view class="tag-list row">
			<uni-tag 
			class="tag-view" 
			:text="item.name" 
			size="small" 
			:inverted="true" 
			type="primary" 
			circle
			v-for="(item,index) in articleDetail.labelList"
			:key="index"
			></uni-tag>

		</view>
		
		<view class="content-main">
			<!-- 文章标题与发布信息布局 -->
			<text class="title text-ellipsis">{{articleDetail.title}}</text>
			<view class="info">
				<view class="author center">
					<image :src="articleDetail.imageUrl" mode=""></image>
					<text>{{articleDetail.nickName}}</text>
				</view>
				<text>· {{articleDetail.updateDate}}</text>
				<text>· {{articleDetail.viewCount}}人阅读</text>
			</view>

			<!-- 文章内容区域 -->
			<!-- #ifdef MP-WEIXIN -->
			<rich-text nodes="<h2>hello word1</h2>"></rich-text>
			<!-- #endif -->
			
			<!-- #ifndef  MP-WEIXIN-->
			<!-- h5 、app -->
			<view v-html="articleDetail.htmlContent"></view>
			<!-- #endif -->

		</view>
		
		
		<view class="footer">
			<!-- 热门评论 -->
			<view class="comment">
				<view class="footer-header">
					<text class="title">热门评论</text>
				</view>
				<view class="comment-item row" v-for="(item,index) in commentList" :key="index">
					<image  :src="item.userImage" mode=""></image>
					<view class="right column">
						<view class="space-between">
							<text>{{item.nickName}}</text>
							<text>{{item.createDate}}</text>
						</view>
						<text class="content">{{item.content}}</text>
					</view>
				</view>
				
			</view>
			
			<!-- 发表评论 -->
			<view class="bottom center">
				<textarea @input="handleWatchValue" v-model="content" placeholder="有何高见,展开讲讲……" class="textarea"  />
				<button size="mini" :disabled="disabled || !content.trim()" class="btn" @click="handleSubmitComment" >提交</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniTag from "@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"
	import articleApi from "@/api/article.js"
	export default {
		data() {
			return {
				articleId : '',  // 文章id
				articleDetail : {}, // 文章详情数据
				commentList : [], // 评论列表 
				content : "", // 发布的评论
				disabled : true // 按钮的状态
			}
		},
		components : {
			uniTag
		},
		onLoad(options) {
			this.articleId = options.id
			
			this.initLoad()
		},
		methods: {
			async initLoad(){
				try{
					// uni.showLoading({})
					await this.getDetailList()
					await this.getCommentList()
					
					// uni.hideLoading()
				}catch(e){
					//TODO handle the exception
					uni.hideLoading()
				}
				
			},
			
			// 获取文章详情列表
			async getDetailList(){
				try{
					const response = await articleApi.getArticleDetail(this.articleId)
					
					response.htmlContent = response.htmlContent.replace('/\<img/ig', '<img style="width:100%; height: auto;"')
					
					uni.setNavigationBarTitle({
						title : response.title
					})
					
					this.articleDetail = response
					
				}catch(e){
					//TODO handle the exception
					console.log("error",e)
				}
			},
			// 获取文章评论列表
			async getCommentList(){
				try{
					const response = await articleApi.getComment(this.articleId)
					this.commentList = response
					console.log("response=>", response)
				}catch(e){
					//TODO handle the exception
					console.log("error",e)
				}
			},
			// 监听输入框的内容
			handleWatchValue(){
				if(this.content !== ""){
					this.disabled = false
				}
			},
			// 提交评论数据
			async handleSubmitComment(){
				
				if(this.disabled) return
				
				if(!this.content) return
				
				uni.showLoading({title: '提交中', mask: true})
				
				if(!this.$store.getters.hasLogin){
					this.navTo("/pages/auth/login")
					return 
				}
				
				try{
					const data = {articleId : this.articleId, content : this.content.trim()}
					const response = await articleApi.submitComment(data)
	
					
					this.getCommentList()
					
					uni.hideLoading()
					
					this.$util.msg('评论成功', {icon: 'success'})
					
					this.content = ""
					
					
					
				}catch(e){
					uni.hideLoading()
					
					this.$util.msg('评论失败，请重试!')
					//TODO handle the exception
					console.log("error=>", e)
				}
				console.log("content", this.content)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $i-color-grey;
}	
	
.tag-list{
	flex-wrap: wrap;
	padding: 10rpx 25rpx;
	font-size: 14px;
	background-color: #ffffff;
	
	.tag-view{
		margin-top: 15rpx;
		margin-right: 20rpx;
	}
}

.content-main{
	padding: 25rpx;
	background-color: #fff;
	
	.title{
		font-size: 45rpx;
		line-height: 55rpx;
		font-weight: bold;
	}
	
	.info{
		display: flex;
		align-items: center;
		margin: 30rpx 0;
		
		.author{
			font-size: 30rpx;
			 color: #303133;
			 
			image {
			 width: 45rpx;
			 height: 45rpx;
			 border-radius: 100%;
			 margin-right: 10rpx;
			}
		}
		
		&>text {
		 margin-left: 10rpx;
		 font-size: 25rpx;
		 color: #999;
		}
	}
}

.footer{
	background-color: #fff;
	margin-top: 20rpx;
	
	padding-bottom: 140rpx;
	
	.comment{
		
		.footer-header{
			font-size: 30rpx;
			 color: #303133;
			 font-weight: bold;
			 padding: 25rpx;
			 
			 &::before{
				 content : '';
				 width: 0;
				  height: 40rpx;
				  margin-right: 25rpx;
				  border-left: 6rpx solid $i-color-primary;
			 }
		}
		
		.comment-item{
			padding: 20rpx 25rpx;
			image{
			 width: 50rpx;
			 height: 50rpx;
			 border-radius: 50rpx;
			 margin-right: 20rpx;
			 }
			 
			 .right{
				width: calc(100% - 80rpx);
				font-size: 25rpx;
				color: $i-text-color-grey;
				
				.content{
				 font-size: 30rpx;
				 color: $i-text-color-black;
				 margin: 10rpx 0;
				 }
			 }
		}
		
	}
}

.bottom{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	white-space: nowrap;
	padding: 20rpx;
	border-top: $i-underline;
	
	.textarea{
		font-size: 30rpx;
		 padding: 15rpx 20rpx;
		 width: 100%;
		 height: 70rpx;
		 background-color: #F8F9FB;
		 border-radius: 30rpx;
	}
	
	.btn {
	 padding: 0 20rpx;
	 margin-left: 15rpx;
	 }
}
</style>
