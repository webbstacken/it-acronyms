// 2023-03-18 Glenn Wadstedt, updated 2023-03-31
import { initAcronyms } from "./acronyms_mvc.js"
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 

const ROUTES = {
    "Acronyms": 0,
    "SpellingAlphabet": 1
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    if (newRoute == ROUTES.Acronyms) {
        initAcronyms(document);
    }
    else if (newRoute == ROUTES.SpellingAlphabet) {
        initSpellingAlphabet(document);
    }
}

const initEventhandlers = (document) => {
    document.getElementById("acronymsId").addEventListener("click", () => {        
        route(document, ROUTES.Acronyms);
    })
    document.getElementById("spellingAlphabetId").addEventListener("click", () => {        
        route(document, ROUTES.SpellingAlphabet);
    })
}

export function initRouter(document ) {          
    initEventhandlers(document);
    route(document, ROUTES.Acronyms );    
}