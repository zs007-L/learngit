<template>
    <div class="login-pwd">
        <div class="login-box">
            <div>
                <input class="name" type="text" placeholder="请输入手机号/用户名" v-model="loginInfo.name">
            </div>
            <div>
                <input class="pwd" type="password" placeholder="请输入密码" v-model="loginInfo.pwd">
            </div>
            <button class="btn-sign btn-sign1" @click="login">登录</button>
            <button class="btn-register btn-register1"@click="$router.push('/register')">还没账号？立即注册</button>
            <div class="login-title">
                <router-link to="" class="phone">手机验证码快捷登录 ></router-link>
                <router-link to="" class="pwd">忘记密码?</router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "LoginPwd",
       data() {
            return {
                loginInfo: { name: '', pwd: ''}
            };
       },
        methods: {
            login() {
                this.$http({ url: '/user/login/pwd', data: this.loginInfo})
                    .then(token => {
                        this.$cookies.set('token', token);
                        this.$router.replace(this.$cookies.get('target') || '/home');
                        this.$cookies.remove('target');

                    })
            }
        },
    }
</script>

<style scoped>
    .login-box {
        width: 300px;
        margin: 0 auto;
    }

    .login-box > div {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #eee;
    }

    .login-box > div > input {
        width: 100%;
        height: 100%;
    }

    ::placeholder {
        font-size: 16px;
        color: #6D6D6D;
    }

    .btn-sign {
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

    .login-box > .login-title {
        margin-top: 15px;
        border-bottom: none;
        font-size: 13px;
    }

    .login-title > .phone {
        float: left;
        color: #424242;
    }

    .login-title > .pwd {
        float: right;
        color: #424242;
    }
</style>