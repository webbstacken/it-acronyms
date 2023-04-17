class Board{
  #state = [];
  #COLUMNS = 7;
  #ROWS = 6;
  #FREE_POSITION = "";

  constructor(){
    this.#initBoard();
  }

  #initBoard() {
    for (let row = 0; row < this.#ROWS; row++){
      let rowData = [];
      for (let column = 0; column < this.#COLUMNS; column++){                
        rowData.push(this.#FREE_POSITION);
      }            
      this.#state.push(rowData);
    }        
  }

  isColumnFreeToPlay(column){
    let columns = [];
    for (let row = 0; row < this.#ROWS; row++ ){
      columns.push(this.#state[row][column]);
    }
    return columns.some(element => element == this.#FREE_POSITION);
  }

  placeMarker(column, marker){        
    for (let row = this.#ROWS - 1; row >= 0; row-- ){
      if (this.#state[row][column] == this.#FREE_POSITION) {
        this.#state[row][column] = marker;
        break;
      }            
    }        
  }

  run() {
    let marker = "X";        
    while(true){                        
      let column = prompt("Player: " + marker + ", Column to play (x or X to quit!): ");
      if (column == "x" || column == "X") {
        break;
      }            
      if (this.isColumnFreeToPlay(column)){
        this.placeMarker(column, marker);
        marker = marker == "X" ? "O" : "X";
      }
      console.table(this.#state);
    }
  }
}