class Circle {
    //Draws from center position
    constructor(radius, posX, posY, colour) {
        this.ctx = CONTEXT;
        this.radius = radius;
        this.posX = posX;
        this.posY = posY;
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.lineWidth = 10;
    }

    drawFilled() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawFilledWithBorder(borderColour) {
        this.drawFilled();
        this.ctx.strokeStyle = borderColour;
        this.ctx.stroke();
    }

}