/**
 * @author 雪糕
 * @description 抽离校验模块
 * 当出现：确保一个数据源中的所有属性都是同一类型的需求时，通常我们会把校验代码和方法或类混在一起。
 *  Proxy 可以分离这些逻辑，并无限扩展校验规则，而不用修改原本的类和方法。
 */
function createValidator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                const validator = this._validator[key];
                if (validator(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`Cannot set ${key} to ${value}. Invalid.`);
                }
            } else {
                throw Error(`${key} is not a valid property`);
            }
        }
    });
}

const personValidators = {
    name(val) {
        return typeof val === 'string';
    },
    age(val) {
        return typeof val === 'number' && val > 18;
    }
};
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        return createValidator(this, personValidators);
    }
}

const bill = new Person('Bill', 25);

// 以下操作都会报错
bill.name = 'bill';
bill.age = 'Bill';
bill.age = 15;