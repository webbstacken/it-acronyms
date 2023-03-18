// 2023-03-18 Glenn Wadstedt, updated 2023-03-19

var acronymDictionary = {}

const findAcronym = () => {  
  var acronym = document.getElementById("searchInput").value;

  if (acronymDictionary[acronym.toUpperCase()]) {
    updateResult(acronymDictionary[acronym.toUpperCase()])
  }
  else {
    document.getElementById("cardContent").innerHTML = "";
  } 

  document.getElementById("searchInput").value = "";  
}

const updateResult = (acronymArray) => {
  // erase previous card(s)
  document.getElementById("cardContent").innerHTML = "";  
  
  for (const row of acronymArray) {
    var data = JSON.parse(row);
    text  = '<div class="card" style="width: 100%; margin-top:5px;">';
    text += '  <div class="card-body">';
    text += '    <h5 class="card-title"">' + data["ACRONYM"] +' </h5>';
    text += '    <h6 class="card-subtitle mb-2 text-muted">'+ data["Definition"] +'</h6>';
    text += '    <p class="card-text">'+ data["Comment"] +'</p>';    
    if (data["Link"]) {
      text += '    <a href="'+ data["Link"] +'" class="card-link" target="_blank" data-toggle="tooltip" data-placement="top" title="Open link in new tab">Link</a>';
    }
    text += '    <p class="card-text text-muted">'+ 'Last update: ' + data["Updated at"] +'</p>';
    text += '  </div>';
    text += '</div>';
    
    // add card
    document.getElementById("cardContent").innerHTML += text;
  }
}

const updateClock = () => {    
  clockHandle = document.querySelector("#clock")   
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

  d3.csv('./data/mimer.csv', function(data) {    
    if (acronymDictionary[data.ACRONYM]) {      
      acronymDictionary[data.ACRONYM].push(JSON.stringify(data));      
    }
    else {
      acronymDictionary[data.ACRONYM] = [JSON.stringify(data)];
    }        
  });

  document.getElementById("searchInput").addEventListener("keypress", function(event) {  
    if (event.key === "Enter") {    
      event.preventDefault();    
      findAcronym();
    }
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", init);