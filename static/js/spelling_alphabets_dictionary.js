class SpellingAlphabetDictionary{        
    #dictionarys = [];

    constructor(filePath){
        this.#initDictionary(filePath);                    
    }

    #initDictionary = async (filePath) => {
        const self = this;
        let tempItems = [];           
        await d3.json(filePath).then(function(data) {
            tempItems = data;
        });
        
        tempItems.forEach((element) => {            
            self.#dictionarys.push(element);
        })
    }

    getCodeWords(textToParse, lang_ISO639_1){    
        const dictionary = this.#dictionarys.find((dictionary) => dictionary.lang_ISO639_1 === lang_ISO639_1);       

        // loop through textToParse char by char and collect corresponding code words
        let textBuffer = "";
        Array.from(textToParse).forEach((char, index) => {
            const dictionaryEntry = dictionary.dictionary.filter((x) => x.symbol === char);

            if (dictionaryEntry && dictionaryEntry.length > 0) {
                const codeWord = dictionaryEntry[0].code_word;
                const spacesToAdd = codeWord.startsWith('.') || codeWord.startsWith('_') ? "&nbsp&nbsp&nbsp": "&nbsp";
                textBuffer = textBuffer + codeWord + spacesToAdd;
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