<template>
    <div class="page-wrapper">
        <div class="header">
            <LenovoHeader></LenovoHeader>
        </div>
        <div class="content">
            <img src="./logo.png" alt="">
            <RegisterUser></RegisterUser>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';
    import RegisterUser from './RegisterUser.vue';

    export default {
        name: "index",
        components: { LenovoHeader, RegisterUser },
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