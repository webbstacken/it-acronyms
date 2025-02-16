const addContent = async (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid mt-3">';        
  text += '  <div class="container">';    
  text += '      <code class="lead text-secondary">Credits and Licenses</code></br>';
  text += '      <code class="text-secondary">Bootstrap v5.1.3 (MIT License)</code></br>';  
  text += '      <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" class="link-secondary">View License</a></br>';  
  text += '      </br>';
  
    
  text += '      <code class="text-secondary">Bootstrap Icons v1.11.3 (MIT License)</code></br>';  
  text += '      <a href="https://github.com/twbs/icons/blob/main/LICENSE" class="link-secondary">View License</a></br>';  
  text += '      </br>';

  text += '      <code class="text-secondary">D3.js v7.8.2 (ISC License)</code></br>';
  text += '      <code class="text-secondary">Copyright 2010-2023 Mike Bostock</code></br>';
  text += '      <a href="https://github.com/d3/d3/blob/main/LICENSE" class="link-secondary">View License</a></br>';  
  text += '      </br>';
  
  text += '      <code class="lead text-secondary mt-4">AI Assistance</code></br>';
  text += '      <code class="text-secondary">Parts of this project were developed with assistance from GitHub Copilot.</code></br>';
  text += '      <code class="text-secondary">See ATTRIBUTION.md for details about AI contributions.</code></br>';
  text += '      <a href="https://github.com/webbstacken/yasws/blob/main/ATTRIBUTION.md" class="link-secondary">View Attribution Details</a></br>';
  text += '      <a href="https://github.com/features/copilot" class="link-secondary">About GitHub Copilot</a></br>';
  text += '      </br>';
  
  text += '      <code class="lead text-secondary mt-4">License</code></br>';
  text += '      <code class="text-secondary">This project is licensed under the MIT License.</code></br>';
  text += '      <a href="https://github.com/webbstacken/yasws/blob/main/LICENSE" class="link-secondary">View License</a></br>';
  text += '      </br>';
  
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

