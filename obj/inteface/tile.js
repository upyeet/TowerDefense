class Tile extends Rect {
    constructor(width, height, posX, posY, type) {
        super(width, height, posX, posY, getStyle(type));
        this.type = type ?? TILE_TYPE.DEFAULT;
        this.clickable = false;
        this.id = TILE_ID_GENERATOR.ID;
    }
    
    drawTile() {
        this.rectWithBorder(COLORS.YELLOW_GREEN, getStyle(this.type), 2);
    }
}

const TILE_TYPE = {
    DEFAULT: 0,
    GRASS: 1,
    ROAD: 2,
    WATER: 3
}

let TILE_ID_GENERATOR = {
    id: 0,
    get ID() {
        this.id++;
        return this.id;
    },
    set ID(value) {
        this.id = value;
    }
};

let getStyle = function(type) {
    let style;
    switch(type) {
        case (TILE_TYPE.GRASS):
            style = COLORS.GREEN;
            break;
        case (TILE_TYPE.ROAD):
            style = COLORS.YELLOW_GREEN;
            break;
        case (TILE_TYPE.WATER):
            style = COLORS.BLUE;
            break;
        default:
            style = COLORS.DARK_GREEN;
            break;
    }
    return style;
}