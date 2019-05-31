import * as utils from '../js/utils.js';

export default class Map{
    constructor(src, x, y){
        this.img = utils.newImage(src)
        this.x = x;
        this.y = y;
        this.width = this.img.width;
        this.height = this.img.height;
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y);
    }
}