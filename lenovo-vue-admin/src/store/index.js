import Vue from 'vue';
import Vuex from 'vuex'
import category from './category.js';

Vue.use(Vuex);

let store = new Vuex.Store({
        //用来配置整和整个子仓库
        modules: {
                category
        },
        state: {

        },
        getters: {

        },
        mutations: {

        },
        actions: {

        }
});

export default store;