class Square extends Shape {

    draw() {
        fill(this.fillColour);
        noStroke();
        square(this.x, this.y, this.size);
    }

}