<template>
    <div class="right-wrapper">
        <img :src="avatar" alt="">
        <ul class="list">
            <li v-for="item in list" :key="item.id">
                <h3 v-text="item.name"></h3>
                <ul class="list2 clearfix">
                    <li v-for="item2 in list2.filter(temp => temp.fid === item.id)" :key="item2.id">
                        <router-link :to="`/list/${ item2.id }`">
                            <img :src="item2.avatar" alt="">
                            <span v-text="item2.name"></span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Right",
        props: ['avatar', 'list', 'list2']
    }
</script>

<style scoped>
    .right-wrapper {}
    .right-wrapper>img {
        width: 100%;
    }
    .list>li>h3 {
        font-size: 12px;
        color: #333;
        padding: 4px 12px;
        font-weight: normal;
    }
    .list>li>ul.list2 {
        display: flex;
        flex-wrap: wrap;
    }
    .list>li>ul.list2>li {
        width: 28%;
        padding: 4px 8px;
        text-align: center;
    }
    .list>li>ul.list2>li>a { }
    .list>li>ul.list2>li>a>img {
        width: 100%;
    }
    .list>li>ul.list2>li>a>span {
        color: #999;
        font-size: 12px;
    }
</style>