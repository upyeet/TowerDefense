class Monster {

    get health() {
        return this._health;
    }

    set health(value) {
        if(value > 0) {
            this._health = value;
        }
        else {
            this.alive = false;
            GOLD.Count += this.reward;
            GRID_MAP[this.path[this.pathIndex - 1]].drawTile();
            removeNotAliveMonsters();
        }
    }

    constructor(type, path) {
        let monsterHealth = 0;
        let reward = 0;
        let colour;
        let incorrectMonster = false;
        switch(type) {
            case (MONSTER_TYPE.LIGHT):
                colour = COLORS.TEA_GREEN;
                monsterHealth = 4;
                reward = 5;
                break;
            case (MONSTER_TYPE.MEDIUM):
                colour = COLORS.NYANZA;
                monsterHealth = 8;
                reward = 10
                break;
            case (MONSTER_TYPE.HEAVY):
                colour = COLORS.ISABELLINE;
                monsterHealth = 16;
                reward = 20;
                break;
            case (MONSTER_TYPE.BOSS):
                colour = COLORS.CHINESE_RED;
                monsterHealth = 32;
                reward = 40;
                break;
            default:
                incorrectMonster = true;
                break;
        }
        

        let diameter = Math.sqrt(TILE_WIDTH * TILE_WIDTH + TILE_HEIGHT * TILE_HEIGHT) * 0.6;
        this.radius = diameter / 2;

        this.colour = colour;

        this.path = path;

        this.pathIndex = 0;

        this.alive = false;

        this.id = MONSTER_ID_GENERATOR;

        this.rectWidth = this.radius * 2;
        this.rectHeight = this.rectWidth;
        this.maxHealth = monsterHealth;
        this._health = monsterHealth;
        this.reward = reward;
    }

    draw(health) {
        if(this.path.length === this.pathIndex) {
            this.alive = false;
            GRID_MAP[this.path[this.pathIndex - 1]].drawTile();
            health.Count -= this.health;
            removeNotAliveMonsters();
        }
        else {
            this.alive = true;
            if(this.pathIndex === 0) {
                this.drawMonster();
                this.pathIndex++;
            }
            else {
                GRID_MAP[this.path[this.pathIndex - 1]].drawTile();
                this.drawMonster();
                this.pathIndex++;
            }
        }
        
    }

    drawMonster() {
        let posX = GRID_MAP[this.path[this.pathIndex]].posX + TILE_WIDTH / 2;
        let posY = GRID_MAP[this.path[this.pathIndex]].posY + TILE_HEIGHT / 2;
        this.posX = posX;
        this.posY = posY;
        let startAngle = Math.PI * 2 * (this.maxHealth - this._health) / this.maxHealth;
        new Circle(this.radius, posX, posY, "#777766").drawFilledWithBorder(COLORS.DARK_BROWN, 0, 2 * Math.PI);
        new Circle(this.radius, posX, posY, this.colour).drawFilledWithBorder(COLORS.DARK_BROWN, startAngle - Math.PI / 2, 3 * Math.PI / 2);
    }
}

function removeNotAliveMonsters() {
    MONSTERS = MONSTERS.filter((enemy) => {
        return enemy.alive === true;
    });
}

const MONSTER_TYPE = {
    LIGHT: 1,
    MEDIUM: 2,
    HEAVY: 3,
    BOSS: 4
}

let MONSTER_ID_GENERATOR = {
    id: 0,
    get ID() {
        this.id++;
        return this.id;
    },
    set ID(value) {
        this.id = value;
    }
};
