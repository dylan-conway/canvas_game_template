import Sprite from "../js/Sprite.js";

export default class Grass{
    constructor(src, mapX, mapY, width, height){
        this.sprite = new Sprite(src, 2000, 64, 64);
        this.mapX = mapX;
        this.mapY = mapY;
        this.x = map.x + this.mapX;
        this.y = map.y + this.mapY;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        this.sprite.draw(ctx, this.x, this.y, 0, 0);
    }
}