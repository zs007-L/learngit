import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../views';

Vue.use(Router); //无条件使用router提供的方法

let router = new Router({
        routes: [
                { path: '/', redirect: '/login' },
                { path: '/login', component: Pages.Login },
                { path: '/home', component: Pages.Home }
        ]
});

export default router;