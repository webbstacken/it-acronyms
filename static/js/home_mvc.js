const addContent = (document) => {
  var text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Lorem ipsum</h1>';
  text += '      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
  text += '      <hr class="my-4">';
  text += '      <p>4010c34b1e43536837967815d19b9153af3394ea780fbc74ddf2e48086041be6</p>'
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

export function initHome(document) {  
  setupView(document);
  setupEventListener(document);  
}