<template>
	<div id="app">
		<go-top></go-top>
		<download-tip-wx :title="title"></download-tip-wx>
		<!--<backdrop :show="isShow" @close="isShowFinal"></backdrop>-->

		<button @click="openPop">点我打开弹窗</button>
	</div>
</template>

<script>
	import goTop from 'components/goTop'
	import backdrop from 'components/backdrop'
	import downloadTipWx from 'components/downloadTipWx'
	import { getUrlParam } from 'js_libs/util';
	export default {
		name: 'app',
		components: {
			goTop: goTop,
			downloadTipWx: downloadTipWx,
			backdrop: backdrop
		},
		data() {
			return {
//				isShow: false,
				title: "淘金农场"
			}
		},
		computed: {
			isShow() {
				console.log('app.vue == ',this.$store.state.show)
				return this.$store.state.show
			}
		},
		methods: {
//			isShowFinal: function() {
//				console.log('close');
//
//				this.$store.state.show = false;
//			},
			openPop() {
				this.$store.state.show = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	button {
		font-size: 24px;
	}
</style>