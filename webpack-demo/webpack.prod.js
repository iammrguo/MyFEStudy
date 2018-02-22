const merge = require('webpack-merge'),
    webpack = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        publicPath: '/'
    },
    devServer: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});