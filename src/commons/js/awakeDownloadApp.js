/*
 * v1.0.0
 * @author liubing
 * @date   2017-03-28
 *
 * 唤起以及下载淘粉吧客户端
 *
 * 唤起淘粉吧客户端
 * awakeDownloadApp.awakeApp(awakeUrl)
 *
 * 下载淘粉吧客户端
 * awakeDownloadApp.downloadApp(opts)
 *
 * @param opts {}
 * @type string   awakeUrl     		----唤起地址，默认app首页
 * @type boolean  notAwake    		----是否需要唤起，默认唤起
 * @type string   androidUrl   		----安卓手机下载地址
 */
const awakeDownloadApp = {};

export default awakeDownloadApp;

// 唤起淘粉吧客户端
awakeDownloadApp.awakeApp = function(awakeUrl) {
	// 安卓手机谷歌浏览器使用intent协议进行唤起
	if (env.os.isAndroid && env.browser.isChrome && !env.browser.isWebview) {
		window.location.replace('intent://' + awakeUrl.replace('taofen8-master://', '') + '#Intent;scheme=taofen8-master;package=com.leixun.taofen8;end');
	}
	// safari浏览器9.0以上版本以及chrome内核浏览器直接跳转进行唤起
	else if (env.browser.isSafari && env.browser.version >= 9 || env.browser.isChrome) {
		window.location.href = awakeUrl;
	}
	// 其他浏览器使用iframe方法进行唤起
	else {
		let iframe = document.createElement('iframe');

		iframe.style.cssText = 'display:none;border:0;width:0;height:0;';
		document.body.appendChild(iframe);
		iframe.src = awakeUrl;
	}
};


// 下载淘粉吧客户端
awakeDownloadApp.downloadApp = function(opts = {}) {
	let jumpUrl;

	if (env.thirdApp.isWeixin) {
		jumpUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.leixun.taofen8";
	} else {
		// 先尝试唤起淘粉吧app
		!opts.notAwake && awakeDownloadApp.awakeApp(opts.awakeUrl || "taofen8-master://tj/?id=0");

		if (env.os.isAndroid) {
			// jumpUrl = opts.androidUrl || "http://m.taofen8.com/download.jsp";
			jumpUrl = opts.androidUrl || "http://a.app.qq.com/o/simple.jsp?pkgname=com.leixun.taofen8";
		} else if (env.os.isIOS) {
			jumpUrl = "http://itunes.apple.com/us/app/tao-fen-ba/id527012586?ls=1&mt=8";
		} else if (env.os.isWindowsPhone) {
			jumpUrl = "http://www.windowsphone.com/zh-cn/store/app/%E6%B7%98%E7%B2%89%E5%90%A7/23861cd8-a7d3-40f2-b140-5cf116964641";
		} else {
			// jumpUrl = opts.androidUrl || "http://m.taofen8.com/download.jsp";
			jumpUrl = opts.androidUrl || "http://a.app.qq.com/o/simple.jsp?pkgname=com.leixun.taofen8";
		}
	}
	// 必须大于1秒，否则不会去唤起app，而直接跳到app下载页
	setTimeout(function() {
		window.location.href = jumpUrl;
	}, 1001);
};