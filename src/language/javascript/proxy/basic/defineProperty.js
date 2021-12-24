/**
 * @author 雪糕
 * @description 拦截 Object.defineProperty()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */

var p = new Proxy({}, {
    defineProperty: function (target, prop, descriptor) {
        console.log('called: ' + prop);
        return true;
    }
});

var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, 'a', desc); // "called: a"