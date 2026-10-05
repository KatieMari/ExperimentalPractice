class Circle extends Shape {

    draw() {
        fill(this.fillColour);
        noStroke();
        ellipse(this.x, this.y, this.size)
    }

}