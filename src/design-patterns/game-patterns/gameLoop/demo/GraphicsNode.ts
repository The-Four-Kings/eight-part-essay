import Stage from './Stage';

/**
 * @author 雪糕
 * @description 渲染节点
 */
export default class GraphicsNode {
    private _stage: Stage;
    public get stage(): Stage {
        return this._stage;
    }
    public setStage(value: Stage) {
        this._stage = value;
        if (this._dirty) {
            this._stage.setDirty(true);
        }
    }

    protected _dirty: boolean;
    public setDirty(value: boolean) {
        if (!value) return;

        this._dirty = value;
        this._stage?.setDirty(true);
    }

    private _image: HTMLImageElement;
    private get image(): HTMLImageElement {
        if (this._image) return this._image;

        this._image = new Image();
        this._image.onload = () => {
            this.setDirty(true);
            if (!this._width) {
                this._width = this._image.width;
            }
            if (!this._height) {
                this._height = this._image.height;
            }
        };
        return this._image;
    }

    private _source: string;
    public set source(value: string) {
        if (this._source === value) return;

        this.image.src = this._source = value;

        this.setDirty(true);
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
    public set width(value: number) {
        if (value === this._width) return;

        this._width = value;
        this.setDirty(true);
    }
    public get width(): number {
        return this._width;
    }

    private _height: number;
    public set height(value: number) {
        if (value === this._height) return;

        this._height = value;
        this.setDirty(true);
    }
    public get height(): number {
        return this._height;
    }

    private _world: IPoint;
    public get world(): IPoint {
        return this._world;
    }

    public children: GraphicsNode[];

    public parent: GraphicsNode;

    public constructor(source?: string) {
        this._local = { x: 0, y: 0 };
        this._world = { x: 0, y: 0 };
        this.children = [];
        if (source) {
            this.image.src = this._source = source;
        }
    }

    /** 渲染 */
    public render() {
        //而当节点没有改动时（dirty=false），跳过combine的过程，否则，表示此链为脏，进行combine
        this._world.x = this._local.x + (this.parent?.world.x ?? 0);
        this._world.y = this._local.y + (this.parent?.world.y ?? 0);
        this.drawImage();

        this.children.forEach(child => {
            child.render();
        });
    }

    private drawImage() {
        if (!this._image) return;

        const renderWidth = this._width ?? this._image.width;
        const renderHeight = this._height ?? this._image.height;
        this._stage.ctx.drawImage(this._image, this._world.x, this._world.y, renderWidth, renderHeight);
    }

    public addChild(child: GraphicsNode): void {
        this.children.push(child);
        child.parent = this;
        child.setStage(this._stage);
        this.setDirty(true);
    }

    public removeChild(child: GraphicsNode): void {
        const index = this.children.indexOf(child);
        if (index < 0) return;

        this.children.splice(index, 1);
        this.setDirty(true);
    }

    public $update(deltaTime: number): void {
        this.children.forEach(child => {
            child.$update(deltaTime);
        });
        this.onUpdate(deltaTime);
    }

    protected onUpdate(deltaTime: number): void {
        //
    }
}

interface IPoint {
    x: number,
    y: number
}