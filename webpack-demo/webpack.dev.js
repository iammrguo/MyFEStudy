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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});