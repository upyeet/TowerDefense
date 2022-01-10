let gameRect;
let userPanelRect;

const HORIZONTAL_SQR_COUNT = 8;
const VERTICAL_SQR_COUNT = 6;

let CURRENT_SELECTED_ITEM;

let GRID_MAP = [];

function initGameRect() {
    w = CONTAINER.clientWidth * GAME_RECT_FACTOR;
    h = CONTAINER.clientHeight * GAME_RECT_FACTOR;
    x = CONTAINER.clientWidth * (1 - GAME_RECT_FACTOR) / 2;
    y = CONTAINER.clientHeight * (1 - GAME_RECT_FACTOR) / 2;
    gameRect = new Rect(w, h, x, y, COLORS.YELLOW_GREEN);
    gameRect.rectWithBorder(COLORS.DARK_GREEN, LINE_WIDTH, null);
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
        GRID_MAP = [];
        TILE_ID_GENERATOR.ID = 0;
        //ONLY Tiles have id
        OBJECTS.removeByProperty("id");
        location.reload();
    }

    OBJECTS.push(backBtn);

    let middleBtnPosX = (gameRect.width - 3 * BUTTON_WIDTH) / 2 + backPosX + BUTTON_WIDTH;
    let middleBtnPosY = backPosY;
    let rightBtnPosX = gameRect.posX + gameRect.width + LINE_WIDTH - BUTTON_WIDTH;
    let rightBtnPosY = backPosY;

    switch (CURRENT_SCENE.ID) {
        case (SCENE.PLAY) :
            let loadBtn = new Button(rightBtnPosX, rightBtnPosY, COLORS.DARK_GREEN, "Load", BUTTON_TEXT_POSITION.MIDDLE);
            let startBtn = new Button(middleBtnPosX, middleBtnPosY, COLORS.DARK_GREEN, "Start", BUTTON_TEXT_POSITION.MIDDLE);

            loadBtn.drawFilledButton(COLORS.YELLOW_GREEN);
            startBtn.drawFilledButton(COLORS.YELLOW_GREEN);
            loadBtn.click = function () {
                let upload = document.getElementById("uploadFile");
                upload.click();
            }
            startBtn.click = function () {
                play();
            }

            OBJECTS.push(loadBtn);
            OBJECTS.push(startBtn);
            break;
        case (SCENE.CREATE) :
            let saveBtn = new Button(rightBtnPosX, rightBtnPosY, COLORS.DARK_GREEN, "Save", BUTTON_TEXT_POSITION.MIDDLE);
            let clearBtn = new Button(middleBtnPosX, middleBtnPosY, COLORS.DARK_GREEN, "Clear", BUTTON_TEXT_POSITION.MIDDLE);
            saveBtn.drawFilledButton(COLORS.YELLOW_GREEN);
            clearBtn.drawFilledButton(COLORS.YELLOW_GREEN);
            saveBtn.click = function () {
                //map validation here needed
                saveMap(GRID_MAP);
                alert("Map saved");
                location.reload();
            }
            clearBtn.click = function () {
                GRID_MAP = [];
                TILE_ID_GENERATOR.ID = 0;
                //ONLY Tiles have id
                OBJECTS.removeByProperty("id");
                initGameGrid();
            }

            OBJECTS.push(saveBtn);
            OBJECTS.push(clearBtn);
            break;
    }
}

function initGameGrid(load = null) {
    let gameGridWidth = gameRect.width - userPanelRect.width - 2 * LINE_WIDTH;
    let gameGridHeight = gameRect.height - 2 * LINE_WIDTH;

    TILE_WIDTH = gameGridWidth / HORIZONTAL_SQR_COUNT;
    TILE_HEIGHT = gameGridHeight / VERTICAL_SQR_COUNT;

    let startingPosX = gameRect.posX + LINE_WIDTH;
    let startingPosY = gameRect.posY + LINE_WIDTH;

    switch(CURRENT_SCENE.ID) {
        case (SCENE.PLAY):
            if(load) {
                drawTilesOnGameGrid(startingPosX, startingPosY, TILE_WIDTH, TILE_HEIGHT, gameGridWidth, gameGridHeight, true);
            }
            else {
                drawTilesOnGameGrid(startingPosX, startingPosY, TILE_WIDTH, TILE_HEIGHT, gameGridWidth, gameGridHeight, null);
            }          
            break;
        case (SCENE.CREATE):
            drawTilesOnGameGrid(startingPosX, startingPosY, TILE_WIDTH, TILE_HEIGHT, gameGridWidth, gameGridHeight, null);
            break;
    }
}

function drawTilesOnGameGrid(startingPosX, startingPosY, sqrWidth, sqrHeight, gameGridWidth, gameGridHeight, map) {
    if(map) {
        let pos = 0;
        TILE_ID_GENERATOR.ID = 0;
        for(let currentYPos = startingPosY; currentYPos < startingPosY + gameGridHeight; currentYPos += sqrHeight) {
            for(let currentXPos = startingPosX; currentXPos < startingPosX + gameGridWidth; currentXPos += sqrWidth) {
                let tile = new Tile(sqrWidth, sqrHeight, currentXPos, currentYPos, GRID_MAP[pos].type);
                tile.drawTile();
                OBJECTS.changeTypeAtId(GRID_MAP[pos].type, tile.id);
                pos++;
            }
        }
    }   
    else {
        for(let currentYPos = startingPosY; currentYPos < startingPosY + gameGridHeight; currentYPos += sqrHeight) {
            for(let currentXPos = startingPosX; currentXPos < startingPosX + gameGridWidth; currentXPos += sqrWidth) {
                let tile = new Tile(sqrWidth, sqrHeight, currentXPos, currentYPos, null);
                tile.drawTile();
                tile.click = tileClick;
                GRID_MAP.pushTile(tile);
                OBJECTS.push(tile);
            }
        }
    }
}

function tileClick() {
    if(CURRENT_SELECTED_ITEM) {
        switch(USER_PANEL_ID) {
            case (USER_PANEL_TYPE.PLAY) :
                if(validatePositionToPlace(this.type)) {
                    if(GOLD) {
                        if(GOLD.Count - CURRENT_SELECTED_ITEM.cost >= 0) {
                            let map = GRID_MAP.map((ele) => {
                                return ele.id;
                            });
                            let index = map.indexOf(this.id);
                            let tower = new Tower(CURRENT_SELECTED_ITEM.type, this.id, index, this.posX, this.posY);
                            TOWERS.push(tower);
                            tower.buff();
                            GOLD.Count -= CURRENT_SELECTED_ITEM.cost;
                            this.type = CURRENT_SELECTED_ITEM.type;
                            GRID_MAP.changeTypeAtId(this.type, this.id);
                            this.drawTile();
                        }
                    }
                }
                else {
                    alert("Can't place tower on road or water");
                }
                break;
            case (USER_PANEL_TYPE.CREATE) : 
                this.type = CURRENT_SELECTED_ITEM.type;
                GRID_MAP.changeTypeAtId(this.type, this.id);
                this.drawTile();
                break;
        }
    }
    else {
        alert("You must select a tile type first!");
    }
}

function changeTypeAtId(type, id) {
    this.tiles.forEach((ele) => {
        if(ele.id === id) {
            let index = this.tiles.indexOf(ele);
            if(index > -1) {
                this.tiles[index].type = type;
            }
            else {
                alert("Incorrect id");
            }
            return;
        }
    });
}

function userPanelBtnClick() {
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

function initUserPanel() {
    w = gameRect.width * USER_PANEL_FACTOR;
    h = gameRect.height;
    x = gameRect.posX + gameRect.width * (1 - USER_PANEL_FACTOR);
    y = gameRect.posY;
    userPanelRect = new Rect(w, h, x, y, COLORS.YELLOW_GREEN);
    userPanelRect.rectWithBorder(COLORS.DARK_GREEN, LINE_WIDTH, null);

    switch(USER_PANEL_ID) {
        case (USER_PANEL_TYPE.PLAY) :
            initPlayButtons();
            break;
        case (USER_PANEL_TYPE.CREATE) :
            initCreateButtons();
            break;
    }
}

