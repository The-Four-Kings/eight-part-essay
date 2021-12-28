/**
 * @author 雪糕
 * @description 拦截函数的调用
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply
 */

function sum(a, b) {
    return a + b;
}

const handler = {
    apply: function (target, thisArg, argumentsList) {
        console.log(`Calculate sum: ${argumentsList}`);
        // expected output: "Calculate sum: 1,2"

        return target(argumentsList[0], argumentsList[1]) * 10;
    }
};

const proxy1 = new Proxy(sum, handler);

console.log(sum(1, 2));
// expected output: 3
console.log(proxy1(1, 2));
  // expected output: 30
