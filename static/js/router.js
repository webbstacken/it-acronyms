// 2023-03-18 Glenn Wadstedt, updated 2023-03-31
import { initAcronyms } from "./acronyms_mvc.js"
import { initIndex } from "./index_mvc.js"        
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 

const ROUTES = {
    "Acronyms": 0,
    "Index": 1,
    "SpellingAlphabet": 2
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    if (newRoute == ROUTES.Acronyms) {
        initAcronyms(document);
    }
    else if (newRoute == ROUTES.Index) {
        initIndex(document);
    }
    else if (newRoute == ROUTES.SpellingAlphabet) {
        initSpellingAlphabet(document);
    }
}

const initEventhandlers = (document) => {
    document.getElementById("acronymsId").addEventListener("click", () => {        
        route(document, ROUTES.Acronyms);
    })
    document.getElementById("indexsId").addEventListener("click", () => {        
        route(document, ROUTES.Index);
    })
    document.getElementById("spellingAlphabetId").addEventListener("click", () => {        
        route(document, ROUTES.SpellingAlphabet);
    })
}

export function initRouter(document ) {          
    route(document, ROUTES.Index );    
    initEventhandlers(document);    
}