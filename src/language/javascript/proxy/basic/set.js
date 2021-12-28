/**
 * @author 雪糕
 * @description 拦截对象的设置属性操作
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set
 */

const monster1 = { eyeCount: 4 };

const handler1 = {
    set(obj, prop, value) {
        if ((prop === 'eyeCount') && ((value % 2) !== 0)) {
            console.log('Monsters must have an even number of eyes');
        } else {
            return Reflect.set(...arguments);
        }
    }
};

const proxy1 = new Proxy(monster1, handler1);

proxy1.eyeCount = 1;
// expected output: "Monsters must have an even number of eyes"

console.log(proxy1.eyeCount);
// expected output: 4

proxy1.eyeCount = 2;
console.log(proxy1.eyeCount);
 // expected output: 2