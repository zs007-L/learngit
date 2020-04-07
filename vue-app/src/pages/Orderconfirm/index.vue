<template>
    <div class="pages-wrapper">
        <div class="header-box">
            <div class="header">
                <LenovoHeader></LenovoHeader>
            </div>
        </div>
        <div class="content">
            <!--地址-->
            <div class="address-box" @click="$router.push('../address/?reference=orderconfirm')" v-if="isAdd">
                <div class="full-phone">
                    <span class="goods">收货人：</span>
                    <span class="name" v-text="address.receiveName"></span>
                    <span class="phone" v-text="address.receivePhone"></span>
                </div>
                <div class="goods-address-box">
                    <span class="goods-address">收货地址：</span>
                    <span class="detailed" v-text="`${address.receiveRegon + address.receiveDetail}`"></span>
                </div>
            </div>
            <div class="empty" @click="$router.push('../address/?reference=orderconfirm')" v-if="isShow">
                <img src="./add.png" alt="">
                <span>新增收货地址</span>
            </div>
            <div class="empty-t">
                <img src="./dizhi.png" >
            </div>
            <div class="bc-di">
                <img src="./dibu.png" alt="">
            </div>
            <div class="right-arrow">
                <img src="./1.png" alt="">
            </div>
            <div class="left-address">
                <img src="./address.png" alt="">
            </div>
            <!--支付方式-->
            <div class="payment-box">
                <div class="payment">
                    <span class="mode">支付方式</span>
                    <span class="on-line">在线支付</span>
                </div>
            </div>
            <!--配送-->
            <div class="delivery-box">
                <div class="delivery-address">
                    <ul class="list">
                        <li v-for="(item, i) in list" :key="item.id">
                            <div><img :src="item.avatar" alt=""></div>
                            <div class='describe-box'>
                                <p class='product-name' v-text="item.name"></p>
                                <p class='remark ellipsis' v-text="item.remark"></p>
                                <span class='product-price-box'>￥<em class='product-price' v-text="item.price"></em></span>
                                <span class='rt'>x<em class='product-count' v-text="item.count"></em></span>
                            </div>
                        </li>
                    </ul>
                    <div class="delivery">
                        <span>配送</span>
                        <span>快递配送</span>
                    </div>
                </div>
            </div>
            <!--优惠-->
            <div class="discount-box">
                <ul>
                    <li class="invoice">
                        <span>发票</span>
                        <span class="red">电子 <em>(个人)</em></span>
                    </li>
                    <li class="coupon">
                        <span>优惠券</span>
                        <img src="./1.png" alt="">
                        <span class="choice">请选择优惠券</span>
                    </li>
                </ul>
            </div>
            <!--订单备注-->
            <div class="order-box" >
                <p>订单备注</p>
                <div>
                    <textarea class="input" placeholder="给商家留言，100字以内"></textarea>
                    <textarea class="service" placeholder="客户经理编码"></textarea>
                </div>
            </div>
            <!--商品金额-->
            <div class="money-box">
                <ul>
                    <li>
                        <span>商品金额</span>
                        <span >￥<em class="actual" v-text="account">0.00</em></span>
                    </li>
                    <li>
                        <span>优惠</span>
                        <span class="rate">￥0.00 </span>
                    </li>
                    <li>
                        <span>运费</span>
                        <span class="freight">￥0.00</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <div class="price-box">
                <p class="real">实付款: ￥<span v-text="account">0.00</span></p>
                <p class="province">节省了: <span>￥0.00</span></p>
            </div>
            <div class="btn-box">
                <button @click="submission">提交订单</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';

    export default {
        name: "index",
        components: {LenovoHeader},
        data() {
            return {
                id: sessionStorage.getItem('settlementIds'),
                list: [],
                isAdd: false,
                isShow: true,
                address: {},
                totalPrice: 0,
                addressId: window.location.href.split('?')[1] ? parseInt(window.location.href.split('?')[1].split('=')[1]) : 0
            };
        },
        computed: {
            account() {
                let result = 0;
                this.list.forEach(item => {
                    result += item.price * item.count;
                });
                this.totalPrice = result;
                return result;
            }
        },
        methods: {
            submission() {
                if(this.addressId === 0) {
                    alert('地址不能为空！');
                    return;
                } else {
                    let ids = JSON.parse(this.id).join(',');
                    this.$http({ url: '/order/confirm', data: {jsonStr: JSON.stringify({ ids, account: this.totalPrice, addressId: this.addressId })}})
                        .then(orderID => this.$router.push(`/pay?orderId=${ orderID }&account=${ this.account }`));
                }
            },
            displayHide() {
                if(this.addressId === 0) {
                    this.isShow = true;
                    this.isAdd = false;
                } else {
                    this.isAdd = true;
                    this.isShow = false;
                }
            }
        },
        created() {
            this.$http({ url: '/cart/infor', data: {jsonStr: this.id}})
                .then(data => {
                    this.list = data;
                });
            this.$http({ url: this.addressId === 0 ? '/address/getdefault' : `/address/getmodel/${ this.addressId }`, method: 'get'})
                .then(data => {
                    this.address = data;
                    this.displayHide();
                })
        }
    }
</script>

<style scoped>
    .pages-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f7f7f7;
    }
    .header-box {
        flex-shrink: 0;
        height: 45px;
    }
    .header {
        width: 100%;
        height: 45px;
        background-color: #FFFFFF;
        border-bottom: 1px solid #eaeaea;
        position: fixed;
        top: 0;
        z-index: 1000;
    }

    .header>ul {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }

    .header>ul>li {
        height: 45px;
        line-height: 45px;
    }

    .header>ul>li>h4 {
        font-weight: normal;
        font-size:20px;
    }
    .header>ul>li>a>.return {
        width: 35px;
        margin-top: 5px;
    }
    .header>ul>.open-box {
        width: 20px;
    }

    /*内容*/
    .content {
        flex-grow: 1;
        position: relative;
    }
    .content>.address-box {
        height: 96px;
        padding: 0 10px;
        background-color: #FFFFFF;
    }
    .content>.address-box>.full-phone {
        height: 45px;
        line-height: 45px;
        padding: 0 32px;
        font-weight: 800;
    }
    .content>.address-box>.full-phone>span {
        font-size: 16px;
        color: #000;
    }
    .content>.address-box>.full-phone>span.name {
        color: #333;
    }
    .content>.address-box>.full-phone>span.phone {
        float: right;
    }
    .content>.address-box>.goods-address-box {
        padding: 0 32px;
        color: #4a4a4a;
        font-size: 15px;
    }
    .content>.address-box>.goods-address-box>span.detailed {
        color: #333333;
    }
    .content>.empty {
        height: 96px;
        text-align: center;
        line-height: 90px;
        background-color: #FFFFFF;
    }
    .content>.empty>img {
        width: 15px;
    }
    .content>.empty-t {
        margin-top: -15px;
        display: none;
    }
    .content>.empty-t>img {
        width: 100%;
    }
    .content>.bc-di {
        margin-top: -15px;
    }
    .content>.bc-di>img {
        width: 100%;
    }
    .content>.right-arrow {
        position: absolute;
        right: 10px;
        top: 68px;
    }
    .content>.right-arrow>img {
        width: 20px;
        height: 20px;
    }
    .content>.left-address {
        position: absolute;
        top: 56px;
        left: 10px;
    }
    .content>.left-address>img {
        width: 27px;
    }
    .content>.payment-box {
        background-color: #FFFFFF;
    }
    .content>.payment-box>.payment {
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        height: 54px;
        line-height: 54px;
    }
    .content>.payment-box>.payment>.mode {
        color: #4a4a4a;
    }
    .content>.payment-box>.payment>.on-line {
        color: #333333;
        font-weight: 800;
    }

    .content>.delivery-box {
        padding: 0 18px;
        background-color: #FFFFFF;
        margin-top: 10px;
    }

    .content>.delivery-box>div>.delivery {
        height: 54px;
        line-height: 54px;
        font-size: 16px;
        color: #4A4A4A;
        display: flex;
        justify-content: space-between;
    }
    .content>.delivery-box>.delivery-address>ul.list {
        padding: 10px;
    }

    .content>.delivery-box>.delivery-address>ul.list>li {
        display: flex; padding-bottom: 10px;
    }

    .content>.delivery-box>.delivery-address>ul.list>li>div>img {
        width: 80px; flex-shrink: 0;
    }
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box {
        font-size: 14px; flex-grow: 1; overflow: hidden;
        margin-left: 10px;
    }
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box .product-name {
        font-weight: bold; color: #333333;
    }
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box>.remark {
        font-size: 12px; padding: 10px 0;
    }
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box .product-price,
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box>.product-price-box{
        font-size: 20px; color: #F4364C;
        margin-top: 10px;
        font-style: normal;
    }
    .content>.delivery-box>.delivery-address>ul.list>li>.describe-box .product-count {
        margin-top: 10px;
        font-style: normal;
    }

    .content>.discount-box>ul {
        margin-top: 10px;
    }
    .content>.discount-box>ul>li {
        height: 54px;
        background-color: #FFFFFF;
        line-height: 54px;
        padding: 0 18px;
        color: #4a4a4a;
        font-size: 15px;
    }
    .content>.discount-box>ul>li.invoice {
        display: flex;
        justify-content: space-between;
    }
    .content>.discount-box>ul>li>.red {
        color: #F4364C;
        font-weight: 800;
    }
    .content>.discount-box>ul>li em {
        font-style: normal;
        color: #333333;
    }
    .content>.discount-box>ul>li>span.choice {
        color: #808080;
        float: right;
    }
    .content>.discount-box>ul>li>img {
        width: 20px;
        height: 20px;
        margin-top: 18px;
        float: right;
    }

    .content>.order-box {
        margin-top: 10px;
        background-color: #FFFFFF;
        padding-top: 15px;
    }
    .content>.order-box>p,
    .content>.order-box>div {
        padding: 0 18px;
    }
    .content>.order-box>div {
        text-align: center;
    }
    .content>.order-box .input {
        width: 360px;
        height: 66px;
        outline: none;
        background-color: #f7f7f7;
        margin: 10px 0;
        border: none;
        border-radius: 10px;
        padding: 13px;
        resize: none;
    }
    .content>.order-box  .service {
        margin: 15px 0;
        background-color: #f7f7f7;
        border-radius: 10px;
        padding: 13px;
        outline: none;
        height: 20px;
        width: 360px;
        border: none;
        resize: none;
    }
    ::placeholder {
        color: #CCCCCC;
        font-size: 16px;
    }
    .content>.money-box {
        margin-top: 10px;
        padding-bottom: 55px;
    }
    .content>.money-box>ul {
        padding: 0 18px;
    }
    .content>.money-box>ul>li {
        height: 40px;
        line-height: 40px;
        color: #4a4a4a;
        display: flex;
        justify-content: space-between;
    }
    .content>.money-box>ul>li>.rate,
    .freight {
        color: #F4364C;
        font-weight: 800;
    }
    .content>.money-box>ul>li>span {
        font-weight: 800;
    }

    .content>.money-box>ul>li .actual {
        color: #000;
        font-style: normal;
        font-weight: 800;
    }


    /*页脚*/
    .footer {
        height: 55px;
        flex-shrink: 0;
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #FFFFFF;
        display: flex;
        justify-content: flex-end;
    }
    .footer >.price-box {
        margin-right: 10px;
        line-height: 25px;
        text-align: right;
    }
    .footer >.price-box>p>span {
        color: #F4364C;
        font-size: 18px;
    }
    .footer >.price-box>.province>span{
        font-size: 15px;
        font-weight: 800;
    }
    .footer >.price-box>.real {
        font-weight: 800;
    }
    .footer >.price-box>.province {
        font-size: 13px;
        color: #333333;
    }

    .footer >.btn-box>button {
        height: 55px;
        width: 115px;
        background-color: #F4364C;
        color: #FFFFFF;
        font-size: 20px;
    }
</style>