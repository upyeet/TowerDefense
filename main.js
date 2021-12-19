function clearCanvas() {
    CANVAS.width = CONTAINER.clientWidth;
    CANVAS.height = CONTAINER.clientHeight;
    new Rect(CONTAINER.clientWidth, CONTAINER.clientHeight, 0, 0, COLORS.DARK_BROWN).fillRect();
}

function changeScene() {
    clearCanvas();

    OBJECTS = [];
    GRID_MAP = [];

    switch(CURRENT_SCENE.ID) {
        case SCENE.MENU:
            USER_PANEL_ID = null;
            initMenuScene();
            break;
        case SCENE.PLAY:
            USER_PANEL_ID = USER_PANEL_TYPE.PLAY;
            initPlayScene();
            break;
        case SCENE.CREATE:
            USER_PANEL_ID = USER_PANEL_TYPE.CREATE;
            initCreateScene();
            break;
        default:
            console.error(`sceneId can't be ${sceneId}`);
    }
}

function onMouseMove(event) {
    mouseOverObj(event.clientX, event.clientY);
}

function mouseOverObj(mX, mY) {
    let unclickableCount = 0;

    OBJECTS.forEach((obj) => {
        if (checkIfMouseOverObj(mX, mY, obj)) {
            obj.clickable = true;
            document.body.style.cursor = "pointer";
        }
        else {
            unclickableCount++;
            obj.clickable = false;
        }
    });

    if(unclickableCount == OBJECTS.length) {
        document.body.style.cursor = "default";
    }
}

function checkIfMouseOverObj(mX, mY, obj) {
    let x, y, w, h;
    if(obj.hasBorder) {
        x = obj.posX - obj.ctx.lineWidth;
        y = obj.posY - obj.ctx.lineWidth;
        w = obj.width + 2 * obj.ctx.lineWidth;
        h = obj.height + 2 * obj.ctx.lineWidth;
    }
    else {
        x = obj.posX;
        y = obj.posY;
        w = obj.width;
        h = obj.height;
    }
    
    if (mX <= x + w &&
        mY <= y + h &&
        mX >= x && mY >= y) {
        return true;
    }
    else {
        return false;
    }
}

CANVAS.addEventListener('click', function(event) {
    OBJECTS.forEach((obj) => {
        if(obj.clickable){
            obj.click?.();
            document.body.style.cursor = "default";
        }
    });
});

async function gameInit() {
    //For preloading custom font
    await delay(50);
    let preloadFontDiv = document.getElementById("preloadFont");
    preloadFontDiv.remove();

    CANVAS.addEventListener('mousemove', onMouseMove);
    CURRENT_SCENE.ID = SCENE.MENU;

}

gameInit();