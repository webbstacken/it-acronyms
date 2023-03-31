// 2023-03-21 Glenn Wadstedt, updated 2023-03-21

class AcronymDictionary{        
    #dictionary = {};

    constructor(filePath){
        this.#initDictionary(filePath);                    
    }

    #initDictionary = async (filePath) => {
        var self = this;
        var tempItems = [];           
        await d3.csv(filePath).then(function(data) {
            tempItems = data;
        });
        
        tempItems.forEach((element) => {            
            if (self.#dictionary[element.ACRONYM]) {      
                self.#dictionary[element.ACRONYM].push(JSON.stringify(element));      
            }
            else {
                self.#dictionary[element.ACRONYM] = [JSON.stringify(element)];
            }
        })
    }

    #getItem(query) {
        try {
            return this.#dictionary[query.toUpperCase()];
        } catch(e) {
            return undefined;
        }
    }

    getItems(query) {
        var acronyms = [];
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