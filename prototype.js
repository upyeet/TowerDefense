Array.prototype.removeByProperty = function(property) {
    let temp = this.filter((ele) => {
        return ele[property] === undefined;
    });
    this.splice(0, this.length);
    temp.forEach((ele) => {
        this.push(ele);
    });
}

Array.prototype.deleteByPropertyValue = function (property, value) {
    let temp = this.filter((ele) => {
        return ele[property] !== value;
    });
    this.splice(0, this.length);
    temp.forEach((ele) => {
        this.push(ele);
    })
}

Array.prototype.pushTile = function(tile) {
    let tileObj = {
        id: tile.id,
        type: tile.type,
        posX: tile.posX,
        posY: tile.posY
    }
    this.push(tileObj);
}

Array.prototype.changePropertyValueAtId = function(property, value, id) {
    this.forEach((ele) => {
        if(ele.id === id) {
            this[property] = value;
        }
    });
}

Array.prototype.changeTypeAtId = function(type, id) {
    this.forEach((ele) => {
        if(ele.id !== undefined) {
            if(ele.id === id) {
                let index = this.indexOf(ele);
                if(index > -1) {
                    this[index].type = type;
                }
                else {
                    alert("Incorrect id");
                }
                return;
            }
        }
    });
}
