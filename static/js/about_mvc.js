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
  const deployd = date.toISOString();

  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">About...</h1>';
  text += '      <p class="lead">Version: ' + version + '</p>'
  text += '      <p class="lead">Deployd: ' + deployd + '</p>'
  text += '      <hr class="my-4">';
  // TODO https://wiki.creativecommons.org/wiki/best_practices_for_attribution
  
  text += '      <p class="lead">Credits/licenses</p>';
  text += '      <a href="https://github.com/d3/d3/blob/main/LICENSE" class="nav-link">D3 js v7.8.2 Copyright 2010-2023 Mike Bostock</a>';
  text += '      <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" class="nav-link">Bootstrap v5.1.3</a>';                
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

export function initAbout(document) {
  //updateVersion();  
  setupView(document);
  setupEventListener(document);  
}

