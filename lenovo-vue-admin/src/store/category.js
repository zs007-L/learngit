import http from '../util/http.js';

export default {
    namespaced: true,
    state: {
        list: [],                                   //保存所有分类的数据
        isInit: false,                          //标识分类数据有没有被初始化过
    },
    getters: {},
    mutations: {
        init(state, list) {
            state.list = list;
            state.isInit = true;
        },
        add(state, model) {
            state.list.push(model);
        },
        remove(state, id) {
            let i = state.list.findIndex(item => item.id === id);
            state.list.splice(i, 1);
        },
        update(state, model) {
            let i = state.list.findIndex(item => item.id === model.id);
            state.list.splice(i, 1, model);
        }
    },
    actions: {
        init({state, commit}) {
            if (state.isInit) return Promise.resolve();
            else return http({url: '/category/all'}).then(list => commit('init', list));
        },
        add({commit}, model) {
            return http({url: '/category/add', data: model})
                .then(id => {
                    let {fid, name, newAvatar} = model;
                    let avatar = newAvatar ? `/images/category/${newAvatar}` : null;
                    commit('add', {id, fid, name, avatar});
                });
        },
        remove({commit}, data) {
            return http({url: '/category/remove', data})
                .then(() => commit('remove', data.id));
        },
        update(context, model) {
            return http({url: '/category/update', data: model});
        }
    }
}