const CONTAINER = document.getElementById("background");
const CANVAS = document.getElementById("mainCanvas");
const CONTEXT = CANVAS.getContext("2d");

const BUTTON_WIDTH = 300;
const BUTTON_HEIGHT = 70;
const LINE_WIDTH = 10;

const GAME_RECT_FACTOR = 0.8;

const USER_PANEL_FACTOR = 0.25;

const delay = ms => new Promise(res => setTimeout(res, ms));

const COLORS = {
    DARK_BROWN: "#1a1714",
    DARK_GREEN: "#38403a",
    GREEN: "#617851",
    YELLOW_GREEN: "#b3b282",
    BLUE: "#2A655F",
    ORANGE: "#D4AA7D",
    RED: "#941B0C",
    LIGHT_RED: "#d62913",
    ICE_BLUE: "#95B8D1",
    CHINESE_RED: "#A3320B",
    ISABELLINE: "#F5F1ED",
    NYANZA: "#E5FFDE",
    TEA_GREEN: "#C4F1BE"
};

const SCENE = {
    MENU: 1,
    PLAY: 2,
    PLAY_SELECT: 3,
    CREATE: 4
};

const USER_PANEL_TYPE = {
    PLAY: 1,
    CREATE: 2
}

let PREVIOUS_SCENE_ID;

let CURRENT_SCENE = {
    id: null,
    get ID() {
        return this.id;
    },
    set ID(value) {
        PREVIOUS_SCENE_ID = this.id;
        this.id = value;
        changeScene();
    }
};

let OBJECTS = [];
let USER_PANEL_ID;

let TILE_WIDTH, TILE_HEIGHT;

let GOLD;

let MONSTERS = [];
let TOWERS = [];