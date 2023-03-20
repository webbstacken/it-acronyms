// 2023-03-19 Glenn Wadstedt, updated 2023-03-20
const addSearchField = (document) => {
  var text = "";
  text  = '<div style="margin-top:20px;" class="container">';        
  text += '  <div class="row">';
  text += '    <div class="col-12">';
  text += '      <input id="searchInput" type="text" class="form-control" placeholder="TBD...">';
  text += '    </div>';
  text += '  </div>';
  text += '  <div class="row">';
  text += '    <br>';
  text += '  </div>';
  text += '  <div id="cardContent">';
  text += '  </div>';
  text += '</div>';

  document.getElementById("centerId").innerHTML += text;
}

const setupView = (document) => {
  addSearchField(document);
}

const setupEventListener = (document) => {
// HERE I AM!  
}

export function initTBD(document) {
  setupView(document);
  setupEventListener(document);  
}