<template>
	<div id="app">
		<h1>hhhh</h1>
		<img src="./assets/logo.png">
		<hello></hello>
		<div class="hhh">
			<p>hhhhhhhhh</p>
		</div>
	</div>
</template>

<script>
	import hello from 'components/hello'
	import {getUrlParam} from 'js_libs/util';
	import Env from 'js_libs/Env';
	import commoncss from 'css_libs/common.scss';
	
	
	console.log(getUrlParam)
	console.log(env)
	
	export default {
		name: 'app',
		components: {
			hello: hello
		}
	}
</script>

<style lang="scss" scoped>
/*	@import '../commons/css/common.scss';*/
	@import "assets/main/main.css";
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
	.hhh {
		width: 500px;
		height: 500px;
		background-image: url(./assets/banner.jpg);
		p {
			text-align: center;
		}
	}
</style>