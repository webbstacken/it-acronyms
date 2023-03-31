// 2023-03-18 Glenn Wadstedt, updated 2023-03-20
var acronymDictionary = new AcronymDictionary("./static/data/acronyms.csv");

const addAcronymSearchField = (document) => {
  var text = "";
  text  = '<div style="margin-top:20px;" class="container">';        
  text += '  <div class="row">';
  text += '    <div class="col-12">';
  text += '      <input id="searchInput" type="text" autocomplete="off" class="form-control" placeholder="IT acronym search e.g. radius">';
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

const addCards = (document, acronyms) => {  
  if (acronyms) {
    addResultCards(document, acronyms);
  }
  else {
    document.getElementById("cardContent").innerHTML = "";
  }   
}

const addResultCards = (document, acronymArray) => {
  // erase previous card(s)
  //document.getElementById("cardContent").innerHTML = "";  
  
  for (const row of acronymArray) {
    console.log(row);
    var data = JSON.parse(row);
    var text = "";
    text  = '<div class="card" style="width: 100%; margin-top:5px;">';
    text += '  <div class="card-body">';
    text += '    <h5 class="card-title"">' + data["ACRONYM"] +' </h5>';
    text += '    <h6 class="card-subtitle mb-2 text-muted">'+ data["Definition"] +'</h6>';
    text += '    <p class="card-text">'+ data["Comment"] +'</p>';    
    if (data["Link"]) {
      text += '    <a href="'+ data["Link"] +'" class="card-link" target="_blank" data-toggle="tooltip" data-placement="top" title="Open link in new tab">Link</a>';
    }
    text += '    <p class="card-text text-muted small">'+ 'Last updated: ' + data["Updated at"] +'</p>';
    text += '  </div>';
    text += '</div>';
    
    // add card
    document.getElementById("cardContent").innerHTML += text;
  }
}

const setupView = (document) => {
  addAcronymSearchField(document);
}

const setupEventListener = (document) => {  
  document.getElementById("searchInput").addEventListener("input", function(event) {    
    document.getElementById("cardContent").innerHTML = "";  
    var query = document.getElementById("searchInput").value.toUpperCase();
    if (query !== "") {
      var acronyms = acronymDictionary.getItems(query);
      addCards(document, acronyms);
    }
  })
};

export function initAcronyms(document) {  
  setupView(document);
  setupEventListener(document);
}