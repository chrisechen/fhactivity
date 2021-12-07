/*
 * @Author: chrisechen
 * @LastEditors: chrisechen
 * @Descriptption: vuex
 * @Date: 2021-09-11 17:20:10
 * @LastEditTime: 2021-09-11 17:20:10
 */
import Vue from 'vue';
import Vuex from 'vuex';

// 引入模块
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './states';

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});
