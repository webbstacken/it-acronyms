const updateClock = (clockId) => {    
  const clockHandle = document.querySelector(clockId)   
  if (clockHandle) {
    const date = new Date()  
    clockHandle.innerText = getUtcDaytime(date) + "\n " + getLocaleDaytime(date);
  }
}

const getUtcDaytime = (date) => {    
  const y = date.getUTCFullYear();
  const M = formatNumber(date.getUTCMonth() + 1);
  const D = formatNumber(date.getUTCDate());
  const h = formatNumber(date.getUTCHours());
  const m = formatNumber(date.getUTCMinutes());
  const s = formatNumber(date.getUTCSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " UTC" ;
}

const getLocaleDaytime = (date) => {    
  const y = date.getFullYear();
  const M = formatNumber(date.getMonth() + 1);
  const D = formatNumber(date.getDate());
  const h = formatNumber(date.getHours());
  const m = formatNumber(date.getMinutes());
  const s = formatNumber(date.getSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const formatNumber = (n) => {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

const initClock = (window, clockId) => {
  // https://medium.com/programming-essentials/how-to-pass-arguments-to-settimeout-and-setinterval-callbacks-520f13c47e58
  window.setInterval(() => {
    updateClock(clockId)
   }, 1000);     
}

const addContent = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Time...</h1>';
  text += '      <p class="lead">text text</p>'
  text += '      <hr class="my-4">';
  text += '      <div id="clockId"></div>'  
  text += '      <input type="week" id="calenderId" name="week" id="camp-week" min="1970-W1" max="2032-W52" required></input>';
  text += '    </div>';
  text += '  </div>';
  text += '</div>';  
  document.getElementById("centerId").innerHTML = text;
}

const setupView = (document) => {
  addContent(document);
}


const setupEventListener = (document) => {
  // TODO 
}

export function initTime(document) {  
  setupView(document);
  setupEventListener(document);
  initClock(window, "#clockId");    
}