export default {
    namespaced: true,
    state: {
		userInfo: {},
		demoInfo: {}
    },
	getters: {
		getUserInfo: state => {
			return state.userInfo
		}
	},
    mutations: {
        setUserInfo(state, params) {
			state.userInfo = params
        },
		setDemoInfo(state, params) {
			state.demoInfo = params
		}
    },
    actions: {
        setUserInfo({commit}, params) {
            commit('setUserInfo', params)
        }
    }
};
