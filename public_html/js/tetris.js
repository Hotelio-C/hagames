/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// VARIABLES------------------------------------------------------------------------

// Animation Variabels
var pixel = new Array(11).fill(0).map(() => new Array(21).fill(0));
var blockColor = new Array(7).fill(0);
var color1, color2, color3, color4;
var logoColor="rgb(55, 55, 55)"

var titleFont, menuOptionFont, currentOptionFont, stateFont, logoFont, infoFont;
var menuOptions = new Array(10).fill(0).map(() => new Array(13).fill(0));
var nameCaracter = [];

var logoCounter1 = 0;
var logoCounter2 = 0;
var logoUp = 25;
var logoRBG = 55;
var xA = [135, 155, 165, 175, 195, 175, 155];
var yA = [185, 185, 135, 185, 185, 85, 85];

var menuTipe, currentMenu, currentOption, numberOfOptions, firstOptions, lastOptions;

var block = new Array(7).fill(0).map(() => new Array(4).fill(0).map(() => new Array(4).fill(0).map(() => new Array(2).fill(0))));
var blockCounting = new Array(8).fill(0);
var currentBlockImage = new Array(4).fill(0).map(() => new Array(2).fill(0));
var nextBlockImage = new Array(4).fill(0).map(() => new Array(2).fill(0));

var currentBlock;
var nextBlock;
var orientation;
var position = new Array(2).fill(0);

var exit, logoIsON, showLogoLine, menuIsOn, isPlaying, pause, gameIsOver, newScorre;

var x, y, velocite;

var playingTime, startTime;

var rightAvaileble = true;
var leftAvaileble = true;
var downAvaileble = true;
var rotateAvaileble = true;

// Rules Variables
var fullLine;
var level;
var scorre;
var levelControler;
var scorreControler;

// Controls Variabels
var comandTime;
var comandExecuted;
var resumeAvailable;
var endOfGame;

// Data Variables
var theme;

// New Variables
var tela;
var brush;
var timeCounter = 0;
var loopPeriod = 10;
var fps = 30;
var screenUpDateTimer = 0;

// Testing Methods
function startTetrix(){
	// var er = ""
	// for (i = 0; i < 100; i++) {
		// er = er + Math.floor(Math.random() * 7).toString();
	// }
	// checkExecuted(er);
	tela = document.getElementById("tela");
	brush  = tela.getContext("2d");
	initialize();
	startMenu();
	setInterval(gameLoop, loopPeriod);
}

function checkExecuted(string) {
	document.getElementById("textout").textContent = string;
}

// ANIMATIONS-----------------------------------------------------------
function initialize() {
	setScreenSize();
	setTheme(1);
	tela.style="border:1px solid #000000;"
	tela.style.backgroundColor = color4;

	titleFont = "bold 5px Courier New, Monospace";
	menuOptionFont = "bold 20px Courier New, Monospace";
	currentOptionFont = "bold 25px Courier New, Monospace";
	stateFont = "bold 14px Courier New, Monospace";
	logoFont = "bold 26px Courier New, Monospace";
	infoFont = "bold 15px Courier New, Monospace";
	
	defineBlocks();
	setListeners();
	setStaticVariables();
	cleanPixel();
}

function setStaticVariables() {
	menuOptions[1][1] = "RESUME";
	menuOptions[1][2] = "NEW GAME";
	menuOptions[1][3] = "OPTIONS";
	menuOptions[1][4] = "SCORES";
	menuOptions[1][5] = "ABOUT";
	menuOptions[1][6] = "EXIT";

	menuOptions[2][1] = "Level 01";
	menuOptions[2][2] = "Level 02";
	menuOptions[2][3] = "Level 03";
	menuOptions[2][4] = "Level 04";
	menuOptions[2][5] = "Level 05";
	menuOptions[2][6] = "Level 06";
	menuOptions[2][7] = "Level 07";
	menuOptions[2][8] = "Level 08";
	menuOptions[2][9] = "Level 09";
	menuOptions[2][10] = "Level 10";
	menuOptions[2][11] = "Level 11";
	menuOptions[2][12] = "Level 12";
	menuOptions[2][13] = "Level 13";
	menuOptions[2][14] = "Level 14";
	menuOptions[2][15] = "Level 15";

	menuOptions[3][1] = "PLAYER";
	menuOptions[3][2] = "THEME";
	menuOptions[3][3] = "BACK";

	menuOptions[4][1] = "DARK";
	menuOptions[4][2] = "RED";
	menuOptions[4][3] = "GREEN";
	menuOptions[4][4] = "BLUE";
}

function setScreenSize() {
	tela.width = 310;
	tela.height = 410;
	var sWidth = window.screen.availWidth;
	var sHeight = window.screen.availHeight;
	if(sHeight/sWidth > 410/310) {
		tela.width = sWidth*0.60;
		tela.height = tela.width*410/310;
	} else {
		tela.height = sHeight*0.60;
		tela.width = tela.height*310/410;
	}
	var t = tela.width/31*2;
	var s;
	s = 3.2*t;
	titleFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 1.6*t;
	menuOptionFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2*t;
	currentOptionFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 1.1*t;
	stateFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2*t;
	logoFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2*t;
	infoFont = "bold "+s.toString()+"px Courier New, Monospace";
}

function paint() {
	setScreenSize();
	brush.fillStyle = color4;
	brush.fillRect(0, 0, tela.width, tela.height);
	if (menuIsOn) {
		drawMenu();
	}
	if (isPlaying) {
		drawPlayingObjects();
	}
}

function drawMenu() {
	var t = tela.width/25;
	brush.fillStyle = color2;
	brush.font = titleFont;
	brush.fillText("TETRIS", 3.25*t, 7*t);

	if (menuTipe == 1) {
		var c =0;
		for (i = firstOptions; i <= lastOptions; i++) {
			if (i != currentOption) {
				brush.font = menuOptionFont;
				brush.fillStyle = color3;
			} else {
				brush.font = currentOptionFont;
				brush.fillStyle = color2;
			}
			brush.fillText(menuOptions[currentMenu][i], 4*t, (14 + c * 3)*t);
			c++;
		}
	}
	if (menuTipe == 2) {
		for (i = 1; i <= 5; i++) {
			brush.font = menuOptionFont;
			brush.fillStyle = color3;
			brush.fillText(bestPlayer[i], 4*t, (11 + i * 3)*t);
			if (bestScorre[i] != 0) {
				brush.fillText(bestScorre[i].toString(), 15*t, (11 + i * 3)*t);
			} else {
				brush.fillText("00000", 15*t, (11 + i * 3)*t);
			}
		}
	}
	if (menuTipe == 3) {
		for (i = 1; i <= 7; i++) {
			brush.font = menuOptionFont;
			if (i != currentOption) {
				brush.fillStyle = color3;
			} else {
				brush.fillStyle = color2;
			}
			brush.fillText(nameCaracter[i], (1.5 + 2.5*i)*t, 19*t);
			brush.fillStyle = color3;
			brush.fillText("Current: "+player, 2.5*t, 15*t);
		}
	}
	if (menuTipe == 4) {
                infoFont = "bold 20px Courier New, Monospace";
		brush.font = infoFont;
		brush.fillStyle = color2;
		brush.fillText("This game was designed and", t, 13*t);
		brush.fillText("developed by:", 0.5*t, 15.5*t);
		brush.fillStyle = color1;
		brush.fillText("Hotelio China", t, 18*t);
	}
}

function drawPlayingObjects() {
	var t = tela.width/310;
	var x, y;
	var rgb;
	generateBlockImage();
	// Playing Limits Border
	brush.fillStyle = color3;
	brush.fillRect(0, 0, 310*t, 410*t);
	brush.fillStyle = color4;
	brush.fillRect(5*t, 5*t, 300*t, 400*t);
	brush.fillStyle = color3;
	brush.fillRect(205*t, 5*t, 2*t, 400*t);

	// Next block area Border
	brush.fillStyle = color3;
	brush.fillRect(218*t, 48*t, 74*t, 104*t);
	brush.fillStyle = color4;
	brush.fillRect(220*t, 50*t, 70*t, 100*t);
	brush.fillRect(232*t, 40*t, 48*t, 10*t);

	// Line counter Border
	brush.fillStyle = color3;
	brush.beginPath();
	brush.arc(256*t, 215*t, 30*t, 0, 2 * Math.PI);
	brush.fill();
	brush.fillStyle = color4;
	brush.beginPath();
	brush.arc(256*t, 215*t, 28*t, 0, 2 * Math.PI);
	brush.fill();

	// Playing area Grid
	brush.strokeStyle = modifyColor(color4, 20);
	for (i = 1; i <= 9; i++) {
		brush.beginPath();
		brush.moveTo((5 + 20 * i)*t, 5*t);
		brush.lineTo((5 + 20 * i)*t, 403*t);
		brush.stroke();
	}
	for (i = 1; i <= 19; i++) {
		brush.beginPath();
		brush.moveTo(5*t, (5 + 20 * i)*t);
		brush.lineTo(203*t, (5 + 20 * i)*t);
		brush.stroke();
	}
	
	//BUILT BLOCKS
	for (i = 1; i <= 10; i++) {
		for (j = 1; j <= 20; j++) {
			if (pixel[i][j] > -1) {
				rgb = blockColor[pixel[i][j]];
				drawBlockPiece(i, j, rgb);
			}
		}
	}
	
	//CURRENT BLOCK
	rgb = blockColor[currentBlock];
	for (i = 0; i <= 3; i++) {
		x = currentBlockImage[i][0];
		y = currentBlockImage[i][1];
		drawBlockPiece(x, y, rgb);
	}
	
	//NEXT BLOCK
	rgb = blockColor[nextBlock];
	for (i = 0; i <= 3; i++) {
		x = nextBlockImage[i][0];
		y = nextBlockImage[i][1];
		drawBlockPiece(x, y, rgb);
	}
}

function drawBlockPiece(x, y, rgb) {
	if (y > 0) {
		var t = tela.width/310;
		brush.fillStyle = modifyColor(rgb, -30);
		brush.beginPath();
		brush.moveTo((20 * (x - 1) + 5)*t, (20 * (y - 1) + 5)*t);
		brush.lineTo((20 * (x - 1) + 5)*t, (20 * (y - 1) + 20 + 5)*t);
		brush.lineTo((20 * (x - 1) + 20 + 5)*t, (20 * (y - 1) + 20 + 5)*t);
		brush.lineTo((20 * (x - 1) + 5)*t, (20 * (y - 1) + 5)*t);
		brush.fill();
		
		brush.fillStyle = modifyColor(rgb, 30);
		brush.beginPath();
		brush.moveTo((20 * (x - 1) + 5)*t, (20 * (y - 1) + 5)*t);
		brush.lineTo((20 * (x - 1) + 20 + 5)*t, (20 * (y - 1) + 5)*t);
		brush.lineTo((20 * (x - 1) + 20 + 5)*t, (20 * (y - 1) + 5)*t);
		brush.lineTo((20 * (x - 1) + 5)*t, (20 * (y - 1) + 5)*t);
		brush.fill();

		brush.fillStyle = rgb;
		brush.fillRect((20 * (x - 1) + 3 + 5)*t, (20 * (y - 1) + 3 + 5)*t, 14*t, 14*t);
	}
}

function modifyColor(color, d) {
	var rgb = color;
	var r, g, b;
	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	r = parseInt(rgb[0]) + d;
	g = parseInt(rgb[1]) + d;
	b = parseInt(rgb[2]) + d;
	rgb =  "rgb("+r.toString()+", "+g.toString()+", "+b.toString()+")";
	return rgb;
}

function gameLoop() {
	timeCounter += loopPeriod;
	screenUpDateTimer += loopPeriod;
	
	if (!pause && isPlaying) {
		if (timeCounter > velocite) {
			playingTime += velocite;
			comandTime += velocite;
			moveBlock("down");
			timeCounter = 0;
		}
	}
	
	if(screenUpDateTimer >= fps) {
		paint();
		screenUpDateTimer = 0;
	}
}

function setTheme(theme) {

    blockColor[0] = "rgb(214, 143, 52)";
    blockColor[1] = "rgb(207, 34, 87)";
    blockColor[2] = "rgb(146, 146, 42)";
    blockColor[3] = "rgb(84, 155, 120)";
    blockColor[4] = "rgb(170, 68, 79)";
    blockColor[5] = "rgb(107, 72, 73)";
    blockColor[6] = "rgb(32, 53, 80)";
	
	

	if (theme == 1) {
		color1 = "White";
		color2 = "rgb(200, 200, 200)";
		color3 = "Grey";
		color4 = "rgb(35, 35, 35)";
		theme =1;
	}

	if (theme == 2) {
		color1 = "rgb(255, 198, 198)";
		color2 = "rgb(253, 99, 99)";
		color3 = "rgb(148, 8, 8)";
		color4 = "rgb(25, 0, 0)";
		theme =2;
	}

	if (theme == 3) {
		color1 = "rgb(195, 239, 197)";
		color2 = "rgb(34, 216, 146)";
		color3 = "rgb(43, 136, 20)";
		color4 = "rgb(28, 64, 20)";
		theme =3;
	}

	if (theme == 4) {
		color1 = "rgb(196, 220, 239)";
		color2 = "rgb(34, 134, 216)";
		color3 = "rgb(20, 55, 136)";
		color4 = "rgb(20, 33, 64)";
		theme =4;
	}
}

function moveBlock(direction) {
	if (direction == "up" && downAvaileble) {
		while (downAvaileble == true) {
			position[1]++;
			generateBlockImage();
			checkAvailebleMoves();
		}
	}
	if (direction == "down" && downAvaileble) {
		position[1]++;
	}
	if (direction == "left" && leftAvaileble) {
		position[0]--;
	}
	if (direction == "right" && rightAvaileble) {
		position[0]++;
	}
	generateBlockImage();
	checkAvailebleMoves();
	checkState();
}

function rotate(direction) {
	var validPosition = false;
	var leftAdjacent = false;
	var rightAdjacent = false;
	var errorFound = false;
	var previousOrientation = orientation;
	var previousPosition = [position[0], position[1]];
	var x, y;

	//ROTATE BLOCK----------------------------------------------------------
	if (direction == "clockWise" && rotateAvaileble) {
		if (orientation < 3) {
			orientation++;
		} else {
			orientation = 0;
		}
	}
	if (direction == "antiClockWise" && rotateAvaileble) {
		if (orientation > 1) {
			orientation++;
		} else {
			orientation = 3;
		}
	}
	//----------------------------------------------------------------------

	//CHECK POSITIION-------------------------------------------------------
	while (!validPosition) {
		validPosition = true;
		errorFound = false;
		generateBlockImage();

		for (i = 0; i <= 3; i++) {
			x = currentBlockImage[i][0];
			y = currentBlockImage[i][1];

			if (x < 1 && !errorFound) {
				leftAdjacent = true;
				position[0]++;
				validPosition = false;
				errorFound = true;
			}
			if (x > 10 && !errorFound) {
				rightAdjacent = true;
				position[0]--;
				validPosition = false;
				errorFound = true;
			}
			if (x >= 1 && x <= 10 && y >= 1 && y <= 20) {
				if (pixel[x][y] > -1 && x < position[0] && !errorFound) {
					leftAdjacent = true;
					position[0]++;
					validPosition = false;
					errorFound = true;
				}
				if (pixel[x][y] > -1 && x > position[0] && !errorFound) {
					rightAdjacent = true;
					position[0]--;
					validPosition = false;
					errorFound = true;
				}
				if (pixel[x][y] > -1 && x == position[0] && !errorFound) {
					position[1]--;
					validPosition = false;
					errorFound = true;
				}
			}
		}

		if (leftAdjacent && rightAdjacent) {
			orientation = previousOrientation;
			position[0] = previousPosition[0];
			position[1] = previousPosition[1];
			validPosition = true;
			generateBlockImage();
		}
	}
	//----------------------------------------------------------------------

	checkAvailebleMoves();
	checkState();
}

function checkAvailebleMoves() {
	var x, y;
	downAvaileble = true;
	leftAvaileble = true;
	rightAvaileble = true;
	rotateAvaileble = true;

	for (i = 0; i <= 3; i++) {
		x = currentBlockImage[i][0];
		y = currentBlockImage[i][1];

		if (y >= 20) {
			downAvaileble = false;
		}
		if (x <= 1) {
			leftAvaileble = false;
		}
		if (x >= 10) {
			rightAvaileble = false;
		}
		if (x >= 1 && x <= 10 && y >= 1 && y < 20) {
			if (pixel[x][y + 1] > -1) {
				downAvaileble = false;
			}
		}
		if (x > 1 && x < 10 && y >= 1 && y <= 20) {
			if (pixel[x + 1][y] > -1) {
				rightAvaileble = false;
			}
			if (pixel[x - 1][y] > -1) {
				leftAvaileble = false;
			}
		}
	}
}

function setNextBlock() {
	var validBlock = false;

	currentBlock = nextBlock;

	while (!validBlock) {
		nextBlock = Math.floor(Math.random() * 7);
		if (blockCounting[nextBlock] < 2) {
			validBlock = true;
			blockCounting[nextBlock]++;
			blockCounting[7]++;
		}
		if (blockCounting[7] >= 14) {
			for (i = 0; i <= 7; i++) {
				blockCounting[i] = 0;
			}
		}
	}

	orientation = 0;
	position[0] = 5;
	position[1] = 1;

	rightAvaileble = true;
	leftAvaileble = true;
	downAvaileble = true;

	generateBlockImage();
}

function freezBlock() {
	var x, y;
	for (i = 0; i <= 3; i++) {
		x = currentBlockImage[i][0];
		y = currentBlockImage[i][1];
		if (y >= 1 && y <= 20) {
			pixel[x][y] = currentBlock;
		}
	}
}

function generateBlockImage() {
	for (i = 0; i <= 3; i++) {
		nextBlockImage[i][0] = 13 + block[nextBlock][0][i][0];
		nextBlockImage[i][1] = 7 - block[nextBlock][0][i][1];
	}
	for (i = 0; i <= 3; i++) {
		currentBlockImage[i][0] = position[0] + block[currentBlock][orientation][i][0];
		currentBlockImage[i][1] = position[1] - block[currentBlock][orientation][i][1];
	}
}

function gameOver() {
	//Update Scorre---------------------------------------------------------
	/**for (int i = 1; i <= 5; i++) {
		if (Rules.scorre > Data.bestScorre[i]) {
			for (int j = 5; j > i; j--) {
				Data.bestScorre[j] = Data.bestScorre[j - 1];
				Data.bestPlayer[j] = Data.bestPlayer[j - 1];
			}
			Data.bestScorre[i] = Rules.scorre;
			Data.bestPlayer[i] = Data.player;
			if (i == 1) {
				newScorre = true;
			}
			break;
		}
	}**/
	//----------------------------------------------------------------------

	resumeAvailable = false;
	pause = true;
	gameIsOver = true;

	timeCounter = 0;
	while (!menuIsOn) {
		if (timeCounter > 4000) {
			gameIsOver = false;
			newScorre = false;
			startMenu();
		}
	}

}

function cleanPixel() {
	for (i = 1; i <= 10; i++) {
		for (j = 1; j <= 20; j++) {
			pixel[i][j] = -1;
		}
	}
}

// RULES-----------------------------------------------------------------
function checkState() {
	//Did the block hit the ground?
	if (downAvaileble == false) {
		if (comandTime > 400) {
			freezBlock();
			searchFullLine();
			//Check Game Over
			for (i = 1; i <= 10; i++) {
				if (pixel[i][1] > -1) {
					gameOver();
					break;
				}
			}
			setNextBlock();
		}
	}

	//Check Scorre
	if (scorreControler >= 1) {
		switch (scorreControler) {
			case (1):
				scorre += 50;
				break;
			case (2):
				scorre += 150;
				break;
			case (3):
				scorre += 300;
				break;
			case (4):
				scorre += 500;
				break;
		}
		scorreControler = 0;
	}

	//Check Level
	if (levelControler >= 10) {
		if (level < 15) {
			level++;
			if (level < 15) {
				velocite = 800 - level * 50;
			} else {
				velocite = 60;
			}
			levelControler = 0;
		} else {
			endOfGame = true;
			gameOver();
		}
	}
}

function searchFullLine() {
	for (n = 0; n <= 20; n++) {
		for (j = 20; j >= 1; j--) {
			fullLine = true;
			for (i = 1; i <= 10; i++) {
				if (pixel[i][j] < 0) {
					fullLine = false;
					break;
				}
			}
			if (fullLine == true) {
				for (v = j; v > 1; v--) {
					for (u = 1; u <= 10; u++) {
						pixel[u][v] = pixel[u][v - 1];
						pixel[u][v] = pixel[u][v - 1];
					}
				}
				scorreControler++;
				levelControler++;
				break;
			}
		}
	}
}

function initializeGameState() {
	playingTime = 0;
	scorre = 0;
	levelControler = 0;
	scorreControler = 0;
	resumeAvailable = true;

	cleanPixel();

	currentBlock = Math.floor(Math.random() * 7) + 1;
	blockCounting[currentBlock]++;
	nextBlock = Math.floor(Math.random() * 7) + 1;
	blockCounting[nextBlock]++;
	blockCounting[7] += 2;

	orientation = 0;
	position[0] = 5;
	position[1] = 1;
	
	if (level < 15) {
		velocite = 800 - level * 50;
	} else {
		velocite = 60;
	}

}

// CONTROLS--------------------------------------------------------------
function setListeners() {
	window.addEventListener('keydown', function(e) {
		if(isPlaying) {
			switch (e.keyCode) {
				case 37:
					playAction("left");
					break;
				case 38:
					playAction("up");
					break;
				case 39:
					playAction("right");
					break;
				case 40:
					playAction("down");
					break;
				case 32:
					playAction("rotate");
					break;
				case 80:
					playAction("pause");
			}
		}
		if(menuIsOn) {
			switch (e.keyCode) {
				case 38:
					menuAction("up");
					break;
				case 40:
					menuAction("down");
					break;
				case 13:
					menuAction("enter");
			}
		}
		if(e.keyCode == 27) {
			pause = true;
			startMenu();
		}
	});
}

function playAction(comand) {
	if (comand == "left") {
		pause = false;
		moveBlock("left");
		comandTime = 0;
	}
	if (comand == "right") {
		pause = false;
		moveBlock("right");
		comandTime = 0;
	}
	if (comand == "down") {
		pause = false;
		moveBlock("down");
		comandTime = 0;
	}
	if (comand == "up") {
		pause = false;
		moveBlock("up");
	}
	if (comand == "rotate") {
		pause = false;
		rotate("clockWise");
		comandTime = 0;
	}
	if (comand == "pause") {
		pause = !pause;
	}
}

function menuAction( comand) {
	if (comand == "up" && currentOption > 1) {
		if (currentOption == firstOptions) {
			firstOptions--;
			lastOptions--;
		}
		currentOption--;
	}
	if (comand == "down" && currentOption < numberOfOptions) {
		if (currentOption == lastOptions) {
			firstOptions++;
			lastOptions++;
		}
		currentOption++;
	}
	if (comand == "enter") {
		comandExecuted = false;
		if (menuTipe == 1) {
			//MAIN MENU---------------------------------------------------------
			if (currentMenu == 1 && !comandExecuted) {
				//RESUME
				if (currentOption == 1 && resumeAvailable) {
					menuIsOn = false;
					pause = true;
					generateBlockImage();
					isPlaying = true;
				}
				//NEW GAME
				if (currentOption == 2) {
					currentMenu = 2;
					numberOfOptions = 15;
					lastOptions = 6;
					comandExecuted = true;
				}
				//OPTIONS
				if (currentOption == 3) {
					currentMenu = 3;
					numberOfOptions = 3;
					lastOptions = 3;
					comandExecuted = true;
				}
				//SCORES
				if (currentOption == 4) {
					menuTipe = 2;
					comandExecuted = true;
				}
				//ABOUT
				if (currentOption == 5) {
					menuTipe = 4;
					comandExecuted = true;
				}
				//EXIT
				if (currentOption == 6) {
					/**try {
						Data.saveSettings();
						Data.saveState();
						Data.saveScorre();
					} catch (IOException ex) {
						Logger.getLogger(Controls.class.getName()).log(Level.SEVERE, null, ex);
					}
					System.exit(0);
					comandExecuted = true;*/
				}
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//SELECT LEVEL------------------------------------------------------
			if (currentMenu == 2 && !comandExecuted) {
				level = currentOption;
				startPlaying();
				comandExecuted = true;
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//OPTIONS-----------------------------------------------------------
			if (currentMenu == 3 && !comandExecuted) {
				//PLAYER
				if (currentOption == 1) {
					/**numberOfOptions = 7;
					menuTipe = 3;
					comandExecuted = true;*/
				}
				//THEME
				if (currentOption == 2) {
					currentMenu = 4;
					numberOfOptions = 4;
					lastOptions = 4;
					comandExecuted = true;
				}
				//BACK
				if (currentOption == 3) {
					startMenu();
					comandExecuted = true;
				}
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//SELECT THEME------------------------------------------------
			if (currentMenu == 4 && !comandExecuted) {
				setTheme(currentOption);
				currentMenu = 3;
				numberOfOptions = 3;
				lastOptions = 3;
				comandExecuted = true;
				currentOption = 2;
				firstOptions = 1;
			}
			//------------------------------------------------------------------
		}

		if ((menuTipe == 2 || menuTipe == 4) && !comandExecuted) {
			startMenu();
			comandExecuted = true;
		}
		if (menuTipe == 3 && !comandExecuted) {
			/** player = nameCaracter[1];
			for (i = 2; i <= 7; i++) {
				Data.player += nameCaracter[i];
			}
			for (i = 1; i <= 7; i++) {
				nameCaracter[i] = "_";
			}
			menuTipe = 1;
			currentMenu = 3;
			numberOfOptions = 3;
			lastOptions = 3;
			comandExecuted = true;
			currentOption = 1;
			firstOptions = 1; */
		}
	}
}

function startPlaying() {
	initializeGameState();
	menuIsOn = false;
	isPlaying = true;
	pause = false;
}

function startMenu() {
	menuTipe = 1;
	currentMenu = 1;
	currentOption = 1;
	numberOfOptions = 6;
	firstOptions = 1;
	lastOptions = 6;

	isPlaying = false;
	logoIsON = false;
	menuIsOn = true;
}

// DATA------------------------------------------------------------------
function defineBlocks() {
	block[0][0][0][0] = 0;
	block[0][0][1][0] = 1;
	block[0][0][2][0] = 0;
	block[0][0][3][0] = 1;
	block[0][0][0][1] = 0;
	block[0][0][1][1] = 0;
	block[0][0][2][1] = 1;
	block[0][0][3][1] = 1;
	block[0][1][0][0] = 0;
	block[0][1][1][0] = 1;
	block[0][1][2][0] = 0;
	block[0][1][3][0] = 1;
	block[0][1][0][1] = 0;
	block[0][1][1][1] = 0;
	block[0][1][2][1] = 1;
	block[0][1][3][1] = 1;
	block[0][2][0][0] = 0;
	block[0][2][1][0] = 1;
	block[0][2][2][0] = 0;
	block[0][2][3][0] = 1;
	block[0][2][0][1] = 0;
	block[0][2][1][1] = 0;
	block[0][2][2][1] = 1;
	block[0][2][3][1] = 1;
	block[0][3][0][0] = 0;
	block[0][3][1][0] = 1;
	block[0][3][2][0] = 0;
	block[0][3][3][0] = 1;
	block[0][3][0][1] = 0;
	block[0][3][1][1] = 0;
	block[0][3][2][1] = 1;
	block[0][3][3][1] = 1;
	block[1][0][0][0] = 0;
	block[1][0][1][0] = 0;
	block[1][0][2][0] = 0;
	block[1][0][3][0] = 0;
	block[1][0][0][1] = 0;
	block[1][0][1][1] = 1;
	block[1][0][2][1] = 2;
	block[1][0][3][1] = 3;
	block[1][1][0][0] = -1;
	block[1][1][1][0] = 0;
	block[1][1][2][0] = 1;
	block[1][1][3][0] = 2;
	block[1][1][0][1] = 0;
	block[1][1][1][1] = 0;
	block[1][1][2][1] = 0;
	block[1][1][3][1] = 0;
	block[1][2][0][0] = 0;
	block[1][2][1][0] = 0;
	block[1][2][2][0] = 0;
	block[1][2][3][0] = 0;
	block[1][2][0][1] = 0;
	block[1][2][1][1] = 1;
	block[1][2][2][1] = 2;
	block[1][2][3][1] = 3;
	block[1][3][0][0] = -1;
	block[1][3][1][0] = 0;
	block[1][3][2][0] = 1;
	block[1][3][3][0] = 2;
	block[1][3][0][1] = 0;
	block[1][3][1][1] = 0;
	block[1][3][2][1] = 0;
	block[1][3][3][1] = 0;
	block[2][0][0][0] = -1;
	block[2][0][1][0] = 0;
	block[2][0][2][0] = 1;
	block[2][0][3][0] = 0;
	block[2][0][0][1] = 0;
	block[2][0][1][1] = 0;
	block[2][0][2][1] = 0;
	block[2][0][3][1] = 1;
	block[2][1][0][0] = 0;
	block[2][1][1][0] = 0;
	block[2][1][2][0] = 1;
	block[2][1][3][0] = 0;
	block[2][1][0][1] = 0;
	block[2][1][1][1] = 1;
	block[2][1][2][1] = 1;
	block[2][1][3][1] = 2;
	block[2][2][0][0] = 0;
	block[2][2][1][0] = -1;
	block[2][2][2][0] = 0;
	block[2][2][3][0] = 1;
	block[2][2][0][1] = 0;
	block[2][2][1][1] = 1;
	block[2][2][2][1] = 1;
	block[2][2][3][1] = 1;
	block[2][3][0][0] = 1;
	block[2][3][1][0] = 0;
	block[2][3][2][0] = 1;
	block[2][3][3][0] = 1;
	block[2][3][0][1] = 0;
	block[2][3][1][1] = 1;
	block[2][3][2][1] = 1;
	block[2][3][3][1] = 2;
	block[3][0][0][0] = 0;
	block[3][0][1][0] = 0;
	block[3][0][2][0] = 1;
	block[3][0][3][0] = 1;
	block[3][0][0][1] = 0;
	block[3][0][1][1] = 1;
	block[3][0][2][1] = 1;
	block[3][0][3][1] = 2;
	block[3][1][0][0] = 0;
	block[3][1][1][0] = 1;
	block[3][1][2][0] = -1;
	block[3][1][3][0] = 0;
	block[3][1][0][1] = 0;
	block[3][1][1][1] = 0;
	block[3][1][2][1] = 1;
	block[3][1][3][1] = 1;
	block[3][2][0][0] = 0;
	block[3][2][1][0] = 0;
	block[3][2][2][0] = 1;
	block[3][2][3][0] = 1;
	block[3][2][0][1] = 0;
	block[3][2][1][1] = 1;
	block[3][2][2][1] = 1;
	block[3][2][3][1] = 2;
	block[3][3][0][0] = 0;
	block[3][3][1][0] = 1;
	block[3][3][2][0] = -1;
	block[3][3][3][0] = 0;
	block[3][3][0][1] = 0;
	block[3][3][1][1] = 0;
	block[3][3][2][1] = 1;
	block[3][3][3][1] = 1;
	block[4][0][0][0] = 1;
	block[4][0][1][0] = 0;
	block[4][0][2][0] = 1;
	block[4][0][3][0] = 0;
	block[4][0][0][1] = 0;
	block[4][0][1][1] = 1;
	block[4][0][2][1] = 1;
	block[4][0][3][1] = 2;
	block[4][1][0][0] = -1;
	block[4][1][1][0] = 0;
	block[4][1][2][0] = 0;
	block[4][1][3][0] = 1;
	block[4][1][0][1] = 0;
	block[4][1][1][1] = 0;
	block[4][1][2][1] = 1;
	block[4][1][3][1] = 1;
	block[4][2][0][0] = 1;
	block[4][2][1][0] = 0;
	block[4][2][2][0] = 1;
	block[4][2][3][0] = 0;
	block[4][2][0][1] = 0;
	block[4][2][1][1] = 1;
	block[4][2][2][1] = 1;
	block[4][2][3][1] = 2;
	block[4][3][0][0] = -1;
	block[4][3][1][0] = 0;
	block[4][3][2][0] = 0;
	block[4][3][3][0] = 1;
	block[4][3][0][1] = 0;
	block[4][3][1][1] = 0;
	block[4][3][2][1] = 1;
	block[4][3][3][1] = 1;
	block[5][0][0][0] = 1;
	block[5][0][1][0] = 1;
	block[5][0][2][0] = 0;
	block[5][0][3][0] = 1;
	block[5][0][0][1] = 0;
	block[5][0][1][1] = 1;
	block[5][0][2][1] = 2;
	block[5][0][3][1] = 2;
	block[5][1][0][0] = -1;
	block[5][1][1][0] = 0;
	block[5][1][2][0] = 1;
	block[5][1][3][0] = 1;
	block[5][1][0][1] = 0;
	block[5][1][1][1] = 0;
	block[5][1][2][1] = 0;
	block[5][1][3][1] = 1;
	block[5][2][0][0] = 0;
	block[5][2][1][0] = 1;
	block[5][2][2][0] = 0;
	block[5][2][3][0] = 0;
	block[5][2][0][1] = 0;
	block[5][2][1][1] = 0;
	block[5][2][2][1] = 1;
	block[5][2][3][1] = 2;
	block[5][3][0][0] = -1;
	block[5][3][1][0] = -1;
	block[5][3][2][0] = 0;
	block[5][3][3][0] = 1;
	block[5][3][0][1] = 0;
	block[5][3][1][1] = 1;
	block[5][3][2][1] = 1;
	block[5][3][3][1] = 1;
	block[6][0][0][0] = 0;
	block[6][0][1][0] = 0;
	block[6][0][2][0] = 0;
	block[6][0][3][0] = 1;
	block[6][0][0][1] = 0;
	block[6][0][1][1] = 1;
	block[6][0][2][1] = 2;
	block[6][0][3][1] = 2;
	block[6][1][0][0] = 1;
	block[6][1][1][0] = -1;
	block[6][1][2][0] = 0;
	block[6][1][3][0] = 1;
	block[6][1][0][1] = 0;
	block[6][1][1][1] = 1;
	block[6][1][2][1] = 1;
	block[6][1][3][1] = 1;
	block[6][2][0][0] = 0;
	block[6][2][1][0] = 1;
	block[6][2][2][0] = 1;
	block[6][2][3][0] = 1;
	block[6][2][0][1] = 0;
	block[6][2][1][1] = 0;
	block[6][2][2][1] = 1;
	block[6][2][3][1] = 2;
	block[6][3][0][0] = -1;
	block[6][3][1][0] = 0;
	block[6][3][2][0] = 1;
	block[6][3][3][0] = -1;
	block[6][3][0][1] = 0;
	block[6][3][1][1] = 0;
	block[6][3][2][1] = 0;
	block[6][3][3][1] = 1;
}

// the end
