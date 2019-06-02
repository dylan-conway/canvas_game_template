import * as utils from '../js/utils.js';

export default class Map{
    constructor(x, y){
        // this.img = utils.newImage(src)
        this.x = x;
        this.y = y;
        // this.width = this.img.width;
        // this.height = this.img.height;
        this.width = 2160;
        this.height = 3840;
    }
    draw(ctx){
        // ctx.drawImage(this.img, this.x, this.y);
        // ctx.strokeStyle = 'black';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}