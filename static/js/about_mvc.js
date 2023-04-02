var version = "";

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

  var text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">About...</h1>';
  text += '      <p class="lead">Version: ' + version +  '</p>'
  text += '      <hr class="my-4">';
  text += '      <p class="lead">text text</p>'
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