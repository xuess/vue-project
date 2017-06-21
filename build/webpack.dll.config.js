/**
 * 使用DllPlugin把常用依赖单独打包，提高webpack打包效率
 * @type {[type]}
 */

var path = require('path')
var webpack = require('webpack')
var config = require('../config/index.js');
//TODO 地址有误，到根目录了
var outputPath = process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot;

const vendors = [
    'vue',
    'vue-router',
    'axios',
    'vuex'
]

module.exports = {
    output: {
        path: outputPath,
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        'vendors': vendors
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            path: './manifest.json',
            name: '[name]',
            context: __dirname
        })
    ]
}
