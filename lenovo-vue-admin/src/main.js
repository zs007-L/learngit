import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import http from './util/http.js';
import cookies from 'js-cookie';
import store from './store';

Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$cookies = cookies;

let vm = new Vue({
        components: { App },
        router,
        store,
        render: h =>h(App)

}).$mount('#app');