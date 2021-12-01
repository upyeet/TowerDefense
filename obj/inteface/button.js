class Button extends Rect {
    constructor(style, posX, posY, text, width = null, height = null) {        
        super(width ?? BUTTON_WIDTH, height ?? BUTTON_HEIGHT, style);
        
        this.posX = posX;
        this.posY = posY;

        //Calculation for the text to be in middle of the button
        this.textX = this.posX + (this.width / 2);
        this.textY = this.posY + (this.height / 2);

        this.text = text;
        this.ctx.font="30px Georgia";
        this.ctx.textAlign="center";
        this.ctx.textBaseline = "middle";
        this.fillStyle = style;
        this.strokeStyle = style;

        this.clickable = false;

        this.click;
    }

    drawFilledButton(textColour) {
        this.fillRect(this.posX, this.posY);
        this.ctx.fillStyle = textColour;
        this.ctx.fillText(this.text, this.textX, this.textY);
        this.ctx.fillStyle = this.fillStyle;
    }

    drawButton(lineWidth, textColour) {
        this.rect(this.posX, this.posY, lineWidth);
        this.ctx.fillStyle = textColour;
        this.ctx.fillText(this.text, this.textX, this.textY);
        this.ctx.fillStyle = this.fillStyle;
    }

}