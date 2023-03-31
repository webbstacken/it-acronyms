// 2023-03-31 Glenn Wadstedt, updated 2023-03-31
import { initClock } from "./clock_mvc.js"
import { initRouter } from "./router.js"

const initMain = (document) => {      
    initClock(window, "#clockId");    
    initRouter(document);        
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", initMain(document));