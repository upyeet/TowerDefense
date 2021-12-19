Array.prototype.removeByProperty = function(property) {
    let temp = this.filter((ele) => {
        return ele[property] === undefined;
    });
    this.splice(0, this.length);
    temp.forEach((ele) => {
        this.push(ele);
    });
}