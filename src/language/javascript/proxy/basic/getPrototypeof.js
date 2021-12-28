/**
 * @author 雪糕
 * @description 拦截 Object.getPrototypeOf()
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
 */

const monster1 = {
    eyeCount: 4
};

const monsterPrototype = {
    eyeCount: 2
};

const handler = {
    getPrototypeOf(target) {
        return monsterPrototype;
    }
};

const proxy1 = new Proxy(monster1, handler);

console.log(Object.getPrototypeOf(proxy1) === monsterPrototype);
// expected output: true

console.log(Object.getPrototypeOf(proxy1).eyeCount);
  // expected output: 2
