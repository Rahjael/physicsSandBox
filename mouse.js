

class Mouse {
  constructor() {
    this.pos = new Vector(0, 0);

    this.isDown = false;
    this.isDragging = false;

    this.selectedEntity = undefined;
  }

  detectSelection(entitiesArray) {
    // Save colors for restoring after deselection
    if(this.selectedEntity != undefined) {
      this.selectedEntity.color.inner = this.selectedEntity.previous.inner;
      this.selectedEntity.color.outer = this.selectedEntity.previous.outer;
      this.lineWidth = this.selectedEntity.previous.lineWidth;
      this.selectedEntity = undefined;      
    }
    
    this.selectedEntity = entitiesArray.find( entity => {
      let dist = this.pos.subtract(entity.pos).getNorm();
      if(dist < entity.radius) {
        // Saving stuff to reset later on
        entity.previous.inner = Object.assign({}, entity.color.inner);
        entity.previous.outer = Object.assign({}, entity.color.outer);
        entity.previous.lineWidth = entity.lineWidth;

        // Change color
        entity.color.inner.alpha *= 0.5;
        entity.color.outer = {R: 255, G: 0, B: 0};
        entity.lineWidth = 3;

        return true;
      }
    });
    return this.selectedEntity;
  }

  updatePos(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  draw() {
    if(this.isDragging) this.drawForceArrow();
  }

  drawForceArrow() {
    // TODO I think for now this arrow will represent velocity and will follow those mechanics. Will come back later.
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.selectedEntity.pos.x, this.selectedEntity.pos.y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
  }

  pushSelected() {
    let pushVector = this.selectedEntity.pos.subtract(this.pos).multiply(0.5);
    this.selectedEntity.vel = this.selectedEntity.vel.add(pushVector);
    console.log(this.selectedEntity.vel);
  }
}