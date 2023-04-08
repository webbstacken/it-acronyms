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
  "KOMMA": ","
}

const setUpSpeechRecognition = (document, speechRecognition) => {        
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = ['sv-SE'];   

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

const setupView = (document) => {
  let style = 'height: 750px;padding: 10px; padding-top: 50px;';
  style +=    'font-family: Helvetica, Arial, sans-serif; font-size: 40px; font-style: normal; font-variant: normal; font-weight: 200; line-height: 60px;';
  style +=    'border-width: 1px; border-style: solid; border-color: #E5E5E5; border-radius: 12px;';

  let text = "";     
  text += '<div class="container-fluid" style="padding-left: 150px;padding-right: 150px;>';         
  text += ' <div class="row">';          
  text += '   <div id="textId" data-status="start" style="'+ style + '">Klicka i rutan för att starta!</div>';
  text += ' </div>'; 
  text += '</div>'; 
    
  document.getElementById("centerId").innerHTML = text;    
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

export function initSpeechToText(document) {  
  if ("webkitSpeechRecognition" in window) {    
    setupView(document);  
    let speechRecognition = new webkitSpeechRecognition();
    setupEventListener(document, speechRecognition);
    setUpSpeechRecognition(document, speechRecognition);
  } 
  else {
    alert("webkitSpeechRecognition not supported!");
  }
}