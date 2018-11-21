# 精通CSS：高级Web标准解决方案 #

## 第一章 基础知识 ##

### 命名 ###

完全小写的类名，多个单词之间用连字符分隔。andy-budd;

### ID vs Class ###

只有在目标元素非常独特，绝不会对网站上其他地方别的东西使用这个名称时，才会使用ID。或者说，只有绝对确定这个元素只会出现一次的情况下，才应该使用ID。

### div vs span ###

在文档中添加结构的一个元素是div元素。div代表部分（division），可以将文档分割为几个有意义的区域。所以，通过将主要内容区域包围在div中并分配Content类，就可以在文档中添加结构和意义。
为了将不必要的标记减到最少，应该只在没有现有元素能够实现区域分割的情况下使用div元素。例如，如果使用主导航列表，就不需要将它包围在div中。

### html css ###
CSS1 1996年 包含非常基本的属性，比如字体、颜色、外边距。
CSS2 1998年 高级概念（比如浮动和定位）以及高级的选择器（比如子选择器、相邻选择器和通用选择器） 

## 为样式找到应用目标 ##

### 常用选择器 ###
* 元素选择器
```
  p {color:black;}
  h1 {font-weight: bold;}
```
* 后代选择器
```
  p h1 {padding-left: 2em;}
```
* ID选择器和类选择器
### 伪类 ###
```javascript
/* makes all unvisited links blue */
a:link {color: blue;}
/* makes all visited links green */
a:visited {color: green;}
/* makes links red when hovered or activated.
focus is added for keyboard support */
a:hover, a:focus, a:active {color: red;}
/* makes table rows red when hovered over */
tr:hover {background-color: red;}
/* makes input elements yellow when focus is applied */
input:focus {background-color: yellow;}
```
:link和:visited称为链接伪类，只能应用于锚元素。
:hover、:active和:focus称为动态伪类，理论上可以应用于任何元素。
* 伪类连接
```
/* makes all visited linkes olive on hover */
a:visited:hover {color: olive;}
```
### 2.2通用选择器 ###
通用选择器的作用类似通配符，匹配所有可用元素。
```
* {
  padding: 0;
  margin: 0;
}
```
### 2.3高级选择器 ###

#### 2.3.1子选择器和相邻同胞选择器 ####
* 子选择器
子选择器只选择元素的直接后代，即子元素。
#nav>li {

}
>注意：
* 后代选择器
后代选择器选择一个元素的所有后代
#nav li {

}

* 相邻同胞选择器
h2 + p {
  font-size: 1.4rem;
  font-weight: bold;
  color: #777;
}

* 属性选择器
acronym[title] {
  
}
acronym[title]:hover, acronym[title]:focus {

}
a[rel="nofollow"] {

}
[id="header"] {

}
### 2.3.3层叠和特殊性 ###
标有!important的用户样式
标有!important的作者样式
作者样式
用户样式
浏览器/用户代理应用样式

css优先级
当两个规则都作用到了同一个html元素上时，如果定义的属性有冲突，那么应该用谁的值的，CSS有一套优先级的定义。

不同级别

在属性后面使用 !important 会覆盖页面内任何位置定义的元素样式。
作为style属性写在元素内的样式
id选择器
类选择器
标签选择器
通配符选择器
浏览器自定义或继承

* 总结排序：!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

同一级别

同一级别中后写的会覆盖先写的样式

a[href="http://www.w3school.com.cn/"][title="W3School"] {color: red;}


#### 2.3.4继承 ####

直接应用于元素的任何样式总会覆盖继承而来的样式。因为继承而来的样式的特殊性为空。

## 2.4 规划、组织和维护样式表
### 2.4.1对文档应用样式 ###
```html
<!-- 一种 -->
<link href="/css/basic.css" rel="stylesheet" type="text/css" />
<!-- 另一种 -->
<style type="text/css">
<!-- 
@import url("/css/advanced.css");
 -->
</style>

<!-- 样式表中导入其他样式表 *导入样式表比链接样式表慢
 -->
@import url(/css/layout.css);
@import url(/css/typography.css);
@import url(/css/color.css);
```
>注意：
1、多个文件会导致从服务器发送更多数据包，数据包的数量（不是内容）会影响下载时间。
2、浏览器只能从同一个域同时下载数量有限的文件。现在浏览器限制是8个
3、尽量使用结构良好的单一CSS文件提高下载速度。

