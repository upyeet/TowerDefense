class Rect {
    constructor(width, height, style, ctx = null) {
        this.width = width;
        this.height = height;
        this.ctx = ctx ?? CONTEXT;
        this.ctx.fillStyle = style;
        this.ctx.strokeStyle = style;
    }

    fillRect(posX, posY) {
        this.ctx.fillRect(posX, posY, this.width, this.height);
    }

    rect(posX, posY, lineWidth) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth ?? this.ctx.lineWidth;
        this.ctx.rect(posX, posY, this.width, this.height);
        this.ctx.stroke();
    }
}