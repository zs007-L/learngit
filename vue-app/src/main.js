import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/reset.css';
import http  from './util/http.js';
import Cookies from 'js-cookie';

Vue.config.productionTip = false;
Vue.prototype.$http =  http;
Vue.prototype.$cookies = Cookies;


new Vue({
  render: h => h(App),
  router
}).$mount('#app');
