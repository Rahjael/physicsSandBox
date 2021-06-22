
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvasMain"));
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const debugMode = true;





const MOUSE = new Mouse();
const ENVIRONMENT = new Environment();
const COLL_DETECTOR = new CollisionDetector();
let entities = [];



// TODO delete this stuff after proper development:
let posVector = Vector.getRandom(canvas.width, canvas.height);
let ent1 = new Entity(posVector.x, posVector.y, 50, 5, true, true, true);
posVector = Vector.getRandom(canvas.width, canvas.height);
let ent2 = new Entity(posVector.x, posVector.y, 70, 2, true, true, true);
posVector = Vector.getRandom(canvas.width, canvas.height);
let ent3 = new Entity(posVector.x, posVector.y, 70, 2, true, true, true);
posVector = Vector.getRandom(canvas.width, canvas.height);
let ent4 = new Entity(posVector.x, posVector.y, 70, 2, true, true, true);
entities.push(ent1, ent2, ent3, ent4);








canvas.addEventListener('click', (e) => {
});

canvas.addEventListener('keypress', (e) => {

  if(e.key == 's') {
    requestAnimationFrame(mainLoop);
  }
  

  // TODO


});

canvas.addEventListener('mousemove', (e) => {
  MOUSE.updatePos(e.clientX, e.clientY);
  if(MOUSE.isDragging) {
    MOUSE.drawForceArrow();
  }
});

canvas.addEventListener('mousedown', (e) => {
  MOUSE.isDown = true;
  if(MOUSE.detectSelection(entities)) {
    MOUSE.isDragging = true;
  }

  // entities.forEach( e => e.randomizeVelocity())
});

canvas.addEventListener('mouseup', (e) => {
  if(MOUSE.isDragging) {
    MOUSE.pushSelected();
  }

  MOUSE.isDown = MOUSE.isDragging = false;
});





function cleanOutOfCanvas() {
  // TODO make better? put in better place?
  entities = entities.filter( e => e.isInsideCanvas());
}














function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // TODO check this client?
  cleanOutOfCanvas();

  entities.forEach((entity) => {
    entity.update();
  });

  COLL_DETECTOR.detectCollisions(entities).draw();

  entities.forEach((entity) => {
    entity.draw();
  });

  
  MOUSE.draw();


  // console.log(ent1, ent2);

  requestAnimationFrame(mainLoop);
}

























mainLoop();


