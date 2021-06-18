class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static getRandom(maxX, maxY) {
    const randX = Math.floor(Math.random() * maxX);
    const randY = Math.floor(Math.random() * maxY);
    return new Vector(randX, randY);
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
    return new Vector(this.x / this.norm(), this.y / this.norm());
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