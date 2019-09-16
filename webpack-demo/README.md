# live-app-bar

公共模块：“焦点看房”App导流下载条。

## 快速使用

适用于移动端。

使用方法为`script`标签：

```HTML
<script async type="text/javascript" src="/path/to/module_name.js" data-module="module_name" data-config-key1="value1"></script>
```

例如，使用底部的焦点看房app下载条：

```HTML
<script async type="text/javascript" src="//t.focus-res.cn/front-end/live-app-bar/app-bar-bottom.js" data-module="app-bar-bottom" data-config-from="front_new_home"></script>
```

`data-config`属性是为模块配置简单的参数。对于app-bar-bottom和app-prompt-top两个模块而言，可以配置`data-config-from`，也就是app下载页url所要携带的`_from`参数。

## 模块

### app-bar-bottom

吸底条，简称abb。

<p>
<img width="240" alt="abb" src="http://code.ops.focus.cn/front-end/live-app-bar/raw/master/README_asset/abb.png">
</p>

### app-prompt-top

居顶提示栏，简称apt。

<p>
<img width="240" alt="apt" src="http://code.ops.focus.cn/front-end/live-app-bar/raw/master/README_asset/apt.png">
</p>

## 依赖

无。
