// import Sprite from "../src/js/Sprite.js";

export default class Wall{
    constructor(/*src, */mapX, mapY, width, height){
        // this.sprite = new Sprite(src);
        this.mapX = mapX;
        this.mapY = mapY;
        this.x = map.x + this.mapX;
        this.y = map.y + this.mapY;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}