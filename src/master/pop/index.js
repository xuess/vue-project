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
		show: false
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