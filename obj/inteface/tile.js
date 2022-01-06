class Tile extends Rect {
    constructor(width, height, posX, posY, type, id = null) {
        super(width, height, posX, posY, getStyle(type));
        this.type = type ?? TILE_TYPE.DEFAULT;
        this.clickable = false;
        this.id = id ?? TILE_ID_GENERATOR.ID;
    }
    
    drawTile() {
        this.ctx.fillStyle = getStyle(this.type);
        this.rectWithBorder(COLORS.YELLOW_GREEN, 2);
    }
}

const TILE_TYPE = {
    DEFAULT: 0,
    GRASS: 1,
    ROAD: 2,
    WATER: 3,
    ATTACK: 4,
    BUFF: 5,
    SLOW: 6
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

function getStyle(type) {
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
        case (TILE_TYPE.ATTACK):
            style = COLORS.RED;
            break;
        case (TILE_TYPE.BUFF):
            style = COLORS.ORANGE;
            break;
        case (TILE_TYPE.SLOW):
            style = COLORS.ICE_BLUE;
            break;
        default:
            style = COLORS.DARK_GREEN;
            break;
    }
    return style;
}