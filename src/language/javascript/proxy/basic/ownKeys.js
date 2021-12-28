/**
 * @author 雪糕
 * @description 拦截以下操作：
 *  Object.getOwnPropertyNames()
 *  Object.getOwnPropertySymbols()
 *  Object.keys()
 *  Reflect.ownKeys()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys
 */

var p = new Proxy({}, {
    ownKeys: function (target) {
        console.log('called');
        return ['a', 'b', 'c'];
    }
});

console.log(Object.getOwnPropertyNames(p)); // "called"
                                              // [ 'a', 'b', 'c' ]