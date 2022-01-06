class Tower {
    constructor(type, id, gridMapIndex, posX, posY) {
        let range = 1;
        switch(type) {
            case (TILE_TYPE.ATTACK):
                this.damage = 2;
                this.attackSpeed = 1
                this.style = COLORS.RED;
                this.buffed = false;
                break;
            case (TILE_TYPE.BUFF):
                this.addedDamage = 3;
                range = 1;
                this.style = COLORS.ORANGE;              
                break;
        }
        this.range = range;
        this.id = id;
        this.gridMapIndex = gridMapIndex;
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.rangeWidth = (this.range * 2 + 1) * TILE_WIDTH;
        this.rangeHeight = (this.range * 2 + 1) * TILE_HEIGHT;
        this.rangePosX = this.posX - TILE_WIDTH;
        this.rangePosY = this.posY - TILE_HEIGHT;
    }

    action() {
        if(this.type = TILE_TYPE.ATTACK) {
            this.attack();
        }
    }

    attack() {
        MONSTERS.forEach((monster) => {
            if (this.checkIfInRange(monster)) {
                    monster.health -= this.damage;
                }
        });
    }

    buff() {
        if(this.type === TILE_TYPE.BUFF) {
            TOWERS.forEach((tower) => {
                if(tower.type === TILE_TYPE.ATTACK) {
                    if (this.checkIfInRange(tower)) {
                        tower.damage += this.addedDamage;
                    }
                }
            });
        }
        else {
            TOWERS.forEach((tower) => {
                if(tower.type === TILE_TYPE.BUFF) {
                    if (this.checkIfInRange(tower)) {
                        this.damage += tower.addedDamage;
                    }
                }
            });
        }
    }

    checkIfInRange(object) {
        let inRange = false;
        if (object.posX >= this.rangePosX &&
            object.posX <= this.rangePosX + this.rangeWidth &&
            object.posY >= this.rangePosY &&
            object.posY <= this.rangePosY + this.rangeHeight) {
                inRange = true;
        }
        return inRange
    }
}