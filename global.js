const CONTAINER = document.getElementById("background");
const CANVAS = document.getElementById("mainCanvas");
const CONTEXT = CANVAS.getContext("2d");

const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 50;

var CURRENT_SCENE = {
    id: null,
    get ID() {
        return this.id;
    },
    set ID(value) {
        this.id = value;
        changeScene();
    }
};

var OBJECTS = [];

