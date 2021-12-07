<template>
	<view class="wheel">
		<image class="wheel-back-img"
			src="https://fhrons.funzg.net/attachment/images/1/2021/05/tn8JLUd4KdUtJ448t8jTLV6zJzdLLF.png"
			mode="widthFix"></image>
		<view class="wheel-wrap">
			<image :animation="animationData" class="wheel-img" src="https://dop-pro-1251973116.file.myqcloud.com/upload/common/kyc/wheel.png" mode=""></image>

			<image class="wheel-play" src="https://dop-pro-1251973116.file.myqcloud.com/upload/common/kyc/play.png" mode="" @click="getRandom"></image>
		</view>
	</view>
</template>

<script>
	import {
		tools_decrypt
	} from '@/common/tools/index.js'
	export default {
		data() {
			return {
				nowNum: 0,
				totalNum: 8,
				awardIndex: 0,
				animationData: null,
				canMove: true,
			};
		},
		onLoad() {
			
		},
		methods: {
			getRandom() {
				if (!this.canMove) {
					return
				}
				this.canMove = false
				this.awardIndex = Math.floor(Math.random() * 9)
				this.wheelMove()
				console.log(this.awardIndex)
			},
			wheelMove() {
				this.nowNum++
				let that = this
				// let animationInit = wx.createAnimation({ duration: 0 });
				// that.animationInit = animationInit;
				// animationInit.rotate(0).step();
				// this.animationData = animationInit.export()

				// 旋转抽奖
				let animationRun = wx.createAnimation({
					duration: 4000,
					timingFunction: 'ease',
				});
				that.animationRun = animationRun;
				if (Number(that.awardIndex) > 1000) {
					animationRun.rotate(360 * 5 * that.nowNum + (360 / that.totalNum)).step();
				} else {
					animationRun.rotate(360 * 5 * that.nowNum + that.awardIndex * (360 / that.totalNum)).step();
				}
				that.animationData = animationRun.export()
				setTimeout(() => {
					this.canMove = true
				}, 4000)
			}
		}
	}
</script>

<style lang="scss">
	.wheel {
		width: 100vw;
		height: 100vh;
		background: #fff;
		overflow: hidden;

		.wheel-back-img {
			width: 100%;
		}

		.wheel-wrap {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 9;
			width: 538rpx;
			height: 538rpx;

			.wheel-img {
				width: 538rpx;
				height: 538rpx;
			}

			.wheel-play {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				z-index: 3;
				width: 208rpx;
				height: 228rpx;
			}

			.wheel-play-btn {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				z-index: 3;
				width: 208rpx;
				height: 228rpx;
				background: url('https://fhrons.funzg.net/attachment/images/1/2021/06/jmd57gl7X655ypqrT5G5XRmY2q5xdi.png') no-repeat;
				background-size: 100% 100%;
				border: none;
				outline: none;

				&::after {
					border: none;
					outline: none;
				}
			}
		}
	}
</style>
