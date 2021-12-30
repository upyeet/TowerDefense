function initCreateScene() {
    initGameRect();
}

function initCreateButtons() {
    let margin = 100;
    let btnWidth = userPanelRect.width * 0.4;
    let btnHeight = btnWidth;
    let posXInUserPanel = userPanelRect.posX + (userPanelRect.width - btnWidth) / 2;
    let posYInUserPanel = userPanelRect.posY + userPanelRect.height / 10;
    let grassBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.GREEN, "Grass", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    grassBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    posYInUserPanel = grassBtn.posY + btnWidth + margin;
    let roadBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.YELLOW_GREEN, "Road", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    roadBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    posYInUserPanel = roadBtn.posY + btnWidth + margin;
    let waterBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.BLUE, "Water", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    waterBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    
    grassBtn.type = TILE_TYPE.GRASS;
    roadBtn.type = TILE_TYPE.ROAD;
    waterBtn.type = TILE_TYPE.WATER;

    grassBtn.click = userPanelBtnClick;
    roadBtn.click = userPanelBtnClick;
    waterBtn.click = userPanelBtnClick;
    
    OBJECTS.push(grassBtn);
    OBJECTS.push(roadBtn);
    OBJECTS.push(waterBtn);
}
