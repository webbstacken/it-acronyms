import { initRouter } from "./router.js"

const initMain = (document) => {       
    initRouter(document);        
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", initMain(document));