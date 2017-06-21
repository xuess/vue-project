<template>

	<div>
		<backdrop></backdrop>
		<div class="modal" id="downloadTipWx" style="display:block;" @touchmove="forbidSlide" v-show="isShow">
			<div class="modal-header fs14">
				<p>若已安装淘粉吧</p>
				<p>请点击右上角用「<span id="browser" v-if="isAndroid">浏览器</span><span id="browser" v-else>Safari</span>」打开</p>
			</div>
			<div class="modal-body">
				<div class="divide"></div>
				<p class="fs12">还没有安装App?</p>
				<img class="icon" src="https://img.alicdn.com/imgextra/i2/2296013456/TB2TabAg00opuFjSZFxXXaDNVXa_!!2296013456.png">
			</div>

			<div class="modal-footer fs17">
				<div class="btn downloadBtn" @click="downloadAppBtn">立即下载</div>
			</div>
			<img class="arrow" src="https://img.alicdn.com/imgextra/i1/2296013456/TB2rR6ng9VmpuFjSZFFXXcZApXa_!!2296013456.png">
			<img class="close" src="https://img.alicdn.com/imgextra/i4/2296013456/TB2S6MifM0kpuFjSspdXXX4YXXa_!!2296013456.png" @click="close">
		</div>
	</div>
</template>
<script>
	import backdrop from 'components/backdrop';
	import detectOs from 'js_libs/Env.js';
	import downloadApp from "js_libs/awakeDownloadApp.js"
	export default {
		name: 'downloadTipWx',
		//props: ['propsA', 'propsB'],
		props: {
			title: {
				type: String,
				required: false,
				default: 'Alert'
			}
		},
		components: {
			backdrop
		},
		data() {
			return {
//				isShow: this.show
				//title: this.title
			}
		},
		computed: {
			isShow() {
				console.log('downloadTipWx.vue == ',this.$store.state.show)
				return this.$store.state.show
			}
		},
		methods: {
			// 禁止滑动
			forbidSlide: function(e) {
				e.preventDefault();
				return false;
			},
			// 点击关闭弹窗
			close: function() {
				this.$store.state.show = false;
			},
//			// 点击关闭弹窗
//			isShowFinal: function() {
//				this.show = false;
//			},
			// 判断是否是安卓
			isAndroid: function() {
				if(env.os.isAndroid) {
					return true;
				}
			},
			// 点击立即下载
			downloadAppBtn: function() {
				alert('taofen8-master://wl/?id=' + encodeURIComponent(window.location.href) + '&p=' + this.title);
				return;
				downloadApp({
					notAwake: true,
					awakeUrl: 'taofen8-master://wl/?id=' + encodeURIComponent(window.location.href) + '&p=' + this.title
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../css/fontsize.scss";
</style>

<style lang="scss" scoped>
	@import "../css/functions.scss";
	.modal {
		width: px2rem(512);
		height: auto;
		max-height: 100%;
		padding-bottom: px2rem(80);
		position: fixed;
		z-index: 1001;
		top: px2rem(142);
		left: 50%;
		display: none;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		text-align: center;
		color: #333;
		border-radius: px2rem(8);
		background-color: #fff;
		-webkit-overflow-scrolling: touch;
	}
	
	.modal>.modal-header {
		padding-top: px2rem(64);
		font-weight: normal;
		line-height: 1.8;
	}
	
	.modal>.modal-body {
		padding: px2rem(64) 0 px2rem(32);
		line-height: 1;
		color: #666;
	}
	
	.modal>.modal-body>.divide {
		box-sizing: border-box;
		width: px2rem(236);
		height: px2rem(4);
		margin: 0 auto px2rem(20);
		border: px2rem(2) solid #ddd;
	}
	
	.modal>.modal-body>.icon {
		width: px2rem(140);
		height: px2rem(140);
		margin: px2rem(32) auto 0;
		border-radius: px2rem(8);
	}
	
	.modal>.modal-footer>.btn {
		width: px2rem(400);
		height: px2rem(88);
		line-height: px2rem(88);
		display: inline-block;
		color: #f4436d;
		border: px2rem(2) solid #f4436d;
		border-radius: px2rem(50);
	}
	
	.modal>.arrow {
		width: px2rem(74);
		height: px2rem(68);
		position: absolute;
		top: - px2rem(104);
		right: - px2rem(36);
	}
	
	.modal>.close {
		width: px2rem(40);
		height: px2rem(40);
		position: absolute;
		bottom: - px2rem(80);
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
</style>