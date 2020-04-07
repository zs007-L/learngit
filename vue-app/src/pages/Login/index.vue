<template>
    <div class="page-wrapper">
        <div class="header">
            <LenovoHeader></LenovoHeader>
        </div>
        <div class="content">
            <img src="./logo.png" alt="">
            <LoginPwd></LoginPwd>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';
    import LoginPwd from './LoginPwd.vue';
    import Cookies from 'js-cookie';

    export default {
        name: "login",
        components: { LenovoHeader, LoginPwd },
        beforeRouteEnter(to, from, next) {
            Cookies.set('target', from.path);
            next(); //放行
        }
    }
</script>

<style scoped>
    .content {
        text-align: center;
        padding-top: 45px;
    }

    .content > img {
        width: 173px;
        height: 33px;
        margin: 40px 0 78px;
    }
</style>