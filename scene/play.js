function initPlayScene() {
    initGameRect();

}

function validatePositionToPlace(type) {
    let valid = false;
    if(type !== TILE_TYPE.ROAD && type !== TILE_TYPE.WATER) {
        valid = true;
    }
    return valid;
}

function initPlayButtons() {
    let margin = 100;
    let btnWidth = userPanelRect.width * 0.4;
    let btnHeight = btnWidth;
    let posXInUserPanel = userPanelRect.posX + (userPanelRect.width - btnWidth) / 2;
    let posYInUserPanel = userPanelRect.posY + userPanelRect.height / 10;

    let attackBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.RED, "Attack", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    attackBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    posYInUserPanel = attackBtn.posY + btnWidth + margin;
    let buffBtn = new Button(posXInUserPanel, posYInUserPanel, COLORS.ORANGE, "Buff", BUTTON_TEXT_POSITION.ABOVE, btnWidth, btnHeight);
    buffBtn.drawButtonWithBorder(COLORS.DARK_GREEN, COLORS.DARK_GREEN, LINE_WIDTH);
    
    attackBtn.type = TILE_TYPE.ATTACK;
    buffBtn.type = TILE_TYPE.BUFF;

    attackBtn.cost = 20;
    buffBtn.cost = 30;

    attackBtn.click = userPanelBtnClick;
    buffBtn.click = userPanelBtnClick;

    OBJECTS.push(attackBtn);
    OBJECTS.push(buffBtn);
}

function findStartingPointForLevel() {
    let found = false;
    let index = 0;
    for(let pos = 0; pos <= HORIZONTAL_SQR_COUNT * (VERTICAL_SQR_COUNT - 1); ) {
        if(GRID_MAP[pos].type === TILE_TYPE.ROAD) {
            GRID_MAP[pos].start = true;
            found = true;
            index = pos;
            break;
        }

        if(pos > HORIZONTAL_SQR_COUNT - 1) {
            if(GRID_MAP[pos].type === TILE_TYPE.ROAD) {
                GRID_MAP[pos].start = true;
                found = true;
                index = pos;
                break;
            }
            pos += 8;
        }
        else {
            pos++;
        }
    }

    if(!found) {
        alert("Invalid map");
        return -1;
    }
    return index;
}

function getPath() {
    let pathSequence = [];
    let currentRoadIndex = findStartingPointForLevel();
    let previousRoadIndex = currentRoadIndex;
    pathSequence.push(previousRoadIndex);

    if(currentRoadIndex === 0) {
        if(GRID_MAP[currentRoadIndex + 1].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 1;
        }
        else if(GRID_MAP[currentRoadIndex + 8].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 8;
        }
    }
    else if(currentRoadIndex > 8) {
        if(GRID_MAP[currentRoadIndex - 8].type === TILE_TYPE.ROAD) {
            currentRoadIndex -= 8;
        }
        else if(GRID_MAP[currentRoadIndex + 1].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 1;
        }
        else if(GRID_MAP[currentRoadIndex + 8].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 8;
        }
    }
    else {
        if(GRID_MAP[currentRoadIndex + 8].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 8;
        }
        else if(GRID_MAP[currentRoadIndex - 1].type === TILE_TYPE.ROAD) {
            currentRoadIndex -= 1;
        }
        else if(GRID_MAP[currentRoadIndex + 1].type === TILE_TYPE.ROAD) {
            currentRoadIndex += 1;
        }
    }

    pathSequence.push(currentRoadIndex);

    let roadCount = 0;
    GRID_MAP.forEach((tile) => {
        if(tile.type === TILE_TYPE.ROAD) {
            roadCount++;
        }
    });

    let found = false;
    while(!found) {
        if(roadCount === pathSequence.length) {
            found = true;
            break;
        }

        if(currentRoadIndex > 8 && GRID_MAP[currentRoadIndex - 8].type === TILE_TYPE.ROAD && currentRoadIndex - 8 !== previousRoadIndex) {
            previousRoadIndex = currentRoadIndex;
            currentRoadIndex -= 8;
            pathSequence.push(currentRoadIndex);
            continue;
        }
        else if(GRID_MAP[currentRoadIndex - 1].type === TILE_TYPE.ROAD && currentRoadIndex - 1 !== previousRoadIndex) {
            previousRoadIndex = currentRoadIndex;
            currentRoadIndex -= 1;
            pathSequence.push(currentRoadIndex);
            continue;
        }
        else if(GRID_MAP[currentRoadIndex + 1].type === TILE_TYPE.ROAD && currentRoadIndex + 1 !== previousRoadIndex) {
            previousRoadIndex = currentRoadIndex;
            currentRoadIndex += 1;
            pathSequence.push(currentRoadIndex);
            continue;
        }
        else if(GRID_MAP[currentRoadIndex + 8].type === TILE_TYPE.ROAD && currentRoadIndex + 8 !== previousRoadIndex) {
            previousRoadIndex = currentRoadIndex;
            currentRoadIndex += 8;
            pathSequence.push(currentRoadIndex);
            continue;
        }
    }

    return pathSequence;
}


function play() {
    let margin = 40;
    let leftPosX = gameRect.posX * 2 - margin;
    let leftPosY = gameRect.posY - margin;
    let middlePosX = (gameRect.width - 3 * BUTTON_WIDTH) / 2 + leftPosX + BUTTON_WIDTH;
    let middlePosY = leftPosY;
    let rightPosX = gameRect.posX / 2 + gameRect.width - margin * 2;
    let rightPosY = leftPosY;
    let countWidth = getTextWidth(" 100");
    let countHeight = getTextHeight("100");

    let goldTextBlock = new TextBlock(COLORS.YELLOW_GREEN);
    goldTextBlock.draw(leftPosX, leftPosY, "Gold:");
    let goldPosX = leftPosX + getTextWidth("Gold:");
    GOLD = createCounter(countWidth, countHeight, goldPosX, leftPosY);

    let healthTextBlock = new TextBlock(COLORS.YELLOW_GREEN);
    healthTextBlock.draw(middlePosX, middlePosY, "Health:");
    let healthPosX = middlePosX + getTextWidth("Health:");
    let health = createCounter(countWidth, countHeight, healthPosX, middlePosY);
    
    GOLD.Count = 100;
    health.Count = 100;

    let enemyCount = {
        light: 2,
        medium: 1,
        heavy: 0
    };

    let addedEnemyCount = {
        light: 4,
        medium: 2,
        heavy: 1
    }

    let currentEnemyCount = {
        light: 0,
        medium: 0,
        heavy: 0
    };

    let time = 0;
    let path = getPath();

    let currentLevel = 0;
    let levelCount = 2;

    let playLoop = setInterval(function(){
        if (time % 1000 === 0) {
            if (currentEnemyCount.light < enemyCount.light) {
                currentEnemyCount.light++;
                MONSTERS.push(new Monster(MONSTER_TYPE.LIGHT, path));
            }
            else if (currentEnemyCount.medium < enemyCount.medium && currentEnemyCount.light === enemyCount.light) {
                currentEnemyCount.medium++;
                MONSTERS.push(new Monster(MONSTER_TYPE.MEDIUM, path));
            }
            else if (currentEnemyCount.heavy < enemyCount.heavy && currentEnemyCount.medium === enemyCount.medium) {
                currentEnemyCount.heavy++;
                MONSTERS.push(new Monster(MONSTER_TYPE.HEAVY, path));
            }
        }

        if (time % 500 === 0) {
            MONSTERS.forEach((monster) => {
                monster.draw(health);
            });

            TOWERS.forEach((tower) => {
                tower.action();
            });
        }
        
        if(MONSTERS.length === 0) {
            if (currentEnemyCount.light === enemyCount.light &&
                currentEnemyCount.medium === enemyCount.medium &&
                currentEnemyCount.heavy === enemyCount.heavy) {
                currentLevel++;
                if(currentLevel === levelCount) {
                    clearInterval(playLoop);
                    alert("Congratulations!");
                    location.reload();
                    return;
                }
                
                alert("Level: " + currentLevel);
                enemyCount.light += addedEnemyCount.light;
                enemyCount.medium += addedEnemyCount.medium;
                enemyCount.heavy += addedEnemyCount.heavy;
                currentEnemyCount.light = 0;
                currentEnemyCount.medium = 0;
                currentEnemyCount.heavy = 0;
            }
        }

        if(health.Count < 0) {
            clearInterval(playLoop);
            alert("Game over");
            CURRENT_SCENE.ID = SCENE.MENU;
            location.reload();
            return;
        }

        time += 10;
    }, 10); //100fps
    
}

function createCounter(width, height, posX, posY) {
    let counter = {
        count: null,
        width: width,
        height: height,
        posX: posX,
        posY: posY,
        get Count() {
            return this.count;
        },
        set Count(value) {
            this.count = value;
            new Rect(this.width, this.height, this.posX - this.width / 2, this.posY - this.height / 2, COLORS.DARK_BROWN).fillRect(null);
            new TextBlock(COLORS.YELLOW_GREEN).draw(this.posX, this.posY, this.count);
        }
    }

    return counter;
}
