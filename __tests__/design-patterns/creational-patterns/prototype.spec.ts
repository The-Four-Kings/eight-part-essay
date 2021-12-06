
import Circle from '../../../src/design-patterns/creational-patterns/prototype/demo/Circle';
import Plane from '../../../src/design-patterns/creational-patterns/prototype/demo/Plane';
import Rectangle from '../../../src/design-patterns/creational-patterns/prototype/demo/Rectangle';
import { createObject } from '../../../src/utils/creator';

const plane1 = createObject(Plane, {
    x: 10,
    y: 10,
    width: 1000,
    height: 1000
});

const circle = createObject(Circle, {
    x: 100,
    y: 100,
    radius: 10
});
plane1.setCircle(circle);

const rectangle = createObject(Rectangle, {
    x: 200,
    y: 200,
    width: 50,
    height: 50
});
plane1.setRectangle(rectangle);

const plane2 = plane1.clone();

describe('prototype UNIT', () => {
    test('plane x', () => {
        expect(plane1.x).toBe(plane2.x);
    });

    test('plane circle', () => {
        expect(plane1.circle).not.toBe(plane2.circle);
    });

    test('plane circle refPlane', () => {
        expect(plane1.circle.refPlane).not.toBe(plane2.circle.refPlane);
    });
});