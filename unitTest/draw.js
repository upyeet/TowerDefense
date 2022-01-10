function drawCircleTestWithIncorrectValues() {
    let circleArray = [];

    circleArray.push(new Circle(-10, 2, 2, COLORS.RED));
    circleArray.push(new Circle(10, -2, 2, COLORS.RED));
    circleArray.push(new Circle(10, 2, -2, COLORS.RED));
    circleArray.push(new Circle(10, 2, 2, "-3213"));

    drawCircleArray(circleArray);
}

function drawCricleTestWithCorrectValues() {
    let circleArray = [];
    circleArray.push(new Circle(10, 2, 2, COLORS.GREEN));
    circleArray.push(new Circle(100, 20, 20, COLORS.GREEN));
    circleArray.push(new Circle(1000, 200, 200, COLORS.GREEN));

    drawCircleArray(circleArray);
}

function drawCircleArray(array) {
    array.forEach((circle) => {
        circle.drawFilled(0, Math.PI * 2);
    });
}
