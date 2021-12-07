
//存储前缀
import {storage_prefix} from 'common/config'

import {tools_verify, tools_uri} from 'common/tools'


export default new class Storage {

    constructor() {
		
    }

    set(key, value) {
        try {
            value = JSON.stringify(value)
        } catch (e) {
            value = value
        }

        uni.setStorageSync(tools_uri.encode(storage_prefix + key), tools_uri.encode(value))
    }

    get(key) {
        if (!key) {
            throw new Error('没有找到key。')
            return
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。')
            return
        }
        let value = uni.getStorageSync(tools_uri.encode(storage_prefix + key))

        if (value === null) {
            return {}
        }

        try {
            value = JSON.parse(tools_uri.decode(value))
        } catch (e) {
            value = {}
        }
        return value
    }

    remove(key) {
        uni.removeStorageSync(tools_uri.encode(storage_prefix + key))
    }
}