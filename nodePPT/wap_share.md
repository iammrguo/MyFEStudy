title: wap切图踩坑分享
speaker: 郭帅彬
url: https://github.com/ksky521/nodePPT
transition: slide2
files: /js/demo.js,/css/demo.css

[slide]

# wap切图踩坑分享
## 演讲者：郭帅彬

[slide]

# 1. viewport {:&.flexbox.vleft}
### 概念 {:.yellow}
- <span class="layout-name">layout viewport</span> 用户网页的可视区域
- <span class="layout-name">visual viewport</span> 浏览器可视区域
- <span class="layout-name">ideal viewport</span>  能完美适配移动设备的viewport

<div style="display: flex;justify-content:space-between;">
    <img src="http://images.cnitblog.com/blog/130623/201407/300958521655944.png" style="height: 250px;">
    <img src="http://images.cnitblog.com/blog/130623/201407/300958533834472.png" style="height: 250px;">
    <div style="width: 160px;">
        <img src="http://images.cnitblog.com/blog/130623/201407/300958563683726.png" style="width: 100%;">
        <img src="http://images.cnitblog.com/blog/130623/201407/300958567274384.png" style="width: 100%;">
    </div>
</div>

[slide]

### 解决方法 {:.flexbox.vleft .yellow}
``` html 
<meta name="viewport" content="width=device-width, initial-scale=1.0,
maximum-scale=1.0, user-scalable=0">
```
### 常用属性 {:.flexbox.vleft.yellow}
|name   |description     |
|:------|:---------------|
|width|设置layout viewport  的宽度，正整数或字符串"width-device"|
|initial-scale|设置页面的初始缩放值，数字，可带小数|
|minimum-scale|允许用户的最小缩放值，数字，可带小数|
|maximum-scale|允许用户的最大缩放值，数字，可带小数|
|user-scalable|是否允许用户进行缩放，值为 "no" 或 "yes"|
__________________________
>摘自 http://www.cnblogs.com/2050/p/3877280.html

[slide]

# 2. 点透 {:&.flexbox.vleft}
### 出现场景 {:.yellow}
- A/B两个层上下z轴重叠
- 上层的A点击后消失或移开
- B元素本身有默认click事件（如a标签）或B绑定了click事件

[slide]
### 原因 {:.flexbox.vleft .yellow}
移动端点击相关事件触发顺序： touchstart -> touchend  -> click {:.flexbox.vleft}
### 解决方法 {:.flexbox.vleft .yellow}
使用统一的touch事件，及时取消A元素的默认点击事件 {:.flexbox.vleft}

[slide]

# 3. 电话链接 {:.flexbox.vleft}
__________________________
``` html 
<a href="tel:$PHONE-NUMBER">拨号</a>
<a href="sms:$PHONE-NUMBER">发短信</a>
```

### 带有分机号电话 {:.flexbox.vleft .yellow}
- ios：支持<a href="tel:主机号,分机号"></a>
- android: 兼容性不好
- 目前焦点方案：根据***"主机号-分机号"***分配动态大号，分配失败时，ios拨打***"主机号,分机号"***；安卓弹窗提示***"分机号"***后拨打***"主机号"***

[slide]

# 3. 华为兼容性问题 {:.flexbox.vleft}

- 华为自带浏览器对***flex***支持不好，对设为***"display: flex"***元素的子元素添加***"float: left"***;
- 华为通过***screen.width***获取的值为浏览器默认可视区域的宽度，改用***$mod.width()***

[slide]

# 4. ios兼容性问题 {:.flexbox.vleft}

- 当页面进入全屏模式时页面底部就不可交互，比如按钮或链接等等都需要两次点击才触发
    - safari在全屏模式时会在底部有一个透明的遮罩用于它退出全屏模式，这个遮罩的优先级是远远高于整个页面上的任何节点
    - 尽量将需要fixed的元素设计到顶部去避免

[slide]

# 封面样式2 {:&.flexbox.vleft}
## 左对齐

<iframe data-src="http://www.baidu.com" src="about:blank;"></iframe>


<style type="text/css">
code { 
    white-space: normal;  
    word-break: break-all;
}
.layout-name {
    display: inline-block;
    width: 230px;
}
</style>