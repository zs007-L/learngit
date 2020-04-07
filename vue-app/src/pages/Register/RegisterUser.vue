<template>
    <div>
        <div class="register-box">
            <div>
                <input class="name" type="text" placeholder="请输入手机号/用户名" v-model="registerInfo.name">
            </div>
            <div>
                <input class="pwd" type="password" placeholder="请输入密码" v-model="registerInfo.pwd">
            </div>
            <button class="register" @click="register">注册</button>
            <button class="btn-register" @click="$router.push('/login')">已有账号？点此登录注册</button>
            <div class="register-title">
                <router-link to="" class="pwd">企业用户注册</router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "RegisterUser",
        data() {
            return {
                registerInfo: { name: '', pwd: '' },
            };
        },
        methods: {
            register() {
                this.$http({ url: '/user/register/infor', data: { name: this.registerInfo.name }})
                    .then(results => {
                        if(results[0]) {
                            alert('用户名已存在，请重新输入');
                            this.registerInfo.name = '';
                            this.registerInfo.pwd = '';
                        } else if(this.registerInfo.name !== '' && this.registerInfo.pwd !== ''){
                            this.$http({ url: '/user/register', data: { name: this.registerInfo.name, pwd: this.registerInfo.pwd }})
                                .then(() => {
                                    alert('注册成功！');
                                    this.$router.push('/login');
                                })
                        } else return alert('用户名和密码不能为空!');
                    })
            }
        }
    }
</script>

<style scoped>
    .register-box {
        width: 300px;
        margin: 0 auto;
    }
    .register-box>div {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #eee;
    }
    .register-box>div>input {
        width: 100%;
        height: 100%;
    }
    ::placeholder {
        font-size: 16px;
        color: #6D6D6D;
    }
    .register-box {
        padding: 0 58px;
    }
    .register{
        display: block;
        width: 100%;
        height: 45px;
        margin: 0 auto;
        background-color: #e22319;
        margin-top: 10px;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 16px;
    }
    .btn-register {
        display: block;
        width: 100%;
        height: 45px;
        margin: 15px auto 0;
        border-radius: 5px;
        border: 1px solid #808080;
    }
    .register-box>.register-title {
        border-bottom: none;
        font-size: 14px;
        color: #424242;
        margin-top: 18px;
        text-align: right;
    }
</style>