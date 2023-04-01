import { initClock } from "./clock_mvc.js"

const addContent = (document) => {
  var text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Time....</h1>';
  text += '      <p class="lead">text text</p>'
  text += '      <hr class="my-4">';
  text += '      <div id="clockId"></div>'
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

export function initTime(document) {  
  setupView(document);
  setupEventListener(document);
  initClock(window, "#clockId");    
}