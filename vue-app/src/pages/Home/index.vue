<template>
    <div class="page-wrapper">
        <div class="header">
            <div class="top-nav">
                <router-link to="">
                    <img src="./logo.png">
                </router-link>
                <div class="nav-box">
                    <ul>
                        <li>
                            <router-link to="">商城<em class="red"></em></router-link>
                        </li>
                        <li>
                            <router-link to="">社区<em></em></router-link>
                        </li>
                        <li>
                            <router-link to="">服务<em></em></router-link>
                        </li>
                        <li>
                            <router-link to="">资讯<em></em></router-link>
                        </li>
                        <li>
                            <router-link to="">门店<em></em></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="serch-box">
                <router-link to="">
                    <img src="./fenle1.png">
                </router-link>
                <input type="text" placeholder="请输入搜索内容">
                <router-link to=""><img src="./xiaoxi.png"></router-link>
            </div>
        </div>
        <div class="content">            <!-- 轮播图 -->
            <div class="banner-box">
                <div class="banner" ref="banner">
                    <ul class="scroll">
                        <li><img src="./images/home-banner/9.jpg"></li>
                        <li><img src="./images/home-banner/1.jpg"></li>
                        <li><img src="./images/home-banner/2.jpg"></li>
                        <li><img src="./images/home-banner/3.jpg"></li>
                        <li><img src="./images/home-banner/4.jpg"></li>
                        <li><img src="./images/home-banner/5.jpg"></li>
                        <li><img src="./images/home-banner/6.jpg"></li>
                        <li><img src="./images/home-banner/7.jpg"></li>
                        <li><img src="./images/home-banner/8.jpg"></li>
                        <li><img src="./images/home-banner/9.jpg"></li>
                        <li><img src="./images/home-banner/1.jpg"></li>
                    </ul>
                    <ul class="indicator">
                        <li :class="{active:id===1}"><i></i></li>
                        <li :class="{active:id===2}"><i></i></li>
                        <li :class="{active:id===3}"><i></i></li>
                        <li :class="{active:id===4}"><i></i></li>
                        <li :class="{active:id===5}"><i></i></li>
                        <li :class="{active:id===6}"><i></i></li>
                        <li :class="{active:id===7}"><i></i></li>
                        <li :class="{active:id===8}"><i></i></li>
                        <li :class="{active:id===9}"><i></i></li>
                    </ul>
                </div>
            </div>
            <div class="list-box">
                <ul>
                    <li>
                        <router-link to=""><img src="./images/home-title/1.png">
                            <p>新品发布</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/2.png">
                            <p>小新铺子</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/3.png">
                            <p>拯救者联盟</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/4.png">
                            <p>Think家族</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/5.png">
                            <p>台式机</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/6.png">
                            <p>lenovo手机</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/7.png">
                            <p>智能</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/8.png">
                            <p>选件</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/9.png">
                            <p>服务</p></router-link>
                    </li>
                    <li>
                        <router-link to=""><img src="./images/home-title/10.png">
                            <p>更多</p></router-link>
                    </li>
                </ul>
            </div>
            <div class="lim-time-box">
                <div class="lim-time">
                    <span class="seckill">限时秒杀</span>
                    <span class="zero">0点场</span>
                    <!--					<span id="hour" class="time" :endTime></span>-->
                    <!--					<span id="minute" class="time" :startTime="new Date().getTime()"></span>-->
                    <!--					<span id="second" class="time"></span>-->
                    <span class="lower">下一场00点</span>
                </div>
                <ul class="item-wrap">
                    <li><img src="./images/1.jpg"><span>￥ 14999</span></li>
                    <li><img src="./images/2.jpg"><span>￥ 5199</span></li>
                    <li><img src="./images/3.jpg"><span>￥ 9999</span></li>
                </ul>
            </div>
            <div class="new-product">
                <div class="np-title">
                    <span>新品预约</span>
                </div>
                <ul class="item-wrap">
                    <li class="">
                        <img src="./images/4.jpg">
                        <span class="ellipsis">拯救者 Y9000X 英特尔酷睿i5 15.6英寸高性能标压轻薄笔记本</span>
                        <span>预约价<em>￥6999.00</em></span>
                    </li>
                    <li>
                        <img src="./images/4.jpg">
                        <span class="ellipsis">拯救者 Y9000X 英特尔酷睿i7 15.6英寸高性能标压轻薄笔记本</span>
                        <span>预约价<em>￥9699.00</em></span>
                    </li>
                    <li>
                        <img src="./images/4.jpg">
                        <span class="ellipsis">拯救者 Y9000X 英特尔酷睿i7 15.6英寸高性能标压轻薄笔记本</span>
                        <span>预约价<em>￥8299.00</em></span>
                    </li>
                </ul>
            </div>
            <div class="saoweihuo">
                <div class="swh-title">
                    <span>扫尾货</span>
                </div>
                <div class="swh-top">
                    <img src="./images/5.jpg" alt="">
                    <img src="./images/6.jpg" alt="">
                </div>
                <ul class="swh-btm">
                    <li>
                        <img src="./images/7.jpg">
                        <span class="ellrpsis">联想Z5 极光蓝 6GB+64GB</span>
                        <em>￥ 798</em>
                    </li>
                    <li>
                        <img src="./images/8.jpg">
                        <span class="ellrpsis">ThinkPad E480 英特尔酷睿i3 笔记本电脑 20KNA03PCD</span>
                        <em>￥ 3399.00</em>
                    </li>
                    <li>
                        <img src="./images/9.jpg">
                        <span class="ellrpsis">联想 小新平板 8英寸 8804F WIFI版 香槟金</span>
                        <em>￥ 1399</em>
                    </li>
                </ul>
            </div>
            <div class="a-layout"></div>
            <div class="smart-suggestion">
                <div class="sug-title">
                    <i></i>
                    <span>为你推荐</span>
                    <i></i>
                </div>
                <ul class="sug-item-wrap">
                    <li class="sug-item">
                        <img src="./images/11.jpg">
                        <span class="ellrpsis">联想Z6 Pro 8GB+128GB 黑色</span>
                        <em>￥ 1899.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/12.jpg">
                        <span class="ellrpsis">联想Z5 Pro GT 855版 6GB+128GB 碳纤黑</span>
                        <em>￥ 1798.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/13.jpg">
                        <span class="ellrpsis">联想Z5s 6GB+64GB 星夜灰</span>
                        <em>￥ 848.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/14.jpg">
                        <span class="ellrpsis">拯救者 Y7000 英特尔酷睿i5 15.6英寸游戏笔记本 黑色</span>
                        <em>￥ 5299.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/15.jpg">
                        <span class="ellrpsis">拯救者 Y7000P 2019 英特尔酷睿i7 15.6英寸专业电竞本 黑色</span>
                        <em>￥ 8999.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/16.jpg">
                        <span class="ellrpsis">ThinkPad X390 4G版 英特尔酷睿i5 笔记本电脑 20Q0A00BCD</span>
                        <em>￥ 6499.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/17.jpg">
                        <span class="ellrpsis">thinkplus自然光谱台灯智雅版</span>
                        <em>￥ 1899.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/18.jpg">
                        <span class="ellrpsis">ThinkPad X1 Carbon2019 LTE版英特尔酷睿i5笔记本电脑20QDA00PCD</span>
                        <em>￥ 9999.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/19.jpg">
                        <span class="ellrpsis">2019款 小新 Air 15 英特尔酷睿i7 15.6英寸超轻薄笔记本 轻奢灰</span>
                        <em>￥ 6217.00</em>
                    </li>
                    <li class="sug-item">
                        <img src="./images/20.jpg">
                        <span class="ellrpsis">ThinkPad E480 英特尔酷睿i5 笔记本电脑 20KNA001CD</span>
                        <em>￥ 4999.00</em>
                    </li>
                </ul>
            </div>
            <div class="yewei">
                <ul>
                    <li>联想创投</li>
                    <li>聚享汇</li>
                    <li>联想电脑管家</li>
                    <li>联想超融合</li>
                    <li>联想研究院</li>
                    <li>公司简介</li>
                </ul>
            </div>
            <p class="banquan">版权所有：1998-2019 联想集团</p>
        </div>
        <div class="footer">
            <ul>
                <li class="page">
                    <router-link to="">
                        <div class="shouye"></div>
                        首页
                    </router-link>
                </li>
                <li class="cation">
                    <router-link to="../category">
                        <div class="fenlei"></div>
                        分类
                    </router-link>
                </li>
                <li class="cart">
                    <router-link to="../cart">
                        <div class="shopp"></div>
                        购物车
                    </router-link>
                </li>
                <li class="personal">
                    <router-link to="../profile">
                        <div class="geren"></div>
                        我的
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'home',
        data() {
            return {
                timer: null,
                id: 1,
            };
        },
    };
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
        width: 100%;
        height: 95px;
        flex-shrink: 0;
        background-color: #FFFFFF;
    }

    .header > .top-nav {
        width: 100%;
        height: 45px;
    }

    .header > .top-nav > a > img {
        width: 45px;
        margin-right: 33px;
        float: left;
    }

    .header > .top-nav > .nav-box {
        float: left;
    }

    .header > .top-nav > .nav-box > ul {
        display: flex;
        text-align: center;
        line-height: 49px;
    }

    .header > .top-nav > .nav-box > ul > li {
        margin: 0 10px;
    }

    .header > .top-nav > .nav-box > ul > li > a {
        font-size: 17px;
        color: #000;
        position: relative;
    }

    .header > .top-nav > .nav-box > ul > li > a > .red {
        position: absolute;
        top: 25px;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 3px;
        background-color: #F4364C;
    }

    .header > .serch-box {
        width: 100%;
        height: 50px;
        position: fixed;
        top: 45px;
    }

    .header > .serch-box > a {
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        vertical-align: middle;
    }

    .header > .serch-box > a > img {
        width: 25px;
        margin-top: 12px;
    }

    .header > .serch-box > input {
        width: 70%;
        height: 30px;
        border: 1px solid #999999;
        border-radius: 15px;
        vertical-align: middle;
        background: #fafafa url(sousu.png) no-repeat left;
        background-size: 29px;
        padding-left: 30px;
        box-sizing: border-box;
        outline: none;
    }

    /* 内容 */
    .content {
        width: 100%;
        flex-grow: 1;
        overflow: auto;
    }

    .banner-box {
        overflow: hidden;
    }

    .content .banner {
        overflow: hidden;
        touch-action: pan-x;
        position: relative;
    }

    .content .banner > ul.scroll {
        width: 1100%;
        display: flex;
        /*margin-left: -100%;*/
    }

    .content .banner > ul > li > img {
        width: 100%;
    }

    ul.indicator {
        position: absolute;
        left: 50%;
        bottom: 20px;
        z-index: 1000;
        transform: translateX(-50%);
    }

    ul.indicator > li {
        width: 6px;
        height: 6px;
        float: left;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        margin-left: 10px;
    }

    ul.indicator > li.active > i {
        display: inline-block;
        width: 10px;
        height: 5px;
        border-radius: 2px;
        background-color: #FFFFFF;
        float: left;
    }

    .content > .list-box > ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .content > .list-box > ul {

    }

    .content > .list-box > ul > li {
        text-align: center;
        width: 20%;
        padding: 10px 0;
    }

    .content > .list-box > ul > li > a {
        color: #4a4a4a;
        font-size: 12px;
    }

    .content > .list-box > ul > li > a > img {
        width: 43px;
    }

    /* 定时抢购 */
    .content > .lim-time-box {
        margin-top: 10px;
    }

    .content > .lim-time-box > .lim-time {
        height: 50px;
        line-height: 50px;
    }

    .content > .lim-time-box > .lim-time > .seckill {
        font-size: 19px;
        color: #F4364C;
        font-weight: bold;
        padding-left: 17px;
    }

    .content > .lim-time-box > .lim-time > .zero {
        font-size: 12px;
        color: #4a4a4a;
    }

    .content > .lim-time-box > .lim-time > span.time {
        font-size: 13px;
        color: #fff;
        line-height: 50px;
        background-color: rgba(255, 0, 0, 0.8);
        line-height: 50px;
        margin-left: 5px;
        border-radius: 4px;
        padding: 0 5px;
    }

    .content > .lim-time-box > .lim-time > .lower {
        float: right;
        padding-right: 16px;
        font-size: 12px;
        color: #808080;
    }

    .content > .lim-time-box > ul.item-wrap {
        display: flex;
    }

    .content > .lim-time-box > ul.item-wrap > li {
        width: 33.333333%;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .content > .lim-time-box > ul.item-wrap > li > img {
        width: 88px;
    }

    .content > .lim-time-box > ul.item-wrap > li > span {
        font-size: 15px;
        color: #BF1111;
        margin-top: 5px;
    }

    /* 新品推荐 */
    .content > .new-product {
        margin: 20px 0;
    }

    .content > .new-product > .np-title {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        margin: 10px 0;
        box-sizing: border-box;
    }

    .content > .new-product > .np-title > span {
        font-size: 19px;
        color: #333;
        font-weight: bold;
    }

    .content > .new-product > ul.item-wrap {
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
    }

    .content > .new-product > ul.item-wrap > li {
        margin: 0 5px;
        overflow: hidden;
    }

    .content > .new-product > ul.item-wrap > li > img {
        width: 114px;
    }

    .content > .new-product > ul.item-wrap > li > span {
        font-size: 13px;
        display: block;
    }

    .content > .new-product > ul.item-wrap > li > span > em {
        font-size: 13px;
        color: #BF1111;
        font-style: normal;
    }

    /* 扫尾货 */
    .saoweihuo {
        margin: 20px 0;
    }

    .swh-title {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        margin: 10px 0;
        box-sizing: border-box;
    }

    .swh-title > span {
        font-size: 19px;
        color: #333;
        font-weight: bold;
    }

    .saoweihuo > .swh-top {
        display: flex;
    }

    .saoweihuo > .swh-top > img:first-child {
        width: 66%;
    }

    .saoweihuo > .swh-top > img:last-child {
        width: 33%;
        margin-left: 1%;
    }

    .saoweihuo > ul.swh-btm {
        display: flex;
        margin-top: 5px;
    }

    .saoweihuo > ul.swh-btm > li {
        width: 33.333333%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }

    .saoweihuo > ul.swh-btm > li > img {
        width: 105px;
    }

    .saoweihuo > ul.swh-btm > li > span {
        font-size: 14px;
        color: #333333;
        text-align: center;
        display: block;
    }

    .saoweihuo > ul.swh-btm > li > em {
        font-style: normal;
        font-size: 14px;
        color: #BF1111;
    }

    /* a连接跳转布局 */
    .a-layout {
        background-image: url(./images/10.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 324px;
    }

    /* 为你推荐 */
    .smart-suggestion {

    }

    .sug-title {
        height: 63px;
        line-height: 63px;
        text-align: center;
        background-color: #f7f7f7;
    }

    .sug-title > i {
        width: 50px;
        height: 5px;
        display: inline-block;
        border-top: 1px solid gray;
    }

    .sug-title > span {
        margin: 0 15px;
        font-size: 14px;
    }

    ul.sug-item-wrap {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    ul.sug-item-wrap > li.sug-item {
        width: 48%;
        margin: 5px 1%;
        overflow: hidden;
        text-align: center;
    }

    ul.sug-item-wrap > li.sug-item > img {
        width: 172px;
    }

    ul.sug-item-wrap > li.sug-item > span {
        font-size: 14px;
        display: block;
        text-align: center;
        padding-bottom: 5px;
    }

    ul.sug-item-wrap > li.sug-item > em {
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
        color: #f4364c;
        font-style: normal;
    }

    /* 页尾 */
    .yewei {
        background-color: #fff;
    }

    .yewei > ul {
        margin: 20px 10px 0 10px;
        display: flex;
        flex-wrap: wrap;
    }

    .yewei > ul > li {
        width: 27%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        font-size: 14px;
        margin: 10px 10px;
        color: #333333;
        text-align: center;
        background-color: #f1f1f1;
    }

    p.banquan {
        display: block;
        text-align: center;
        padding: 8px 0 60px 0;
        font-size: 12px;
        height: 14px;
        line-height: 14px;
        color: #4A4A4A;
        background-color: #F1F1F1;
    }

    /* 页脚nav */
    .footer {
        width: 100%;
        height: 50px;
        flex-shrink: 0;
        background-color: #FFFFFF;
        position: fixed;
        bottom: 0;
    }

    .footer > ul {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .footer > ul > li {
        width: 25%;
        text-align: center;
        font-size: 12px;
    }

    .footer > ul > li > a {
        color: #333333;
    }

    .footer > ul > li > a > div {
        width: 22px;
        height: 22px;
        margin: 0 auto;
    }

    .footer > ul > li > a > .shouye {
        background: url(shouye.png) no-repeat bottom;
        background-size: 22px;
    }

    .footer > ul > li > a > .fenlei {
        background: url(fenlei.png) no-repeat;
        background-size: 22px;
    }

    .footer > ul > li > a > .shopp {
        background: url(gouwuche.png) no-repeat;
        background-size: 22px;
    }

    .footer > ul > li > a > .geren {
        background: url(geren.png) no-repeat;
        background-size: 22px;
    }

    .footer > ul > .page > a {
        color: #F4354e;
    }
</style>