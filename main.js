
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvasMain"));
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MOUSE = new Mouse();
const ENVIRONMENT = new Environment();
let entities = [];


// TODO delete this stuff after proper development:
let posVector = Vector.getRandom(canvas.width, canvas.height);
let ent1 = new Entity(posVector.x, posVector.y, 50, 5, true, true, true);
posVector = Vector.getRandom(canvas.width, canvas.height);
let ent2 = new Entity(posVector.x, posVector.y, 70, 2, true, true, true);
entities.push(ent1, ent2);









canvas.addEventListener('click', (e) => {
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
  console.log(MOUSE.selectedEntity);
  if(MOUSE.isDragging) {
    MOUSE.pushSelected();
  }
  console.log(MOUSE.selectedEntity);

  MOUSE.isDown = MOUSE.isDragging = false;
});







function cleanup() {
  // TODO make better? put in better place?
  entities = entities.filter( e => e.isInsideCanvas());
}














function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // TODO check this client?
  cleanup();

  entities.forEach((entity) => {
    entity.update().draw();
  });

  MOUSE.draw();
    
  requestAnimationFrame(mainLoop);
}

























mainLoop();


