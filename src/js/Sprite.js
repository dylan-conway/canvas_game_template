import * as utils from '../js/utils.js';

export default class Sprite{
    /**
     * Sprite is for animated images. It will take the src, rate, width and height of
     * an image, then find the real width and height. Method draw() will draw the image at
     * the correct frame.
     * @param {HTMLImageElem} src The imported image of the sprite.
     * @param {number} rate How fast you want the sprite to animate.
     * @param {number} width The width of the drawn image.
     * @param {number} height The height of the drawn image.
     */
    constructor(src, rate, width, height){
        this.img = utils.newImage(src);
        this.rate = rate;
        this.width = width;
        this.height = height;
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;
        this.drawCounter = utils.getRandomInt(0, this.rate);
        // sx, sy, swidth, sheight, dwidth, dheight.
        this.info = [0, 0, this.width, this.height, this.width, this.height];
    }
    
    /**
     * Draws the sprite at the correct frame.
     * @param {canvas context} ctx The context of the desired canvas.
     * @param {number} x X coordinate.
     * @param {number} y Y coordinate.
     * @param {number} direction A number representing the direction the sprite is facing.
     */
    draw(ctx, x, y, direction, state){
        
        // When the draw counter equals this.rate, draw the sprite.
        if(this.drawCounter === this.rate){
            this.drawCounter = 0;
            // If this.info[0] (sx) is equal to the last frame, then
            // set sx back to pixel 0.
            if(this.info[0] === this.imgWidth - this.width){
                this.info[0] = 0;
            // Else continue adding the width to sx.
            }else{
                this.info[0] += this.width;
            }
        }

        // Draw the sprite at the given x y coordinates and at the right
        // pixels in the image.
        ctx.drawImage(
            this.img,
            this.info[0], this.info[1] + (this.height * direction), //+ (8 * this.height * state),
            this.info[2], this.info[3],
            x, y,
            this.info[4], this.info[5]
        );

        // Always increment draw counter after each draw.
        this.drawCounter ++;
    }
}