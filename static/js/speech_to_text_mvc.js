const GRAMMAR = {
  "NOLL": 0,
  "ETT":  1,
  "TVÅ":  2,
  "TRE":  3,
  "FYRA":  4,
  "FEM":  5,
  "SEX":  6,
  "SJU":  7,
  "ÅTTA":  8,
  "NIO":  9,
  "PUNKT": ".",
  "FRÅGETECKEN": "?",
  "KOMMATECKEN": ",",
  "UTROPSTECKEN": "!",
  "PLUSTECKEN": "+",
  "MINUSTECKEN": "-",
}

const setUpSpeechRecognition = (document, speechRecognition) => {        
    speechRecognition.continuous = true;
    speechRecognition.interimResults = false;
    speechRecognition.lang = ['sv-SE'];   

    speechRecognition.onerror = (event) => {                  
      console.log(event.error);
      stopRecording(document, speechRecognition);
    }

    speechRecognition.onresult = (event) => {            
      console.log("onresult event!");
      let text = "";
      if (event.results[event.resultIndex].isFinal) {
        console.log("Event isFinal == true");
        stopRecording(document, speechRecognition);
        const textArray = (event.results[event.resultIndex][0].transcript).split(" ");                 
        textArray.forEach(word => {                        
          text += GRAMMAR[word.toUpperCase()] == undefined ? word : GRAMMAR[word.toUpperCase()];
          text += " ";
          console.log("Text: '" + text + "'");              
        });
      }          
      // Update text while preserving the transcript element
      document.getElementById("transcriptText").innerHTML = text;
    }

    // handler for when speech recognition ends
    speechRecognition.onend = () => {
      let rec = document.getElementById("recId");
      if (rec.dataset.recording_started === "true") {
          // Update UI to stopped state
          rec.dataset.recording_started = false;
          rec.innerHTML = `
              <i class="bi bi-record-btn-fill text-danger" style="font-size: 4rem;"></i>
              <span class="ms-3 text-danger fw-bold fs-2">REC</span>
          `;
      }
    };  
}

const startRecording = (document, speechRecognition) => {   
  let textArea = document.getElementById("textId");
  // Create new empty div with same ID for transcript
  textArea.innerHTML = '<div id="transcriptText" class="p-4" style="font-size: 24px; line-height: 1.4;"></div>';
  let rec = document.getElementById("recId");
  rec.dataset.recording_started = true;  
  rec.innerHTML = `
    <i class="bi bi-stop-btn-fill text-dark" style="font-size: 4rem;"></i>
    <span class="ms-3 text-dark fw-bold fs-2">STOP</span>
  `;
  speechRecognition.start();        
}

const stopRecording = (document, speechRecognition) => {      
  let rec = document.getElementById("recId");
  rec.dataset.recording_started = false;  
  rec.innerHTML = `
    <i class="bi bi-record-btn-fill text-danger" style="font-size: 4rem;"></i>
    <span class="ms-3 text-danger fw-bold fs-2">REC</span>
  `;
  speechRecognition.stop();
}

const setupEventListener = (document, speechRecognition) => {
  let rec = document.getElementById("recId");
  rec.onclick = () => {    
    rec.dataset.recording_started == "false" ? startRecording(document, speechRecognition) : stopRecording(document, speechRecognition);
  }
}

const setupView = (document) => {
  let style = 'height: 450px;margin: 10px;';
  style +=    'font-family: Helvetica, Arial, sans-serif; font-size: 60px; font-style: bold; font-variant: normal; font-weight: 200; line-height: 60px;';
  style +=    'border-width: 1px; border-style: solid; border-color: #E5E5E5; border-radius: 12px;';

  let text = "";       
  text += '<div class="d-grid gap-2">';           
  text += '   <div id="textId" style="'+ style + '">';
  text += '     <div id="transcriptText" class="p-4 text-light-emphasis" style="font-size: 24px; line-height: 1.4; color: #adb5bd;">';
  text += '       This app can assist hearing-impaired individuals by transcribing speech to text in real-time.<br><br>';
  text += '       To start transcribing, press the REC button below. Recording will stop automatically after a period of silence,';
  text += '       or you can stop it manually by pressing the STOP button.<br><br>';
  text += '       The transcribed text will appear here.';
  text += '     </div>';
  text += '   </div>';
  
  // Font size controls
  text += '   <div class="d-grid gap-2" style="margin: 12px;">';
  text += '     <div class="btn-group w-100" role="group" aria-label="Font size controls">';
  text += '       <button type="button" class="btn btn-outline-secondary w-50 d-flex justify-content-center align-items-center p-3" onclick="window.decreaseFontSize()">';
  text += '         <i class="bi bi-dash-lg me-2"></i>Decrease Text Size';
  text += '       </button>';
  text += '       <button type="button" class="btn btn-outline-secondary w-50 d-flex justify-content-center align-items-center p-3" onclick="window.increaseFontSize()">';
  text += '         <i class="bi bi-plus-lg me-2"></i>Increase Text Size';
  text += '       </button>';
  text += '     </div>';
  text += '   </div>';
  
  // Record button
  text += '   <button id="recId" class="btn btn-light d-flex justify-content-center align-items-center" type="button" data-recording_started="false" style="margin: 12px;">\
              <i class="bi bi-record-btn-fill text-danger" style="font-size: 4rem;"></i>\
              <span class="ms-3 text-danger fw-bold fs-2">REC</span>\
              </button>';     
  text += '</div>'; 

  document.getElementById("centerId").innerHTML = text;    
}

// Font size control functions
const increaseFontSize = () => {
  const textElement = document.getElementById('transcriptText');
  const currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
  textElement.style.fontSize = (currentSize + 2) + 'px';
}

const decreaseFontSize = () => {
  const textElement = document.getElementById('transcriptText');
  const currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
  if (currentSize > 12) {
    textElement.style.fontSize = (currentSize - 2) + 'px';
  }
}

// Make functions available globally
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;

export function initSpeechToText(document) {
  setupView(document);  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition == undefined) {        
    console.log("SpeechRecognition NOT supported!");
  } 
  else {          
    let speechRecognition = new SpeechRecognition();
    setupEventListener(document, speechRecognition);
    setUpSpeechRecognition(document, speechRecognition);
    console.log("SpeechRecognition supported!");
  }
}