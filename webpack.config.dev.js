const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {
    output: {
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './public'
    }
});
