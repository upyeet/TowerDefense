function saveMap(gridMap) {
    saveAs(new Blob([JSON.stringify(gridMap)], {type: "text/plain"}), "map.txt");
}

function loadMap(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
        let temp = JSON.parse(e.target.result);
        GRID_MAP = [];
        temp.forEach(element => {
            let tile = new Tile(TILE_WIDTH, TILE_HEIGHT, element.posX, element.posY, element.type, element.id);
            GRID_MAP.push(tile);
        });
        initGameGrid(true);
        file = null;
    }

    reader.readAsText(file);
}
