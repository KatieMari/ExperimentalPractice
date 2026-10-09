// use to store all shapes
let allShapes = []
let buttons = [];
let ghosts = [];
let prevMouseX, prevMouseY;

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < Ghost.Count; i++) {
    let ghost = new Ghost(
      random(width),
      random(height),
      random(10, 100),
      color(random(200, 255), random(100, 200), random(150, 255)));

    ghosts.push(ghost);
  }

  let offset = ((width - SoundButton.Width * 6) / 2)

  for (let i = 0; i < 6; i++) {
    let button = new SoundButton(
      i,
      (i * SoundButton.Width) + offset,
      height - SoundButton.Height,
      color(random(200, 255), random(100, 200), random(150, 255)));

    buttons.push(button);
  }

  _renderer.canvas.addEventListener("soundButtonPressed", placeShape)

  function placeShape(event) {
    let buttonCircle = new Circle(
      event.detail.x,
      event.detail.y,
      random(20, 100),
      event.detail.colour,
      random(2000, 15000),
      random(-2, 2), random(-2, 2))

    allShapes.push(buttonCircle)
  }
}

// ===================================================================================================================

function draw() {
  // Process interaction----------------------------------------------------------------------------------------------
  if (mouseIsPressed) {
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

  // Process updates----------------------------------------------------------------------------------------------
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update()
    if (allShapes[i].dead) {
      allShapes.splice(i, 1);
      i--;
    }
  }

  // update buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
  }

  // update ghosts
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].update();
  }

  // track previous framees mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  // Render (draw)------------------------------------------------------------------------------------------------
  // Draw background first!
  background(220);
  // loop through all shapes and draw them
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw()
  };
  // loop through all buttons and draw them
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw()
  }

  // loop through all ghosts and draw them
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].draw()
  }

}
