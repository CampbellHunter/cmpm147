let molds = []; 
let num = 10000;
let d;
let currentCanvas;
let wallManager;
let drawMode = false;
let extraCanvas;



function setup() {
  currentCanvas = createCanvas(900, 600);
  currentCanvas.parent("active");

  extraCanvas = createGraphics(900, 600);
  extraCanvas.clear();

  angleMode(DEGREES);
  d = pixelDensity();


  for (let i=0; i<num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(134,125,140, 5);
  // background(0, 5);

  loadPixels();
  
  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
  }

  if (mouseIsPressed && drawMode) {
    extraCanvas.fill(120, 20, 20);
    // extraCanvas.strokeWeight(5);
    extraCanvas.rect(mouseX, mouseY, 40, 40, 10);
  }
  
  image(extraCanvas, 0, 0);
  // updatePixels();
}

function keyPressed() {
  if (key === 'd') {
    drawMode = true;
    console.log('Draw Mode');
  }
  else if (key === 's') {
    drawMode = false;
    console.log('Simulation only mode');
  }
  else if (key === 'c') {
    background(134, 125, 140);
    console.log('clear canvas');
  }
}