/*
 * @Author: chrisechen
 * @LastEditors: chrisechen
 * @Descriptption: 接口请求处理
 * @Date: 2021-09-11 16:14:30
 * @LastEditTime: 2021-09-11 16:14:30
 */
import tip from '@/utils/tip';
import {server_base_url} from '@/common/config/index.js';
import store from 'store';
let http = {};
let httpNum = 0;

http = (type, api, data) => {
	data = data && Object.keys(data).length ? data : {}
	if (httpNum <= 0) {
		tip.loading()
	}
	httpNum++;
	return new Promise((resolve, reject) => {
		let nowUrl = server_base_url + api
		uni.request({
			method: type,
		    url: nowUrl,
		    data: data,
		    success: (res) => {
				httpNum--;
				if (httpNum <= 0) {
					tip.loaded();
				}
				if(res.statusCode == 200) {
					resolve(res.data)
				} else {
					tip.alertDialog(res.statusCode + '错误，请稍后再试')
				}
		    },
			fail:function (err) {
				setTimeout(() =>{
					uni.showToast({
						title: '网络不流畅，请稍后再试',
						icon: 'none',
						duration: 2000,
					});
				},100)
				httpNum--;
				tip.loaded();
				reject(err)
			}
		});
		
	})
}
export default http;