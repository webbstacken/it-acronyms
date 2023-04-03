const addContent = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  
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
