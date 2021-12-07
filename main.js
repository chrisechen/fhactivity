import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import 'weapp-cookie'
import api from './api/api'
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$api', {
	value: api
})

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
