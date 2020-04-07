<template>
    <div class="page-wrapper">
        <div class="header">
            <LenovoHeader></LenovoHeader>
        </div>
        <div class="content">
            <div class="no-login" v-if="!isLogin">
                <img src="./nopro.jpg">
                <h3>您还没登录，快去登录吧</h3>
                <div class="btn-box">
                    <router-link to="../login">去登录</router-link>
                </div>
            </div>
            <div class="empty" v-else-if="list.length === 0">
                <img src="./nopro.jpg">
                <h3>购物车空空如也，快去购物吧</h3>
                <div class="btn-box">
                    <router-link to="../category">去逛逛</router-link>
                </div>
            </div>
            <ul class="list">
                <li v-for="(item, i) in list" :key="item.id">
                    <CartChecked :checked="item.checked1" @toggle="item.checked1 = !item.checked1" v-show="!isEdit"></CartChecked>
                    <CartChecked :checked="item.checked2" @toggle="item.checked1 = !item.checked2" v-show="isEdit"></CartChecked>
                    <router-link to="">
                        <img :src="item.avatar" alt="">
                        <div class="prduct-info">
                            <h3 class='ellipsis' v-text="item.name"></h3>
                            <p>有库存</p>
                            <div class='price-wrapper'>￥
                                <em class='price' v-text="item.price"></em>
                            </div>
                        </div>
                    </router-link>
                    <div class='count-wrapper clearfix'>
                        <LenovoCount :count="item.count" @decrease="decrease(item)" @increase="increase(item)"></LenovoCount>
                        <div class="operation">
                            <span class='choice'>选择服务</span>
                            <img src="./dele.png" alt="" class="delt" @click="remove(i)"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer" v-show="isLogin && list.length > 0 && !isEdit">
            <CartChecked :checked="isChecked1All" @toggle="toggleAllChecked1"></CartChecked>
            <div class="footer-nav">
                <div class="set-box">
                    <h6>实付款: <span class="actual" v-text="account"></span></h6>
                    <span>总额: <span class="total" v-text="account"></span></span>
                </div>
                <button class="btn-set" :class="{ disabled: totalNormal === 0}" :disabled="totalNormal === 0" @click="settlement">
                    去结算 <span class="total-normal" v-text="totalNormal > 0 ? `(${totalNormal})` : ''"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';
    import CartChecked from './CartChecked.vue';
    import LenovoCount from '../../components/LenovoCount.vue';

    export default {
        name: "cart",
        components: { LenovoHeader, CartChecked, LenovoCount },
        data() {
            return {
                isLogin: this.$cookies.get('token') ? true : false,
                list: [],
                isEdit: false
            };
        },
        computed: {
            //全选
            isChecked1All() {
                return this.list.every(item => item.checked1);
            },
            account() {
                //计算数量
                let result = 0;
                this.list.forEach(item => {
                    if(item.checked1) result += item.count * item.price;
                });
                return result;
            },
            //复选框
            totalNormal() {
                let result = 0;
                this.list.forEach(item => {
                    if(item.checked1) result += item.count;
                });
                return result;
            }
        },
        methods: {
            //全选
            toggleAllChecked1() {
                let flag = !this.isChecked1All;
                this.list.forEach(item => item.checked1 = flag);
            },
            //数量减
            decrease(item) {
                this.$http({ url: `/cart/decrease/${ item.id }`}).then(() => item.count = item.count - 1);
            },
            //数量加
            increase(item) {
                this.$http({ url: `/cart/increase/${ item.id }`}).then(() => item.count = item.count + 1);
            },
            //删除
            remove(i) {
                let id = this.list[i].id;
                if(!confirm('确定删除吗？')) return;
                this.$http({ url: `/cart/remove/${ id }`, method: 'get'})
                    .then(() => {
                        this.list.splice(i, 1);
                    });
            },
            settlement() {
                let ids = [];
                this.list.forEach(item => {
                    if(!item.checked2) ids.push(item.id);
                });
                sessionStorage.setItem('settlementIds', JSON.stringify(ids));
                this.$router.push('../orderconfirm');
            }
        },
        created() {
            if(this.isLogin) {
                this.$http({ url: '/cart/list'})
                    .then(data => {
                        data.forEach(item => {
                            item.checked1 = true;
                            item.checked2 = false;
                        });
                        this.list = data;
                    });
            }
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
        flex-shrink: 0;
        height: 50px;
    }

    .header > ul {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }

    .header > div > a {
        display: inline-block;
        width: 70px;
        color: #6d6d6d;
    }

    .header > div > a > img {
        width: 16px;
        vertical-align: middle;
        margin-top: -5px;
    }

    .header > ul > li {
        height: 45px;
        line-height: 45px;
    }

    .header > ul > li > a {
        vertical-align: middle;
    }

    .header > ul > li > h4 {
        font-weight: normal;
    }

    .header > ul > li > a > .return {
        width: 35px;
        margin-top: 5px;
    }

    .header > ul > li > a > .btn-open {
        width: 20px;
        margin-top: 12px;
    }

    .content {
        flex-grow: 1;
        padding-bottom: 60px;
    }

    .content > .empty,
    .no-login {
        text-align: center;
        margin-top: 50px;
    }

    .content > .empty > img,
    .no-login > img {
    }

    .content > .empty > h3,
    .no-login > h3 {
        font-size: 20px;
        color: #959595;
        font-weight: normal;
        margin: 20px 0;
    }

    .content > .empty > .btn-box > a,
    .no-login > .btn-box > a {
        display: inline-block;
        padding: 5px 20px;
        background-color: #e0524b;
        box-sizing: border-box;
        color: #FFFFFF;
        border-radius: 4px;
        font-size: 20px;
    }

    .content > .list > li {
        border-bottom: 1px solid #B2B2B2;
        padding: 30px 10px 20px;
        box-sizing: border-box;
        position: relative;
    }

    .content > .list > li > a {
        display: flex;
        color: #000;
        box-sizing: border-box;
        padding-left: 30px;
    }

    .content > .list > li > a > .prduct-info {
        overflow: hidden;
    }

    .content > .list > li > a > img {
        width: 90px;
    }

    .content > .list > li > a > .prduct-info > h3 {
        font-size: 14px;
        font-weight: normal;
    }

    .prduct-info > .price-wrapper {
        color: #e2231a;
        margin-top: 10px;
    }

    .prduct-info > .price-wrapper > em {
        font-style: normal;
    }

    .prduct-info > p {
        font-size: 12px;
        color: #797979;
        margin-top: 5px;
    }

    .count-wrapper {
        box-sizing: border-box;
        padding-left: 30px;
        margin-top: 10px;
    }

    .count-wrapper > .operation {
        float: right;
    }

    .count-wrapper > div > .choice {
        display: inline-block;
        width: 70px;
        height: 26px;
        border: 1px solid #B2B2B2;
        font-size: 12px;
        color: #797979;
        text-align: center;
        line-height: 26px;
        border-radius: 4px;
    }

    .count-wrapper > div > img {
        width: 22px;
        vertical-align: middle;
        margin-left: 10px;
    }


    .footer {
        flex-shrink: 0;
        background-color: #2e2e2e;
        height: 60px;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .footer-nav {
        height: 60px;
        padding-left: 30px;
    }

    .set-box {
        float: left;
        color: #797979;
        font-size: 12px;
    }

    .set-box > h6 {
        font-size: 14px;
        color: #FFFFFF;
    }

    .set-box > h6,
    .set-box > span {
        line-height: 25px;
        margin-left: 10px;
    }

    .footer-nav > button {
        float: right;
        display: inline-block;
        width: 100px;
        height: 100%;
        background-color: #E2231A;
        text-align: center;
        line-height: 60px;
        color: #FFFFFF;
        font-size: 14px;
    }

    .actual {
        font-size: 14px;
        font-weight: normal;
    }
</style>