/**
 * @author 雪糕
 * @description 拦截对对象属性的 delete 操作
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty
 */
var p = new Proxy({}, {
    deleteProperty: function (target, prop) {
        console.log('called: ' + prop);
        return true;
    }
});

delete p.a; // "called: a"
