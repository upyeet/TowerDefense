class Tower {
    constructor(type) {
        let range = 1;
        switch(type) {
            case (TOWER_TYPE.DAMAGE):
                this.damage = 2;
                this.attackSpeed = 1
                this.style = COLORS.RED;
                break;
            case (TOWER_TYPE.BUFF):
                this.addedDamage = 3;
                range = 2;
                this.style = COLORS.ORANGE;
                break;
            case (TOWER_TYPE.SLOW):
                this.attackSpeed = 0.5
                this.slow = 0.4;
                this.style = COLORS.ICE_BLUE;
                break;
        }
        this.range = range;
    }
}

const TOWER_TYPE = {
    DAMAGE: 1,
    BUFF: 2,
    SLOW: 3
}