import { Singleton } from '@/design-patterns/creational-patterns/singleton';

/** 计算器数据 */
class CalculateModel extends Singleton {
    public num: number = 0;
}

export default CalculateModel.getIns();