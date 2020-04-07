import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../pages';

Vue.use(Router);

let router = new Router({
    linkActiveClass: 'active',  // 添加路由的样式
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Pages.Home},
        {path: '/category', component: Pages.Category, meta: { title: '商品分类'}},
        {path: '/list/:cid', component: Pages.List},
        {path: '/detail/:id', component: Pages.Detail},
        {path: '/login', component: Pages.Login, meta: { title: '联想会员登录'}},
        {path: '/register', component: Pages.Register, meta: { title: '联想会员注册'}},
        {path: '/cart', component: Pages.Cart, meta: { title: '购物车'}},
        {path: '/address', component: Pages.Address, meta: { title: '地址管理'}},
        {path: '/orderconfirm', component: Pages.Orderconfirm, meta: { title: '结算管理'}},
        {path: '/pay', component: Pages.Pay}
    ]
});

router.beforeEach((to, form, next) => {
    /*路由变化修改title*/
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});

export default router;