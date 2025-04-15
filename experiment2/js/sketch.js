// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

/* exported setup, draw */

let seed = 0;

const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function reimagine() {
  seed += 50;
}



//const skyColor = "#cdc7fa";
//const grassColor = "#a1d3f5";
const shoreColor = "#bcd2f1";
const stoneColorOne = "#dfe9fa";
const stoneColorTwo = "#51a8fd";
const treeColor = "#385b9f";
//const treeFlect = "#9bb6d2";

function setup() {  
  //createCanvas(400, 200);
  //createButton("reimagine").mousePressed(() => (seed += 50));
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  //$(window).reimagine(function() {
  //  reimagine();
  //});
  //reimagine();
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  
}


function draw() {
  randomSeed(seed);

  background(100);

  noStroke();
  
  colorMode(HSB);
  for (let y = 0; y < height / 2; y++) {
    let pct = y / height / 2;

    let offset = map(sin(frameCount * 0.01), -1, 1, -0.3, 0.3);
    let adjustedPct = constrain(pct + offset, 0, 1);

    let hue;
    if (adjustedPct < 0.5) {
      hue = map(adjustedPct, 0, 0.5, 270, 360);
    } else {
      hue = map(adjustedPct, 0.5, 1, 360, 410);
    }

    stroke(hue % 360, 20, 95);
    line(0, y, width, y);
  }
  
  for (let y = 0; y < height / 2; y++) {
    let pct = y / height / 2;

    let offset = map(sin(frameCount * 0.01), -1, 1, -0.3, 0.3);
    let adjustedPct = constrain(pct + offset, 0, 1);

    let hue;
    if (adjustedPct < 0.5) {
      hue = map(adjustedPct, 0, 0.5, 270, 360);
    } else {
      hue = map(adjustedPct, 0.5, 1, 360, 410);
    }

    stroke(hue % 360, 20, 95);
    line(0, (height - y), width, (height - y));
  }


  let skyShift = map(sin(frameCount * 0.01), -1, 1, -0.3, 0.3);
  let reflectionHue;
  let sunsetProgress = constrain(0.5 + skyShift, 0, 1);

  if (sunsetProgress < 0.5) {
    reflectionHue = map(sunsetProgress, 0, 0.5, 270, 360);
  } else {
    reflectionHue = map(sunsetProgress, 0.5, 1, 360, 410);
  }

  reflectionHue = reflectionHue % 360;

  let grassColor = color(reflectionHue % 360, 20, 85);

  colorMode(RGB);
  
  noStroke();

  fill(grassColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  const listed = [];
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let current = random();
    listed[i] = current;
    let y =
      (height * 3) / 4 +
      (current * current * current * height) / 5 -
      height / 100;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  fill(grassColor);
  for (let i = 0; i < steps; i++) {
    let x = (width * i) / steps;
    let s = listed[i] * 200;
    let y =
      (height * 3) / 4 +
      (height * listed[i] * listed[i] * listed[i]) / 3 -
      height / 25;
    triangle(x, y + s, x - s / 4, y, x + s / 4, y);
  }

  fill(shoreColor);
  beginShape();
  vertex(0, height / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      (height * 3) / 4 +
      (listed[i] * listed[i] * listed[i] * height) / 5 -
      height / 20;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  fill(stoneColorOne);
  beginShape();
  vertex(0, height / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    //let current = random();
    //listed[i] = current;
    let y =
      height / 3 -
      (listed[i] * listed[i] * listed[i] * height) / 3 -
      height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  fill(stoneColorTwo);
  beginShape();
  vertex(0, height / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = ((width + 25) * i) / steps;
    let y =
      height / 2.75 -
      (listed[i] * listed[i] * listed[i] * height) / 3 -
      height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  beginShape();
  vertex(0, height / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = ((width + 25) * i) / steps;
    let y =
      height / 2 +
      (listed[i] * listed[i] * listed[i] * height) / 3 -
      height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  fill(treeColor);
  for (let i = 0; i < steps; i++) {
    // let z = random();
    let x = (width * i) / steps;
    let s = listed[i] * 200;
    let y =
      (height * 3) / 4 +
      (height * listed[i] * listed[i] * listed[i]) / 3 -
      height / 25;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
}
