let molds = []; 
let num = 5000;
let d;
let currentCanvas;
let wallManager;
let drawMode = false;
let drawWater = false;
let drawAlgae = false;
let extraCanvas;



function setup() {
  currentCanvas = createCanvas(900, 600);
  currentCanvas.parent("active");

  extraCanvas = createGraphics(900, 600);
  extraCanvas.clear();
  background(48, 48, 48);
  angleMode(DEGREES);
  d = pixelDensity();


  for (let i=0; i<num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {

  background(12, 24, 24, 10);

  if (mouseIsPressed && drawMode) {
    extraCanvas.fill(0, 64, 48);
    extraCanvas.stroke(0, 64, 48);
    // extraCanvas.strokeWeight(5);
    extraCanvas.rect(mouseX - 10, mouseY - 10, 20, 20, 5);
  } else if (mouseIsPressed && drawWater) {
    extraCanvas.fill(0, 196, 196);
    extraCanvas.stroke(0, 196, 196);
    // extraCanvas.strokeWeight(5);
    extraCanvas.rect(mouseX - 10, mouseY - 10, 20, 20, 5);
  } else if (mouseIsPressed && drawAlgae) {
    extraCanvas.fill(0, 196, 128);
    extraCanvas.stroke(0, 196, 128);
    // extraCanvas.strokeWeight(5);
    extraCanvas.rect(mouseX - 10, mouseY - 10, 20, 20, 5);
  }
  
  image(extraCanvas, 0, 0);
  // updatePixels();
  background(24, 48, 48, 5);
  // background(0, 5);

  loadPixels();
  
  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
  }
}

function keyPressed() {
  if (key === 'd') {
    drawMode = true;
    drawAlgae = false;
    drawWater = false;
    console.log('Draw Mode');
  } else if (key === 'w') {
    drawWater = true;
    drawMode = false;
    drawAlgae = false;
    console.log('Draw Water');
  } else if (key === 'a') {
    drawAlgae = true;
    drawMode = false;
    drawWater = false;
    console.log('Draw Algae');
  } else if (key === 's') {
    drawMode = false;
    drawAlgae = false;
    drawWater = false;
    console.log('Simulation only mode');
  } else if (key === 'c') {
    background(48, 48, 48);
    extraCanvas.clear();
    console.log('clear canvas');
  }
}