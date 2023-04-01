const addContent = (document) => {
  var text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Snake</h1>';
  text += '      <p class="lead">Weekend project 2023-04-01 - 2023-04-02</p>'
  text += '      <hr class="my-4">';
  text += '      <p>In progress...</p>'
  text += '    </div>';
  text += '  </div>';
  text += '</div>';  
  document.getElementById("centerId").innerHTML = text;
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
