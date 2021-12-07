import wx from 'weixin-js-sdk'
import {wx_url} from '@/common/config.js'
import qs from 'qs'
import tip from './tip.js'
 
/**
 *分享
 * @param shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述
 */
export const commonShare = (shareTitle, shareUrl, shareImg, shareDesc) => {
    let url = location.href.split('#')[0];
    let params = {
    	url: window.location.href,
    }
	uni.request({
	    url: wx_url + 'getH5ToWxminiParams',
	    data: params,
	    success: ({data}) => {
			uni.config({
				appId: data.data.appId,
				timestamp: data.data.timestamp,
				nonceStr: data.data.noncestr,
				signature: data.data.signature,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
			});
			//分享到朋友圈
			uni.onMenuShareTimeline({
				title: shareTitle, // 分享标题
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					console.log('分享成功');
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					console.log('取消分享');
				}
			});
			//分享到微信好友
			uni.onMenuShareAppMessage({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				type: "", // 分享类型,music、video或link，不填默认为link
				dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
					console.log('分享成功');
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					console.log('取消分享');
				}
			});
			// 分享到QQ
			uni.onMenuShareQQ({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImg, // 分享图标
				success: function () {
					console.log('分享成功');
				},
				cancel: function () {
					console.log('取消分享');
				}
			});
			// 分享到腾讯微博
			uni.onMenuShareWeibo({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImg, // 分享图标
				success: function () {
					console.log('分享成功');
				},
				cancel: function () {
					console.log('取消分享');
				}
			});
			// 分享到QQ空间
			uni.onMenuShareQZone({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImg, // 分享图标
				success: function () {
					console.log('分享成功');
				},
				cancel: function () {
					console.log('取消分享');
				}
			});
	    },
		fail:function (err) {
			
		}
	});
};