<template>
	<div class="backdrop" v-show="isShow" @click="close"></div>
</template>
<script>
	export default {
		name: 'backdrop',
		props: {
//			show: {
//				type: Boolean,
//				default: false,
//				required: true
//			}
		},
		computed: {
			isShow() {
				console.log('backdrop.vue == ',this.$store.state.show)
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
				this.$store.commit('updateShow', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.backdrop {
		z-index: 1000;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #000;
		opacity: 0.6;
	}
</style>