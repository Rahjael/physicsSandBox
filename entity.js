class Entity {
  constructor(x, y, radius, mass, isDraggable, isCollidable, isGravitable) {
    // Properties
    
    this.radius       = radius;
    this.pos          = new Vector(x, y);
    this.vel          = new Vector(0, 0);
    this.accel        = new Vector(0, 0);
    this.accelMag     = 1;
    this.elasticity   = 1;
    this.mass         = mass;
    this.color        = {
      inner: UTILS.getRandomRGB_A(), // {R: , G: , B: , alpha: }
      outer: UTILS.getRandomRGB_A(),
      getInner() { return 'rgba(' + this.inner.R + ', ' + this.inner.G + ', ' + this.inner.B + ', ' + this.inner.alpha + ')' },
      getOuter() { return 'rgb(' + this.outer.R + ', ' + this.outer.G + ', ' + this.outer.B + ')' }
    }
    this.lineWidth = 1;
    
    // Flags
    this.isDraggable = isDraggable;
    this.isCollidable = isCollidable;
    this.isGravitable = isGravitable;

    this.shouldDrawVectors = true;




    // Storage
    this.previous = {};
  }

  update() {
    this.updateMovement();    
    return this;
  }

  updateMovement() {
    this.acc = this.accel.getUnitVector().multiply(this.accelMag);
    this.vel = this.vel.add(this.acc).multiply(ENVIRONMENT.friction);
    this.pos = this.pos.add(this.vel);


    // Adjust for boundaries and reverse velocity
    // Bottom
    if(this.pos.y > canvas.height - this.radius) {
      this.pos.y = canvas.height - this.radius;
      this.vel.y *= -1;
    }
    // Left
    if(this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.vel.x *= -1;
    }
    // Up
    if(this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.vel.y *= -1;
    }
    // Right
    if(this.pos.x > canvas.width - this.radius) {
      this.pos.x = canvas.width - this.radius;
      this.vel.x *= -1;
    }

    if(this.isGravitable) {
      this.vel = this.vel.add(ENVIRONMENT.gravity);
    }

    return this;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color.getOuter();
    ctx.fillStyle = this.color.getInner();
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    if(this.shouldDrawVectors) this.drawVectors();

    return this;
  }

  drawVectors() {
    // TODO
  }

  containsPoint = (x, y) => {
    let dist = Math.hypot(this.pos.x - x, this.pos.y - y);
    if(dist < this.radius) return true;
    else return false;
  }

  randomizeVelocity() {
    this.vel.x = Math.random() * 10;
    this.vel.y = Math.random() * 10;
  }

  isInsideCanvas() {
    if(this.pos.x < 0 || this.pos.x > canvas.width || this.pos.y < 0 || this.pos.y > canvas.height) return false;
    return true;
  }
}

