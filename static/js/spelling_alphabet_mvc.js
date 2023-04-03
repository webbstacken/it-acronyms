const spellingAlphabetDictionary = new SpellingAlphabetDictionary("./static/data/spelling_alphabets.json");  

let currentlang_ISO639_1 = "en";

const addRadioButtons = (document) => {  
  const dictionaries = spellingAlphabetDictionary.getDictionaries();
  if (dictionaries) {
    let text = '<div style="margin-top:20px;" class="container">';
    text    += '  <div class="row">';
    text    += '    <div class="col-12" id="radioButtonsId">';      
    text = (document.getElementById("centerId").innerHTML = text);

    dictionaries.map((dictionary) => {
        const { alphabeth, lang_ISO639_1 } = dictionary;                
        text += '<input type="radio" class="btn-check" name="options" id="radioId' + lang_ISO639_1 + '" ' + (lang_ISO639_1 == currentlang_ISO639_1 ? "checked": "") + ' value="' + lang_ISO639_1 + '" ' + '>';
        text += '<label class="btn btn-outline-secondary" for="radioId' + lang_ISO639_1 + '">' + alphabeth + '</label>';      

        text = (document.getElementById("centerId").innerHTML = text);
    });
    
    text    += '    </div>';
    text    += '  </div>';
    text    += '</div>';
    document.getElementById("centerId").innerHTML = text;
  }
}

const addSearchField = (document) => {
  let text = document.getElementById("centerId").innerHTML;
  text += '<div style="margin-top:20px;" class="container">';        
  text += '  <div class="row">';
  text += '    <div class="col-12">';
  text += '      <input id="searchInput" type="text" class="form-control" placeholder="Enter word to spell...">';
  text += '    </div>';
  text += '  </div>';
  text += '  <div class="row">';
  text += '    <br>';
  text += '  </div>';
  text += '  <div id="codeWordsId">';
  text += '  </div>';
  text += '</div>';

  document.getElementById("centerId").innerHTML = text;
}

const addResults = (document, codeWordsInfo) => {
  let text = "";
  text  = '<div class="card" style="width: 100%; margin-top:5px;">';
  text += '  <div class="card-body">';
  text += '    <h5 class="card-title">Alphabeth: ' + codeWordsInfo.alphabeth +' </h5>';
  text += '    <h6 class="card-subtitle mb-2 text-muted">ISO639-1: '+ codeWordsInfo.lang_ISO639_1 +'</h6>';
  text += '    <p class="card-text">'+ codeWordsInfo.text +'</p>';                
  text += '    <a href="'+ codeWordsInfo.source +'" class="card-link" target="_blank" data-toggle="tooltip" data-placement="top" title="Open link in new tab">Source</a>';
  //text += '    <p class="card-text text-muted small">'+ 'Last updated: ' + "UpdatedAt" +'</p>';
  text += '  </div>';
  text += '</div>';
        
 // add card
 document.getElementById("codeWordsId").innerHTML = text;  
}

const setupView = (document) => {
  addRadioButtons(document);    
  addSearchField(document);
}

const setupEventListener = (document) => {
  document.getElementById("searchInput").addEventListener("input", function(event) {    
    document.getElementById("codeWordsId").innerHTML = ""; 
    
    const handle = document.getElementById("searchInput");
    const query = handle.value.toUpperCase();
    if (query !== "") {
      const codeWordsInfo = spellingAlphabetDictionary.getCodeWords(query, currentlang_ISO639_1);
      addResults(document, codeWordsInfo);      
    }
    handle.focus();
  }) 
   
  // https://stackoverflow.com/questions/58606047/how-to-use-on-addeventlistener-on-radio-button-in-plain-javascript
  document.querySelectorAll('input[name="options"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
      const language = event.target.value;      
      
      if (language === currentlang_ISO639_1) 
        return;

      currentlang_ISO639_1 = language;     
      document.getElementById("searchInput");     
      
      // tutorialspoint.com/how-can-i-trigger-an-onchange-event-manually-in-javascript
      document.querySelector('#searchInput').dispatchEvent(new Event("input"))      
    });
  });
}

export function initSpellingAlphabet(document) {  
  setupView(document);
  setupEventListener(document);  
}