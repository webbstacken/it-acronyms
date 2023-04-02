import { initAbout } from "./about_mvc.js";      
import { initHome } from "./home_mvc.js";      
import { initKnowledgeBase } from "./knowledge_base_mvc.js";
import { initSnake } from "./snake_mvc.js";   
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 
import { initTime } from "./time_mvc.js"; 

const ROUTES = {
    "About": 0,
    "KnowledgeBase": 1,
    "Home": 2,
    "Snake": 3,
    "SpellingAlphabet": 4,
    "Time": 5
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    
    if (newRoute == ROUTES.About) {
        initAbout(document);
    }
    else if (newRoute == ROUTES.Home) {
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
    document.getElementById("aboutId").addEventListener("click", (event) => {                
        route(document, ROUTES.About);
    });

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