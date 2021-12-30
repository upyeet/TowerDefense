class Monster {
    constructor(type, path) {
        let health = 0;
        let speed = 1;
        let colour;
        switch(type) {
            case (MONSTER_TYPE.LIGHT):
                colour = COLORS.TEA_GREEN;
                health = 2;
                break;
            case (MONSTER_TYPE.MEDIUM):
                colour = COLORS.NYANZA;
                health = 4;
                break;
            case (MONSTER_TYPE.HEAVY):
                colour = COLORS.ISABELLINE;
                health = 8;
                break;
            case (MONSTER_TYPE.BOSS):
                colour = COLORS.CHINESE_RED;
                health = 16;
                break;
        }
        this.health = health;
        this.speed = speed;

        let diameter = Math.sqrt(TILE_WIDTH * TILE_WIDTH + TILE_HEIGHT * TILE_HEIGHT) * 0.6;
        this.radius = diameter / 2;

        this.colour = colour;

        this.path = path;

        this.pathIndex = 0;

        this.alive = true;
    }

    draw(health) {
        if(this.alive) {
            if(this.path.length === this.pathIndex) {
                GRID_MAP[this.path[this.pathIndex - 1]].drawTile();
                this.alive = false;
                health.Count -= this.health;
            }
            else {
                if(this.pathIndex === 0) {
                    this.drawMonster()
                    this.pathIndex++;
                }
                else {
                    GRID_MAP[this.path[this.pathIndex - 1]].drawTile();
                    this.drawMonster();
                    this.pathIndex++;
                }
            }
        }
    }

    drawMonster() {
        let posX = GRID_MAP[this.path[this.pathIndex]].posX + TILE_WIDTH / 2;
        let posY = GRID_MAP[this.path[this.pathIndex]].posY + TILE_HEIGHT / 2;
        new Circle(this.radius, posX, posY, this.colour).drawFilledWithBorder(COLORS.DARK_BROWN);
    }
}

const MONSTER_TYPE = {
    LIGHT: 1,
    MEDIUM: 2,
    HEAVY: 3,
    BOSS: 4
}
