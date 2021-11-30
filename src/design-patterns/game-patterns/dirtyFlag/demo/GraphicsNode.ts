import global from './global';

/**
 * @author 雪糕
 * @description 渲染节点
 */
export default class GraphicsNode {
    private _dirty: boolean;
    private setDirty(value: boolean) {
        this._dirty = value;
        if (value) {
            global.dirty = true;
        }
    }

    private _image: HTMLImageElement;

    private _src: string;
    public setSrc(value: string): void {
        if (this._src === value) return;

        this._src = value;
        this.setDirty(true);
    }

    private _imageSrc: string;
    private setImageSrc(value: string): void {
        this._imageSrc = value;
        this._image.src = this._src;
    }

    private _local: IPoint;
    public set x(value: number) {
        if (value === this._local.x) return;

        this._local.x = value;
        this.setDirty(true);
    }
    public get x(): number {
        return this._local.x;
    }

    public set y(value: number) {
        if (value === this._local.y) return;

        this._local.y = value;
        this.setDirty(true);
    }
    public get y(): number {
        return this._local.y;
    }

    private _width: number;
    public setWidth(value: number) {
        if (value === this._width) return;

        this._width = value;
        this.setDirty(true);
    }

    private _height: number;
    public setHeight(value: number) {
        if (value === this._height) return;

        this._height = value;
        this.setDirty(true);
    }

    private _world: IPoint;
    public get world(): IPoint {
        return this._world;
    }

    public children: GraphicsNode[];

    public parent: GraphicsNode;

    public constructor() {
        this._local = { x: 0, y: 0 };
        this._world = { x: 0, y: 0 };
        this.children = [];
        this._src = "";
        this.setDirty(true);
    }

    /** 渲染 */
    public render(dirty?: boolean) {
        //如果父链中它之上的任何物体标记为脏，则它将被置为true
        dirty = dirty || this._dirty;

        //而当节点没有改动时（dirty=false），跳过combine的过程，否则，表示此链为脏，进行combine
        if (dirty) {
            const parentWorldX = this.parent?.world.x ?? 0;
            const parentWorldY = this.parent?.world.y ?? 0;
            this._world.x = this._local.x + parentWorldX;
            this._world.y = this._local.y + parentWorldY;
            this.setDirty(false);

            this.renderImage();
        }

        this.children.forEach(child => {
            child.render(dirty);
        });
    }

    private renderImage() {
        if (!this._image) {
            this._image = new Image();
        }

        if (this._imageSrc !== this._src) {
            this._image.onload = () => {
                this.drawImage();
            };
            this.setImageSrc(this._src);
        } else {
            this.drawImage();
        }
    }

    private drawImage() {
        global.ctx.drawImage(this._image, this._world.x, this._world.y, this._width ?? this._image.width, this._height ?? this._image.height);
    }

    public addChild(child: GraphicsNode): void {
        this.children.push(child);
        child.parent = this;
    }
}

interface IPoint {
    x: number,
    y: number
}