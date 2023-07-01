/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
// VARIABLES------------------------------------------------------------------------
var board;
var size = 8;
var currentPlayer;
var winer;
var squareLenth = 0;

var tela;
var brush;

// Testing Methods
function checkExecuted(string) {
	var s = string;
	document.getElementById("textout").textContent = s;
}

function startReversiByHA() {
    initializeGame(8);
    creatInterface();
}

// GAME LOGIC=======================================================================
function initializeGame(s) {
	size = s;
	board = new Array(size + 1).fill(0).map(() => new Array(size + 1).fill(0));
	currentPlayer = 2;
	winer = 0;
	center = size / 2;
	board[center][center] = 1;
	board[center + 1][center +1] = 1;
	board[center][center + 1] = 2;
	board[center + 1][center] = 2;
}

function getCellsToReversi(m, n) {
	var cellToReversi = [];
	var cellsFound = [];
	var k, l;
	if(board[m][n] == 0) {
		for(u = -1; u <= 1; u++) {
			for(v = -1; v <= 1; v++){
				cellsFound = [];
				k = m;
				l = n;
				c1 = true;
				c2 = true;
				while (c1 && c2){
					k = k + u;
					l = l + v;
					if(k < 1 || l < 1 || k > size || l > size){
						c1 = false
					}else if(board[k][l] == 0) {
						c1 = false
					}else if(board[k][l] == currentPlayer){
						c2 = false;
					}else {
						cellsFound.push([k, l]);
					}
				}
				if(!c2) {
					cellToReversi = cellToReversi.concat(cellsFound);
				}
			}
		}
	}
	return cellToReversi;
}

function getValidMoves() {
	var moves = [];
	var cells = [];
	for(i = 1; i <= size; i++) {
		for(j = 1; j <= size; j++) {
			cells = getCellsToReversi(i, j);
			if(cells.length != 0){
				moves.push([i, j]);
			}
		}
	}
	return moves;
}

function playAction(r, c) {
	var cells = getCellsToReversi(r, c);
	if(cells.length != 0) {
		board[r][c] = currentPlayer;
		for(i = 0; i < cells.length; i++) {
			board[cells[i][0]][cells[i][1]] = currentPlayer;
		}
		shiftPlayer();
	}
	checkGameState();
}

function shiftPlayer() {
	if(currentPlayer == 1) {
		currentPlayer = 2;
	} else {
		currentPlayer = 1;
	}
}

function getScorre() {
	var score = [0, 0, 0];
	for(i = 1; i <= size; i++) {
		for(j = 1; j <= size; j++) {
			if(board[i][j] == 1) {
				score[1] = score[1] + 1;
			}
			if(board[i][j] == 2) {
				score[2] = score[2] + 1;
			}
		}
	}
	return score;
}

function checkGameState() {
	if(getValidMoves().length == 0) {
		if(getScorre()[1] + getScorre()[2] == size*size) {
			if(getScorre()[1] > getScorre()[2]) {
				winer = 1;
			} else if(getScorre()[1] < getScorre()[2]) {
				winer = 2;
			} else {
				winer = 3;
			}
		} else {
			if(currentPlayer == 1) {
				winer = 2;
			}else if(currentPlayer == 2) {
				winer = 1;
			} else{
				winer = 3;
			}
		}
	}
}
				
// GRAPHIC USER INTERFACE===========================================================
function creatInterface() {
	tela = document.getElementById("tela");
	var sWidth = window.screen.availWidth;
	var sHeight = window.screen.availHeight;
	tela.height = sHeight * 0.7;
	tela.width = tela.height;
	squareLenth = tela.height;
	brush  = tela.getContext("2d");
	tela.addEventListener('click', function(e) {
		clickOnBoard(e);
	});
	
	document.getElementById("menu").style.display='block';
	document.getElementById("menu").style.height = tela.height.toString()+'px';
	
	drawBoard();
}

function drawBoard() {
	brush.fillStyle = "#10bb10";
	brush.fillRect(0, 0, tela.width, tela.height);
	var d = squareLenth / size;
	var inc = d / 15;
	var x, y, x1, x2, y1, y2, w, h, r;
	// Draw dices
	r = d/2 - inc;
	for(i = 1; i <= size; i++){
		for(j = 1; j <= size; j++){
			x = (j - 1) * d + d/2;
			y = (i - 1) * d + d/2;
			if(board[i][j] == 1) {
				brush.fillStyle = '#f0f0f0';
				brush.beginPath();
				brush.arc(x, y, r, 0, 2 * Math.PI);
				brush.fill();
			}
			if(board[i][j] == 2) {
				brush.fillStyle = '#050505';
				brush.beginPath();
				brush.arc(x, y, r, 0, 2 * Math.PI);
				brush.fill();
			}
		}
	}
	
	//Draw valid moves
	var cells = getValidMoves();
	brush.lineWidth = 2;
	if(cells.length != 0) {
		r = d/2 - inc;
		for (i = 0; i < cells.length; i++) {
			x = (cells[i][1] - 1) * d + d/2;
			y = (cells[i][0] - 1) * d + d/2;
			if(currentPlayer == 1) {
				brush.strokeStyle = 'white';
				brush.beginPath();
				brush.arc(x, y, r - 1, 0, 2 * Math.PI);
				brush.stroke();
			}
			if(currentPlayer == 2) {
				brush.strokeStyle = 'back';
				brush.beginPath();
				brush.arc(x, y, r - 1, 0, 2 * Math.PI);
				brush.stroke();
			}
		}	
	}
	
	// Draw grid
	brush.strokeStyle = 'black';
	brush.lineWidth = 2;
	brush.beginPath();
	brush.moveTo(0, 2);
	brush.lineTo(squareLenth + 2, 2);
	brush.moveTo(0, squareLenth - 2);
	brush.lineTo(squareLenth + 2, squareLenth - 2);
	brush.moveTo(2, 0);
	brush.lineTo(2, squareLenth + 2);
	brush.moveTo(squareLenth - 1, 0);
	brush.lineTo(squareLenth - 1, squareLenth + 3);
	brush.stroke();
	brush.lineWidth = 2;
	brush.beginPath();
	for (i = 0; i <= size; i++) {
		x1 = i * d;
		x2 = i * d;
		y1 = 0;
		y2 = squareLenth;
		brush.moveTo(x1, y1);
		brush.lineTo(x2, y2);
		y1 = i * d;
		y2 = i * d;
		x1 = 0;
		x2 = squareLenth;
		brush.moveTo(x1, y1);
		brush.lineTo(x2, y2);
	}
	brush.stroke();
}

function clickOnBoard(e) {
	var x = e.clientX - tela.getBoundingClientRect().left;
	var y = e.clientY - tela.getBoundingClientRect().top;
	var r = Math.floor(y * size / squareLenth + 1);
	var c = Math.floor(x * size / squareLenth + 1);
	if(r > 0 && c > 0 && r <= size && c <= size) {
		playAction(r, c);
		update();
	}
}

function buttonClick(s) {
	initializeGame(s);
	update();
}

function update() {
	document.getElementById("player1Lb").textContent = "White: " + getScorre()[1];
	document.getElementById("player2Lb").textContent = "Black: " + getScorre()[2];
	switch (winer) {
		case 0:
			document.getElementById("stateLb").textContent = "Playing...";
			document.getElementById("stateLb").style.color = "#770077";
			break;
		case 1:
			document.getElementById("stateLb").textContent = "WHITE WINS!";
			document.getElementById("stateLb").style.color = "white";
			break;
		case 2:
			document.getElementById("stateLb").textContent = "BLACK WINS!";
			document.getElementById("stateLb").style.color = "black";
			break;
		case 3:
			document.getElementById("stateLb").textContent = "DRAW";
			document.getElementById("stateLb").style.color = "#770077";
	}
	drawBoard();
}


