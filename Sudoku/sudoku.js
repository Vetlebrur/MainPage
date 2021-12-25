var boardEl = document.getElementById("board");
var boardCodeInputEl = document.getElementById("boardCode");

var boardCode = "";
var templateBoard = [];
var board = [];

function setupBoard(){
    boardCode = boardCodeInputEl.value;
    templateBoard = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(boardCode.charAt(j+i*9));
        }
        templateBoard.push(row);
    }

    console.log(templateBoard);

    board = [...templateBoard];

    for (const row of templateBoard) {
        for (const index of row){
            let square = (index == 0)? document.createElement("input"): document.createElement("div");
            square.innerHTML = (index != 0)? index: ""; 
            square.setAttribute("onInput","insertValue(this)")
            square.id = "square";
            boardEl.appendChild(square);
        }
    }
}
// var boardCode = "103456789456789123789123456231564897564897231897231564312978645645312978978645312";
// var templateBoard = [];
// for (let i = 0; i < 9; i++) {
//     let row = [];
//     for (let j = 0; j < 9; j++) {
//         row.push(boardCode.charAt(j+i*9));
        
        
        
//     }
//     templateBoard.push(row);
    
    
// }
// console.log(templateBoard);

// var board = [...templateBoard];


// for (const row of templateBoard) {
//     for (const index of row){
//         let square = (index == 0)? document.createElement("input"): document.createElement("div");
//         square.innerHTML = (index != 0)? index: ""; 
//         square.setAttribute("onInput","insertValue(this)")
//         square.id = "square";
//         boardEl.appendChild(square);
        

//     }
// };

function insertValue(filledSquare){
    console.log("value inserted")
    let index = [...filledSquare.parentElement.children].indexOf(filledSquare);
    let row = 0;
    let column = index;
    while (column>=9){
        column -=9;
        row++;
    }
    board[row][column] = boardEl.children[index].value;


    let validBoard = checkRows()? (checkColumns()? (checkBoxes()? true : false) : false) : false;
    if (validBoard){
        boardEl.style.background = "white";

        if (checkAll()){
            console.log("you have solved it!")
            boardEl.style.background = "lime";
        }
    }
    else{
        boardEl.style.background = "red";
        console.log("error: illegal input")
    }



}
function checkAll(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0){
                return false;
            } 
        }
    }
    return true;
}

function checkRows(){
    let valid = true;
    for (let i = 0; i<9; i++) {
        let ones = 0;
        let twos = 0;
        let threes = 0;
        let fours = 0;
        let fives = 0;
        let sixes = 0;
        let sevens = 0;
        let eights = 0;
        let nines = 0;
        for (let j = 0; j<9; j++){
            (board[i][j] == 1)? ones++ :
            (board[i][j] == 2)? twos++ :
            (board[i][j] == 3)? threes++:
            (board[i][j] == 4)? fours++ :
            (board[i][j] == 5)? fives++ :
            (board[i][j] == 6)? sixes++ :
            (board[i][j] == 7)? sevens++:
            (board[i][j] == 8)? eights++:
            (board[i][j] == 9)? nines++ :0;
        }
        valid =
        (ones > 1)? false : 
        (twos > 1)? false :
        (threes > 1)? false :
        (fours > 1)? false :
        (fives > 1)? false :
        (sixes > 1)? false :
        (sevens > 1)? false :
        (eights > 1)? false :
        (nines > 1)? false :
        true;
        if (!valid){
            return false;
        }
    }
    
    return valid;
}
function checkColumns(){
    let valid = true;
    for (let i = 0; i<9; i++) {
        let ones = 0;
        let twos = 0;
        let threes = 0;
        let fours = 0;
        let fives = 0;
        let sixes = 0;
        let sevens = 0;
        let eights = 0;
        let nines = 0;
        for (let j = 0; j<9; j++){
            (board[j][i] == 1)? ones++ :
            (board[j][i] == 2)? twos++ :
            (board[j][i] == 3)? threes++:
            (board[j][i] == 4)? fours++ :
            (board[j][i] == 5)? fives++ :
            (board[j][i] == 6)? sixes++ :
            (board[j][i] == 7)? sevens++:
            (board[j][i] == 8)? eights++:
            (board[j][i] == 9)? nines++ :0;
        }
        valid =
        (ones > 1)? false : 
        (twos > 1)? false :
        (threes > 1)? false :
        (fours > 1)? false :
        (fives > 1)? false :
        (sixes > 1)? false :
        (sevens > 1)? false :
        (eights > 1)? false :
        (nines > 1)? false :
        true;
        if (!valid){
            return false;
        }
    }
    return valid;
}
function checkBoxes(){
    let valid = true;
    for (let i = 0; i < 9; i+=3) {
        for (let j = 0; j < 9; j+=3) {
            let ones = 0;
            let twos = 0;
            let threes = 0;
            let fours = 0;
            let fives = 0;
            let sixes = 0;
            let sevens = 0;
            let eights = 0;
            let nines = 0;
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    (board[i+k][j+l] == 1)? ones++:
                    (board[i+k][j+l] == 2)? twos++:
                    (board[i+k][j+l] == 3)? threes++:
                    (board[i+k][j+l] == 4)? fours++ :
                    (board[i+k][j+l] == 5)? fives++ :
                    (board[i+k][j+l] == 6)? sixes++ :
                    (board[i+k][j+l] == 7)? sevens++:
                    (board[i+k][j+l] == 8)? eights++:
                    (board[i+k][j+l] == 9)? nines++ :1;
                }
                
            }
            valid =
            (ones > 1)? false : 
            (twos > 1)? false :
            (threes > 1)? false :
            (fours > 1)? false :
            (fives > 1)? false :
            (sixes > 1)? false :
            (sevens > 1)? false :
            (eights > 1)? false :
            (nines > 1)? false :
            true;
            if (!valid){
                return false;
            }
        }
    }
    return valid;
}