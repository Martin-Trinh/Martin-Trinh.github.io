export default class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    // return distance from origin
    distance(){
        return Math.sqrt(this.x**2 + this.y**2);
    }
    // return new position by adding vec to this position
    add(vec){
        return new Position(this.x + vec.x, this.y + vec.y);
    }
    //  return new position by subtracting vec from this position
    multiply(scalar){
        return new Position(this.x * scalar, this.y * scalar);
    }
    // return direction of this position/vector
    getDirection(){
        if(this.distance() === 0)
            return new Position(0, 0);
        return new Position(this.x / this.distance(), this.y / this.distance());
    }
    equal(other){
        return this.x === other.x && this.y === other.y;
    }
    // return distance between this position and other position
    distanceTo(other){
        return Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2);
    }
    // return true if this position is between start and end position
    between(start, end){
        if(this.x === start.x){
            return this.y >= start.y && this.y <= end.y || this.y <= start.y && this.y >= end.y;
        }
        if(this.y === start.y){
            return this.x >= start.x && this.x <= end.x || this.x <= start.x && this.x >= end.x;
        }
        return false;
    }
}