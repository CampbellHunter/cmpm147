let molds = []; 
let num = 1;
let d;
let currentCanvas;
let wallManager;
let drawMode = false;
let foodMode = false;
let extraCanvas;
let source;


function setup() {
  currentCanvas = createCanvas(900, 600);
  currentCanvas.parent("active");

  extraCanvas = createGraphics(900, 600);
  extraCanvas.clear();

  angleMode(DEGREES);
  d = pixelDensity();

  source = [random(width), random(height)];
  for (let i=0; i<num; i++) {
    molds[i] = new Mold(source[0],source[1]);
  }
}

function draw() {
  background(134,125,140, 5);
  // background(0, 5);
  
  fill(255, 255, 50);
  noStroke();
  circle(source[0], source[1], 20);

  loadPixels();

  if (mouseIsPressed && drawMode) {
    extraCanvas.fill(0, 0, 0);
    extraCanvas.noStroke();
    extraCanvas.rect(mouseX, mouseY, 40, 40, 10);
  } else if (mouseIsPressed && foodMode) {
    extraCanvas.fill(0, 255, 0);
    extraCanvas.noStroke();
    extraCanvas.rect(mouseX, mouseY, 40, 40, 10);
  }
  
  image(extraCanvas, 0, 0);
  // updatePixels();

  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
    if(molds[i].getFedStatus()){
      molds.push(new Mold(source[0],source[1]));
      num++;
      molds[i].setFedStatus(false);
    }
  }
}

function keyPressed() {
  if (key === 'd') {
    drawMode = true;
    console.log('Draw Mode');
  }
  if (key === 'f') {
    foodMode = true;
    console.log('Food Mode');
  }
  else if (key === 's') {
    drawMode = false;
    console.log('Simulation only mode');
  }
  else if (key === 'c') {
    background(134, 125, 140);
    extraCanvas.clear();
    console.log('clear canvas');
  }
}