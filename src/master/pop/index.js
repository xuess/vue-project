/**
 * 作者：xuess
 * 时间：2017-06-22
 * 描述：测试页面
 * 最后修改时间:（有再写）
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
//new Vue({
//el: '#app',
//template: '<App/>',
//components: { App },
//render: h => h(App)
//})

const store = new Vuex.Store({
	state: {
		show: false,
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		},
		updateShow(state, val) {
			state.show = val;
		}
	},
	actions: {
		increment(context) {
			context.commit('increment')
		}
	}
})

const app = new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	},
	store,
	render: h => h(App)
})
