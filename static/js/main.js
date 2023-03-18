// 2023-03-18 Glenn Wadstedt, updated 2023-03-18

var dict = {}
d3.csv('./data/mimer.csv', function(data) {    
    dict[data.ACRONYM] = data    
});

document.getElementById("searchInput").addEventListener("keypress", function(event) {  
  if (event.key === "Enter") {    
    event.preventDefault();    
    getAcronym();
  }
});

const getAcronym = () => {  
  var acronym = document.getElementById('searchInput').value;

  if (dict[acronym.toUpperCase()]) {
    updateResult(dict[acronym.toUpperCase()])
  }
  else {
    document.querySelector('#resultAcronym').innerText = ""
    document.querySelector('#resultDefinition').innerText = ""
    document.querySelector('#resultComment').innerText = ""
    document.querySelector('#resultLink').innerText = ""
    document.querySelector('#resultLink').href = ""    
  }  

  document.getElementById('searchInput').value = '';
}

const updateResult = (data) => {
  if (data["ACRONYM"]) { 
    document.querySelector('#resultAcronym').innerText = data["ACRONYM"]
    document.querySelector('#resultDefinition').innerText = data["Definition"]
    document.querySelector('#resultComment').innerText = data["Comment"]    
    document.querySelector('#resultUpdatedAt').innerText = 'Last update: ' + data["Updated at"]
    if(data["Link"]) {
      document.querySelector('#resultLink').innerText = "Source"
      document.querySelector('#resultLink').href = data["Link"]
    }
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

index= 0;
startIndex = 0;
endIndex = 0;
const TEXT_TO_ANIMATE =
"An old silent pond... \
A frog jumps into the pond, \
splash! Silence again. \
\
Autumn moonlight- \
a worm digs silently \
into the chestnut. \
\
In the twilight rain \
these brilliant-hued hibiscus - \
A lovely sunset. \
- Matsuo Basho (1644-1694)";

const MAX_TITLE_LENGTH = 30;

const updateTitle = () => {  
  titelHandle = document.querySelector('title')
  if (titelHandle) {    
    if (endIndex < TEXT_TO_ANIMATE.length) {
      endIndex = index++ % TEXT_TO_ANIMATE.length + 1;
    }    
    if (endIndex > MAX_TITLE_LENGTH) {
      startIndex++;
    } 
    if (startIndex == TEXT_TO_ANIMATE.length - 1) {
      index = 0;
      startIndex = 0;
      endIndex = 1;
    }     
    titelHandle.textContent = TEXT_TO_ANIMATE.substring(startIndex, endIndex);    
  }
}

const init = () => {
  setInterval(updateTitle, 500);
  setInterval(updateClock, 1000);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", init);