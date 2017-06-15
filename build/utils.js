var path = require('path')
var config = require('../config')
var glob = require('glob')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}



exports.getEntry = function(globPath) {
    var entries = {},
        basename, tmp, pathname

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry))
        tmp = entry.split('/').splice(3)
        tmp = tmp.slice(0, -1)
        pathname = tmp.join('/') + '/' + basename // 正确输出js和html的路径
        
        //删除第一个/
        if(pathname.indexOf('/') == 0){
        		pathname = pathname.substring(1)
        }
        entries[pathname] = entry
    })
    return entries
}

exports.multipleEntries = function(webpackConfig, HtmlWebpackPlugin) {
    // var entries = webpackConfig.entry
    var projectName = !!config.build.projectName ? config.build.projectName : '**';
	var entries = exports.getEntry('./src/' + projectName + '/**/*.html') // 获得入口文件
	
	console.log('-------------entries------------start\n',entries,'\n------------------end-------------------');
	
    Object.keys(entries).map(function(id) {
        var _conf = {
    			template: entries[id],
    			// template: "!!html-webpack-plugin/lib/loader.js!./templates/" + id + ".html",
            filename: id + ".html",
            inject: true, // js插入位置
			//showErrors: true, //页面上打印 错误日志
            chunks: [id,'manifest','vendor'],
        }
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        webpackConfig.plugins.push(new HtmlWebpackPlugin(_conf))
    })
}
