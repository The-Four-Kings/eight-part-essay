/**
 * @author 雪糕
 * @description 拦截 Object.preventExtensions()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions
 */

const monster1 = {
    canEvolve: true
};

const handler1 = {
    preventExtensions(target) {
        target.canEvolve = false;
        Object.preventExtensions(target);
        return true;
    }
};

const proxy1 = new Proxy(monster1, handler1);

console.log(monster1.canEvolve);
// expected output: true

Object.preventExtensions(proxy1);

console.log(monster1.canEvolve);
// expected output: false
