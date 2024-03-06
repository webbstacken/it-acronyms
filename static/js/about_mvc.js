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
  const deployd = date.toISOString().split('.')[0] + "Z";

  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';      
  text += '      <code class="lead text-secondary">YASWS (Yet Another Static Web Site) © 2022, 2023, 2024</code></br>';
  text += '      <code class="text-secondary">I created this site partly for fun and to practice building a static website from scratch (with the exception of D3 and Bootstrap :-). Additionally, I hope that others might find it useful. Note: This text was co-written by an AI.</code></br>';
  text += '      <a href="https://github.com/webbstacken/yasws">Link to GitHub repo</a></br>';
  text += '      </br>';

  text += '      <code class="lead text-secondary">Version</code></br>';
  text += '      <code class="text-secondary">' + version + '</code></br>';
  text += '      </br>';

  text += '      <code class="lead text-secondary">Last updated (UTC ISO8601)</code></br>';
  text += '      <code class="text-secondary">' + deployd + '</code></br>';
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

