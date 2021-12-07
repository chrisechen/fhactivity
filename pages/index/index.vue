<template>
	<view class="test-txt">
		这里是{{msg}}
		<hello-child></hello-child>
		<button @click="jumpActivity">跳转</button>
	</view>
</template>

<script>
	import { cookieStorage, localStorage} from 'common/storage'
	import helloChild from '@/components/home-child/home-child.vue'
	import { SET_USER_INFO } from 'store/mutations/type'
	import {mapMutations} from 'vuex'
	export default {
		components:{
			helloChild
		},
		data() {
			return {
				msg: 'hello world'
			};
		},
		onLoad(options) {
			this.getTest()
			this.getTest2()
			localStorage.set('testStorage', 11234) 
			console.log(localStorage.get('testStorage'))
			
			cookieStorage.set('testCookie', 'wxmini')  //cookie应该不怎么用的上，一般用localstorage即可
			console.log(cookieStorage.get('testCookie'))
			
			//vuex
			this.set_user_info({
				name: 'chrisechen',
				age: 27
			})
		},
		methods: {
			...mapMutations({
				set_user_info: SET_USER_INFO
			}),
			async getTest() {
				const params = {
					agentCode: "720020078",
					corpCode: "ff5a67337b6611e89feafa163eb3e537",
					groupIds: ["df87fd30611543639e3dd643a7614891"],
					innerdeptCode: "1004003007001",
					pageNum: 1,
					pageSize: 1,
					platformCode: "12",
					status: ""
				}
				const res = await this.$api.test.getDemoData(params)
				console.log(res, '接口请求值')
			},
			//getTest2这种写法也可，但是推荐使用async await写法,代码结构更清晰
			getTest2() {
				const params = {
					agentCode: "720020078",
					corpCode: "ff5a67337b6611e89feafa163eb3e537",
					groupIds: ["df87fd30611543639e3dd643a7614891"],
					innerdeptCode: "1004003007001",
					pageNum: 1,
					pageSize: 1,
					platformCode: "12",
					status: ""
				}
				this.$api.test.getDemoData(params).then((res) => {
					console.log(res, '接口请求值2')
				}).catch(() => {
					
				})
			},
			jumpActivity() {
				uni.navigateTo({
					url: '/packageActivity/wheel/wheel'
				})
			}
		}
	}
</script>

<style lang="scss">
.test-txt{
	color: red;
}
.dop {
	margin: 40rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #248AFD;
	color: #fff;
}
</style>
