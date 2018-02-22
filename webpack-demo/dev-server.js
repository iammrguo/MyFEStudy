const webpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack');

const config = require('./webpack.config.js'),
    options = {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    };

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config),
    server = new webpackDevServer(compiler, options);

server.listen(9000, 'localhost', () => {
    console.log('dev server listening on port 9000');
});