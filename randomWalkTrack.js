// This is a random walk.
// use "factory" to make any number of balls
// use update to start random walkers
// Also "mousedown" will create a ball

const balls = [];
const size = 30;
let speed = 0;
let xmouse;
let ymouse;

function makeBall(xcoord, ycoord, color, index, velx = 0, vely = 0, fixed = 0) {
  // this function makes a ball with position and velocity set
  ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = "ball";
  ball.style.height = ball.style.width = size;
  ball.style.top = ycoord;
  ball.style.left = xcoord;
  document.body.appendChild(ball);
  if (!fixed) {
    // only free balls will be updated
    if (balls.length == 0) {
      balls.push(ball);
    } else {
      balls[index] = ball;
    }
  }
}

// To track ball we create a new ball every time it is moved.
// The position of the old ball is used as base for new position
// However this won't quite work if we call factory multiple times
// creating different numbers of balls.
// Can you make it work more generally?
function update() {
  let nballs = balls.length;
  // total length of this array
  for (let i = 0; i < nballs; i++) {
    let ball = balls[i];
    let left = Number((ball.style.left).substring(0,ball.style.left.length - 2));
    left += Math.random() * 20 - 10 + speed;
    let top = Number((ball.style.top).substring(0,ball.style.top.length -2));
    top += (Math.random() * 20 - 10);
    makeBall(left, top, ball.style.backgroundColor, i);
  }
  // change this if you want to paint faster
  setTimeout(update, 100); // this calls update ever 1/10 second
}

function randomColor() {
  // return a hex value between 000000 and ffffff
  return Math.floor(Math.random() * 16777215).toString(16);
}

function factory(total) {
  let start = 300;
  for (let i = 0; i < total; i++) {
    console.log('calling makeball from factory with balls length: ' + balls.length);
    makeBall(start, start, randomColor(), balls.length);
  }
}

var mouse = function (e) {
  ymouse = e.clientY;
  xmouse = e.clientX;
  makeBall(xmouse, ymouse, randomColor(), balls.length);
//  totalFactoryOutput++; // one more made
};

if (window.addEventListener) {
  document.addEventListener("mousedown", mouse, false);
}

//factory(10);
update();
makeBall(150, 150, randomColor(), 0);