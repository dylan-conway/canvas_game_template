export default class Canvas{
    /**
     * A class for manipulating a single canvas tag in HTML. The canvas tag, canvas width
     * and canvas height are passed to the class and the context is made in the constructor.
     * There are a variety of methods the class offers to draw lines, images, shapes, etc.
     * @param {*} element The canvas tag.
     * @param {number} width Width of the canvas.
     * @param {number} height Height of the canvas.
     */
    constructor(canvasTag, width, height){
        this.canvasTag = canvasTag;
        this.ctx = this.canvasTag.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvasTag.width = this.width;
        this.canvasTag.height = this.height;
        this.fillColor = 'black';
        this.strokeColor = 'black';
        this.shadowColor = 'black';
    }

    /**
     * Sets all colors for the context.
     */
    setColors(){
        this.ctx.fillStyle = this.fillColor;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.shadowColor = this.shadowColor;
    }

    /**
     * Changes the fill color of the context.
     * @param {string} color Color name.
     */
    setFillColor(color){this.fillColor = color; this.setColors();}

    /**
     * Changes the line color of the context.
     * @param {string} color Color name.
     */
    setStrokeColor(color){this.strokeColor = color; this.setColors();}
    
    /**
     * Changes the shadow color of the context.
     * @param {string} color Color name.
     */
    setShadowColor(color){this.shadowColor = color; this.setColors();}

    /**
     * Draws a line between two points.
     * @param {*} ctx The context.
     * @param {number} x1 First x coordinate.
     * @param {number} y1 First y coordinate.
     * @param {number} x2 Second x coordinate.
     * @param {number} y2 Second y coordinate.
     */
    drawLine(ctx, x1, y1, x2, y2){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}