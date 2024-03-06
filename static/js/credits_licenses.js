const addContent = async (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';    
  // TODO https://wiki.creativecommons.org/wiki/best_practices_for_attribution    
  text += '      <code class="lead text-secondary"">Credits/licenses</code></br>';
  text += '      <code class="text-secondary">Bootstrap v5.1.3</code></br>';  
  text += '      <code class="text-secondary">https://github.com/twbs/bootstrap/blob/main/LICENSE</code></br>';  
  text += '      </br>';
  text += '      <code class="text-secondary">D3 js v7.8.2 Copyright 2010-2023 Mike Bostock</code></br>';
  text += '      <code class="text-secondary">https://github.com/d3/d3/blob/main/LICENSE</code></br>';  
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

export function initCreditsLicenses(document) {
  setupView(document);
  setupEventListener(document);  
}

