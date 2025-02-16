let version = "";

const updateVersion = async () => {
  await fetch("./static/data/version.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      version = text.trim();      
    })
    .catch((e) => {
      console.error(e);
    });
}
const addContent = async (document) => {
  await updateVersion();    
  const date = new Date(parseInt(version.split(".")[2]) * 1000);  
  const updated = date.toISOString().split('.')[0] + "Z";

  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid mt-3">';        
  text += '  <div class="container">';      
  text += '      <code class="lead text-secondary">YASWS (Yet Another Static Web Site)</code></br>';
  text += '      <code class="text-secondary">A lightweight static web application for hosting various tools and utilities, built with vanilla JavaScript and a custom MVC-like framework.</code></br>';
  text += '      <code class="text-secondary">The project uses pure JavaScript with minimal dependencies (Bootstrap and D3), focusing on simplicity and modularity.</code></br>';
  text += '      <a href="https://github.com/webbstacken/yasws" class="link-secondary">YASWS GitHub repo</a></br>';
  text += '      </br>';
  
  text += '      <code class="lead text-secondary">Version</code></br>';
  text += '      <code class="text-secondary">' + version + '</code></br>';
  text += '      </br>';
 
  text += '      <code class="lead text-secondary">Last Updated</code></br>';
  text += '      <code class="text-secondary">' + updated + '</code></br>';
  text += '      </br>';
  
  text += '      <code class="lead text-secondary">Developer</code></br>';  
  text += '      <code class="text-secondary">Glenn Wadstedt</code></br>';  
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

export function initAbout(document) {  
  setupView(document);
  setupEventListener(document);  
}

