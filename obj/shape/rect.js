class Rect {
    constructor(width, height, posX, posY, style = null, ctx = null) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx ?? CONTEXT;
        this.ctx.fillStyle = style ?? this.ctx.fillStyle;
        this.ctx.strokeStyle = style ?? this.ctx.strokeStyle;
        this.hasBorder = false;
    }

    fillRect(style, alpha) {
        this.ctx.globalAlpha = alpha ?? this.ctx.globalAlpha;
        this.ctx.fillStyle = style ?? this.ctx.fillStyle;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    rect(style, lineWidth, alpha) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth ?? LINE_WIDTH;
        this.ctx.strokeStyle = style ?? this.ctx.strokeStyle;
        this.ctx.globalAlpha = alpha ?? this.ctx.globalAlpha;
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.stroke();
        this.hasBorder = true;
    }

    rectWithBorder(borderStyle, fillStyle, lineWidth, alpha) {
        this.ctx.fillStyle = fillStyle ?? this.ctx.fillStyle;
        this.fillRect(fillStyle, alpha);
        this.ctx.strokeStyle = borderStyle;
        this.rect(borderStyle, lineWidth, alpha);
    }
}