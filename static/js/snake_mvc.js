// https://medium.com/programming-essentials/how-to-pass-arguments-to-settimeout-and-setinterval-callbacks-520f13c47e58
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
// https://www.geeksforgeeks.org/how-to-get-pixel-from-html-canvas/
// const getCursorPosition = (canvas, event) => {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
//

// Global constants
const CANVAS_ID = "canvasId";
const CANVAS_COLOR = "white";
const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 350;
const DIRECTIONS = {
  UP: 0,
  RIGHT:1,
  DOWN: 2,
  LEFT:3
}
const GAME_UPDATE_RATE = 100;
const LEFT_BUTTON_ID = "leftButtonId";
const RIGHT_BUTTON_ID = "rightButtonId"
const SCOREBOARD_ID = "scoreId";
const SNAKE_COLOR = "rgb(128, 128, 128)";
const SNAKE_SEGMENT_SIZE = 5;
const START_X = 95;
const START_Y = 100;
const TARGET_COLOR = "rgb(129, 129, 129)";

// Global variables
let direction = DIRECTIONS.RIGHT;
let highScore = 0;
let score = 0;
let targetX = 0;  
let targetY = 0;

const updateGameBoard = (ctx, x, y) => {
  // Get cordinate for next snake segment
  ({x, y} = nextCordinate(x, y));    

  if (wallCollision(x, y) || segmentCollision(ctx, x, y)) {
    alert("Game Over!");    
    clearBoard(ctx);        
    score = 0;
    x = START_X;
    y = START_Y;
    direction = DIRECTIONS.RIGHT;    
    updateScoreBoard();
    addTarget(ctx);
  }
  else if (targetCollision(ctx, x, y)) {
    score++; 
    updateScoreBoard();
    addTarget(ctx);
    addSnakeSegment(ctx, x, y); 
  }
  else {    
    addSnakeSegment(ctx, x, y); 
  }    

  return {"x": x, "y" : y};
}

const nextCordinate = (x, y) => {
  switch (direction) {
    case DIRECTIONS.UP: {    
      y -= SNAKE_SEGMENT_SIZE; break;
    }
    case DIRECTIONS.RIGHT: {        
      x += SNAKE_SEGMENT_SIZE;
      break;
    }
    case DIRECTIONS.DOWN: {        
      y += SNAKE_SEGMENT_SIZE; 
      break;
    }
   case DIRECTIONS.LEFT: {         
     x -= SNAKE_SEGMENT_SIZE; 
     break;
   }
  }

  return {"x": x, "y" : y};
}

const wallCollision = (x, y) => {     
  return  (x <= 0) || (x >= CANVAS_WIDTH) || (y <= 0) || (y >= CANVAS_HEIGHT) ? true: false;
}

const segmentCollision = (ctx, x, y) => {
  // TODO rgb 128, 128, 128     
  return collision(ctx, x, y, 128);
}

const targetCollision = (ctx, x, y) => {
  // TODO rgb 129, 129, 129     
  return collision(ctx, x, y, 129);
}

const clearBoard = (ctx) => {    
    ctx.fillStyle = CANVAS_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)    
}

const updateScoreBoard = () => {  
  highScore = score > highScore ?  score : highScore;
  
  let text = "Highscore: " + highScore + " Score: " + score;
  text = (document.getElementById(SCOREBOARD_ID).innerHTML = text);
}

const addTarget = (ctx, init=false) => {
  if (!init) {
    ctx.fillStyle = CANVAS_COLOR;
    ctx.fillRect(targetX, targetY, SNAKE_SEGMENT_SIZE*2, SNAKE_SEGMENT_SIZE*2);
  }

  updateFreeCordinateForTarget(ctx);
  ctx.fillStyle = TARGET_COLOR;  
  ctx.fillRect(targetX, targetY, SNAKE_SEGMENT_SIZE*2, SNAKE_SEGMENT_SIZE*2);
}

const addSnakeSegment = (ctx, x, y) => {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(x, y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
}

const updateFreeCordinateForTarget = (ctx) => {
  const padding = 10;
  targetX = padding + getRandomNumber(CANVAS_WIDTH - 2*padding);
  targetY = padding + getRandomNumber(CANVAS_HEIGHT - 2*padding);
  
  while(collision(ctx, targetX, targetY, 128)) {
    targetX =  getRandomNumber(CANVAS_WIDTH);
    targetY =  getRandomNumber(CANVAS_HEIGHT);
  }  
}

const getRandomNumber = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
}

const collision = (ctx, x, y, hitColor) => {    
  const sx = x;     
  const sy = y;
  const sw = SNAKE_SEGMENT_SIZE;
  const sh = SNAKE_SEGMENT_SIZE;   

  return ctx.getImageData(sx, sy, sw, sh).data.some(color => color == hitColor) ? true: false;
}

// Default functions below
const initGame = (window) => {    
  const handle = document.getElementById(CANVAS_ID);  
  const ctx = handle.getContext("2d");  
  let x = START_X;
  let y = START_Y;
  
  addTarget(ctx, true);

  window.setInterval(() => {
    ({x, y} = updateGameBoard(ctx, x, y));
   }, GAME_UPDATE_RATE);     
}

const setupView = (document) => {
  addView(document);
}

const addView = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  
  text += '<div class="container">';
  text += '  <div class="row">';

  text += '    <div class="col-md-12">';
  text += '      <p id="' + SCOREBOARD_ID + '">Highscore: 0 Score: 0</p>';  
  text += '    </div>';
    
  text += '    <div class="col-md-12">';  
  text += '      <canvas id="' + CANVAS_ID + '" height=' + CANVAS_HEIGHT  +'px" width="' + CANVAS_WIDTH +'px" style="border: 1px solid #000000;" ></canvas>';    
  text += '    </div>';  
  
  text += '    <div class="col-md-12">';
  text += '      <button id="' + LEFT_BUTTON_ID + '"type="button" style="width: 173px;" class="btn btn-outline-secondary">Counter clockwise</button>';
  text += '      <button id="' + RIGHT_BUTTON_ID + '"type="button" style="width: 173px;" class="btn btn-outline-secondary">Clockwise</button>';  
  text += '    </div>';

  text += '  </div>';  
  text += '</div>';
  
  text = (document.getElementById("centerId").innerHTML = text);
}

const setupEventListener = (document) => {
  function updateClockwiseDirection() {
      if (direction == DIRECTIONS.LEFT) {
        direction = DIRECTIONS.UP;
      }
      else {
        direction += 1;
      }
  }

  function updateCounterClockwiseDirection() {
      if (direction == DIRECTIONS.UP) {
        direction = DIRECTIONS.LEFT;
      }
      else {
        direction -= 1;
      }
  }
  
  // left mouse click
  const canvas = document.getElementById(CANVAS_ID)
  canvas.addEventListener("click", function(e) {   
    updateCounterClockwiseDirection();
     e.preventDefault();    
  });

  // right mouse click
  canvas.addEventListener("contextmenu", function(e) {    
    updateClockwiseDirection();
    e.preventDefault();
  });
  
  // left button...
  const leftButton = document.getElementById(LEFT_BUTTON_ID)
  leftButton.addEventListener("click", function(e) {   
    updateCounterClockwiseDirection();
    e.preventDefault();    
  });
  
  // right button...
  const rightButton = document.getElementById(RIGHT_BUTTON_ID)
  rightButton.addEventListener("click", function(e) {      
   updateClockwiseDirection()
    e.preventDefault();
  });
}

export function initSnake(window, document) {  
  setupView(document);
  setupEventListener(document);
  initGame(window);  
}
