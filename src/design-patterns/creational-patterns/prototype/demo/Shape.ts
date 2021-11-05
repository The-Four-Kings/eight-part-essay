import { IPrototype } from '../IPrototype';
import Plane from './Plane';

export default abstract class Shape implements IPrototype {
    public x: number;
    public y: number;
    public color: number;
    public refPlane: Plane;

    public clone(): this {
        return Object.assign(Object.create(this), this);
    }
}