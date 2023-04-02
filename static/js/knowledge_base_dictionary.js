class KnowledgeBaseDictionary{        
    #dictionary = {};

    constructor(filePath){
        this.#initDictionary(filePath);                    
    }

    #initDictionary = async (filePath) => {
        let self = this;
        let tempItems = [];           
        await d3.csv(filePath).then(function(data) {
            tempItems = data;
        });
        
        tempItems.forEach((element) => {            
            if (self.#dictionary[element.Acronym]) {      
                self.#dictionary[element.Acronym].push(JSON.stringify(element));      
            }
            else {
                self.#dictionary[element.Acronym] = [JSON.stringify(element)];
            }
        })
    }

    #getItem(query) {
        try {
            let item = this.#dictionary[query.toUpperCase()];
            return this.#dictionary[query.toUpperCase()];
        } catch(e) {
            return undefined;
        }
    }

    getItems(query) {
        let acronyms = [];
        try {            
            for (const acronym in this.#dictionary) {    
                if (acronym.startsWith(query)){
                    acronyms.push(this.#getItem(acronym));                              
                }
            }
            return acronyms;
        } catch(e) {
            return acronyms;
        }
    }
}