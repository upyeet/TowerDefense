class TextBlock {
    constructor(colour) {
        this.ctx = CONTEXT;
        this.fontSize = 30;
        this.ctx.font="bold " + this.fontSize.toString() + "px Quinquefive";
        this.ctx.fillStyle = colour;
    }

    draw(posX, posY, text) {
        this.posX = posX;
        this.posY = posY;
        this.ctx.fillText(text, this.posX, this.posY);
    }
}

function getTextWidth(text) {
    let metrics = CONTEXT.measureText(text);
    return metrics.width;
}

function getTextHeight(text) {
    let metrics = CONTEXT.measureText(text);
    return metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
}