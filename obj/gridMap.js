class GridMap {
    constructor() {
        this.tiles = [];
    }

    pushTile(tile) {
        let tileObj = {
            id: tile.Id,
            type: tile.type
        }
        this.tiles.push(tileObj);
    }

}