// 2023-03-18 Glenn Wadstedt, updated 2023-03-20
import { initAcronyms } from "./acronyms.js"
import { initClock } from "./clock.js"
import { initTBD } from "./tbd.js"; 

const ROUTES = {
    "Acronyms": 0,
    "TBD": 1
};

const route = (newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    if (newRoute == ROUTES.Acronyms) {
        initAcronyms(document);
    }
    else if (newRoute == ROUTES.TBD) {
        initTBD(document);
    }
}

const initEventhandlers = () => {
    document.getElementById("acronymsId").onclick = () => {
        route(ROUTES.Acronyms);
    };

    document.getElementById("TBDId").onclick = () => {
        route(ROUTES.TBD);
    };
}

const init = () => {      
    initClock(window);    
    route(ROUTES.Acronyms);
    initEventhandlers();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", init(document));