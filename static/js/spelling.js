// 2023-03-19 Glenn Wadstedt, updated 2023-03-19
const ALPHABETHS_FILE_PATH = "./static/data/alphabeths.json";
var dictionaries = [];
var dictionary = {};
const DEFAULT_LANG_DICTIONARY = "en"
var dictionaryLanguage = DEFAULT_LANG_DICTIONARY;


d3.json(ALPHABETHS_FILE_PATH)
  .then( function(alphabets) {    
    dictionaries = alphabets;
    
    // sort dictionaries in decending order on language
    dictionaries.sort((a, b) => (a.alphabeth < b.alphabeth ? 1 : -1));
    
    // TODO error check
    dictionary = dictionaries.find((element) => element.lang_ISO639_1 === dictionaryLanguage);    
    
    console.log(dictionary);
  })

const addSearchField = (document) => {
  var text = "";
  text  = '<div style="margin-top:20px;" class="container">';        
  text += '  <div class="row">';
  text += '    <div class="col-12">';
  text += '      <input id="searchInput" type="text" class="form-control" placeholder="Add a word...">';
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
//   document.getElementById("searchInput").addEventListener("keypress", function(event) {  
//     if (event.key === "Enter") {    
//       event.preventDefault();    
//       addCards(document);
//     }
//   });
}

export function initSpelling(document) {
  setupView(document);
  setupEventListener(document);  
}