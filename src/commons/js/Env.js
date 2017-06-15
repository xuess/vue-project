/*
 * v1.0.0
 * @author liubing
 * @date   2017-03-28
 *
 * 检测系统UA，提供以下4种结果
 *
 * detectOs(ua)   ----检测系统类型
 * env.os.isWindowsPhone | isAndroid | isIOS,isIPhone,isIPad
 *
 * detectThirdApp(ua)	----检测第三方APP，目前只包含微信
 * env.thirdApp.isWeixin
 *
 * detectTf8App(ua)	----检测淘粉吧APP
 * env.tf8App.isTf8App
 *
 * detectBrowser(ua)	----检测浏览器类型
 * env.browser.isUC | isQQ | isFirefox | (isIEMobile | isIE, isIELikeWebkit) | isChrome, isWebview | isSafari | isIOSWebview
 *
 * detectAll(ua)	----检测以上所有项目
 */
function Env() {
	this.os = {};
	this.thirdApp = {};
	this.tf8App = {};
	this.browser = {};
}
// 检测系统类型
Env.prototype.detectOs = function(ua = window.navigator.userAgent) {
	let self = this,
		result = [];

	if (result = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/i)) {
		self.os = {
			name: "Windows Phone",
			isWindowsPhone: true,
			version: result[1]
		};
	} else if (result = ua.match(/Android[\s\/]([\d\.]+)/i)) {
		self.os = {
			name: "Android",
			isAndroid: true,
			version: result[1]
		};
	} else if (result = ua.match(/(iPhone|iPad|iPod)/i)) {
		let name = result[1];

		if (result = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
			self.os = {
				name: name,
				isIPhone: "iPhone" === name || "iPod" === name,
				isIPad: "iPad" === name,
				isIOS: true,
				version: result[1].split("_").join(".")
			}
		}
	} else {
		self.os = {
			name: "unknown",
			version: '0'
		};
	}
};
// 检测第三方APP
Env.prototype.detectThirdApp = function(ua = window.navigator.userAgent) {
	let self = this;

	self.thirdApp.isWeixin = !!ua.match(/MicroMessenger/i);
};
// 检测淘粉吧APP
Env.prototype.detectTf8App = function(ua = window.navigator.userAgent) {
	let self = this;

	self.tf8App.isTf8App = !!ua.match(/taofen8/i);
};
// 检测浏览器类型
Env.prototype.detectBrowser = function(ua = window.navigator.userAgent) {
	let self = this,
		result = [];

	if (result = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
		self.browser = {
			name: "UC",
			isUC: true,
			version: result[1]
		};
	} else if (result = ua.match(/MQQBrowser\/([\d\.]+)/)) {
		self.browser = {
			name: "QQ",
			isQQ: true,
			version: result[1]
		};
	} else if (result = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) {
		self.browser = {
			name: "Firefox",
			isFirefox: true,
			version: result[1]
		};
	} else if ((result = ua.match(/MSIE\s([\d\.]+)/)) || (result = ua.match(/IEMobile\/([\d\.]+)/))) {
		self.browser = {
			version: result[1]
		};
		if (ua.match(/IEMobile/)) {
			self.browser.name = "IEMobile";
			self.browser.isIEMobile = true;
		} else {
			self.browser.name = "IE";
			self.browser.isIE = true;
		}
		if (ua.match(/Android|iPhone/)) {
			self.browser.isIELikeWebkit = true;
		}
	} else if (result = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
		self.browser = {
			name: "Chrome",
			isChrome: true,
			version: result[1]
		};
		if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
			self.browser.name = "Chrome Webview";
			self.browser.isWebview = true;
		}
	} else if (ua.match(/Safari/) && (result = ua.match(/Android[\s\/]([\d\.]+)/i))) {
		self.browser = {
			name: "Android",
			isAndroid: true,
			version: result[1]
		};
	} else if (ua.match(/iPhone|iPad|iPod/i)) {
		if (ua.match(/Safari/) && (result = ua.match(/Version\/([\d\.]+)/))) {
			self.browser = {
				name: "Safari",
				isSafari: true,
				version: result[1]
			};
		} else if (result = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
			self.browser = {
				name: "IOS Webview",
				isIOSWebview: true,
				version: result[1].split("_").join(".")
			};
		}
	} else {
		self.browser = {
			name: "unknown",
			version: '0'
		};
	}
};
// 检测以上所有项目
Env.prototype.detectAll = function(ua = window.navigator.userAgent) {
	let self = this;

	self.detectOs(ua);
	self.detectThirdApp(ua);
	self.detectTf8App(ua);
	self.detectBrowser(ua);
}

const env = new Env();

env.detectAll();

window.env = env;