<template>
	<div id="app">
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->
			<swiper-slide>I'm Slide 1</swiper-slide>
			<swiper-slide>I'm Slide 2</swiper-slide>
			<swiper-slide>I'm Slide 3</swiper-slide>
			<swiper-slide>I'm Slide 4</swiper-slide>
			<swiper-slide>I'm Slide 5</swiper-slide>
			<swiper-slide>I'm Slide 6</swiper-slide>
			<swiper-slide>I'm Slide 7</swiper-slide>
			<!-- 这是轮播的小圆点 -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
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
	import { getUrlParam } from 'js_libs/util';
	import Env from 'js_libs/Env';
	import commoncss from 'css_libs/common.scss';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	console.log(getUrlParam)
	console.log(env)

	export default {
		name: 'app',
		components: {
			swiper,
			swiperSlide,
			hello: hello
		},
		data() {
			return {
				swiperOption: {
					//是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
					notNextTick: true,
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 30,
					onSlideChangeEnd: swiper => {
						//这个位置放swiper的回调方法  
						this.page = swiper.realIndex + 1;
						this.index = swiper.realIndex;
					}
				}
			}
		},
		//定义这个sweiper对象  
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		mounted() {
			//这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
			this.swiper.slideTo(0, 0, false);
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