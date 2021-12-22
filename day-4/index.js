/* DAY 4

   You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't 
   see any sunlight. What you can see, however, is a gian squid that has attached itself to the outside of your
   submarine.

   Maybe it wants to play bingo?

   Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random,
   and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.)
   If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

   The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time.
   It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input).
   
   For example:

   7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1

   22  13  17  11   0
    8   2  23   4  24
   21   9  14  16   7
    6  10   3  18   5
    1  12  20  15  19

    3  15   0   2  22
    9  18  13  17   5
   19   8   7  25  23
   20  11  10  24   4
   14  21  16  12   6

   14  21  17  24   4
   10  16  15   9  19
   18   8  23  26  20
   22  11  13   6   5
    2   0  12   3   7

   After the first five numbers are drawn (7, 4, 9, 5 and 11), there are no winners, but the boards are marked as follows
   (shown here adjacent to each other to save space):

   22  13  17  11   0       3  15   0   2  22        14  21  17  24   4
   8    2  23   4  24       9  18  13  17   5        10  16  15   9  19
   21   9  14  16   7      19   8   7  25  23        18   8  23  26  20
   6   10   3  18   5      20  11  10  24   4        22  11  13   6   5
   1   12  20  15  19      14  21  16  12   6         2   0  12   3   7

   After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

   22  13  17  11   0       3  15   0   2  22        14  21  17  24   4
   8    2  23   4  24       9  18  13  17   5        10  16  15   9  19
   21   9  14  16   7      19   8   7  25  23        18   8  23  26  20
   6   10   3  18   5      20  11  10  24   4        22  11  13   6   5
   1   12  20  15  19      14  21  16  12   6         2   0  12   3   7

   Finally, 24 is drawn:

   22  13  17  11   0       3  15   0   2  22        14  21  17  24   4
   8    2  23   4  24       9  18  13  17   5        10  16  15   9  19
   21   9  14  16   7      19   8   7  25  23        18   8  23  26  20
   6   10   3  18   5      20  11  10  24   4        22  11  13   6   5
   1   12  20  15  19      14  21  16  12   6         2   0  12   3   7

   At this point, the third board wins because it has at least one complete row or column of marked numbers
   (in this case, the entire top row is marked: 14 21 17 24 4).

   The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board;
   in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24,
   to get the final score, 188 * 24 = 4512.

   To guarantee victory against the giant squid, figure out which board will win first.
  
   What will your final score be if you choose that board?

*/

const fs = require("fs");

const data = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");
const numbers = data.shift().split(",");
const dataLength = Math.ceil(data.length / 6);

let boardArray = [];
let winner_board = [];

function generateBoard() {
    for(let i = 0; i < dataLength; i++) {
	let grid = [];
	for(let y = 0; y < 5; y++) {
	    grid.push(data.shift().split(" ").filter(Boolean));
	}
	boardArray.push(new Board(grid));
	data.shift();
    }
}

class Cell {
    constructor(marked, value) {
	this.marked = marked;
	this.value = value;
    }
};

class Board {
    constructor(board) {
	this.board = board;
	this.winner = false;

	this.initValues();
    }

    initValues() {
	for(let i = 0; i < this.board.length; i++) {
	    for(let j = 0; j < this.board[i].length; j++) {
		this.board[i][j] = new Cell(false, this.board[i][j]);
	    }
	}
    }

    printBoard() {
	console.log(this.board);
    }
    
    checkForWinner() {	
	let row_count = 0;
	let column_count = 0;

	for(let i = 0; i < this.board.length && !this.winner; i++) {
	    for(let j = 0; j < this.board[i].length && !this.winner; j++) {
		if(row_count === 5) {
		    this.winner = true;
		}
		if(this.board[i][j].marked) row_count++;
		else { row_count = 0; break; }
	    }
	}
	
	let col = [];
	
	for(let i = 0; i < this.board.length && !this.winner; i++) {
	    col = this.board.map(x => x[i]);
	    for(let k = 0; k < col.length && !this.winner; k++) {
		if(column_count === 5) {
		    this.winner = true;
		}
		if(col[k].marked) column_count++;
		else { column_count = 0; break; }
	    }
	}

	return this.winner;
    }
};

function partOne() {
    generateBoard();
    
    let draw = 0;
    let sum = 0;
    let stop = false;
    
    for(let i = 0; i < numbers.length && !stop; i++) {
	draw = parseInt(numbers[i]);
	console.log("drawing: " + draw);

	for(let j = 0; j < boardArray.length && !stop; j++) {
	    for(let k = 0; k < boardArray[j].board.length && !stop; k++) {
		let found = boardArray[j].board[k].find(e => parseInt(e.value) == draw);
		if(found) {
		    found.marked = true;
		}
	    }

	    if(boardArray[j].checkForWinner()) {
		winner_board = boardArray[j];
		stop = true;
	    }
	}
    }
    console.log("first winner found");
    winner_board.printBoard();

    for(let i = 0; i < winner_board.board.length; i++) {
	for(let j = 0; j < winner_board.board[i].length; j++) {
	    if(!winner_board.board[i][j].marked) sum += parseInt(winner_board.board[i][j].value)
	}
    }
    console.log("Sum of all unmarked numbers: " + sum);
    console.log("Winning draw: " + draw);
    console.log("Sum multiplied by winning draw: " + sum * draw);
}
partOne();
