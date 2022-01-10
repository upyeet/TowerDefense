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

    drawFilled(startAngle = 0, endAngle = 2 * Math.PI) {
        this.ctx.beginPath();
        if(endAngle - startAngle < 2 * Math.PI) {
            this.ctx.moveTo(this.posX, this.posY);
        }
        this.ctx.arc(this.posX, this.posY, this.radius, startAngle, endAngle);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawFilledWithBorder(borderColour, startAngle = 0, endAngle = 2 * Math.PI) {
        this.drawFilled(startAngle, endAngle);
        this.ctx.strokeStyle = borderColour;
        this.ctx.stroke();
    }

}