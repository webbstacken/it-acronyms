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
      document.getElementById("textId").innerHTML = text;
    }
}

const startRecording = (document, speechRecognition) => {   
  let textArea = document.getElementById("textId");
  textArea.innerHTML = "";
  textArea.dataset.recording_started = true;
  textArea.style.borderColor = "#F25454";    
  speechRecognition.start();        
  console.log("Recording started!");
}

const stopRecording = (document, speechRecognition) => {  
  let textArea = document.getElementById("textId");
  textArea.dataset.recording_started = false;
  textArea.style.borderColor = "#E5E5E5";          
  speechRecognition.stop();
  console.log("Recording stopped!");  
}

const setupEventListener = (document, speechRecognition) => {
  let textArea = document.getElementById("textId");
  textArea.onclick = () => {    
    textArea.dataset.recording_started == "false" ? startRecording(document, speechRecognition) : stopRecording(document, speechRecognition);          
  }
}

const setupView = (document) => {
  let style = 'height: 80%;padding: 10px; padding-top: 20px;';
  style +=    'font-family: Helvetica, Arial, sans-serif; font-size: 40px; font-style: normal; font-variant: normal; font-weight: 200; line-height: 60px;';
  style +=    'border-width: 1px; border-style: solid; border-color: #E5E5E5; border-radius: 12px;';

  let text = "";     
  text += '<div class="container-fluid" style="padding-top: 10%;padding-left: 10%;padding-right: 10%;">';         
  text += '   <div class="row">';          
  text += '       <div id="textId" data-recording_started="false" style="'+ style + '">Tryck här för att starta "text till tal"</div>';
  text += '   </div>'; 
  text += '</div>'; 
    
  document.getElementById("centerId").innerHTML = text;    
}

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