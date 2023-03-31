// 2023-03-18 Glenn Wadstedt, updated 2023-03-31
import { initAcronyms } from "./acronyms.js"
import { initTBD } from "./tbd.js"; 

const ROUTES = {
    "Acronyms": 0,
    "TBD": 1
};

const route = (document, newRoute) => {    
    document.getElementById("centerId").innerHTML = "";    

    if (newRoute == ROUTES.Acronyms) {
        initAcronyms(document);
    }
    else if (newRoute == ROUTES.TBD) {
        initTBD(document);
    }
}

const initEventhandlers = (document) => {
    document.getElementById("acronymsId").addEventListener("click", () => {        
        route(document, ROUTES.Acronyms);
    })
    document.getElementById("TBDId").addEventListener("click", () => {        
        route(document, ROUTES.TBD);
    })
}

export function initRouter(document ) {          
    initEventhandlers(document);
    route(document, ROUTES.Acronyms );    
}