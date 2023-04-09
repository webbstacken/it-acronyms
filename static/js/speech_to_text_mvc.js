const dict = {
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
    speechRecognition.interimResults = true;
    speechRecognition.lang = ['sv-SE'];   

    speechRecognition.onerror = (event) => {                  
      logError(document, event.error);
    }

    speechRecognition.onresult = (event) => {      
      let text = "";
      let index = event.resultIndex;
      while (index < event.results.length) {       
        if (event.results[index].isFinal) {
          stopRecording(document, speechRecognition);
          text = event.results[index][0].transcript; 
          const textArray = text.split(" ");
          text = "";
          textArray.forEach(word => {            
            text += dict[word.toUpperCase()] == undefined ? word : dict[word.toUpperCase()];
            text += " ";              
          });
        }
        index++;         
      }
      document.getElementById("textId").innerHTML = text;
    }
}
const logError = (document, error) => {
  let errorTextArea = document.getElementById("errorId");    
  errorTextArea.style.borderColor = "#F25454";   
  errorTextArea.innerHTML = error;
  alert(error);
  console.log(error)    
}

const startRecording = (document, speechRecognition) => {  
  let textArea = document.getElementById("textId");
  textArea.innerHTML = "";
  textArea.dataset.status = "stop";
  textArea.style.borderColor = "#F25454";    

  speechRecognition.start();        
}

const stopRecording = (document, speechRecognition) => {  
  let textArea = document.getElementById("textId");  
  textArea.innerHTML = "";
  textArea.dataset.status = "start";
  textArea.style.borderColor = "#E5E5E5";          

  speechRecognition.stop();
}
const setupEventListener = (document, speechRecognition) => {
  let textArea = document.getElementById("textId");
  textArea.onclick = () => {    
    if (textArea.dataset.status == "start") {      
      startRecording(document, speechRecognition);
    }   
  }
}

const setupView = (document) => {
  let style = 'height: 80%;padding: 10px; padding-top: 20px;';
  style +=    'font-family: Helvetica, Arial, sans-serif; font-size: 40px; font-style: normal; font-variant: normal; font-weight: 200; line-height: 60px;';
  style +=    'border-width: 1px; border-style: solid; border-color: #E5E5E5; border-radius: 12px;';

  let text = "";     
  text += '<div class="container-fluid" style="padding-left: 10%;padding-right: 10%;">';         
  text += '   <div class="row">';          
  text += '       <div id="textId" data-status="start" style="'+ style + '">Klicka här för att starta "text till tal"</div>';
  text += '   </div>'; 
  text += '   <div class="row">';          
  text += '       <div id="errorId" style="'+ style + ' height: 20%;"></div>';
  text += '   </div>';   
  text += '</div>'; 
    
  document.getElementById("centerId").innerHTML = text;    
}

export function initSpeechToText(document) {
  setupView(document);  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition == undefined) {        
    logError(document, "SpeechRecognition not supported!");
  } 
  else {      
    let speechRecognition = new SpeechRecognition();
    setupEventListener(document, speechRecognition);
    setUpSpeechRecognition(document, speechRecognition);
  }
}