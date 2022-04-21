import { img_background, img_ground, img_purpleMonster, img_star } from '../../../../config/imageCfg';
import GraphicsNode from './GraphicsNode';
import Monster from './Monster';

export default class Stage extends GraphicsNode {
    private _ctx: CanvasRenderingContext2D;
    public get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    public setDirty(value: boolean) {
        if (!value) return;

        this._dirty = value;
    }

    public readonly stageWidth = 500;
    public readonly stageHeight = 500;

    private _monster: Monster;
    private _star: GraphicsNode;

    public constructor() {
        super();
        this.setStage(this);
        const canvas = document.getElementById('game') as HTMLCanvasElement;
        this._ctx = canvas.getContext('2d');
        canvas.width = this.stageWidth;
        canvas.height = this.stageHeight;

        this.createChildren();
        this.addEvent();
    }

    private createChildren(): void {
        const background = new GraphicsNode(img_background);
        background.source = img_background;
        this.addChild(background);

        const ground = new GraphicsNode(img_ground);
        ground.y = 350;
        ground.width = 500;
        this.addChild(ground);

        this._monster = new Monster(img_purpleMonster);
        this.addChild(this._monster);

        this.createStar();
    }

    private createStar(): void {
        this._star = new GraphicsNode(img_star);
        this.addChild(this._star);
        this._star.x = 50 + Math.random() * (this.stageWidth - 100);
        this._star.y = 50 + Math.random() * (this.stageHeight - 250);
    }

    private destroyStar(): void {
        if (!this._star) return;
        this.removeChild(this._star);
        this._star = null;
    }

    private addEvent(): void {
        const halfStageWidth = this.stageWidth / 2;
        document.addEventListener("mousedown", (evt: MouseEvent) => {
            const dir = evt.clientX > halfStageWidth ? 1 : -1;
            this._monster.setDir(dir);
        });
    }

    public $update(deltaTime: number): void {
        if (this._dirty) {
            this.setDirty(false);
            this._ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
            this.render();
        }

        super.$update(deltaTime);

        if (this.checkHitStar()) {
            this.destroyStar();
            setTimeout(() => {
                this.createStar();
            }, 1000);
        }
    }

    private checkHitStar(): boolean {
        if (!this._monster || !this._star) return false;
        if (!this._monster.width || !this._monster.height) return false;
        if (!this._star.width || !this._star.height) return false;

        if (Math.abs(this._monster.world.x - this._star.world.x) < this._monster.width / 2 + this._star.width / 2
            && Math.abs(this._monster.world.y - this._star.world.y) < this._monster.height / 2 + this._star.height / 2) {
            return true;
        }

        return false;
    }
}