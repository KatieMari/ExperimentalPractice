// use to store all shapes
let allShapes = []
let prevMouseX, prevMouseY;

function setup() {
  rectMode(CENTER);
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  // Process interaction
  if(mouseIsPressed) {
    // resolve difference between this frame and last frame 
    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    // map differnce to number more suited to velocity
    let mappedDx = map(dx, -width, width, -100, 100);
    let mappedDy = map(dy, -height, height, -100, 100);
    // create a new shape

    let myShape = new Circle(
      // x and y position of the circle
      mouseX, mouseY, 
      // size
      random(10, 150), 
      // colour
      color(random(200, 255), random(100, 200), random(150, 255)),
      // lifetime in milliseconds
      random(5000, 10000),
      //  randomise velocity
      // random(-5, 5), random(-5, 5)
      mappedDx, mappedDy
    );
    allShapes.push(myShape);
  }

  // Process updates
   for(let i =0; i < allShapes.length; i++){
    allShapes[i].update()
    if(allShapes[i].dead){
      allShapes.splice(i, 1);
      i--;
    }
  };

  // track previous framees mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  // Render (draw)
  // Draw background first!
  background(220);
  // loop through all shapes and draw them
  for(let i =0; i < allShapes.length; i++){
    allShapes[i].draw()
  };
}
