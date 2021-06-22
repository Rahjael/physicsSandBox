

class CollisionDetector {
  constructor() {
    this.inProximity = [];


    this.afterCollisionOffset = 0;




    this.proxymityLine = {
      color: 'red',
      width: 2
    }

  }

  detectProximity(entitiesArray) {
    // Make a list of entities close to each other
    // This helps avoiding too many unnecessary calculations

    // Empty previous proximities
    this.inProximity.splice(0, this.inProximity.length);
    
    for(let i = 0; i < entitiesArray.length; i++) {
      for(let j = i +1; j < entitiesArray.length; j++) {
        let ent1 = entitiesArray[i];
        let ent2 = entitiesArray[j];

        let dist = ent1.pos.subtract(ent2.pos).getNorm();
        let proxyDist = (ent1.radius + ent2.radius) * 1.1;
        
        if(dist < proxyDist) {
          this.inProximity.push([ent1, ent2]);
        }
      }
    }

    return this;
  }

  detectCollisions(entities) {
    this.detectProximity(entities);

    this.inProximity.forEach( pair => {
      let dist = pair[0].pos.subtract(pair[1].pos).getNorm();
      let radiusSum = pair[0].radius + pair[1].radius;
      if(dist < radiusSum) {
        this.handleCollision(pair[0], pair[1]);
      }
    });

    return this;
  }

  handleCollision(ent1, ent2) {
    // ent1.color.inner = UTILS.getRandomRGB_A();
    // ent2.color.inner = UTILS.getRandomRGB_A();

    // console.log("Before applying: ", ent1.pos, ent2.pos, ent1.vel, ent2.vel)
    this.fixOverlap(ent1, ent2);
    // console.log("AfterOverlap: ", ent1.pos, ent2.pos, ent1.vel, ent2.vel);
    this.applyNewMovement(ent1, ent2);
    // console.log("NewMov: ", ent1.pos, ent2.pos, ent1.vel, ent2.vel);
  }
  
  fixOverlap(ent1, ent2) {
    let distVector = ent2.pos.subtract(ent1.pos);
    let excessDist = ent1.radius + ent2.radius - distVector.getNorm();
    let repositionVector = distVector.getUnitVector().multiply(excessDist/2);
    // console.log("RepositionVector: ", repositionVector.getNorm(), "Excess:", excessDist, "DistV: ", distVector.getUnitVector());
    ent2.pos = ent2.pos.add(repositionVector);
    ent1.pos = ent1.pos.add(repositionVector.multiply(-1));
  }

  applyNewMovement(ent1, ent2) {
    let distUnitVector = ent2.pos.subtract(ent1.pos).getUnitVector();
    let relativeVelocity = ent2.vel.subtract(ent1.vel);
    let newVelocityVector = distUnitVector.multiply(Vector.dotProduct(relativeVelocity, distUnitVector));

    // console.log(newVelocityVector.getNorm(), ent1.vel.getNorm(), ent2.vel.getNorm());

    ent1.vel = ent1.vel.add(newVelocityVector);
    ent2.vel = ent2.vel.add(newVelocityVector.multiply(-1));
  }

  
  draw() {
    if(debugMode) {
      this.drawProximityLines();
    }

  }

  drawProximityLines() {
    this.inProximity.forEach( entities => { // entities is an array of 2
      let ent1 = entities[0];
      let ent2 = entities[1];
      ctx.beginPath();
      ctx.moveTo(ent1.pos.x, ent1.pos.y);
      ctx.lineTo(ent2.pos.x, ent2.pos.y);
      ctx.lineWidth = this.proxymityLine.width;
      ctx.strokeStyle = this.proxymityLine.color;
      ctx.stroke();
      ctx.closePath();

      // console.log("Proxy entities: ", entities[1].pos.x, entities[1].pos.y);
    })
  }

}