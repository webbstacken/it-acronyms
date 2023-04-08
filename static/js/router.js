import { initAbout } from "./about_mvc.js";      
import { initHome } from "./home_mvc.js";      
import { initKnowledgeBase } from "./knowledge_base_mvc.js";
import { initSnake } from "./snake_mvc.js";   
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 
import { initSpeechToText } from "./speech_to_text_mvc.js";
import { initTime } from "./time_mvc.js"; 

const ROUTES = {
    "ABOUT": 0,
    "KNOWLEDGE_BASE": 1,
    "HOME": 2,
    "YASNAKE": 3,
    "SPELLING_ALPHABETH": 4,
    "SPEECH_TO_TEXT": 5,
    "TIME": 6
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";
    
    switch (newRoute) {
        case ROUTES.ABOUT: initAbout(document); break;
        case ROUTES.HOME: initHome(document); break;
        case ROUTES.KNOWLEDGE_BASE: initKnowledgeBase(document); break;
        case ROUTES.YASNAKE: initSnake(window, document); break;
        case ROUTES.SPELLING_ALPHABETH: initSpellingAlphabet(document); break;
        case ROUTES.SPEECH_TO_TEXT: initSpeechToText(document); break;
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
    route(document, ROUTES.SPEECH_TO_TEXT);    
    initEventhandlers(document);    
}