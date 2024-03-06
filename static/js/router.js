import { initAbout } from "./about_mvc.js";      
import { initCreditsLicenses } from "./credits_licenses.js";      
//import { initFourInARow } from "./four_in_a_row_mvc.js";
//import { initHome } from "./home_mvc.js";      
import { initKnowledgeBase } from "./knowledge_base_mvc.js";
import { initSnake } from "./snake_mvc.js";   
import { initSpellingAlphabet } from "./spelling_alphabet_mvc.js"; 
//import { initSpeechToText } from "./speech_to_text_mvc.js";
//import { initTime } from "./time_mvc.js"; 

const ROUTES = {
    "ABOUT": 0,
    "KNOWLEDGE_BASE": 1,
    //"HOME": 2,
    "YASNAKE": 3,
    //"FOUR_IN_A_ROW":4,
    "SPELLING_ALPHABETH": 5,
    //"SPEECH_TO_TEXT": 6,
    //"TIME": 7,
    "CREDITS_LICENSES": 8,
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";
    
    switch (newRoute) {
        case ROUTES.ABOUT: initAbout(document); break;
        //case ROUTES.FOUR_IN_A_ROW: initFourInARow(document); break;
        //case ROUTES.HOME: initHome(document); break;
        case ROUTES.KNOWLEDGE_BASE: initKnowledgeBase(document); break;
        case ROUTES.YASNAKE: initSnake(window, document); break;
        case ROUTES.SPELLING_ALPHABETH: initSpellingAlphabet(document); break;
        //case ROUTES.SPEECH_TO_TEXT: initSpeechToText(document); break;
        //case ROUTES.TIME: initTime(document); break;
        case ROUTES.CREDITS_LICENSES: initCreditsLicenses(document); break;        
        default: console.log("Unknown route: '" + newRoute + "'"); 
    }
}

const initEventhandlers = (document) => {
    for (const key in ROUTES) {
        let id = key + "_ID";
        let newRoute = ROUTES[key];
        document.getElementById(id).addEventListener("click", (event) => {                
            route(document, newRoute);
        });
    }
}

export function initRouter(document ) {          
    route(document, ROUTES.KNOWLEDGE_BASE);    
    initEventhandlers(document);    
}
