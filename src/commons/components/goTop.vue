<template>
	<!-- 返回顶部 -->
    <div id="JS_goTop" class="go_top" @click="goTop" v-show="isShow">
        <img src="https://img.alicdn.com/imgextra/i2/2296013456/TB2QcVJX1vB11BjSspnXXbE.pXa_!!2296013456.png" alt="返回顶部" />
    </div>    
</template>
<script>
    import _ from 'lodash';

    export default {
        name: 'goTop',
        data: function() {
            return {
                isShow: false
            };
        },
        mounted: function() {
            var vm = this;

            window.addEventListener('scroll', _.throttle(function() {
                var docScrollTop = window.pageYOffset;

                if (docScrollTop > 1000) {
                    vm.isShow = true;
                } else {
                    vm.isShow = false;
                }
            }, 100));
        },
        methods: {
            goTop:function() {
                window.scrollTo(0, 0)
            }
        }
    }
</script>

<style scoped>
.go_top {
    position: fixed;
    z-index: 9999;
    right: .625rem;
    bottom: 2.06rem;

    width: 1.09rem;
    height: 1.09rem;
}
</style>