<template>
    <div class="list-wrapper">
        <ul class="list">
            <li>
                <router-link to="">
                    <img src="../assets/lift.png" alt="" class="return" @click.prevent="$router.back()">
                </router-link>
            </li>
            <li>
                <h4 v-text="$route.meta.title"></h4>
            </li>
            <li>
                <router-link to="">
                    <img src="../assets/shenglue.png" alt="" class="btn-open">
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped>
    .list-wrapper {
        width: 100%;
        position: fixed;
        top: 0;
        height: 50px;
        z-index: 1000;
    }
    ul.list {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        background-color: #e8e8e8;
    }
    ul.list>li {
        height: 45px;
        line-height: 45px;
    }
    ul.list>li>h4 {
        font-weight: normal;
    }
    ul.list>li>a>.return {
        width: 35px;
        margin-top: 5px;
    }
    ul.list>li>a>.btn-open {
        width: 20px;
        margin-top: 12px;
    }
    #open {
        height: 40px;
        background-color: rgba(255,255,255,0.8);
        text-align: center;
        line-height: 40px;
        font-size: 12px;
    }
    #open>a {
        display: inline-block;
        width: 70px;
        color: #6d6d6d;
    }
    #open>a>img {
        width: 16px;
        vertical-align: middle;
        margin-top: -5px;
    }
</style>