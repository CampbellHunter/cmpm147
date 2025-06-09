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
    this.wall = 1;
    this.food = 0;
    this.water = 0;
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
    let lastX = (this.x - (this.vx +width)) % width;
    let lastY = (this.y - (this.vy +height)) % height;
    let c = get(nextX, nextY);
    //console.log(c);
    if (c[0] === 0 && c[1] === 64 && c[2] === 48) {
      this.heading += 180; // bounce off the wall
      //console.log("wall!")
      this.x = lastX;
      this.y = lastY;
      this.wall = 0;
    } else {
      this.wall = 1;
    }
    if (c[0] === 0 && c[1] === 193 && c[2] === 193) {
      this.heading += 15; // bounce off the water
      this.water = 1;
      //this.x = lastX;
      //this.y = lastY;
      //console.log("water!");
    } if (c[0] === 0 && c[1] === 193 && (c[2] === 127 || c[2] === 126)) {
      this.food = 1;
      //console.log("food!");
      this.x = nextX;
      this.y = nextY;
    } else {
      this.x = nextX;
      this.y = nextY;
    }

    if (this.food > 0) {
      this.food -= 0.001;
    }
    if (this.water > 0) {
      this.water -= 0.001;
    }
    // this.x = nextX;
    // this.y = nextY;


    this.getSensorPos(this.rSensorPos, 2 * (this.heading + this.sensorAngle));
    this.getSensorPos(this.lSensorPos, 2 * (this.heading - this.sensorAngle));
    this.getSensorPos(this.fSensorPos, 2 * this.heading);
    
    let index2, l1, l2, l3, r1, r2, r3, f1, f2, f3;
    index2 = 4*(d * floor(this.rSensorPos.y)) * (d * width) + 4*(d * floor(this.rSensorPos.x));
    r1 = pixels[index2 - 3];
    r2 = pixels[index2 - 2];
    r3 = pixels[index2 - 1];
    
    index2 = 4*(d * floor(this.lSensorPos.y)) * (d * width) + 4*(d * floor(this.lSensorPos.x));
    l1 = pixels[index2 - 3];
    l2 = pixels[index2 - 2];
    l3 = pixels[index2 - 1];
    
    index2 = 4*(d * floor(this.fSensorPos.y)) * (d * width) + 4*(d * floor(this.fSensorPos.x));
    f1 = pixels[index2 - 3];
    f2 = pixels[index2 - 2];
    f3 = pixels[index2 - 1];
    
    
      this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
      this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
      this.getSensorPos(this.fSensorPos, this.heading);
      //console.log("Buh!")
      let index, l, r, f;
      
      index = 4*(d * floor(this.rSensorPos.y)) * (d * width) + 4*(d * floor(this.rSensorPos.x));
      r = pixels[index];
      
      index = 4*(d * floor(this.lSensorPos.y)) * (d * width) + 4*(d * floor(this.lSensorPos.x));
      l = pixels[index];
      
      index = 4*(d * floor(this.fSensorPos.y)) * (d * width) + 4*(d * floor(this.fSensorPos.x));
      f = pixels[index];
      //console.log(f1, f2, f3, l1, l2, l3, r1, r2, r3);
      if ((f > l && f > r) || (f1 == 193)) {
        if (f1 > l1 && f1 > r1 && ((f1 != f2) || (l1 != l2) || (r1 != r2))){
          this.food += 0.0025;
          
        }
        if (f2 > l2 && f2 > r2 && ((f1 != f2) || (l1 != l2) || (r1 != r2))){
          this.water += 0.0025;
          //console.log("Bwue!");
        }
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
      else if ((l > r) || (l1 == 193)) {
        if (l2 > r2 && ((f1 != f2) || (l1 != l2) || (r1 != r2))){
          this.food += 0.0025;
        }
        if (l3 > r3 && ((f1 != f3) || (l1 != l3) || (r1 != r3)) ){
          this.water += 0.0025;
        }
        this.heading += -this.rotAngle;
      }
      else if ((r > l) || (r1 == 193)) {
        if (l2 < r2 && ((f1 != f2) || (l1 != l2) || (r1 != r2))){
          this.food += 0.0025;
        }
        if (l3 < r3 && ((f1 != f3) || (l1 != l3) || (r1 != r3))){
          this.water += 0.0025;
        }
        this.heading += this.rotAngle;
      }
    if (this.water > 1) {
      this.water = 1;
    }
    if (this.food > 1) {
      this.food = 1;
    }
  }
  
  display() {
    noStroke();
    fill(255, 255, 255, this.wall * 64);
    ellipse(this.x, this.y, this.r*2 + this.r*4*this.water + this.r*4*this.food, this.r*2 + this.r*4*this.water + this.r*4*this.food);
    if (this.water != 0) {
      fill(0, 255, 255, 255 * this.water);
      ellipse(this.x, this.y, this.r*2 + this.r*4*this.water + this.r*4*this.food, this.r*2 + this.r*4*this.water + this.r*4*this.food);
    }
    if (this.food != 0) {
      fill(0, 255, 255 * this.water, 255 * this.food);
      ellipse(this.x, this.y, this.r*2 + this.r*4*this.water + this.r*4*this.food, this.r*2 + this.r*4*this.water + this.r*4*this.food);
    }
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