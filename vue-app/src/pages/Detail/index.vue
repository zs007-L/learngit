<template>
    <div class="page-wrapper">
        <div class="header">
            <img src="./houtui.png" class="back" @click="$router.go(-1)">
            <img src="./1.png" class="edit-back">
            <img src="./caidan.png" class="menu">
            <img src="./2.png" class="edit-menu">
        </div>
        <div class="content">
            <div class="banner">
                <ul>
                    <li v-for="(item, i) in banner" :key="item.id"><img :src="item" alt="" v-show="isIndex === i"></li>
                </ul>
                <div class="indicato"><span class="current-page" v-text="isIndex+1"></span>/<span class="total-page" v-text="banner.length"></span></div>
            </div>
            <div class="content-title-box">
                <div class="price-box">商城价:￥<span v-text="list.price"></span></div>
                <h4 class="title" v-text="list.name"></h4>
                <div class="remark" v-text="list.remark"></div>
            </div>
            <div class="count-box">
                <div>购买数量</div>
                <LenovoCount :count="count" @increase="increase()" @decrease="decrease()"></LenovoCount>
            </div>
            <br>
            <br>
            <br>
        </div>
        <div class="footer">
            <ul>
                <li><router-link to=""><div class="service"><img src="./kefy.png" ></div>客服</router-link></li>
                <li><router-link to=""><div class="collection"><img src="./shou.png" ></div>收藏</router-link></li>
                <li>
                    <router-link to="../cart">
                        <div class="shopp-cart">
                            <img src="./gouwu.png" >
                        </div>购物车
                        <span class="cart-tatal" v-show="isShowTotal" v-text="shoppCartCount"></span>
                    </router-link>
                </li>
                <li @click="joinCart"><router-link to="" class="join">加入购物车</router-link></li>
                <li><router-link to="" class="imme">立即购买</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoCount from '../../components/LenovoCount.vue';

    export default {
        name: "detail",
        components: { LenovoCount },
        data() {
            return {
                id: 0,
                list: [],
                banner: [],
                isIndex: 0,
                timr: 0,
                count: 1,
                isShowTotal: false,
                shoppCartCount: 0
            };
        },
        methods: {
            getData(id) {
                return this.$http({ url: `/product/model/${ id }`, method: 'get'});
            },
            scroll() {
                this.isIndex ++;
                if(this.isIndex === this.banner.length) {
                    this.isIndex = 0;
                }
            },
            timing() {
                this.timr = setInterval(this.scroll, 5000);
            },
            decrease() {    //  数量减
                if(this.count === 1) return;
                this.count = this.count - 1;
            },
            increase() {    // 数量加
                if (this.count === 5) return;
                this.count = this.count + 1;
            },
            cartCount() {   //  购物车数量
                if(this.$cookies.get('token')) {
                    this.$http ({ url: '/cart/total', method: 'get'})
                        .then(total => {
                            this.shoppCartCount = total;
                            if(total > 0) this.isShowTotal = true;
                        })
                }
            },
            joinCart() {
                this.$http({ url: '/cart/add', data: {jsonStr: JSON.stringify({ pid: this.id,count: this.count })}})
                    .then(() => {
                        alert('加入购物车成功！');
                        this.cartCount();
                    })
            }
        },
        created() {
            this.id = parseInt(this.$route.params.id);
            this.getData(this.id).then(model => {
                this.list = model;
                this.banner = model.banner.split(',');
            });
            this.timing();
            this.cartCount();
        },
        destroyed() {
            clearInterval(this.timr);
        },
    }
</script>

<style scoped>
    .page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    /* 头部 */
    .header {
        flex-shrink: 0;
        height: 40px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        background-color: rgba(255,255,255,0.5);
    }
    .header>img {
        width: 24px;
        margin-top: 8px;
        padding: 0 10px;
    }
    .header>.menu {
        float: right;
    }
    .edit-menu {
        float: right;
    }
    .edit-back,
    .edit-menu {
        display: none;
    }

    .content {}
    .content>.banner { position: relative }
    .content>.banner>ul>li>img { width: 100% }
    .content>.banner>.indicato {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .content>.banner>.indicato>span {
        font-size: 16px;
        color: #4A4A4A;
    }
    .content>.content-title-box { margin-left: 16px }
    .content>.content-title-box>.price-box {
        color: #F4364C;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .content>.content-title-box>.price-box>span { font-size: 24px }
    .content>.content-title-box>.title { font-size: 16px }
    .content>.content-title-box>.remark {
        margin-top: 10px;
        color: #4a4a4a;
        font-size: 12px;
    }
    .count-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 6px 0 6px 16px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        margin-top: 10px;
    }

    .footer {
        flex-shrink: 0;
        height: 48px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        box-shadow: 0 0 4px #8C8C8C;
    }
    .footer>ul {
        display: flex;
        width: 100%;
    }
    .footer>ul>li {
        width: 20%;
        height: 48px;
        text-align: center;
        line-height: 48px;
    }
    .footer>ul>li>a {
        font-size: 12px;
        color: #808080;
        position: relative;
    }
    .footer>ul>li>a>span.cart-tatal {
        position: absolute;
        left: 50%;
        top: 2px;
        background-color: #e2231a;
        color: #FFFFFF;
        font-size: 12px;
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        border-radius: 50%;
    }
    .footer>ul>li>a>div {
        width: 24px;
        height: 10px;
        margin: 0 auto;
    }
    .footer>ul>li>a>div>img {
        width: 24px;
    }
    .footer>ul>li>.join {
        background-color: #2a2a2a;
        border-top: 1px solid #2a2a2a;
    }
    .footer>ul>li>.imme,
    .footer>ul>li>.join {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #FFFFFF;
    }
    .footer>ul>li>.imme {
        background-color: #F4354E;
        border-top: 1px solid #F4354E;
    }
</style>