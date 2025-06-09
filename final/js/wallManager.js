class WallManager {
  constructor(w, h) {
    this.canvas = createGraphics(w, h);
    this.canvas.background(254); // white = no wall
    this.drawing = false;
    this.wallColor = [0, 0, 0, 0]; // black RGBA
  }

  drawWallAt(x, y, type) {
    //this.canvas.stroke(this.wallColor);
    //this.canvas.strokeWeight(-1);
    this.canvas.point(x, y);
  }

  enableDrawingMode() {
    this.drawing = true;
  }

  disableDrawingMode() {
    this.drawing = false;
  }

  update() {
    if (this.drawing && mouseIsPressed) {
      this.drawWallAt(mouseX, mouseY);
    }
  }

  render() {
    image(this.canvas, 0, 0); // draw wall layer onto main canvas
    this.canvas.loadPixels(); // read once per frame for collision checks
  }

  isWall(x, y) {
    let ix = floor(x);
    let iy = floor(y);

    // Safety bounds check
    if (ix < 0 || iy < 0 || ix >= this.canvas.width || iy >= this.canvas.height) return false;

    let index = 4 * (iy * this.canvas.width + ix);
    let pix = this.canvas.pixels;

    // Check for black pixel = wall
    return pix[index] === 0 && pix[index + 1] === 0 && pix[index + 2] === 0;
  }

  clear() {
    this.canvas.background(254); // wipe walls
    //console.log("Hello!")
  }
}