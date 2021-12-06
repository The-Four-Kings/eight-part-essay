import { Singleton } from '../../../creational-patterns/singleton/singleton';

/** 计算器数据 */
class CalculateModel extends Singleton {
    public num: number = 0;
}

export default CalculateModel.getIns();