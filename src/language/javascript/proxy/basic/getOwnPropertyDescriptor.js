/**
 * @author 雪糕
 * @description 拦截 Object.getOwnPropertyDescriptor()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
 */
var p = new Proxy({ a: 20 }, {
    getOwnPropertyDescriptor: function (target, prop) {
        console.log('called: ' + prop);
        return { configurable: true, enumerable: true, value: 10 };
    }
});

console.log(Object.getOwnPropertyDescriptor(p, 'a').value); // "called: a"
                                                            // 10