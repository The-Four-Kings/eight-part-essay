/**
 * @author 雪糕
 * @description 私有属性
 * 在 JavaScript 或其他语言中，大家会约定俗成地在变量名之前添加下划线 _ 来表明这是一个私有属性（并不是真正的私有），但我们无法保证真的没人会去访问或修改它著作权归作者所有。
 *  使用 ES6 Proxy 我们就可以实现真实的私有变量了，第一种方法是使用 set / get 拦截读写请求并返回 undefined；第二种方法是使用 has 拦截 in 操作；
 */

let api = {
    _apiKey: '123abc456def',
    getUsers: function () { },
    getUser: function (userId) { },
    setUser: function (userId, config) { }
};

const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {
    get(target, key, proxy) {
        if (RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if (RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, value, proxy);
    }
});

// 以下操作都会抛出错误
console.log(api._apiKey);
api._apiKey = '987654321';