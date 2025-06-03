let molds = []; let num = 10000;
let d;
let currentCanvas;


function setup() {
  currentCanvas = createCanvas(900, 600);
  currentCanvas.parent("active");
  angleMode(DEGREES);
  d = pixelDensity();
  
  for (let i=0; i<num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(0, 5);
  loadPixels();
  
  for (let i=0; i<num; i++) {
    molds[i].update();
    molds[i].display();
  }
  
  
  
}