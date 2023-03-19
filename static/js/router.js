// 2023-03-18 Glenn Wadstedt, updated 2023-03-19
import { initAcronyms } from "./acronyms.js"
import { initClock } from "./clock.js"
import { initSpelling } from "./spelling.js"; 

const ROUTES = {
    "Acronyms": 0,
    "Spelling": 1
};

const initEventhandlers = () => {
    document.getElementById("acronymsId").onclick = () => {
        route(ROUTES.Acronyms);
    };

    document.getElementById("spellingId").onclick = () => {
        route(ROUTES.Spelling);
    };
}

const route = (newRoute) => {
    document.getElementById("centerId").innerHTML = "";

    if (newRoute == ROUTES.Acronyms) {
        initAcronyms(document);
    }
    else if (newRoute == ROUTES.Spelling) {
        initSpelling(document);
    }
}

const init = () => {      
    initClock(window);    
    route(ROUTES.Acronyms);
    initEventhandlers();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", init);