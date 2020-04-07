import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';

let alwaysPendingPromise = new Promise(() => {});       // 一个永远是pending的promise对象

function http(options){
        let defaultOptions = {
                method: 'post',
                // 让请求携带token
                headers: {
                        'Authorization': Cookies.get('token')
                }
        };
        options = Object.assign({}, defaultOptions, options);
        return axios(options)
                // 进入第一个then说明服务器成功的收到了请求，返回一个结果
                // 第一个then的任务是判断有没有预期之外的错误情况出现，有就进入catch，没有就进入下一个then
                .then(response => {
                        if(response.status === 200) return response.data;
                        else throw new Error(response.statusText);
                })
                // 进入第二个then说明，整个过程没有发生我们预期之外的错误
                // 第二个then的任务是根据整个服务器的返回判断有没有预期之内的错误，有就进入catch，没有就进入下一个then
                .then(result => {
                        switch(result.status) {
                                case 200:
                                        if(result.message !== '') alert(result.message);
                                        return result.data;
                                case 401:
                                        Cookies.remove('token');                //清除cookie中残留的过期的token
                                        router.replace('/login');                   // 跳转到登录的页面
                                        return alwaysPendingPromise;            // 返回一个永远是pending的Promise对象，不让程序往后流
                                case 199:
                                case 500:
                                        //			                               return Promise.reject(result.message);
                                        throw new Error(result.message);
                        }
                })
                .catch(error => {                                       // 任何可能错误都会流到此处进行统一处理
                        alert(error.message);
                        return alwaysPendingPromise;           // 返回一个永远是pending的Promise对象，不让程序往后流
                })
}

export default http;