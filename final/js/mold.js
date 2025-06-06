class Mold {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    
    // this.x = width/2;
    // this.y = height/2;
    
    this.r = 1;
    
    this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    this.rotAngle = 45
    
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
    
    
    this.sensorAngle = 45;
    this.sensorDist = 10;
  }
  
  update() {
    // Priority
    // TODO: create "wall" objects
    // TODO: when particle hits object it "bounces back"
    // TODO: "food" incentive object
    // TODO: ability to place place "food" and "walls"

    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    
    let nextX = (this.x + this.vx + width) % width;
    let nextY = (this.y + this.vy + height) % height;
    let c = get(nextX, nextY);
    if (c[0] === 0 && c[1] === 0 && c[2] === 0) {
      this.heading += 180; // bounce off the walld
    }
    else {
      this.x = nextX;
      this.y = nextY;
    }

    // this.x = nextX;
    // this.y = nextY;

    
    
    this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
    this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
    this.getSensorPos(this.fSensorPos, this.heading);
    
    let index, l, r, f;
    
    index = 4*(d * floor(this.rSensorPos.y)) * (d * width) + 4*(d * floor(this.rSensorPos.x));
    r = pixels[index];
    
    index = 4*(d * floor(this.lSensorPos.y)) * (d * width) + 4*(d * floor(this.lSensorPos.x));
    l = pixels[index];
    
    index = 4*(d * floor(this.fSensorPos.y)) * (d * width) + 4*(d * floor(this.fSensorPos.x));
    f = pixels[index];
    
    if (f > l && f > r) {
      this.heading += 0;
    }
    else if (f < l && f < r) {
      if (random(1) < 0.5) {
        this.heading += this.rotAngle;
      }
      else {
        this.heading -= this.rotAngle;
      }
    }
    else if (l > r) {
      this.heading += -this.rotAngle;
    }
    else if (r > l) {
      this.heading += this.rotAngle;
    }
   
  }
  
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    
//     line(this.x, this.y, this.x + this.r * 3 *this.vx, this.y + this.r * 3 * this.vy);
    
    
//     fill(255, 0, 0)
//     ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*2, this.r*2);
    
//     fill(255, 0, 0)
//     ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*2, this.r*2);
    
//     fill(255, 0, 0)
//     ellipse(this.fSensorPos.x, this.fSensorPos.y, this.r*2, this.r*2);
  }
  
  getSensorPos(sensor, angle) {
    sensor.x = (this.x + this.sensorDist * cos(angle) + width) % width;
    sensor.y = (this.y + this.sensorDist * sin(angle) + height) % height;
  }
  
  
}