<template>
    <div class="page-wrapper hide-scroll-bar">
        <div class="header">
            <div class="header-title">
                <router-link to="../category"><img src="./images/back.png"></router-link>
                <input type="text" placeholder="请输入你要搜索的内容">
                <div class="delete"><img src="./images/delete.png"></div>
                <span>搜索</span>
            </div>
            <div class="login-box">
                <ul class="title-box">
                    <li>新品</li>
                    <li @click="toggleOrder('sale')">销量优先</li>
                    <li class="price" @click="toggleOrder('price')">价格<i class="top"><img
                            src="./images/top.png"></i><i class="do"><img src="./images/do.png"></i></li>
                    <li>筛选<i class="shaixuan"><img src="./images/shaixuan.png"></i></li>
                </ul>
            </div>
        </div>
        <div class="content hide-scroll-bar">
            <div class="scroll">
                <ul class="list">
                    <li class='list-item' v-for="item in list" :key="item.id">
                        <router-link :to="`/detail/${ item.id }`">
                            <img :src='item.avatar' class='avatar'/>
                            <div class='list-item-detail'>
                                <div class='list-item-detail-title'>
                                    <h4 class='ellipsis' v-text="item.name"></h4>
                                    <p class='ellipsis' v-text="item.remark"></p>
                                </div>
                                <div class='list-item-detail-info'>
                                    <span class='price' v-text="`￥${item.price}`">}</span><br>
                                    <span class='rate' v-text="`${item.rate}条评论`"></span>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <p class="info" v-text="tipInfo"></p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "list",
        data() {
            return {
                search: {
                    cid: 0,
                    name: '',
                    orderCol: 'price',
                    orderDir: true,
                    begin: 0,
                    pageSize: 6
                },
                list: [],
                hasMore: true,
                isLoading: false,
                isScroll: false
            };
        },
        computed: {
            tipInfo() {
                if(this.isLoading) return '正在加载';
                else if(this.hasMore) return '上拉加载更多';
                else if(this.isScroll) return '已到达底部';
                else return '暂无相关商品，敬请期待';
            }
        },
        methods: {
            getData(loadMore = false) {
                this.search.begin = loadMore ? this.list.length : 0;
                this.isLoading = true;
                this.$http({url: '/product/list', data: { jsonStr: JSON.stringify(this.search)}})
                    .then(data => {
                        this.isLoading = false;
                        this.list = this.list.concat(data);
                        if(data.length === 0) {
                            this.isScroll = true;
                            this.hasMore = false;
                        }
                    })
            },
            getScroll() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                let scrollHeight = document.documentElement.scrollHeight;
                if (scrollTop + clientHeight >= scrollHeight) { // 如果滚动到接近底部，自动加载下一页
                    this.getData(true);
                }
            },
            toggleOrder(orderCol) {
                if(this.search.orderCol === orderCol) this.search.orderDir = !this.search.orderDir;
                else this.search.orderCol = orderCol;
                this.list = [];
                this.getData();
            }
        },
        created() {
            this.search.cid = parseInt(this.$route.params.cid);
            this.getData();
        },
        mounted() {
            window.addEventListener('scroll', this.getScroll);
        }
    }
</script>

<style scoped>
    .page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 90px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 100;
    }

    .header > .header-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background: linear-gradient(-134deg, #F4364C 0%, #FF8200 97%);
        padding: 0 10px;
    }

    .header > .header-title > a > img {
        width: 25px;
    }

    .header > .header-title > input {
        width: 70%;
        border-radius: 20px;
        height: 30px;
        background: #FFFFFF url(./images/search1.png) no-repeat left;
        background-size: 30px 30px;
        padding-left: 30px;
        margin: 0 5px;
    }

    .header > .header-title > span {
        color: #FFFFFF;
        font-size: 14px;
    }

    .header > .header-title > .delete {
        position: relative;
    }

    .header > .header-title > .delete > img {
        width: 15px;
        position: absolute;
        bottom: -7px;
        right: 25px;
    }

    .header > .login-box {
        background-color: #FFFFFF;
    }

    .header > .login-box > .title-box {
        display: flex;
        justify-content: space-between;
    }

    .header > .login-box > .title-box > li {
        width: 25%;
        text-align: center;
        font-size: 13px;
        color: #808080;
        height: 40px;
        line-height: 40px;
    }

    .header > .login-box > .title-box > .price {
        position: relative;
    }

    .header > .login-box > .title-box > li > i {
        margin-left: 3px;
    }

    .header > .login-box > .title-box > li > i > img {
        width: 8px;
    }

    .header > .login-box > .title-box > li > .top {
        position: absolute;
        top: -7px;
    }

    .header > .login-box > .title-box > li > .shaixuan > img {
        width: 11px;
    }

    /* 内容 */
    .content {
        height: 100%;
        flex-grow: 1;
        margin-top: 110px;
    }

    .content ul.list > li > a {
        display: flex;
        color: #000;
    }

    .info {
        text-align: center;
    }

    .content ul.list > li > a .list-item-detail {
        width: 65%;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .content ul.list > li > a h4 {
        font-size: 13px;
        font-weight: normal;
    }

    .content ul.list > li > a p {
        font-size: 12px;
        color: #808080;
        overflow: hidden;
    }

    .content ul.list > li > a > .avatar {
        width: 120px;
    }

    .list-item-detail .price {
        font-size: 15px;
        color: #f4364c;
    }

    .rate {
        font-size: 12px;
        color: #808080;
    }
</style>