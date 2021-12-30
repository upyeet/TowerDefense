class Button extends Rect {
    constructor(posX, posY, rectColour, text, textPositionType, width = null, height = null) {
        super(width ?? BUTTON_WIDTH, height ?? BUTTON_HEIGHT, posX, posY, rectColour);

        this.text = text ?? this.text;
        this.fontSize = 30;
        this.ctx.font="bold " + this.fontSize.toString() + "px Quinquefive";
        this.ctx.textAlign="center";
        this.ctx.textBaseline = "middle";
        this.fillStyle = rectColour;
        
        this.clickable = false;

        this.textX = this.posX + (this.width / 2);

        switch(textPositionType) {
            case (BUTTON_TEXT_POSITION.MIDDLE) :
                this.textY = this.posY + (this.height / 2);
                break;
            case (BUTTON_TEXT_POSITION.ABOVE):
                this.textY = this.posY - (this.height / 5);
                break;
        }
    }

    drawFilledButton(textColour) {
        this.fillRect(null);
        this.ctx.fillStyle = textColour;
        this.ctx.fillText(this.text, this.textX, this.textY);
        this.ctx.fillStyle = this.fillStyle;
    }

    drawButton(lineWidth, textColour) {
        this.rect(lineWidth);
        this.ctx.fillStyle = textColour;
        this.ctx.fillText(this.text, this.textX, this.textY);
        this.ctx.fillStyle = this.fillStyle;
    }

    drawButtonWithBorder(textColour, borderStyle, lineWidth = null, alpha = null) {
        this.rectWithBorder(borderStyle, lineWidth, alpha);
        this.ctx.fillStyle = textColour;
        this.ctx.fillText(this.text, this.textX, this.textY);
        this.ctx.fillStyle = this.fillStyle;
    }
};

const BUTTON_TEXT_POSITION = {
    MIDDLE: 1,
    ABOVE: 2
}