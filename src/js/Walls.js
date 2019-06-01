// import Sprite from "../src/js/Sprite.js";

export default class Wall{
    constructor(/*src, */x, y, width, height){
        // this.sprite = new Sprite(src);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}