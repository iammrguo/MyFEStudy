const merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
    path = require('path'),
    webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // inline: false,
        // overlay: true,
        port: 9000,
        useLocalIp: true,
        host: '0.0.0.0',
        hot: true
    },
    plugins: [
        // 1. 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        // 2. 生成文件hash时将使用模块的路径，而不是数字标识符
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});