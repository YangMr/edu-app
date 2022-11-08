# 积云在线教育APP开发文档

## 一、创建项目

## 二、安装sass/scss插件

## 三、完善项目目录结构

- common  存放的是公共的文件
	- js
	- css
	- mixins

- api     存放的是封装的api文件
- config  存放的项目配置文件
- mock	  存放的是模拟数据的文件
- utils   存放的是一些库文件

## 四、将项目的资源图片拷贝到项目中

## 五、引入并使用字体图标

### 5.1 访问iconfont官网,选择需要的图标并进行下载
### 5.2 将下载的字体图标拷贝到static目录下,并在App.vue内引入iconfont.css文件
### 5.3 在组件内可以通过fontClass或者Unicode的方式使用

## 六、配置窗口以及tabbar

## 七、实现首页导航栏 
### 7.1 实现方案

- 直接在pages.json中进行配置来进行实现 (采用这种)
- 让导航栏消失,自己封装搜索框