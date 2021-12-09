/*
 * @Author: chrisechen
 * @LastEditors: chrisechen
 * @Descriptption: vuex
 * @Date: 2021-09-11 17:20:10
 * @LastEditTime: 2021-09-11 17:20:10
 */
import Vue from 'vue';
import Vuex from 'vuex';

//按模块引入
import user from './modules/user'

// 引入公共vuex
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './states';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		user
	},
	state,
	getters,
	actions,
	mutations
});
