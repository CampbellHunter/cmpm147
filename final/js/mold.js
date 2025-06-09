class Mold {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.source = [x, y];
    
    // this.x = width/2;
    // this.y = height/2;
    
    this.r = 1;
    
    this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    this.rotAngle = 45;
    
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
    
    
    this.sensorAngle = 45;
    this.sensorDist = 10;

    this.hasFood = false;
    this.fed = false;
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
    } else if (c[0] === 0 && c[1] === 255 && c[2] === 0){
      this.hasFood = true;
      console.log("holding food");
    } else if (c[0] === 255 && c[1] === 255 && c[2] === 50 && this.hasFood ){
      this.hasFood = false;
      this.fed = true;
      console.log("fed");
    }
    else { 
      this.x = nextX;
      this.y = nextY;
    }

    // this.x = nextX;
    // this.y = nextY;

    if(this.hasfood){
      let adj; //used for atan
      let opp; //used for atan
      let side; // used to determine heading, 0 is left, 1 is right
      let top; // used to determine heading, 0 is down, 1 is up
      //for both side and top imagine that the slime particle is at the origin of a coordinated grid
      //after we do atan we have to add or subtract 180 degrees from the value depending on where the source is in relation to the particle
      //side and top are used to aid in that
      if(this.x > this.source[0]){
        side = 0;
        adj = this.x - this.source[0];
      } else {
        side = 1;
        adj = this.source[0] - this.x;
      }
      if( this.y < this.source[1]){
        top = 0;
        opp = this.source[1] - this.y;
      } else{
        top = 1;
        opp = this.y - this.source[1];
      }
      if( side == 0, top == 0){
        this.heading = 180 - atan(opp/adj);
      } else if( side == 0, top == 1){
        this.heading = 180 + atan(opp/adj);
      } else if( side == 1, top == 0){
        this.heading = atan(opp/adj);
      } else {
        this.heading = 360 - atan(opp/adj);
      }

    }
    
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
  
  getFedStatus(){
    return this.fed;
  }
  setFedStatus(status){
    this.fed = status;
  }
}