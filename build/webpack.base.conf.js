var path = require('path')
var utils = require('./utils')
var config = require('../config')
var yargs = require('yargs').argv
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var projectName = !!config.build.projectName ? config.build.projectName : '**';

//./src/master/**/+(main|app|index).js
var entries = utils.getEntry('./src/' + projectName + '/**/*.js') // 获得入口js文件

/*
{
	'assets/js/master/testB': './src/master/assets/js/master/testB.js',
	'assets/js/testA': './src/master/assets/js/testA.js',
	'main/main': './src/master/main/main.js'
}
*/

console.log('---------\n', config.build.projectName, '\n----------');
console.log('---------\n', entries);

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: entries,
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'src': resolve('src'),
            'master': resolve('src/master'),
            'components': resolve('src/commons/components'),
            'css_libs': resolve('src/commons/css'),
            'js_libs': resolve('src/commons/js')
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}

