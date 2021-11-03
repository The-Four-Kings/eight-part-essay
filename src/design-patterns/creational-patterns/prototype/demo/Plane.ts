import { IPrototype } from '../IPrototype';
import Circle from './Circle';
import Rectangle from './Rectangle';

export default class Plane implements IPrototype {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private _circle: Circle;
    public setCircle(value: Circle) {
        this._circle = value;
        this._circle.refPlane = this;
    }
    public get circle(): Circle {
        return this._circle;
    }

    private _rectangle: Rectangle;
    public setRectangle(value: Rectangle) {
        this._rectangle = value;
        this._circle.refPlane = this;
    }
    public get rectangle(): Rectangle {
        return this._rectangle;
    }

    public clone(): this {
        const obj = Object.assign(Object.create(this), this);
        this.deepCloneAttributes(obj);

        return obj;
    }

    protected deepCloneAttributes(obj: Plane): void {
        obj.setCircle(this.circle.clone());

        obj.setRectangle(this.rectangle.clone());
    }
}