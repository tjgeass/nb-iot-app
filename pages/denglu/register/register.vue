<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<view class="content-tab">
					<text class="title">账</text>
					<text class="title">号</text>
				</view>
				<input type="text" v-model="username" placeholder="请输入账号" :disabled="true">
			</view>
			<view class="input-row border">
				<view class="content-tab">
					<text class="title">旧</text>
					<text class="title">密</text>
					<text class="title">码</text>
				</view>
				<input type="text" password="true" v-model="pwdForm.old_password" placeholder="请输入密码">
			</view>
			<view class="input-row border">
				<view class="content-tab">
					<text class="title">新</text>
					<text class="title">密</text>
					<text class="title">码</text>
				</view>
				<input type="text" password="true" v-model="pwdForm.password" placeholder="请输入密码">
			</view>
			<view class="input-row">
				<text class="title">确认密码</text>
				<input type="text" password="true" v-model="pwdForm.repassword" placeholder="请输入确认密码">
			</view>
		</view>
		<view class="btn-row">
			<button :loading="loading" type="primary" class="primary" @tap="bindRegister">注册</button>
		</view>		     
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		computed: {
			...mapGetters(['username','nickname','avatar','mobile']),
		},
		data() {
			return {
				account: '',
				pwdForm:{
					old_password:'',
					password: '',
					repassword: '',
				},
				loading: false,
			};
		},
		methods:{
			bindRegister(){
				if (this.loading) {
					return;
				}
				//demo账号禁止修改密码
				if(this.username == 'demo'){
					uni.showToast({
						icon: 'none',
						title: 'DEMO账号不能修改密码!'
					});
					return;
				}
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.pwdForm.old_password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码长度小于6位!'
					});
					return;
				}
				if (this.pwdForm.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '新密码长度小于6位!'
					});
					return;
				}
				if (this.pwdForm.repassword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '确认密码长度小于6位!'
					});
					return;
				}
				if (this.pwdForm.password != this.pwdForm.repassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不同!'
					});
					return;
				}
				this.loading = true;
				this.$store
					.dispatch("UpdateSelf", this.pwdForm)
					.then(response => {
						this.loading = false;
						uni.showToast({
							icon: 'none',
							title: '修改成功!'
						});
						setTimeout(() => {
							this.logout();
						}, 100);
						
					})
					.catch(() => {
						this.loading = false;
					});
			},
			logout(){
				this.$store
					.dispatch("LogOut")
					.then(() => {
						//this.loading = false;
						uni.reLaunch({
							url: '/pages/denglu/login/login',
						});
					})
					.catch(() => {
						//this.loading = false;
					});
			}
			
		}
	}
</script>

<style>
	@import '../../../common/denglu.scss';
	
	.content-tab{
		display: flex;
		width: 4em;
		justify-content:space-between;
	}
	.input-row input{
		margin-left: 15upx;
	}
	.title{
		text-align: justify;
	}
</style>
