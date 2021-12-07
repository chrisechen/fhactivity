import crypto from 'crypto';
//注意class和new class的区别，这个需要在调用的时候再new传值
export default class Decrypt {
	constructor(appId, sessionKey) {
		console.log('测试测试', appId, sessionKey)
		this.appId = appId
		this.sessionKey = sessionKey
	}

	//解密
	decryptData(encryptedData, iv) {
		// base64 decode
		var sessionKey = new Buffer(this.sessionKey, 'base64')
		encryptedData = new Buffer(encryptedData, 'base64')
		iv = new Buffer(iv, 'base64')
		try {
			// 解密
			var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
			// 设置自动 padding 为 true，删除填充补位
			decipher.setAutoPadding(true)
			var decoded = decipher.update(encryptedData, 'binary', 'utf8')
			decoded += decipher.final('utf8')
			decoded = JSON.parse(decoded)
		} catch (err) {
			throw new Error('Illegal Buffer')
		}
		if (decoded.watermark.appid !== this.appId) {
			throw new Error('Illegal Buffer')
		}
		return decoded
	}
}
