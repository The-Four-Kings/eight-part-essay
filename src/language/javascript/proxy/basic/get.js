/**
 * @author 雪糕
 * @description 拦截对象的读取属性操作
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
 */

var p = new Proxy({}, {
    get: function (target, prop, receiver) {
        console.log("called: " + prop);
        return 10;
    }
});

console.log(p.a); // "called: a"
                    // 10