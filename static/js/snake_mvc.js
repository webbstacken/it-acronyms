const addContent = (document) => {
  var text = document.getElementById("centerId").innerHTML;  
  
  //text += '<div class="container">';
  text += '  <div class="row align-items-start">';
  text += '    <div class="col .col-md-1">';
  text += '      <button type="button" class="btn btn-success">Success</button>';
  text += '    </div>';
  text += '    <div class="col .col-md-10">';
  text += '      <canvas id="canvas"></canvas>';
  text += '    </div>';
  text += '    <div class="col .col-md-1">';
  text += '      <button type="button" class="btn btn-danger">Danger</button>';  
  text += '    </div>';
  text += '  </div>';
  //text += '</div>';
  
  text = (document.getElementById("centerId").innerHTML = text);
  // var canvas = document.getElementById("canvas"); 
  // canvas.width  = window.innerWidth;
  // canvas.height = window.innerHeight;
}

const setupView = (document) => {
  addContent(document);      
}

const setupEventListener = (document) => {
  // TODO 
}

export function initSnake(document) {  
  setupView(document);
  setupEventListener(document);  
}
