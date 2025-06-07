let molds = []; 
let num = 10000;
let d;
let currentCanvas;
let wallManager;
let drawMode = false;


function setup() {
  currentCanvas = createCanvas(900, 600);
  currentCanvas.parent("active");
  currentCanvas.elt.getContext('2d', { willReadFrequently: true });
  angleMode(DEGREES);
  d = pixelDensity();

  // wallManager = new WallManager(width, height);
  for (let i=0; i<num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(134,125,140, 5);
  // background(0, 5);

  // wallManager.update();
  // wallManager.render();

  if (mouseIsPressed && drawMode) {
    stroke(0);
    strokeWeight(25);
    line(mouseX, mouseY, mouseX + 20, mouseY);
  }

  loadPixels();
  
  
  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
  }
  
  // updatePixels();
}

function keyPressed() {
  if (key === 'd') {
    drawMode = true;
    console.log('Draw Mode');
  }
  else if (key === 's') {
    drawMode = false;
  }
  else if (key === 'c') {
    background(134, 125, 140);
  }
}