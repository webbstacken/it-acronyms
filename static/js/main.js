// 2023-03-18 Glenn Wadstedt, updated 2023-03-19

var dict = {}
d3.csv('./data/mimer.csv', function(data) {    
    if (dict[data.ACRONYM]) {      
      dict[data.ACRONYM].push(JSON.stringify(data));      
    }
    else {
      dict[data.ACRONYM] = [JSON.stringify(data)];
    }        
});

document.getElementById("searchInput").addEventListener("keypress", function(event) {  
  if (event.key === "Enter") {    
    event.preventDefault();    
    findAcronym();
  }
});

const findAcronym = () => {  
  var acronym = document.getElementById("searchInput").value;

  if (dict[acronym.toUpperCase()]) {
    updateResult(dict[acronym.toUpperCase()])
  }
  else {
    document.getElementById("cardContent").innerHTML = "";
  } 

  document.getElementById("searchInput").value = "";  
}

const updateResult = (dataArray) => {
  // erase previous card(s)
  document.getElementById("cardContent").innerHTML = "";  
  
  for (const item of dataArray) {
    var data = JSON.parse(item);
    text  = '<div class="card" style="width: 100%;">';
    text += '  <div class="card-body">';
    text += '    <h5 class="card-title"">' + data["ACRONYM"] +' </h5>';
    text += '    <h6 class="card-subtitle mb-2 text-muted">'+ data["Definition"] +'</h6>';
    text += '    <p class="card-text">'+ data["Comment"] +'</p>';
    text += '    <a href="'+ data["Link"] +'" class="card-link" target="_blank">Link (new tab)</a>';
    text += '    <p class="card-text text-muted">'+ 'Last update: ' + data["Updated at"] +'</p>';
    text += '  </div>';
    text += '</div>';
    ""
    // add card
    document.getElementById("cardContent").innerHTML += text;
  }
}

const updateClock = () => {    
  clockHandle = document.querySelector('#clock')   
  if (clockHandle) {  
    clockHandle.innerText = getUtcDaytime() + "\n " + getLocaleDaytime();
  }
}

const getUtcDaytime = () => {  
  date = new Date();
  y = date.getUTCFullYear();
  M = formatNumber(date.getUTCMonth() + 1);
  D = formatNumber(date.getUTCDate());
  h = formatNumber(date.getUTCHours());
  m = formatNumber(date.getUTCMinutes());
  s = formatNumber(date.getUTCSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " UTC" ;
}
const getLocaleDaytime = () => {  
  date = new Date();
  y = date.getFullYear();
  M = formatNumber(date.getMonth() + 1);
  D = formatNumber(date.getDate());
  h = formatNumber(date.getHours());
  m = formatNumber(date.getMinutes());
  s = formatNumber(date.getSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const formatNumber = (n) => {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

const init = () => {  
  setInterval(updateClock, 1000);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", init);