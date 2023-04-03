const LOOP_DELAY = 100;

const DIRECTIONS = {
  UP: 0,
  RIGHT:1,
  DOWN: 2,
  LEFT:3
}

let direction = DIRECTIONS.RIGHT;
let x = 95;
let y = 100;

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
// const getCursorPosition = (canvas, event) => {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }


const updateBoard = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
  const handle = document.getElementById("canvas");
  let ctx = null;
  let sx = 0;
  let sy = 0;
  let sw = 0;
  let sh = 0;

  if (handle.getContext) {
    ctx = handle.getContext("2d");    
        
    switch (direction) {
      case DIRECTIONS.UP: {
        sx = x; sy = y - 6; sw = 5; sh = 4;
        y -= 5; break;
      }
      case DIRECTIONS.RIGHT: {
        sx = x + 6; sy = y; sw = 4; sh = 5;
        x += 5;
         break;
      }
      case DIRECTIONS.DOWN: {
        sx = x; sy = y + 6; sw = 5; sh = 4;
        y += 5; 
        break;
      }
      case DIRECTIONS.LEFT: { 
        sx = x - 6; sy = y; sw = 4; sh = 5;
        x -= 5; 
        break;
      }
    }   
    
    // https://www.geeksforgeeks.org/how-to-get-pixel-from-html-canvas/
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
    if (ctx.getImageData(sx, sy, sw, sh).data.some(color => color > 0)) {      
      console.log("CRASH!");
    }
    else {
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
      ctx.fillRect(x, y, 5, 5);
    }
  }  
}


const initBoard = (window) => {
  // https://medium.com/programming-essentials/how-to-pass-arguments-to-settimeout-and-setinterval-callbacks-520f13c47e58
  window.setInterval(() => {
    updateBoard()
   }, LOOP_DELAY);     
}

const setupView = (document) => {
  addContent(document);      
}

const addContent = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  
  text += '<div class="container">';
  text += '  <div class="row">';
    
  text += '    <div class="col-md-12">';  
  text += '      <canvas id="canvas" height="300px" width="350px" style="border: 1px solid #000000;" ></canvas>';    
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
  const canvas = document.querySelector("canvas")

  canvas.addEventListener("click", function(e) {
    e.preventDefault();
     
    if (direction == DIRECTIONS.UP){
      direction = DIRECTIONS.LEFT;
    }
    else {
      direction -= 1;
     }    
  });

  canvas.addEventListener("contextmenu", function(e) {
    // https://codinhood.com/nano/dom/disable-context-menu-right-click-javascript
    e.preventDefault();
    
    if (direction == DIRECTIONS.LEFT){
      direction = DIRECTIONS.UP;
    }
    else {
      direction += 1;
     }
  });
}

export function initSnake(window, document) {  
  setupView(document);
  setupEventListener(document);
  initBoard(window);  
}
