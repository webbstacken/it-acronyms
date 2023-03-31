// 2023-03-19 Glenn Wadstedt, updated 2023-03-20
const spellingAlphabetDictionary = new SpellingAlphabetDictionary("./static/data/spelling_alphabets.json");  
var currentlang_ISO639_1 = "en";

function radioButtonChanged(event) {
    const language = event.target.value;
    if (language === dictionaryLanguage) {
      return;
    }
    // look up new dictionary
    const dictionary = dictionaries.find((dictionary) => dictionary.lang_ISO639_1 === language);
    currentlang_ISO639_1 = dictionary.lang_ISO639_1;
    
    // clean up...
    // setCodeWords("");
    // inputRef.current.focus();
  };

const addRadioButtons = (document) => {  
  var dictionaries = spellingAlphabetDictionary.getDictionaries();
  if (dictionaries) {
    var text = '<div style="margin-top:20px;" class="container">';
    text    += '  <div class="row">';
    text    += '    <div class="col-12" id="radioButtonsId>';      
    text = (document.getElementById("centerId").innerHTML = text);

    dictionaries.map((dictionary) => {
        const { alphabeth, lang_ISO639_1 } = dictionary;        
        //https://stackoverflow.com/questions/49097300/add-event-listener-for-click-change-on-bootstrap-radio-buttons
        text += '<input type="radio" class="btn-check" name="options" id="radioId' + lang_ISO639_1 + '" ' + 'autocomplete="off" ' + (lang_ISO639_1 == currentlang_ISO639_1 ? "checked": "") + '>';
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
  var text = document.getElementById("centerId").innerHTML;
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
  var text = "";
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
    
    var query = document.getElementById("searchInput").value.toUpperCase();
    if (query !== "") {
      var codeWordsInfo = spellingAlphabetDictionary.getCodeWords(query);
      addResults(document, codeWordsInfo);      
    }
  })
}

export function initSpellingAlphabet(document) {  
  setupView(document);
  setupEventListener(document);  
}