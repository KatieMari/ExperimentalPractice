class Ghost {
  static Count = 15;
  static TailLength = 30;

  x;
  y;
  size;
  fillColour;
  cosOffset;
  wiggliness;
  floatiness;
  tail;

  constructor(x, y, size, fillColour) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fillColour = fillColour;

    this.cosOffset = random(200);
    this.wiggliness = random(2, 10);
    this.floatiness = random(2, 10);

    this.tail = [];
  }


  // ========================================================================

  update() {
    // move the ghost left and right
    this.x += cos((this.cosOffset + frameCount) / 10) * this.wiggliness;
    // move the ghost up 
    this.y -= this.floatiness;

    // if the ghost goes off the top, start it back at the bottom 
    if (this.y < -this.size) {
      this.y = height + this.size;
      // clear the tail so it doesnt stretch across the whole screen
      this.tail = [];
    }

    // add the current position to the front of the tail
    this.tail.unshift({ x: this.x, y: this.y });
    // if the tail is too long, remove the oldest point
    if (this.tail.length > Ghost.TailLength) {
      this.tail.pop();
    }
  }

  // ============================================================================
  draw() {
    noStroke();
    this.drawTail();
    this.drawFace();
  }

  // ============================================================================
  drawTail() {
    let r = red(this.fillColour);
    let g = green(this.fillColour);
    let b = blue(this.fillColour);

    for (let i = 0; i < this.tail.length; i++) {
      // ratio of 1 to 0 from head to end of tail
      let ratio = (this.tail.length - i) / this.tail.length;

      // tail gets smaller and more transparent
      fill(r, g, b, 255 * ratio);
      ellipse(this.tail[i].x, this.tail[i].y, this.size * ratio);
    }
  }

  // =============================================================================
  drawFace() {
    let featureSize = this.size * 0.2;
    fill(32)
    ellipse(this.x - this.size * 0.2, this.y - this.size * 0.1, featureSize);
    ellipse(this.x + this.size * 0.2, this.y - this.size * 0.1, featureSize);
    ellipse(this.x, this.y + this.size * 0.2, featureSize);
  }
}