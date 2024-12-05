/* eslint-disable no-console */

import singleton, {
    Singleton
} from '../../../src/design-patterns/creational-patterns/singleton/singleton';

class Test_SingletonFn extends singleton<Test_SingletonFn>() {}

class Test_Singleton extends Singleton {}

describe('singleton UNIT', () => {

    test('singleton function', () => {
        const s1 = Test_SingletonFn.ins;
        const s2 = Test_SingletonFn.ins;
        expect(s1).toBe(s2);
    });

    test('Singleton class', () => {
        const s1 = Test_Singleton.getIns();
        const s2 = Test_Singleton.getIns();
        expect(s1).toBe(s2);
    });
});


function SingletonA<T>() {
    class C extends singleton<C & T>() {
        protected constructor() {
            super();
        }

        public testA() {
            console.log("testA");
        }

    }

    return C;
}

class SingletonB extends SingletonA<SingletonB>() {
    public testB() {
        console.log("testB");
    }
}

SingletonB.ins.testA();
SingletonB.ins.testB();