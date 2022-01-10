function pathTest1() {
    GRID_MAP = [];
    let tileWidth = 20;
    let startPosX = 10;
    let startPosY = 10;
    let id = 0;

    for(let posVertical = 0; pos < VERTICAL_SQR_COUNT; posVertical++) {
        for(let posHorizontal = 0; pos < HORIZONTAL_SQR_COUNT; posHorizontal) {
            id++;
            GRID_MAP.push(new Tile(tileWidth, tileWidth, startPosX * posHorizontal, startPosY * posVertical, TILE_TYPE.DEFAULT, id));
        }
    }

    let path = getPath();

    console.log(path);
}

function pathTest2() {
    GRID_MAP = [];
    let tileWidth = 20;
    let startPosX = 10;
    let startPosY = 10;
    let id = 0;

    for(let posVertical = 0; pos < VERTICAL_SQR_COUNT; posVertical++) {
        for(let posHorizontal = 0; pos < HORIZONTAL_SQR_COUNT; posHorizontal) {
            id++;
            GRID_MAP.push(new Tile(tileWidth, tileWidth, startPosX * posHorizontal, startPosY * posVertical, TILE_TYPE.ROAD, id));
        }
    }

    let path = getPath();

    console.log(path);
}

function pathTest3() {
    GRID_MAP = [];
    let tileWidth = 20;
    let startPosX = 10;
    let startPosY = 10;
    let id = 0;

    for(let posVertical = 0; pos < VERTICAL_SQR_COUNT; posVertical++) {
        for(let posHorizontal = 0; pos < HORIZONTAL_SQR_COUNT; posHorizontal) {
            id++;
            GRID_MAP.push(new Tile(tileWidth, tileWidth, startPosX * posHorizontal, startPosY * posVertical, TILE_TYPE.WATER, id));
        }
    }

    let path = getPath();

    console.log(path);
}

function pathTest4() {
    GRID_MAP = [];
    let tileWidth = 20;
    let startPosX = 10;
    let startPosY = 10;
    let id = 0;

    for(let posVertical = 0; pos < VERTICAL_SQR_COUNT; posVertical++) {
        for(let posHorizontal = 0; pos < HORIZONTAL_SQR_COUNT; posHorizontal) {
            id++;
            GRID_MAP.push(new Tile(tileWidth, tileWidth, startPosX * posHorizontal, startPosY * posVertical, TILE_TYPE.GRASS, id));
        }
    }

    let path = getPath();

    console.log(path);
}
