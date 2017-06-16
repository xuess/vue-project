<template>
	<div class="message">{{ normalizedMsg }}</div>
</template>

<script>
	export default {
		// 声明 props
  		props: ['myMessage'],
		data() {
			return {
//				msg: 'Hello from vue-loader!'
			}
		},
		computed :{
			normalizedMsg: function () {
				//转成小写
//		    return this.myMessage.trim().toLowerCase()
			//翻转
		    return this.myMessage.split('').reverse().join('')
		  }
		}
	}
</script>

<style>
	.message {
		color: red;
	}
</style>