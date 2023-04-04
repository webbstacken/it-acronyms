import { initAbout } from "./about_mvc.js";      
import { initHome } from "./home_mvc.js";      
import { initKnowledgeBase } from "./knowledge_base_mvc.js";
import { initSnake } from "./snake_mvc.js";   
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 
import { initTime } from "./time_mvc.js"; 

const ROUTES = {
    "ABOUT": 0,
    "KNOWLEDGE_BASE": 1,
    "HOME": 2,
    "SNAKE": 3,
    "SPELLING_ALPHABETH": 4,
    "TIME": 5
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";
    
    switch (newRoute) {
        case ROUTES.ABOUT: initAbout(document); break;
        case ROUTES.HOME: initHome(document); break;
        case ROUTES.KNOWLEDGE_BASE: initKnowledgeBase(document); break;
        case ROUTES.SNAKE: initSnake(window, document); break;
        case ROUTES.SPELLING_ALPHABETH: initSpellingAlphabet(document); break;
        case ROUTES.TIME: initTime(document); break;
        default: console.log("Unknown route: '" + newRoute + "'"); 
    }
}

const initEventhandlers = (document) => {
    for (const key in ROUTES) {
        let id = key+ "_ID";
        let newRoute = ROUTES[key];
        document.getElementById(id).addEventListener("click", (event) => {                
            route(document, newRoute);
        });
    }
}

export function initRouter(document ) {          
    route(document, ROUTES.HOME );    
    initEventhandlers(document);    
}