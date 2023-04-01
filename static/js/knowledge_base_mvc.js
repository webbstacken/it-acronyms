const knowledgeBaseDictionary = new KnowledgeBaseDictionary("./static/data/acronyms.csv");    

const addKnowledgeBaseSearchField = (document) => {
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
  try {  
        acronymArray.forEach((row) => {      
          row.forEach((element) => {         
            var data = JSON.parse(element);
            var text = "";
            text  = '<div class="card" style="width: 100%; margin-top:5px;">';
            text += '  <div class="card-body">';
            text += '    <h5 class="card-title"">' + data["Acronym"] +' </h5>';
            text += '    <h6 class="card-subtitle mb-2 text-muted">'+ data["Definition"] +'</h6>';
            text += '    <p class="card-text">'+ data["Comment"] +'</p>';                
            if (data["Link"]) {
              text += '    <a href="'+ data["Link"] +'" class="card-link" target="_blank" data-toggle="tooltip" data-placement="top" title="Open link in new tab">Link</a>';
            }
            text += '    <p class="card-text text-muted small">'+ 'Last updated: ' + data["UpdatedAt"] +'</p>';
            text += '  </div>';
            text += '</div>';
        
            // add card
            document.getElementById("cardContent").innerHTML += text;
          });
        });
      }  
  catch (e) {
    console.log(e);
  }
}

const setupView = (document) => {
  addKnowledgeBaseSearchField(document);
}

const setupEventListener = (document) => {  
  document.getElementById("searchInput").addEventListener("input", function(event) {    
    document.getElementById("cardContent").innerHTML = ""; 
    
    var query = document.getElementById("searchInput").value.toUpperCase();
    if (query !== "") {
      var acronyms = knowledgeBaseDictionary.getItems(query);
      addCards(document, acronyms);
    }
  })
};

export function initKnowledgeBase(document) {  
  setupView(document);
  setupEventListener(document);
}