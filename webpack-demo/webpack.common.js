const path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
        // print: './src/print.js'
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ]),
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        new ExtractTextPlugin('[name].[chunkhash].css')
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    // publicPath: '/',
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'scss-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    // publicPath: '/',
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};