/**
 * Time MVC Module
 * 
 * This module handles time-related functionality including:
 * - Multiple timezone display
 * - DST information
 * - Week number calculation
 * - Timezone selection
 * 
 * Parts of this code were developed with assistance from GitHub Copilot.
 * See ATTRIBUTION.md for details about AI contributions.
 */

const formatNumber = (n) => {
  if (n < 10) {
      return "0" + n;
  }
  return "" + n;
}

const getUtcDaytime = (date) => {    
  const y = date.getUTCFullYear();
  const M = formatNumber(date.getUTCMonth() + 1);
  const D = formatNumber(date.getUTCDate());
  const h = formatNumber(date.getUTCHours());
  const m = formatNumber(date.getUTCMinutes());
  const s = formatNumber(date.getUTCSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " (UTC)";
}

const getGmtDaytime = (date) => {    
  const offset = date.getTimezoneOffset();
  const gmtDate = new Date(date.getTime() + offset * 60 * 1000);
  const y = gmtDate.getFullYear();
  const M = formatNumber(gmtDate.getMonth() + 1);
  const D = formatNumber(gmtDate.getDate());
  const h = formatNumber(gmtDate.getHours());
  const m = formatNumber(gmtDate.getMinutes());
  const s = formatNumber(gmtDate.getSeconds());
  return y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s + " (GMT)";
}

const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

const getOrganizedTimezones = () => {
  const zones = Intl.supportedValuesOf('timeZone');
  const organized = {};

  zones.forEach(tz => {
      const [continent, ...parts] = tz.split('/');
      if (!organized[continent]) {
          organized[continent] = [];
      }
      organized[continent].push({
          id: tz,
          name: parts.join('/').replace(/_/g, ' ')
      });
  });

  return organized;
};

const getDstInfo = (date) => {
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    const stdTimezoneOffset = Math.max(jan, jul);
    const summerOffset = Math.min(jan, jul);

    const year = date.getFullYear();
    // Last Sunday in March at 02:00
    const summerDate = new Date(year, 2, 31 - new Date(year, 2, 31).getDay(), 2, 0, 0);
    // Last Sunday in October at 03:00
    const winterDate = new Date(year, 9, 31 - new Date(year, 9, 31).getDay(), 3, 0, 0);

    return {
        winter: `UTC${stdTimezoneOffset > 0 ? '-' : '+'}${Math.abs(Math.floor(stdTimezoneOffset/60))}:${formatNumber(stdTimezoneOffset%60)}`,
        summer: `UTC${summerOffset > 0 ? '-' : '+'}${Math.abs(Math.floor(summerOffset/60))}:${formatNumber(summerOffset%60)}`,
        current: date.getTimezoneOffset() < stdTimezoneOffset ? "Summer Time" : "Winter Time",
        summerStart: `${summerDate.toLocaleString('sv-SE', { 
            month: 'long', 
            day: 'numeric'
        })} kl. 02:00`,
        winterStart: `${winterDate.toLocaleString('sv-SE', { 
            month: 'long', 
            day: 'numeric'
        })} kl. 03:00`
    };
}

const getSelectedTimeZoneTime = (date, timezone) => {
  const options = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  };
  return date.toLocaleString('sv', options) + ` (${timezone})`;
};

const getTimezoneSelectHtml = (selectedTimezone) => {
  const organized = getOrganizedTimezones();
  
  return Object.entries(organized)
      .map(([continent, zones]) => `
          <optgroup label="${continent.replace(/_/g, ' ')}">
              ${zones.map(zone => `
                  <option value="${zone.id}" 
                          ${zone.id === selectedTimezone ? 'selected' : ''}>
                      ${zone.name || zone.id}
                  </option>
              `).join('')}
          </optgroup>
      `).join('');
};

const getLocaleDaytime = (date) => {    
  const y = date.getFullYear();
  const M = formatNumber(date.getMonth() + 1);
  const D = formatNumber(date.getDate());
  const h = formatNumber(date.getHours());
  const m = formatNumber(date.getMinutes());
  const s = formatNumber(date.getSeconds());
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const epoch = Math.floor(date.getTime() / 1000);  // Convert to Unix epoch (seconds)
  const currentDate = {
      year: y,
      month: date.toLocaleString('en-US', { month: 'long' }),
      weekday: date.toLocaleString('en-US', { weekday: 'long' }),
      epoch: epoch,
      timezone: timezone
  };
  return {
      datetime: `${y}-${M}-${D} ${h}:${m}:${s} (${timezone})`,
      current: currentDate
  };
}

const convertEpochToLocalTime = (epoch, timezone) => {
  const date = new Date(epoch * 1000); // Convert seconds to milliseconds
  const weekNumber = getWeekNumber(date);
  const options = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      weekday: 'long'
  };
  
  return {
      datetime: date.toLocaleString('sv', options) + ` (${timezone})`,
      weekNumber: weekNumber,
      weekday: date.toLocaleString('en-US', { weekday: 'long', timeZone: timezone }),
      month: date.toLocaleString('en-US', { month: 'long', timeZone: timezone }),
      year: date.toLocaleString('en-US', { year: 'numeric', timeZone: timezone })
  };
};

const updateClock = (clockId) => {    
  const clockHandle = document.querySelector(clockId);
  const select = document.getElementById("timezoneSelect");
  
  // Save epoch converter state
  const epochInputValue = document.getElementById('epochInput')?.value;
  const epochResultHtml = document.getElementById('epochResult')?.innerHTML;
  
  if (select?.dataset.selecting === "true") {
      return;
  }

  if (clockHandle) {
      const date = new Date();
      const weekNumber = getWeekNumber(date);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const dstInfo = getDstInfo(date);
      const selectedTimezone = select?.value || timezone;
      const localTime = getLocaleDaytime(date);
      
      clockHandle.innerHTML = `
          <div class="mb-4">
              <h5 class="text-secondary mb-2">Date and time: (<small>${dstInfo.current}<sup>[1]</sup></small>)</h5>
              <div>                  
                  <code class="text-secondary">Week ${weekNumber}, ${localTime.current.weekday}, ${localTime.current.month}, ${localTime.current.year}, (${timezone})</code>
              </div>
              <div class="mt-3">
                  <code class="text-secondary">${getUtcDaytime(date)}</code><br>
                  <code class="text-secondary">${getGmtDaytime(date)}</code><br>
                  <code class="text-secondary">${localTime.datetime}</code><br>
                  <code class="text-muted">Unix Epoch: ${localTime.current.epoch} (${localTime.current.timezone})</code>
              </div>              
              <div class="text-muted small mt-3">                
                  <div>
                      <small>
                          [1] Winter time starts: ${dstInfo.winterStart} (clocks go back 1h), summer time starts: ${dstInfo.summerStart} (clocks go forward 1h)
                      </small>
                  </div>
              </div>

              <hr class="mt-3 mb-3">
              <h5 class="text-secondary mb-3">Select timezone</h5>
              <div class="mb-2">
                  <select class="form-select form-select-sm" id="timezoneSelect" style="max-width: 300px;">
                      ${getTimezoneSelectHtml(selectedTimezone)}
                  </select>
              </div>
              <code class="text-secondary">${getSelectedTimeZoneTime(date, selectedTimezone)}</code>                            
              <h5 class="text-secondary mt-3 mb-2">Unix Epoch Converter</h5>
              <div class="mb-2">
                  <div class="input-group" style="max-width: 300px;">
                      <input type="number" 
                            class="form-control form-control-sm" 
                            id="epochInput" 
                            placeholder="Enter Unix epoch (seconds)"
                            min="0"
                            value="${epochInputValue || ''}">
                      <button class="btn btn-secondary btn-sm" 
                              type="button" 
                              id="convertEpochBtn">Convert</button>
                  </div>
              </div>
              <code class="text-secondary" id="epochResult">${epochResultHtml || ''}</code>
          </div>`;
  }
}

const addContent = (document) => {
  let text = document.getElementById("centerId").innerHTML;  
  text += '<div class="jumbotron jumbotron-fluid mt-3">';
  text += '  <div class="container">';
  text += '    <div class="bg-light p-4 rounded">';
  text += '      <div id="clockId"></div>';
  text += '    </div>';
  text += '  </div>';
  text += '</div>';  
  document.getElementById("centerId").innerHTML = text;
}

const setupView = (document) => {
  addContent(document);
}

const setupEventListener = (document) => {
  const storedTimezone = localStorage.getItem('selectedTimezone');
  
  if (storedTimezone) {
      const select = document.getElementById("timezoneSelect");
      if (select) {
          select.value = storedTimezone;
      }
  }

  // Listen for both click and keydown events on the select
  document.addEventListener('click', (event) => {
      if (event.target.id === 'timezoneSelect') {
          event.target.dataset.selecting = "true";
      }
  }, true);

  document.addEventListener('keydown', (event) => {
      if (event.target.id === 'timezoneSelect' && (event.key === 'Enter' || event.key === ' ')) {
          event.target.dataset.selecting = "true";
      }
  }, true);

  // Listen for selection changes
  document.getElementById("timezoneSelect")?.addEventListener('input', (event) => {
      const select = event.target;
      localStorage.setItem('selectedTimezone', select.value);
      select.dataset.selecting = "false";
      updateClock("#clockId");
  });

  // Cleanup on blur
  document.addEventListener('blur', (event) => {
      if (event.target.id === 'timezoneSelect') {
          event.target.dataset.selecting = "false";
          updateClock("#clockId");
      }
  }, true);
  
  const setupEpochConverter = () => {
    const convertBtn = document.getElementById('convertEpochBtn');
    if (convertBtn) {
        convertBtn.onclick = () => {
            const epochInput = document.getElementById('epochInput');
            const epochResult = document.getElementById('epochResult');
            const select = document.getElementById("timezoneSelect");
            const timezone = select?.value || Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            if (!epochInput || !epochResult) return;
            
            const epoch = parseInt(epochInput.value);
            
            if (isNaN(epoch)) {
                epochResult.innerHTML = 'Please enter a valid Unix epoch timestamp';
                return;
            }
            
            const localTime = convertEpochToLocalTime(epoch, timezone);
            epochResult.innerHTML = `
                <div class="mt-2">
                    <code class="text-secondary">Week ${localTime.weekNumber}, ${localTime.weekday}, ${localTime.month}, ${localTime.year}</code><br>
                    <code class="text-secondary">${localTime.datetime.split(',')[1].trim()}</code>
                </div>`;
        };
    }
  };
   
  window.setInterval(() => {
      const select = document.getElementById("timezoneSelect");
      if (!select?.dataset.selecting) {
          updateClock("#clockId");
          setupEpochConverter(); // Ensure converter is setup after clock updates
      }
  }, 1000);
}

export function initTime(document) {  
  setupView(document);
  setupEventListener(document);
}