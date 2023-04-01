import { initHome } from "./home_mvc.js";      
import { initKnowledgeBase } from "./knowledge_base_mvc.js";
import { initSnake } from "./snake_mvc.js";   
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 
import { initTime } from "./time_mvc.js"; 

const ROUTES = {
    "KnowledgeBase": 0,
    "Home": 1,
    "Snake": 2,
    "SpellingAlphabet": 3,
    "Time": 4
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    if (newRoute == ROUTES.Home) {
        initHome(document);
    }
    else if (newRoute == ROUTES.KnowledgeBase) {
        initKnowledgeBase(document);
    }
    
    else if (newRoute == ROUTES.Snake) {
        initSnake(document);
    }
    else if (newRoute == ROUTES.SpellingAlphabet) {
        initSpellingAlphabet(document);
    }
    else if (newRoute == ROUTES.Time) {
        initTime(document);
    }
}

const initEventhandlers = (document) => {
    document.getElementById("homeId").addEventListener("click", (event) => {                
        route(document, ROUTES.Home);
    });

    document.getElementById("knowledgeBaseId").addEventListener("click", (event) => {                
        route(document, ROUTES.KnowledgeBase);
    });

    document.getElementById("snakeId").addEventListener("click", (event) => {                
        route(document, ROUTES.Snake);
    });

    document.getElementById("spellingAlphabetId").addEventListener("click", (event) => {                
        route(document, ROUTES.SpellingAlphabet);
    });
    
    document.getElementById("timeId").addEventListener("click", (event) => {                
        route(document, ROUTES.Time);
    });
}

export function initRouter(document ) {          
    route(document, ROUTES.Index );    
    initEventhandlers(document);    
}