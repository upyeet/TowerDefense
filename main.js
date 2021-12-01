function clearCanvas() {
    CANVAS.width = CONTAINER.clientWidth;
    CANVAS.height = CONTAINER.clientHeight;
    new Rect(CONTAINER.clientWidth, CONTAINER.clientHeight, COLORS.BLACK).fillRect(0, 0);
}

function changeScene() {
    clearCanvas();

    switch(CURRENT_SCENE.ID) {
        case SCENE.MENU:
            OBJECTS = [];
            initMenuScene();
            CANVAS.addEventListener('mousemove', onMouseMove);
            break;
        case SCENE.PLAY:
            OBJECTS = [];
            CANVAS.removeEventListener('mousemove', onMouseMove);
            break;
        default:
            console.error(`sceneId can't be ${sceneId}`);
    }
}

function gameInit() {
    CURRENT_SCENE.ID = SCENE.MENU;
}

function onMouseMove(event) {
    mouseOverObj(event.clientX, event.clientY);
}

function mouseOverObj(mX, mY) {
    OBJECTS.forEach(function (obj) {
        if (checkIfMouseOverObj(mX, mY, obj)) {
            document.body.style.cursor = "pointer";
            obj.clickable = true;
        }
        else {
            document.body.style.cursor = "default";
            obj.clickable = false;
        }
    });
}

function checkIfMouseOverObj(mX, mY, obj) {
    if (mX <= obj.posX + obj.width &&
        mY <= obj.posY + obj.height &&
        mX >= obj.posX && mY >= obj.posY) {
        return true;
    }
    else {
        return false;
    }
}

CANVAS.addEventListener('click', function(event) {
    OBJECTS.forEach(function (obj) {
        if(obj.clickable){
            obj.click();
            document.body.style.cursor = "default";
        }
    });
});

gameInit();