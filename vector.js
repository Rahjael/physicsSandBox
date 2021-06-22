class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static dotProduct(v1, v2) {
    return (v1.x * v2.x) + (v1.y * v2.y);
  }
  static getRandom(maxX, maxY) {
    const randX = Math.floor(Math.random() * maxX);
    const randY = Math.floor(Math.random() * maxY);
    return new Vector(randX, randY);
  }
  static getVectorFromPoints(x1, y1, x2, y2) {
    return new Vector(x2 - x1, y2 - y1);
  }
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  multiply(num) {
    return new Vector(this.x * num, this.y * num);
  }
  getNorm() {
    return Math.sqrt(this.x**2 + this.y**2);
  }
  getUnitVector(){
    if(this.getNorm() === 0) {
      return new Vector(0, 0);
    }
    return new Vector(this.x / this.getNorm(), this.y / this.getNorm());
  }
  getComponents() {
    let xVector = new Vector(this.x, 0);
    let yVector = new Vector(0, this.y);
    return [xVector, yVector];
  }
  reverse() {
    return new Vector(this.x *= -1, this.y *= -1);
  }
  
  draw(startX, startY, mult, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.x * mult, startY + this.y * mult);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }
}