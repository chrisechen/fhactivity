/*
 * @Author: chrisechen
 * @LastEditors: chrisechen
 * @Descriptption: 测试接口
 * @Date: 2021-09-11 16:14:30
 * @LastEditTime: 2021-09-11 16:14:30
 */

import http from './index';

const getDemoData = (params) => http('post', `backend/athene-scrm-service/scrm/mArticle/selectListFront`, params);

let test = {
	getDemoData: getDemoData
}
export default test;