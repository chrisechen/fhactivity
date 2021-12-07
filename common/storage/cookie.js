
//存储前缀
import {storage_domain, cookie_prefix} from 'common/config'

import {tools_verify, tools_uri} from 'common/tools'
import cookies from 'weapp-cookie'

/**
 * cookies操作类
 */
export default new class Cookie {

    /**
     * 构造函数
     */
    constructor() {
        this.prefix = cookie_prefix
    }


    /**
     * 根据key获取cookie的值
     * @param {string} key 键
     * @returns {object} 值
     */
    get (key) {
        if (!key) {
            throw new Error('没有找到key。')
            return
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。')
            return
        }
        let value = tools_uri.decode(cookies.get(cookie_prefix + key, storage_domain))
        try {
            value = JSON.parse(value)
        } catch (e) {
            value = {}
        }
        return value
    }

    /**
     * 设置cookies
     * @param key 键
     * @param value 值
     * @param options 选项
     * @returns {Cookie}
     */
    set (key, value) {
        cookies.set(cookie_prefix + key, tools_uri.encode(JSON.stringify(value)), {domain: storage_domain})
    }

    /**
     * 删除cookie
     * @param {string||array} keys 删除cookie的key
     * @returns {Cookie}
     */
    remove(key) {
        cookies.remove(cookie_prefix + key, storage_domain)
    }
}
