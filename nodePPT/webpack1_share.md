title: webpack1分享
speaker: 郭帅彬
url: https://github.com/ksky521/nodePPT
transition: slide2
files: /js/demo.js,/css/demo.css

[slide]

# webpack1.x 分享
## 演讲者：郭帅彬

[slide]

# 1. 简单例子 {:&.flexbox.vleft}
```javascript
// 配置文件 webpack.config.js
var webpack = require('webpack')

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by guo')
    ]
}
```

[slide]

# 2. 加载器 loader {:&.flexbox.vleft}
### Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换 {:.yellow}
- webpack.config.js 
```javascript
loaders: [{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
        path.resolve(__dirname, "app/src"),
        path.resolve(__dirname, "app/test")
    ],
    exclude: /node_modules/
}]
```
- CLI
```
$ webpack entry.js bundle.js --module-bind "css=style-loader!css-loader"
```

[slide]

# 3. 插件 plugin {:&.flexbox.vleft}
### 插件可以完成更多 loader 不能完成的功能 {:.yellow}
- webpack.config.js
```javascript
plugins: [
    new webpack.BannerPlugin('This file is created by guo')
]
```
- 更多插件
    - LimitChunkCountPlugin、UglifyJsPlugin、CommonsChunkPlugin、HtmlWebpackPlugin等
    - http://webpack.github.io/docs/list-of-plugins.html

[slide]

# 4. 按需加载 on demand loaded {:&.flexbox.vleft}
### ***AMD require*** 模块都被下载且执行后才执行回调函数

```javascript
require(dependencies: String[], [callback: function(...)])
// dependencies: 模块依赖数组
// callback: 回调函数
```

### ***CommonJs require-ensure*** 当指定的模块都下载下来了（还未执行），便执行回调函数，在回调函数使用require(模块名)后，这个模块才会被执行。

```
require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])
// dependencies: 依赖的模块数组
// callback: 回调函数，该函数调用时会传一个require参数
// chunkName: 模块名，用于构建时生成文件时命名使用，如果这个chunk名已经存在了，则将本次依赖的模块合并到已经存在的chunk中
```

[slide]

# 5. 多入口点 multiple entry points {:&.flexbox.vleft}
### 要求为多个HTML页面准备多个bundle {:.yellow}

```javascript
module.exports = {
    entry: {
        a: "./a",
        b: "./b",
        c: ["./c", "./d"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.chunk.js"
    },
    plugins: [
        new CommonsChunkPlugin("commons.chunk.js")
    ]
}
```


<style type="text/css">
.layout-name {
    display: inline-block;
    width: 230px;
}
</style>