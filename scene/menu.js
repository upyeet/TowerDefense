function initMenuScene() {
    let btnPosX = CANVAS.width / 2 - BUTTON_WIDTH / 2;
    let playBtn = new Button(btnPosX, 200, COLORS.DARK_GREEN, "Play", BUTTON_TEXT_POSITION.MIDDLE);
    playBtn.drawFilledButton(COLORS.YELLOW_GREEN);
    playBtn.click = function () {
        CURRENT_SCENE.ID = SCENE.PLAY;
    };
    OBJECTS.push(playBtn);

    let createBtn = new Button(btnPosX, 400, COLORS.DARK_GREEN, "Create", BUTTON_TEXT_POSITION.MIDDLE);
    createBtn.drawFilledButton(COLORS.YELLOW_GREEN);
    createBtn.click = function () {
        CURRENT_SCENE.ID = SCENE.CREATE;
    }
    OBJECTS.push(createBtn);
}