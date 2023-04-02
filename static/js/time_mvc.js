const updateClock = (clockId) => {    
  var clockHandle = document.querySelector(clockId)   
  if (clockHandle) {
    var date = new Date()  
    clockHandle.innerText = getUtcDaytime(date) + "\n " + getLocaleDaytime(date);
  }
}

const getUtcDaytime = (date) => {    
  var y = date.getUTCFullYear();
  var M = formatNumber(date.getUTCMonth() + 1);
  var D = formatNumber(date.getUTCDate());
  var h = formatNumber(date.getUTCHours());
  var m = formatNumber(date.getUTCMinutes());
  var s = formatNumber(date.getUTCSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " UTC" ;
}

const getLocaleDaytime = (date) => {    
  var y = date.getFullYear();
  var M = formatNumber(date.getMonth() + 1);
  var D = formatNumber(date.getDate());
  var h = formatNumber(date.getHours());
  var m = formatNumber(date.getMinutes());
  var s = formatNumber(date.getSeconds());
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
  var text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid">';        
  text += '  <div class="container">';
  text += '    <h1 class="display-4">Time...</h1>';
  text += '      <p class="lead">text text</p>'
  text += '      <hr class="my-4">';
  text += '      <div id="clockId"></div>'
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