// 2023-03-21 Glenn Wadstedt, updated 2023-03-21

class SpellingAlphabetDictionary{        
    #dictionarys = [];

    constructor(filePath){
        this.#initDictionary(filePath);                    
    }

    #initDictionary = async (filePath) => {
        var self = this;
        var tempItems = [];           
        await d3.json(filePath).then(function(data) {
            tempItems = data;
        });
        
        tempItems.forEach((element) => {            
            self.#dictionarys.push(element);
        })
    }

    getCodeWords(inputText){    
        var dictionary = this.#dictionarys[0];

        // loop through the input char by char and collect corresponding code words
        let textBuffer = "";
        Array.from(inputText).forEach((char, index) => {
            const dictionaryEntry = dictionary.dictionary.filter((x) => x.symbol === char);
            if (dictionaryEntry && dictionaryEntry.length > 0) {
                textBuffer = textBuffer + dictionaryEntry[0].code_word + " ";
            } 
            else {
                textBuffer = textBuffer + "? ";
            }
        });

        return {"alphabeth": dictionary.alphabeth, 
                "lang_ISO639_1": dictionary.lang_ISO639_1, 
                "source": dictionary.source,
                "text": textBuffer
            }
    } 

    getDictionaries(){
        return this.#dictionarys;
    }
}