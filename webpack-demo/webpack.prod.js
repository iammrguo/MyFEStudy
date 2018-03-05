const merge = require('webpack-merge'),
    webpack = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成一个四位数的hash作为模块id
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});