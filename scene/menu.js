function initMenuScene() {
    var playButton = new Button(COLORS.RED, CANVAS.width / 2, 200, "Play");
    playButton.drawFilledButton(COLORS.WHITE);
    playButton.click = function () {
        CURRENT_SCENE.ID = SCENE.PLAY;
    };
    OBJECTS.push(playButton);
}