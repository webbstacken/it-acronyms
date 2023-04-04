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

// Constants
const DIRECTIONS = {
  UP: 0,
  RIGHT:1,
  DOWN: 2,
  LEFT:3
}
const SNAKE_SEGMENT_SIZE = 5;
const COLLISION_COLOR = 0;
const CANVAS_ID = "canvas";

// Global variables
let direction = DIRECTIONS.RIGHT;

const updateGameBoard = (ctx, x, y) => {    
  
  ({x, y} = getNextPosition(x, y));    
  
  if (anyHit(ctx, x, y, COLLISION_COLOR)) {
    alert("HIT!");
  }   
  ctx.fillRect(x, y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);

  return {"x": x, "y" : y};
}

const anyHit = (ctx, x, y, hitColor) => {     
  let sx = 0;     
  let sy = 0;
  let sw = 0;
  let sh = 0;   
        
  switch (direction) {
    case DIRECTIONS.UP:    sx = x;     sy = y - 6; sw = 5; sh = 4; break;    
    case DIRECTIONS.RIGHT: sx = x + 6; sy = y;     sw = 4; sh = 5; break;
    case DIRECTIONS.DOWN:  sx = x;     sy = y + 6; sw = 5; sh = 4; break;      
    case DIRECTIONS.LEFT:  sx = x - 6; sy = y;     sw = 4; sh = 5; break;
  }

  if (ctx.getImageData(sx, sy, sw, sh).data.some(color => color > hitColor)) {      
      return true;
  }
  
  return false;
}

const getNextPosition = (x, y) => {
  switch (direction) {
    case DIRECTIONS.UP: {    
      y -= 5; break;
    }
    case DIRECTIONS.RIGHT: {        
      x += 5;
      break;
    }
    case DIRECTIONS.DOWN: {        
      y += 5; 
      break;
    }
   case DIRECTIONS.LEFT: {         
     x -= 5; 
     break;
   }
  }
  return {"x": x, "y" : y};
}

// -------------------------------
const initGame = (window) => {
  const LOOP_DELAY = 100;  
  const handle = document.getElementById("canvas");
  
  let ctx = handle.getContext("2d");  
  let x = 95;
  let y = 100;

  window.setInterval(() => {
    ({x, y} = updateGameBoard(ctx, x, y));
   }, LOOP_DELAY);     
}

const setupView = (document) => {
  const canvasHeight = 300;
  const canvasWidth = 350;

  addView(document, canvasHeight, canvasWidth);      
}

const addView = (document, canvasHeight, canvasWidth) => {
  let text = document.getElementById("centerId").innerHTML;  
  
  text += '<div class="container">';
  text += '  <div class="row">';
    
  text += '    <div class="col-md-12">';  
  text += '      <canvas id="' + CANVAS_ID + '" height=' + canvasHeight  +'px" width="' + canvasWidth +'px" style="border: 1px solid #000000;" ></canvas>';    
  text += '    </div>';  
  
  text += '    <div class="col-md-12">';
  text += '      <button type="button" style="width: 173px;" class="btn btn-outline-secondary">Left</button>';
  text += '      <button type="button" style="width: 173px;" class="btn btn-outline-secondary">Right</button>';  
  text += '    </div>';

  text += '  </div>';  
  text += '</div>';
  
  text = (document.getElementById("centerId").innerHTML = text);
}

const setupEventListener = (document) => {
  const canvas = document.querySelector(CANVAS_ID)
  canvas.addEventListener("click", function(e) {   
    if (direction == DIRECTIONS.UP){
      direction = DIRECTIONS.LEFT;
    }
    else {
      direction -= 1;
     }
     e.preventDefault();    
  });

  canvas.addEventListener("contextmenu", function(e) {    
    if (direction == DIRECTIONS.LEFT){
      direction = DIRECTIONS.UP;
    }
    else {
      direction += 1;
    }
    e.preventDefault();
  });
}

export function initSnake(window, document) {  
  setupView(document);
  setupEventListener(document);
  initGame(window);  
}
