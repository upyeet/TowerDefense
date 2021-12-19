let gameRect;
let userPanelRect;

const HORIZONTAL_SQR_COUNT = 8;
const VERTICAL_SQR_COUNT = 6;

let CURRENT_SELECTED_ITEM;

let GRID_MAP = new GridMap();

function initGameRect() {
    w = CONTAINER.clientWidth * GAME_RECT_FACTOR;
    h = CONTAINER.clientHeight * GAME_RECT_FACTOR;
    x = CONTAINER.clientWidth * (1 - GAME_RECT_FACTOR) / 2;
    y = CONTAINER.clientHeight * (1 - GAME_RECT_FACTOR) / 2;
    gameRect = new Rect(w, h, x, y, COLORS.YELLOW_GREEN);
    gameRect.rectWithBorder(COLORS.DARK_GREEN, LINE_WIDTH);
    initUserPanel();
    initGameGrid();
    initUIButtons();
}

function initUIButtons() {
    let margin = 20;
    let backPosX = gameRect.posX - LINE_WIDTH;
    let backPosY = gameRect.posY + gameRect.height + margin
    
    let backBtn = new Button(backPosX, backPosY, COLORS.DARK_GREEN, "Back", BUTTON_TEXT_POSITION.MIDDLE);
    backBtn.drawFilledButton(COLORS.YELLOW_GREEN);

    backBtn.click = function () {
        CURRENT_SCENE.ID = PREVIOUS_SCENE_ID;
    }

    OBJECTS.push(backBtn);

    if(CURRENT_SCENE.ID === SCENE.CREATE) {
        let savePosX = gameRect.posX + gameRect.width + LINE_WIDTH - BUTTON_WIDTH;
        let savePosY = backPosY;
        let clearPosX = (gameRect.width - 3 * BUTTON_WIDTH) / 2 + backPosX + BUTTON_WIDTH;
        let clearPosY = savePosY;

        let saveBtn = new Button(savePosX, savePosY, COLORS.DARK_GREEN, "Save", BUTTON_TEXT_POSITION.MIDDLE);
        let clearBtn = new Button(clearPosX, clearPosY, COLORS.DARK_GREEN, "Clear", BUTTON_TEXT_POSITION.MIDDLE);
        saveBtn.drawFilledButton(COLORS.YELLOW_GREEN);
        clearBtn.drawFilledButton(COLORS.YELLOW_GREEN);
        saveBtn.click = function () {
            saveMap(GRID_MAP);
            alert("Map saved");
        }
        clearBtn.click = function () {
            GRID_MAP = [];
            TILE_ID_GENERATOR.ID = 0;
            //ONLY Tiles have id, not the best method to clear tiles out of objects when redrawing
            OBJECTS.removeByProperty("id");
            initGameGrid();
        }

        OBJECTS.push(saveBtn);
        OBJECTS.push(clearBtn);
    }
}

function initGameGrid() {
    let gameGridWidth = gameRect.width - userPanelRect.width - 2 * LINE_WIDTH;
    let gameGridHeight = gameRect.height - 2 * LINE_WIDTH;

    let sqrWidth = gameGridWidth / HORIZONTAL_SQR_COUNT;
    let sqrHeight = gameGridHeight / VERTICAL_SQR_COUNT;

    let startingPosX = gameRect.posX + LINE_WIDTH;
    let startingPosY = gameRect.posY + LINE_WIDTH;

    switch(CURRENT_SCENE.ID) {
        case (SCENE.PLAY):

            break;
        case (SCENE.CREATE):
            drawTilesOnGameGrid(startingPosX, startingPosY, sqrWidth, sqrHeight, gameGridWidth, gameGridHeight, null);
            break;
    }

}

function drawTilesOnGameGrid(startingPosX, startingPosY, sqrWidth, sqrHeight, gameGridWidth, gameGridHeight, map) {
    if(map) {

    }   
    else {
        for(let currentYPos = startingPosY; currentYPos < startingPosY + gameGridHeight; currentYPos += sqrHeight) {
            for(let currentXPos = startingPosX; currentXPos < startingPosX + gameGridWidth; currentXPos += sqrWidth) {
                let tile = new Tile(sqrWidth, sqrHeight, currentXPos, currentYPos, null);
                tile.drawTile();
                tile.click = tileClick;
                OBJECTS.push(tile);
            }
        }
    }
}

let tileClick = function() {
    if(CURRENT_SELECTED_ITEM) {
        switch(USER_PANEL_ID) {
            case (USER_PANEL_TYPE.PLAY) :
                
                break;
            case (USER_PANEL_TYPE.CREATE) : 
                this.type = CURRENT_SELECTED_ITEM.type;
                this.drawTile();
                break;
        }
    }
    else {
        alert("You must select a tile type first!");
    }
}

function initUserPanel() {
    w = gameRect.width * USER_PANEL_FACTOR;
    h = gameRect.height;
    x = gameRect.posX + gameRect.width * (1 - USER_PANEL_FACTOR);
    y = gameRect.posY;
    userPanelRect = new Rect(w, h, x, y, COLORS.YELLOW_GREEN);
    userPanelRect.rectWithBorder(COLORS.DARK_GREEN, LINE_WIDTH);

    switch(USER_PANEL_ID) {
        case (USER_PANEL_TYPE.PLAY) :
            
            break;
        case (USER_PANEL_TYPE.CREATE) :
            initCreateButtons();
            break;
    }
}

let userPanelBtnClick = function() {
    if(CURRENT_SELECTED_ITEM !== undefined) {
        if(CURRENT_SELECTED_ITEM.borderDrawn) {
            let unselectRect = CURRENT_SELECTED_ITEM.border;
            unselectRect.rect(COLORS.YELLOW_GREEN, null, null);
            CURRENT_SELECTED_ITEM.borderDrawn = false;
            if(CURRENT_SELECTED_ITEM.type === this.type) {
                CURRENT_SELECTED_ITEM = undefined;
                return;
            }
        }
    }
    CURRENT_SELECTED_ITEM = this;

    let multiplier = 1.4;
    
    let borderW = CURRENT_SELECTED_ITEM.width * multiplier + LINE_WIDTH;
    let borderH = CURRENT_SELECTED_ITEM.height * multiplier + LINE_WIDTH;

    let borderX = CURRENT_SELECTED_ITEM.posX - (borderW - CURRENT_SELECTED_ITEM.width) / 2;
    let borderY = CURRENT_SELECTED_ITEM.posY - (borderH - CURRENT_SELECTED_ITEM.height) / 2 - LINE_WIDTH - 5;

    let border = new Rect(borderW, borderH, borderX, borderY, COLORS.DARK_GREEN);
    border.rect(null, 5, null);
    CURRENT_SELECTED_ITEM.border = border;
    CURRENT_SELECTED_ITEM.borderDrawn = true;
}

function initCreateButtons() {
    let margin = 100;
    let btnWidth = userPanelRect.width * 0.4;
    let btnHeight = btnWidth;
    let posXInUserPanel = userPanelRect.posX + (userPanelRect.width - btnWidth) / 2;
    let posYInUserPanel = userPanelRect.posY + userPanelRect.height / 10;
    let grassBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.GREEN, "Grass", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    posYInUserPanel = grassBtn.posY + btnWidth + margin;
    let roadBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.YELLOW_GREEN, "Road", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    posYInUserPanel = roadBtn.posY + btnWidth + margin;
    let waterBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.BLUE, "Water", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    grassBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    roadBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
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

