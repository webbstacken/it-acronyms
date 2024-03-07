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
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';      
  text += '      <code class="lead text-secondary">YASWS (Yet Another Static Web Site)</code></br>';
  text += '      <code class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</code></br>';
  text += '      <a href="https://github.com/webbstacken/yasws">YASWS GitHub repo</a></br>';
  text += '      </br>';
  
  text += '      <code class="lead text-secondary">Version</code></br>';
  text += '      <code class="text-secondary">' + version + '</code></br>';
  text += '      </br>';
 
  text += '      <code class="lead text-secondary">Updated</code></br>';
  text += '      <code class="text-secondary">' + updated + '</code></br>';
  text += '      </br>';

  
  text += '      <code class="lead text-secondary">Developer<code></br>';  
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

