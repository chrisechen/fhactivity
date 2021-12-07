import * as type from 'store/mutations/type';
import { storage_prefix } from 'common/config';

export default {
	//设置用户信息和是否登录
	[type.SET_USER_INFO](state, userInfo) {
		state.user_info = userInfo || {};
	}
};
