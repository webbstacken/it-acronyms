// 2023-03-18 Glenn Wadstedt, updated 2023-03-19

const ACRONYMS_FILE_PATH = "./static/data/acronyms.csv";
const acronymDictionary = {}

d3.csv(ACRONYMS_FILE_PATH, function(data) {    
    if (acronymDictionary[data.ACRONYM]) {      
      acronymDictionary[data.ACRONYM].push(JSON.stringify(data));      
    }
    else {
      acronymDictionary[data.ACRONYM] = [JSON.stringify(data)];
    }        
});

const findAcronym = (acronym) => {
  if (acronymDictionary[acronym.toUpperCase()]) {
    return acronymDictionary[acronym.toUpperCase()];
  }
  return undefined;
}

const addAcronymSearchField = (document) => {
  var text = "";
  text  = '<div style="margin-top:20px;" class="container">';        
  text += '  <div class="row">';
  text += '    <div class="col-12">';
  text += '      <input id="searchInput" type="text" autocomplete="off" class="form-control" placeholder="IT acronym search e.g. radius" aria-label="IT acronym search e.g. radius">';
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
  //acronymDictionary.sort((a, b) => (a.alphabeth < b.alphabeth ? 1 : -1));
  document.getElementById("searchInput").addEventListener("input", function(event) {    
    document.getElementById("cardContent").innerHTML = "";  
    var searchTerm = document.getElementById("searchInput").value.toUpperCase();
    if (searchTerm !== "") {
      for (const item in acronymDictionary) {        
        if (item.startsWith(searchTerm)){
          var acronyms = findAcronym(item);    
          addCards(document, acronyms);
        }        
      };          
    }      
  })
};

export function initAcronyms(document) {  
  setupView(document);
  setupEventListener(document);
}