const board = new Board("./static/data/board.json");  

const addContent = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Work in progress...</h1>';
  text += '    <p class="lead">last updated 2023-04-17</p>'
  text += '    <hr class="my-4">';
  text += '    <div>';    
  text += '      <p>-</p>';    
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

export function initFourInARow(document) {  
  setupView(document);
  setupEventListener(document);  
  board.run();
}