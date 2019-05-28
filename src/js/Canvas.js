export default class Canvas{
    constructor(element, context, width, height){
        this.element = element;
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.fillColor = 'black';
        this.strokeColor = 'black';
    }

    /*
        This function will set all the colors for the context. It should be called
        after using a method to change line color or something similar so the context
        can be updated.
    */
    setColors(){
        
        this.ctx.fillStyle = this.fillColor;
        this.ctx.strokeStyle = this.strokeStyle;
    }

    setFillColor(color){
        this.fillColor = color;
        this.setColors();
    }

    setStrokeColor(color){
        this.strokeColor = color;
        this.setColors();
    }

    drawLine(ctx, x1, y1, x2, y2){
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}