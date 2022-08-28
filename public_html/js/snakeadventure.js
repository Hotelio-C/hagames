/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// VARIABLES------------------------------------------------------------------------

// Animation Variabels
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

var snake = new Array(151).fill(0).map(() => new Array(2).fill(0));
var stage = new Array(251).fill(0).map(() => new Array(2).fill(0));
var prey = [];
var cursor = [];

var increase = new Array(4).fill(0).map(() => new Array(2).fill(0));
var maxLenth = 150;
var maxVelocit = 25;

var exit = false;
var firstGameLoopInitialization = true;
var logoIsON, showLogoLine, isPlaying, isCreatingField, menuIsOn, upDate, pause, gameIsOver, newScorre, showCursor, stageChanging;

var x, y, direction, previousDirection, velocite, snakeLenth;

var menuTipe, currentMenu, currentOption, numberOfOptions, firstOptions, lastOptions;

var playingTime, startTime;

// Rules Variables
var gameMode;
var level, catchedpreys, scorre, life;
var timeInMin, timeInSec;
var time;
var currentStage;
var adventureMode = 1;
var classicMode = 2;
var infinityMode = 3;
var levelControler, lenthControler, stageControler, stageChangingControler;
var myStage, endOfGame;

// Controls Variabels
var fieldCell;
var comandExecuted;
var resumeAvailable;

// Data Variables
var player;
var bestPlayer = ["_", "_", "_", "_", "_", "_", "_"];
var bestScorre = [];
var theme;

// New Variables
var tela;
var brush;
var timeCounter = 0;
var loopPeriod = 10;
var fps = 30;
var screenUpDateTimer = 0;
var aceleration = 0;
var acelerateIsOn = false;

// Testing Methods
function startSnakeAdventure(){
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

	titleFont = "bold 40px Courier New, Monospace";
	menuOptionFont = "bold 20px Courier New, Monospace";
	currentOptionFont = "bold 25px Courier New, Monospace";
	stateFont = "bold 14px Courier New, Monospace";
	logoFont = "bold 26px Courier New, Monospace";
	infoFont = "bold 15px Courier New, Monospace";
	
	setListeners();
	setStaticVariables();
	
	defaultScorres();
}

function setScreenSize() {
	tela.width = 250;
	tela.height = 290;
	var sWidth = window.screen.availWidth;
	var sHeight = window.screen.availHeight;
	if(sHeight/sWidth > 290/250) {
		tela.width = sWidth*0.60;
		tela.height = tela.width*290/250;
	} else {
		tela.height = sHeight*0.60;
		tela.width = tela.height*250/290;
	}
	var t = tela.width/25;
	var s;
	s = 4*t;
	titleFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2*t;
	menuOptionFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2.5*t;
	currentOptionFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 1.4*t;
	stateFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 2.6*t;
	logoFont = "bold "+s.toString()+"px Courier New, Monospace";
	s = 1.5*t;
	infoFont = "bold "+s.toString()+"px Courier New, Monospace";
}

function setStaticVariables() {
	increase[0][0] = 1;
	increase[0][1] = 0;
	increase[1][0] = -1;
	increase[1][1] = 0;
	increase[2][0] = 0;
	increase[2][1] = 1;
	increase[3][0] = 0;
	increase[3][1] = -1;
	
	menuOptions[1][1] = "RESUME";
	menuOptions[1][2] = "NEW GAME";
	menuOptions[1][3] = "OPTIONS";
	menuOptions[1][4] = "SCORES";
	menuOptions[1][5] = "ABOUT";
	menuOptions[1][6] = "EXIT";

	menuOptions[2][1] = "CLASSIC";
	menuOptions[2][2] = "ADVENTURE";
	menuOptions[2][3] = "INFINIT MOD";
	menuOptions[2][4] = "BACK";

	menuOptions[3][1] = "LEVEL 1";
	menuOptions[3][2] = "LEVEL 2";
	menuOptions[3][3] = "LEVEL 3";
	menuOptions[3][4] = "LEVEL 4";
	menuOptions[3][5] = "LEVEL 5";
	menuOptions[3][6] = "LEVEL 6";
	menuOptions[3][7] = "LEVEL 7";
	menuOptions[3][8] = "LEVEL 8";
	menuOptions[3][9] = "LEVEL 9";
	menuOptions[3][10] = "LEVEL 10";

    menuOptions[4][1] = "LENTH 10";
    menuOptions[4][2] = "LENTH 20";
    menuOptions[4][3] = "LENTH 30";
	menuOptions[4][4] = "LENTH 40";
	menuOptions[4][5] = "LENTH 50";
	menuOptions[4][6] = "LENTH 60";
	menuOptions[4][7] = "LENTH 70";
	menuOptions[4][8] = "LENTH 80";
	menuOptions[4][9] = "LENTH 90";
	menuOptions[4][10] = "LENTH 100";

    menuOptions[5][1] = "DRAW STAGE";
    menuOptions[5][2] = "STAGE 0";
    menuOptions[5][3] = "STAGE 1";
    menuOptions[5][4] = "STAGE 2";
    menuOptions[5][5] = "STAGE 3";
    menuOptions[5][6] = "STAGE 4";
    menuOptions[5][7] = "STAGE 5";
    menuOptions[5][8] = "STAGE 6";
    menuOptions[5][9] = "STAGE 7";
    menuOptions[5][10] = "STAGE 8";
    menuOptions[5][11] = "STAGE 9";
    menuOptions[5][12] = "STAGE 10";

    menuOptions[6][1] = "PLAYER";
    menuOptions[6][2] = "THEME";
    menuOptions[6][3] = "BACK";

    menuOptions[7][1] = "DARK";
    menuOptions[7][2] = "RED";
    menuOptions[7][3] = "GREEN";
    menuOptions[7][4] = "BLUE";
}

function gameLoop() {
	timeCounter += loopPeriod;
	screenUpDateTimer += loopPeriod;
	if(isPlaying) {
		play();
		if(!pause) {
			playingTime += loopPeriod;
		}
	}
	if(screenUpDateTimer > fps) {
		paint();
		screenUpDateTimer = 0;
	}
}

function play() {
	if (isPlaying && !pause && !gameIsOver) {
		if(acelerateIsOn) {
			aceleration *= 2;
			if(velocite - aceleration < 20) {
				aceleration = velocite - 20;
			}
		}
		if (timeCounter > velocite - aceleration) {
			moveSnake();
			checkState();
			timeCounter = 0;
		}
	}
	if (gameIsOver && timeCounter > 3000) {
		gameIsOver = false;
		newScorre = false;
		startMenu();
	}
}

function paint() {
	setScreenSize();
	brush.fillStyle = color4;
	brush.fillRect(0, 0, tela.width, tela.height);
	if (menuIsOn) {
		drawMenu();
	}
	if (isPlaying) {
		drawSnakeAndPrey();
		drawStage();
		drawStateBarrs();
	}
	if(gameIsOver) {
		drawGameOverMessage();
	}
	if (isCreatingField) {
		drawStage();
		drawCreatingFieldObjects();
	}
}

function drawMenu() {
	var t = tela.width/25;
	brush.fillStyle = color2;
	brush.font = titleFont;
	brush.fillText("SNAKE", 6*t, 5*t);
	brush.fillText("ADVENTURE", 2*t, 8*t);

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
		brush.font = infoFont;
		brush.fillStyle = color2;
		brush.fillText("This game was desined and", t, 13*t);
		brush.fillText("developed by:", 0.5*t, 15.5*t);
		brush.fillStyle = color1;
		brush.fillText("Hotelio China", t, 18*t);
		brush.fillStyle = color2;
		brush.fillText("With hellp and support of:", t, 22*t);
		brush.fillStyle = color1;
		brush.fillText("Osvaldo Maria", t, 24.5*t);
	}
}

function drawSnakeAndPrey() {
	//Snake body
	brush.fillStyle = color2;
	var t = tela.width/25;
	for (i = 1; i < snakeLenth; i++) {
		x = snake[i][0] - 1;
		y = snake[i][1] + 1;
		brush.fillRect((t * x) + t*0.1, (t * y) + t*0.1, 0.8*t, 0.8*t);
	}

	//Snake head
	brush.fillStyle = color3;
	x = snake[0][0] - 1;
	y = snake[0][1] + 1;
	brush.fillRect((t * x)+0.1*t, (t * y)+0.1*t, 0.8*t, 0.8*t);

	//Prey
	brush.fillStyle = color1;
	x = prey[0] - 1;
	y = prey[1] + 1;
	brush.beginPath();
	brush.arc((t * x + 0.5*t), (t * y + 0.5*t), 0.4*t, 0, 2 * Math.PI);
	brush.fill();
}

function drawStage() {
	var t = tela.width/25;
	var c = t*0.2;
	brush.fillStyle = color3;
	for (i = 0; i <= 250; i++) {
		if(stage[i][0] != 0 && stage[i][1] != 0) {
			x = (stage[i][0] - 1) * t;
			y = (stage[i][1] + 1) * t;
			brush.beginPath();
			brush.moveTo(x, y + c);
			brush.lineTo(x + c, y);
			brush.lineTo(x + t - c, y);
			brush.lineTo(x + t, y + c);
			brush.lineTo(x + t, y + t - c);
			brush.lineTo(x + t - c, y + t);
			brush.lineTo(x + c, y + t);
			brush.lineTo(x, y + t - c);
			brush.closePath();
			brush.fill();
		}
	}
}

function drawStateBarrs() {
	var t = tela.width/25;
	brush.fillStyle = color2;
	brush.fillRect(0, 0, t * 25, t * 2);
	brush.fillRect(0, t * 27, t * 25, t * 2);
	
	brush.fillStyle = color4;
	brush.font = stateFont;
	brush.fillText(time, t * 8, t * 1.5);
	brush.fillText("SCORRE:"+scorre.toString(), t * 13, t * 1.5);
	brush.fillText("LEVEL "+level.toString(), t * 17, t * 28.5);
	if(!myStage) {
		brush.fillText("STAGE "+currentStage.toString(), t * 9, t * 28.5);
	} else {
		brush.fillText("PLAYER STAGE", t * 3, t * 28.5);
	}
	
	brush.fillStyle = color1;
	for(i = stageControler; i < 5; i++) {
		brush.beginPath();
		brush.arc((6.5-i)*t, 28*t, 0.4*t, 0, 2 * Math.PI);
		brush.fill();
	}
	
	brush.fillStyle = color3;
	for(i = 0; i < life; i++) {
		brush.beginPath();
		brush.arc((1.5 + i*2)*t, t, 0.5*t, 0, 2 * Math.PI);
		brush.fill();
	}
}

function drawGameOverMessage() {
	var t = tela.width/25;
	brush.fillStyle = color1;
	brush.font = currentOptionFont;
	if(!endOfGame) {
		brush.fillText("GAME IS OVER", 3.5*t, 15*t);
	}else {
		brush.fillText("THE END", 6.5*t, 15*t);
	}
	if(newScorre) {
		brush.font = menuOptionFont;
		brush.fillText("NEW SCORRE:"+scorre.toString(), 3*t, 18*t);
	}
}

function drawCreatingFieldObjects() {
	var t = tela.width/25;
	var c = t*0.2;
	brush.fillStyle = color2;
	brush.fillRect(0, 0, 25*t, 2*t);
	brush.fillRect(0, 27*t, 25*t, 2*t);
	brush.fillStyle = color4;
	brush.font = stateFont;
	brush.fillText("DRAW: Z      ERASE: X ", 3.5*t, 1.5*t);
	brush.fillText("PRESS ENTER TO START", 4.5*t, 28.5*t);
	
	// Draw Cursor
	brush.fillStyle = color2;
	x = (cursor[0] - 1) * t;
	y = (cursor[1] + 1) * t;
	brush.beginPath();
	brush.moveTo(x, y + c);
	brush.lineTo(x + c, y);
	brush.lineTo(x + t - c, y);
	brush.lineTo(x + t, y + c);
	brush.lineTo(x + t, y + t - c);
	brush.lineTo(x + t - c, y + t);
	brush.lineTo(x + c, y + t);
	brush.lineTo(x, y + t - c);
	brush.closePath();
	brush.fill();
}

function moveSnake() {

	for (i = snakeLenth; i >= 1; i--) {
		snake[i][0] = snake[i - 1][0];
		snake[i][1] = snake[i - 1][1];
	}

	snake[0][0] = snake[0][0] + increase[direction][0];
	snake[0][1] = snake[0][1] + increase[direction][1];

	if (snake[0][0] == snake[2][0] && snake[0][1] == snake[2][1]) {
		snake[0][0] = snake[0][0] - increase[direction][0];
		snake[0][1] = snake[0][1] - increase[direction][1];
		direction = previousDirection;
		snake[0][0] = snake[0][0] + increase[direction][0];
		snake[0][1] = snake[0][1] + increase[direction][1];
	}

	if (snake[0][0] == 0) {
		snake[0][0] = 25;
	}
	if (snake[0][0] == 26) {
		snake[0][0] = 1;
	}
	if (snake[0][1] == 0) {
		snake[0][1] = 25;
	}
	if (snake[0][1] == 26) {
		snake[0][1] = 1;
	}

}

function generatePrey() {
	var done = false;
	while (done == false) {
		prey[0] = Math.floor(Math.random() * 25) + 1;
		prey[1] = Math.floor(Math.random() * 25) + 1;
		done = true;

		for (i = 0; i < snakeLenth; i++) {
			if (prey[0] == snake[i][0] && prey[1] == snake[i][1]) {
				done = false;
			}
		}
		for (i = 0; i <= 199; i++) {
			if (prey[0] == stage[i][0] && prey[1] == stage[i][1]) {
				done = false;
			}
		}

	}
}

function setTheme(theme) {

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

// RULES-----------------------------------------------------------------
function initializeGameState() {
	playingTime = 0;
	catchedpreys = 0;
	scorre = 0;
	life = 3;
	levelControler = 0;
	lenthControler = 0;
	stageControler = 0;
	resumeAvailable = true;
	endOfGame = false;

	//Classic Mod initial Conditions
	if (gameMode == classicMode) {
		snakeLenth = 5;
		level = 1;
		direction = 0;
		velocite = 460;
		currentStage = 0;
		defineStage(currentStage);
		generatePrey();
	}
	
	//Adventure Mod initial Conditions 
	if (gameMode == adventureMode) {
		snakeLenth = 5;
		level = 1;
		direction = 0;
		velocite = 460;
		currentStage = 1;
		defineStage(currentStage);
		generatePrey();
	}

	//Infinite Mod initial Conditions
	if (gameMode == infinityMode) {
		if (myStage == false) {
			defineStage(currentStage);
		} else {
			for (i = 0; i <= maxLenth; i++) {
				snake[i][0] = 0;
				snake[i][1] = 0;
			}
			snake[0][0] = 0;
			snake[0][1] = 5;

		}
		velocite = 500 - level * 40;
		direction = 0;
		generatePrey();
	}
}

function defineStage(stage) {
	myStage = false;
	switch(stage) {
		case 0:
			getStage0();
			break;
		case 1:
			getStage1();
			break;
		case 2:
			getStage2();
			break;
		case 3:
			getStage3();
			break;
		case 4:
			getStage4();
			break;
		case 5:
			getStage5();
			break;
		case 6:
			getStage6();
			break;
		case 7:
			getStage7();
			break;
		case 8:
			getStage9();
			break;
		case 9:
			getStage9();
			break;
		case 10:
			getStage10();
	}
}

function checkState() {
	timeInMin = Math.floor(playingTime / 60000);
	timeInSec = Math.floor((playingTime % 60000) / 1000);
	time = timeInMin.toString()+":"+timeInSec.toString();

	//DID SANKE BITE IT SELF?
	for (i = 1; i <= snakeLenth; i++) {
		if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
			gameOver();
		}
	}

	//DID SANAKE HIT AN OBJECT?
	for (i = 0; i <= 199; i++) {
		if (snake[0][0] == stage[i][0] && snake[0][1] == stage[i][1]) {
			gameOver();
		}
	}

	//DID SNAKE CATCH A PREY?
	if (snake[0][0] == prey[0] && snake[0][1] == prey[1]) {
		generatePrey();
		catchedpreys++;
		scorre += 10;

		levelControler++;
		lenthControler++;
		stageControler++;
	}

	//ADVENTURE MODE RULES
	if (gameMode == adventureMode) {
		if (stageControler == 5) {
			currentStage++;
			scorre +=50;
			if (currentStage > 10) {
				currentStage = 1;
				level++;
				if (level >10){
					level--;
					endOfGame = true;
					gameOver();
				}
				velocite -= 40;
			}
			defineStage(currentStage);
			generatePrey();
			stageControler = 0;
			direction = 0;
		}
	}

	//CLASSIC MODE RULES
	if (gameMode == classicMode) {

		if (lenthControler == 1) {
			snakeLenth++;
			lenthControler = 0;
		}

		if (stageControler == 5) {
			currentStage++;
			scorre +=50;
			if (currentStage > 1) {
				currentStage = 0;
				level++;
				if (level >10){
					level--;
					endOfGame = true;
					gameOver();
				}
				velocite -= 40;
			}
			defineStage(currentStage);
			generatePrey();
			stageControler = 0;
			direction = 0;
		}

	}

	//INFINIT MOD RULE
	if (gameMode == infinityMode) {
		stageControler = 5;
	}

}

function gameOver() {
	life--;
	if (life > 0 && !endOfGame) {
		if (!myStage) {
			defineStage(currentStage);
			direction = 0;
		} else {
			for (i = 0; i <= maxLenth; i++) {
				snake[i][0] = 0;
				snake[i][1] = 0;
			}
			snake[0][0] = 1;
			snake[0][1] = 5;
			direction = 0;
		}
	}
	if (life == 0 || endOfGame) {
		for (i=1; i<=5; i++){
			if (scorre > bestScorre[i]){
				for (j=5; j>i; j--){
					bestScorre[j] = bestScorre[j-1];
					bestPlayer[j] = bestPlayer[j-1];
				}
				bestScorre[i] = scorre;
				bestPlayer[i] = player;
				if (i == 1) {
					newScorre = true;
				}
				break;
			}
		}
		
		resumeAvailable = false;
		pause = true;
		gameIsOver = true;
		timeCounter = 0;
	}
}

// CONTROLS--------------------------------------------------------------
function setListeners() {
	window.addEventListener('keydown', function(e) {
		if(isPlaying) {
			switch (e.keyCode) {
				case 37:
					left();
					acelerateON();
					break;
				case 38:
					up();
					acelerateON();
					break;
				case 39:
					right();
					acelerateON();
					break;
				case 40:
					down();
					acelerateON();
					break;
				case 80:
					pauseF();
			}
		}
		if(isCreatingField) {
			switch (e.keyCode) {
				case 37:
					creattingStageAction("left")
					break;
				case 38:
					creattingStageAction("up")
					break;
				case 39:
					creattingStageAction("right")
					break;
				case 40:
					creattingStageAction("down")
					break;
				case 90:
					creattingStageAction("draw")
					break;
				case 88:
					creattingStageAction("erase")
					break;
				case 13:
					creattingStageAction("enter")
					break;
				case 73:
					//creattingStageAction("printData")
			}
		}
		if(menuIsOn) {
			switch (e.keyCode) {
				case 38: //Up
					menuAction("up");
					break;
				case 40: //Down
					menuAction("down");
					break;
				case 13: // Enter
					menuAction("enter");
			}
			if(menuTipe == 3) { //Write Name
				nameCaracter[currentOption] = e.key;
				if(currentOption < 7) {
					currentOption++;
				}
			}
		}
		if(e.keyCode == 27) { // Escape
			pause = true;
			startMenu();
		}
	});
	window.addEventListener('keyup', function(e) {
		if(isPlaying) {
			switch (e.keyCode) {
				case 37:
					acelerateOFF();
					break;
				case 38:
					acelerateOFF();
					break;
				case 39:
					acelerateOFF();
					break;
				case 40:
					acelerateOFF();
			}	
		}
	});
}

function menuAction(comand) {
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
			if (currentMenu == 1 && comandExecuted == false) {
				//RESUME
				if (currentOption == 1 && resumeAvailable == true) {
					menuIsOn = false;
					pause = true;
					isPlaying = true;
					comandExecuted = true;
				}
				//NEW GAME
				if (currentOption == 2) {
					currentMenu = 2;
					numberOfOptions = 4;
					lastOptions = 4;
					comandExecuted = true;
				}
				//OPTIONS
				if (currentOption == 3) {
					currentMenu = 6;
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
					// try {
						// Datas.saveSettings();
						// Datas.saveState();
						// Datas.saveScorre();
					// } catch (IOException ex) {
						// Logger.getLogger(Controls.class.getName()).log(Level.SEVERE, null, ex);
					// }
					// System.exit(0);
					comandExecuted = true;
				}
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//NEW GAME----------------------------------------------------------
			if (currentMenu == 2 && comandExecuted == false) {
				//CLASSIC
				if (currentOption == 1) {
					startPlaying(classicMode);
					comandExecuted = true;
				}
				//ADVENTURE
				if (currentOption == 2) {
					startPlaying(adventureMode);
					comandExecuted = true;
				}
				//INFINIT MODE
				if (currentOption == 3) {
					currentMenu = 3;
					numberOfOptions = 10;
					lastOptions = 5;
					comandExecuted = true;
				}
				//BACK
				if (currentOption == 4) {
					startMenu();
					comandExecuted = true;
				}
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//SELECT LEVEL------------------------------------------------------
			if (currentMenu == 3 && comandExecuted == false) {
				level = currentOption;
				currentMenu = 4;
				numberOfOptions = 10;
				lastOptions = 5;
				comandExecuted = true;
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//SELECT SNAKE LENTH------------------------------------------------
			if (currentMenu == 4 && comandExecuted == false) {
				snakeLenth = currentOption * 10;
				currentMenu = 5;
				numberOfOptions = 12;
				lastOptions = 5;
				comandExecuted = true;
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//SELECT STAGE------------------------------------------------------
			if (currentMenu == 5 && comandExecuted == false) {
				if (currentOption != 1) {
					myStage = false;
					currentStage = currentOption - 2;
					startPlaying(infinityMode);
				} else {
					startCreattingStage();
				}
				comandExecuted = true;
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------

			//OPTIONS-----------------------------------------------------------
			if (currentMenu == 6 && comandExecuted == false) {
				//PLAYER
				if (currentOption == 1) {
					numberOfOptions = 7;
					menuTipe = 3;
					comandExecuted = true;
				}
				//THEME
				if (currentOption == 2) {
					currentMenu = 7;
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
			if (currentMenu == 7 && comandExecuted == false) {
				setTheme(currentOption);
				currentMenu = 6;
				numberOfOptions = 3;
				lastOptions = 3;
				comandExecuted = true;
				currentOption = 1;
				firstOptions = 1;
			}
			//------------------------------------------------------------------
		}

		// RETURN FROM SCORRES OR INFO TO MAIN MENU
		if ((menuTipe == 2 || menuTipe == 4) && comandExecuted == false) {
			startMenu();
			comandExecuted = true;
		}
		
		// PLAYER NAME INPUT
		if (menuTipe == 3 && comandExecuted == false) {
			player = nameCaracter[1];
			for (i = 2; i <= 7; i++) {
				player += nameCaracter[i];
			}
			for (i = 1; i <= 7; i++) {
				nameCaracter[i] = "_";
			}
			menuTipe = 1;
			currentMenu = 6;
			numberOfOptions = 3;
			lastOptions = 3;
			comandExecuted = true;
			currentOption = 1;
			firstOptions = 1;
		}
	}
}

function up() {
	previousDirection = direction;
	direction = 3;
	pause = false;
}

function down() {
	previousDirection = direction;
	direction = 2;
	pause = false;
}

function right() {
	previousDirection = direction;
	direction = 0;
	pause = false;
}

function left() {
	previousDirection = direction;
	direction = 1;
	pause = false;
}

function acelerateON() {
	if(!acelerateIsOn){
	aceleration = 0.000000001;
	acelerateIsOn = true;
	}
}

function acelerateOFF() {;
	aceleration = 0;
	acelerateIsOn = false
}

function pauseF() {
	pause = !pause;
}

function creattingStageAction(comand) {
	var draw = true;

	if (comand == "up" && cursor[1] != 1) {
		cursor[1]--;
	}
	if (comand == "down" && cursor[1] != 25) {
		cursor[1]++;
	}
	if (comand == "left" && cursor[0] != 1) {
		cursor[0]--;
	}
	if (comand == "right" && cursor[0] != 25) {
		cursor[0]++;
	}

	if (comand == "draw") {
		for (i = 0; i < fieldCell; i++) {
			if (stage[i][0] == cursor[0] && stage[i][1] == cursor[1]) {
				draw = false;
				break;
			}
		}
		if (draw = true) {
			stage[fieldCell][0] = cursor[0];
			stage[fieldCell][1] = cursor[1];
			fieldCell++;
			if (fieldCell > 199) {
				fieldCell = 0;
			}
		}

	}

	if (comand == "erase") {
		for (i = 0; i < fieldCell; i++) {
			if (stage[i][0] == cursor[0] && stage[i][1] == cursor[1]) {
				stage[i][0] = 0;
				stage[i][1] = 0;

				for (j = 0; j <= 198; j++) {
					if (stage[j][0] == 0 && stage[j + 1][0] != 0) {
						stage[j][0] = stage[j + 1][0];
						stage[j][1] = stage[j + 1][1];
						stage[j + 1][0] = 0;
						stage[j + 1][1] = 0;
					}
					if (stage[j][0] == 0 && stage[j + 1][0] == 0) {
						fieldCell = j;
						break;
					} else {
						fieldCell = 199;
					}
				}
				break;
			}
		}
	}

	if (comand == "printData") {
		document.write("-------START--------");
		document.write();
		document.write("snake[0][0] = " + cursor[0].toString() + ";");
		document.write("snake[0][1] = " + cursor[1].toString() + ";");
		document.write();
		for (i = 0; i < fieldCell; i++) {
			document.write("stage[" + i.toString() + "][0] = " + stage[i][0].toString() + ";");
			document.write("stage[" + i.toString() + "][1] = " + stage[i][1].toString() + ";");
		}
		document.write();
		document.write("-------END--------");
	}

	if (comand == "enter") {
		startPlaying(infinityMode);
	}
}

function startMenu() {
	menuTipe = 1;
	currentMenu = 1;
	currentOption = 1;
	numberOfOptions = 6;
	firstOptions = 1;
	lastOptions = 5;

	isPlaying = false;
	isCreatingField = false;
	logoIsON = false;
	menuIsOn = true;
}

function startPlaying(mode) {
	gameMode = mode;
	initializeGameState();

	menuIsOn = false;
	isCreatingField = false;
	isPlaying = true;
	pause = false;

}

function startCreattingStage() {
	myStage = true;

	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}

	cursor[0] = 5;
	cursor[1] = 5;
	fieldCell = 0;
	showCursor = true;

	menuIsOn = false;
	isPlaying = false;
	isCreatingField = true;
}

// DATA------------------------------------------------------------------
function defaultScorres() {
	player = "PALYER";
	bestPlayer[1] = "PLAYER1";
	bestPlayer[2] = "PLAYER2";
	bestPlayer[3] = "PLAYER3";
	bestPlayer[4] = "PLAYER4";
	bestPlayer[5] = "PLAYER5";
	bestScorre[1] = 0;
	bestScorre[2] = 0;
	bestScorre[3] = 0;
	bestScorre[4] = 0;
	bestScorre[5] = 0;
}

function getStage0() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 0;
	snake[0][1] = 5;
}

function getStage1() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	
	snake[0][0] = 2;
	snake[0][1] = 5;
	
	stage[0][0] = 1;
	stage[0][1] = 5;
	stage[1][0] = 1;
	stage[1][1] = 6;
	stage[2][0] = 1;
	stage[2][1] = 7;
	stage[3][0] = 1;
	stage[3][1] = 8;
	stage[4][0] = 1;
	stage[4][1] = 9;
	stage[5][0] = 1;
	stage[5][1] = 10;
	stage[6][0] = 1;
	stage[6][0] = 1;
	stage[6][1] = 11;
	stage[7][0] = 1;
	stage[7][1] = 12;
	stage[8][0] = 1;
	stage[8][1] = 13;
	stage[9][0] = 1;
	stage[9][1] = 14;
	stage[10][0] = 1;
	stage[10][1] = 15;
	stage[11][0] = 1;
	stage[11][1] = 16;
	stage[12][0] = 1;
	stage[12][1] = 17;
	stage[13][0] = 1;
	stage[13][1] = 18;
	stage[14][0] = 1;
	stage[14][1] = 19;
	stage[15][0] = 1;
	stage[15][1] = 20;
	stage[16][0] = 1;
	stage[16][1] = 21;
	stage[17][0] = 1;
	stage[17][1] = 22;
	stage[18][0] = 1;
	stage[18][1] = 23;
	stage[19][0] = 1;
	stage[19][1] = 24;
	stage[20][0] = 1;
	stage[20][1] = 25;
	stage[21][0] = 2;
	stage[21][1] = 25;
	stage[22][0] = 3;
	stage[22][1] = 25;
	stage[23][0] = 4;
	stage[23][1] = 25;
	stage[24][0] = 5;
	stage[24][1] = 25;
	stage[25][0] = 6;
	stage[25][1] = 25;
	stage[26][0] = 7;
	stage[26][1] = 25;
	stage[27][0] = 8;
	stage[27][1] = 25;
	stage[28][0] = 9;
	stage[28][1] = 25;
	stage[29][0] = 10;
	stage[29][1] = 25;
	stage[30][0] = 11;
	stage[30][1] = 25;
	stage[31][0] = 12;
	stage[31][1] = 25;
	stage[32][0] = 13;
	stage[32][1] = 25;
	stage[33][0] = 14;
	stage[33][1] = 25;
	stage[34][0] = 15;
	stage[34][1] = 25;
	stage[35][0] = 16;
	stage[35][1] = 25;
	stage[36][0] = 17;
	stage[36][1] = 25;
	stage[37][0] = 18;
	stage[37][1] = 25;
	stage[38][0] = 19;
	stage[38][1] = 25;
	stage[39][0] = 20;
	stage[39][1] = 25;
	stage[40][0] = 21;
	stage[40][1] = 25;
	stage[41][0] = 22;
	stage[41][1] = 25;
	stage[42][0] = 23;
	stage[42][1] = 25;
	stage[43][0] = 24;
	stage[43][1] = 25;
	stage[44][0] = 25;
	stage[44][1] = 25;
	stage[45][0] = 25;
	stage[45][1] = 24;
	stage[46][0] = 25;
	stage[46][1] = 23;
	stage[47][0] = 25;
	stage[47][1] = 22;
	stage[48][0] = 25;
	stage[48][1] = 21;
	stage[49][0] = 25;
	stage[49][1] = 20;
	stage[50][0] = 25;
	stage[50][1] = 19;
	stage[51][0] = 25;
	stage[51][1] = 18;
	stage[52][0] = 25;
	stage[52][1] = 17;
	stage[53][0] = 25;
	stage[53][1] = 16;
	stage[54][0] = 25;
	stage[54][1] = 15;
	stage[55][0] = 25;
	stage[55][1] = 14;
	stage[56][0] = 25;
	stage[56][1] = 13;
	stage[57][0] = 25;
	stage[57][1] = 12;
	stage[58][0] = 25;
	stage[58][1] = 11;
	stage[59][0] = 25;
	stage[59][1] = 10;
	stage[60][0] = 25;
	stage[60][1] = 9;
	stage[61][0] = 25;
	stage[61][1] = 8;
	stage[62][0] = 25;
	stage[62][1] = 7;
	stage[63][0] = 25;
	stage[63][1] = 6;
	stage[64][0] = 25;
	stage[64][1] = 5;
	stage[65][0] = 25;
	stage[65][1] = 4;
	stage[66][0] = 25;
	stage[66][1] = 3;
	stage[67][0] = 25;
	stage[67][1] = 2;
	stage[68][0] = 25;
	stage[68][1] = 1;
	stage[69][0] = 24;
	stage[69][1] = 1;
	stage[70][0] = 23;
	stage[70][1] = 1;
	stage[71][0] = 22;
	stage[71][1] = 1;
	stage[72][0] = 21;
	stage[72][1] = 1;
	stage[73][0] = 20;
	stage[73][1] = 1;
	stage[74][0] = 19;
	stage[74][1] = 1;
	stage[75][0] = 18;
	stage[75][1] = 1;
	stage[76][0] = 17;
	stage[76][1] = 1;
	stage[77][0] = 16;
	stage[77][1] = 1;
	stage[78][0] = 15;
	stage[78][1] = 1;
	stage[79][0] = 14;
	stage[79][1] = 1;
	stage[80][0] = 13;
	stage[80][1] = 1;
	stage[81][0] = 12;
	stage[81][1] = 1;
	stage[82][0] = 11;
	stage[82][1] = 1;
	stage[83][0] = 10;
	stage[83][1] = 1;
	stage[84][0] = 9;
	stage[84][1] = 1;
	stage[85][0] = 8;
	stage[85][1] = 1;
	stage[86][0] = 7;
	stage[86][1] = 1;
	stage[87][0] = 6;
	stage[87][1] = 1;
	stage[88][0] = 5;
	stage[88][1] = 1;
	stage[89][0] = 4;
	stage[89][1] = 1;
	stage[90][0] = 3;
	stage[90][1] = 1;
	stage[91][0] = 2;
	stage[91][1] = 1;
	stage[92][0] = 1;
	stage[92][1] = 1;
	stage[93][0] = 1;
	stage[93][1] = 2;
	stage[94][0] = 1;
	stage[94][1] = 3;
	stage[95][0] = 1;
	stage[95][1] = 4;
}

function getStage2() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 5;
	snake[0][1] = 5;
	
	stage[0][0] = 12;
	stage[0][1] = 1;
	stage[1][0] = 12;
	stage[1][1] = 2;
	stage[2][0] = 12;
	stage[2][1] = 3;
	stage[3][0] = 12;
	stage[3][1] = 4;
	stage[4][0] = 12;
	stage[4][1] = 5;
	stage[5][0] = 12;
	stage[5][1] = 6;
	stage[6][0] = 12;
	stage[6][1] = 7;
	stage[7][0] = 12;
	stage[7][1] = 8;
	stage[8][0] = 12;
	stage[8][1] = 9;
	stage[9][0] = 12;
	stage[9][1] = 10;
	stage[10][0] = 12;
	stage[10][1] = 11;
	stage[11][0] = 12;
	stage[11][1] = 12;
	stage[12][0] = 12;
	stage[12][1] = 13;
	stage[13][0] = 12;
	stage[13][1] = 14;
	stage[14][0] = 12;
	stage[14][1] = 15;
	stage[15][0] = 12;
	stage[15][1] = 16;
	stage[16][0] = 12;
	stage[16][1] = 17;
	stage[17][0] = 12;
	stage[17][1] = 18;
	stage[18][0] = 12;
	stage[18][1] = 19;
	stage[19][0] = 12;
	stage[19][1] = 20;
	stage[20][0] = 12;
	stage[20][1] = 21;
	stage[21][0] = 12;
	stage[21][1] = 22;
	stage[22][0] = 12;
	stage[22][1] = 23;
	stage[23][0] = 12;
	stage[23][1] = 24;
	stage[24][0] = 12;
	stage[24][1] = 25;
}

function getStage3() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 5;
	snake[0][1] = 5;
	
	stage[0][0] = 1;
	stage[0][1] = 12;
	stage[1][0] = 2;
	stage[1][1] = 12;
	stage[2][0] = 3;
	stage[2][1] = 12;
	stage[3][0] = 4;
	stage[3][1] = 12;
	stage[4][0] = 5;
	stage[4][1] = 12;
	stage[5][0] = 6;
	stage[5][1] = 12;
	stage[6][0] = 7;
	stage[6][1] = 12;
	stage[7][0] = 8;
	stage[7][1] = 12;
	stage[8][0] = 9;
	stage[8][1] = 12;
	stage[9][0] = 10;
	stage[9][1] = 12;
	stage[10][0] = 11;
	stage[10][1] = 12;
	stage[11][0] = 12;
	stage[11][1] = 12;
	stage[12][0] = 13;
	stage[12][1] = 12;
	stage[13][0] = 14;
	stage[13][1] = 12;
	stage[14][0] = 15;
	stage[14][1] = 12;
	stage[15][0] = 16;
	stage[15][1] = 12;
	stage[16][0] = 17;
	stage[16][1] = 12;
	stage[17][0] = 18;
	stage[17][1] = 12;
	stage[18][0] = 19;
	stage[18][1] = 12;
	stage[19][0] = 20;
	stage[19][1] = 12;
	stage[20][0] = 21;
	stage[20][1] = 12;
	stage[21][0] = 22;
	stage[21][1] = 12;
	stage[22][0] = 23;
	stage[22][1] = 12;
	stage[23][0] = 24;
	stage[23][1] = 12;
	stage[24][0] = 25;
	stage[24][1] = 12;
}

function getStage4() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 5;
	snake[0][1] = 5;
	
	stage[0][0] = 12;
	stage[0][1] = 13;
	stage[1][0] = 1;
	stage[1][1] = 13;
	stage[2][0] = 2;
	stage[2][1] = 13;
	stage[3][0] = 3;
	stage[3][1] = 13;
	stage[4][0] = 4;
	stage[4][1] = 13;
	stage[5][0] = 5;
	stage[5][1] = 13;
	stage[6][0] = 6;
	stage[6][1] = 13;
	stage[7][0] = 7;
	stage[7][1] = 13;
	stage[8][0] = 8;
	stage[8][1] = 13;
	stage[9][0] = 9;
	stage[9][1] = 13;
	stage[10][0] = 10;
	stage[10][1] = 13;
	stage[11][0] = 11;
	stage[11][1] = 13;
	stage[12][0] = 13;
	stage[12][1] = 13;
	stage[13][0] = 14;
	stage[13][1] = 13;
	stage[14][0] = 15;
	stage[14][1] = 13;
	stage[15][0] = 16;
	stage[15][1] = 13;
	stage[16][0] = 17;
	stage[16][1] = 13;
	stage[17][0] = 18;
	stage[17][1] = 13;
	stage[18][0] = 19;
	stage[18][1] = 13;
	stage[19][0] = 20;
	stage[19][1] = 13;
	stage[20][0] = 21;
	stage[20][1] = 13;
	stage[21][0] = 22;
	stage[21][1] = 13;
	stage[22][0] = 23;
	stage[22][1] = 13;
	stage[23][0] = 24;
	stage[23][1] = 13;
	stage[24][0] = 25;
	stage[24][1] = 13;
	stage[25][0] = 13;
	stage[25][1] = 25;
	stage[26][0] = 13;
	stage[26][1] = 24;
	stage[27][0] = 13;
	stage[27][1] = 23;
	stage[28][0] = 13;
	stage[28][1] = 22;
	stage[29][0] = 13;
	stage[29][1] = 21;
	stage[30][0] = 13;
	stage[30][1] = 20;
	stage[31][0] = 13;
	stage[31][1] = 19;
	stage[32][0] = 13;
	stage[32][1] = 18;
	stage[33][0] = 13;
	stage[33][1] = 17;
	stage[34][0] = 13;
	stage[34][1] = 16;
	stage[35][0] = 13;
	stage[35][1] = 15;
	stage[36][0] = 13;
	stage[36][1] = 14;
	stage[37][0] = 13;
	stage[37][1] = 13;
	stage[38][0] = 13;
	stage[38][1] = 12;
	stage[39][0] = 13;
	stage[39][1] = 11;
	stage[40][0] = 13;
	stage[40][1] = 10;
	stage[41][0] = 13;
	stage[41][1] = 9;
	stage[42][0] = 13;
	stage[42][1] = 8;
	stage[43][0] = 13;
	stage[43][1] = 7;
	stage[44][0] = 13;
	stage[44][1] = 6;
	stage[45][0] = 13;
	stage[45][1] = 5;
	stage[46][0] = 13;
	stage[46][1] = 4;
	stage[47][0] = 13;
	stage[47][1] = 3;
	stage[48][0] = 13;
	stage[48][1] = 2;
	stage[49][0] = 13;
	stage[49][1] = 1;
}

function getStage5() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 1;
	snake[0][1] = 18;
	
	stage[0][0] = 1;
	stage[0][1] = 5;
	stage[1][0] = 2;
	stage[1][1] = 5;
	stage[2][0] = 3;
	stage[2][1] = 5;
	stage[3][0] = 4;
	stage[3][1] = 5;
	stage[4][0] = 5;
	stage[4][1] = 5;
	stage[5][0] = 6;
	stage[5][1] = 5;
	stage[6][0] = 7;
	stage[6][1] = 5;
	stage[7][0] = 8;
	stage[7][1] = 5;
	stage[8][0] = 9;
	stage[8][1] = 5;
	stage[9][0] = 10;
	stage[9][1] = 5;
	stage[10][0] = 11;
	stage[10][1] = 5;
	stage[11][0] = 12;
	stage[11][1] = 5;
	stage[12][0] = 13;
	stage[12][1] = 5;
	stage[13][0] = 14;
	stage[13][1] = 5;
	stage[14][0] = 15;
	stage[14][1] = 5;
	stage[15][0] = 16;
	stage[15][1] = 5;
	stage[16][0] = 17;
	stage[16][1] = 10;
	stage[17][0] = 18;
	stage[17][1] = 10;
	stage[18][0] = 19;
	stage[18][1] = 10;
	stage[19][0] = 20;
	stage[19][1] = 10;
	stage[20][0] = 21;
	stage[20][1] = 10;
	stage[21][0] = 22;
	stage[21][1] = 10;
	stage[22][0] = 23;
	stage[22][1] = 10;
	stage[23][0] = 24;
	stage[23][1] = 10;
	stage[24][0] = 25;
	stage[24][1] = 10;
	stage[25][0] = 16;
	stage[25][1] = 10;
	stage[26][0] = 15;
	stage[26][1] = 10;
	stage[27][0] = 14;
	stage[27][1] = 10;
	stage[28][0] = 13;
	stage[28][1] = 10;
	stage[29][0] = 12;
	stage[29][1] = 10;
	stage[30][0] = 11;
	stage[30][1] = 10;
	stage[31][0] = 16;
	stage[31][1] = 15;
	stage[32][0] = 15;
	stage[32][1] = 15;
	stage[33][0] = 14;
	stage[33][1] = 15;
	stage[34][0] = 13;
	stage[34][1] = 15;
	stage[35][0] = 12;
	stage[35][1] = 15;
	stage[36][0] = 11;
	stage[36][1] = 15;
	stage[37][0] = 10;
	stage[37][1] = 15;
	stage[38][0] = 9;
	stage[38][1] = 15;
	stage[39][0] = 8;
	stage[39][1] = 15;
	stage[40][0] = 7;
	stage[40][1] = 15;
	stage[41][0] = 6;
	stage[41][1] = 15;
	stage[42][0] = 5;
	stage[42][1] = 15;
	stage[43][0] = 4;
	stage[43][1] = 15;
	stage[44][0] = 3;
	stage[44][1] = 15;
	stage[45][0] = 2;
	stage[45][1] = 15;
	stage[46][0] = 1;
	stage[46][1] = 15;
	stage[47][0] = 11;
	stage[47][1] = 21;
	stage[48][0] = 12;
	stage[48][1] = 21;
	stage[49][0] = 13;
	stage[49][1] = 21;
	stage[50][0] = 14;
	stage[50][1] = 21;
	stage[51][0] = 15;
	stage[51][1] = 21;
	stage[52][0] = 16;
	stage[52][1] = 21;
	stage[53][0] = 17;
	stage[53][1] = 21;
	stage[54][0] = 18;
	stage[54][1] = 21;
	stage[55][0] = 19;
	stage[55][1] = 21;
	stage[56][0] = 20;
	stage[56][1] = 21;
	stage[57][0] = 21;
	stage[57][1] = 21;
	stage[58][0] = 22;
	stage[58][1] = 21;
	stage[59][0] = 23;
	stage[59][1] = 21;
	stage[60][0] = 24;
	stage[60][1] = 21;
	stage[61][0] = 25;
	stage[61][1] = 21;
}

function getStage6() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 11;
	snake[0][1] = 12;
	
	stage[0][0] = 21;
	stage[0][1] = 1;
	stage[1][0] = 21;
	stage[1][1] = 2;
	stage[2][0] = 21;
	stage[2][1] = 3;
	stage[3][0] = 21;
	stage[3][1] = 4;
	stage[4][0] = 21;
	stage[4][1] = 5;
	stage[5][0] = 21;
	stage[5][1] = 6;
	stage[6][0] = 21;
	stage[6][1] = 7;
	stage[7][0] = 21;
	stage[7][1] = 8;
	stage[8][0] = 21;
	stage[8][1] = 9;
	stage[9][0] = 21;
	stage[9][1] = 10;
	stage[10][0] = 21;
	stage[10][1] = 11;
	stage[11][0] = 21;
	stage[11][1] = 12;
	stage[12][0] = 21;
	stage[12][1] = 13;
	stage[13][0] = 16;
	stage[13][1] = 13;
	stage[14][0] = 16;
	stage[14][1] = 14;
	stage[15][0] = 16;
	stage[15][1] = 15;
	stage[16][0] = 16;
	stage[16][1] = 16;
	stage[17][0] = 16;
	stage[17][1] = 17;
	stage[18][0] = 16;
	stage[18][1] = 18;
	stage[19][0] = 16;
	stage[19][1] = 19;
	stage[20][0] = 16;
	stage[20][1] = 20;
	stage[21][0] = 16;
	stage[21][1] = 21;
	stage[22][0] = 16;
	stage[22][1] = 22;
	stage[23][0] = 16;
	stage[23][1] = 23;
	stage[24][0] = 16;
	stage[24][1] = 24;
	stage[25][0] = 16;
	stage[25][1] = 25;
	stage[26][0] = 11;
	stage[26][1] = 13;
	stage[27][0] = 11;
	stage[27][1] = 12;
	stage[28][0] = 11;
	stage[28][1] = 11;
	stage[29][0] = 11;
	stage[29][1] = 10;
	stage[30][0] = 11;
	stage[30][1] = 9;
	stage[31][0] = 11;
	stage[31][1] = 8;
	stage[32][0] = 11;
	stage[32][1] = 7;
	stage[33][0] = 11;
	stage[33][1] = 6;
	stage[34][0] = 11;
	stage[34][1] = 5;
	stage[35][0] = 11;
	stage[35][1] = 4;
	stage[36][0] = 11;
	stage[36][1] = 3;
	stage[37][0] = 11;
	stage[37][1] = 2;
	stage[38][0] = 11;
	stage[38][1] = 1;
	stage[39][0] = 6;
	stage[39][1] = 13;
	stage[40][0] = 6;
	stage[40][1] = 14;
	stage[41][0] = 6;
	stage[41][1] = 15;
	stage[42][0] = 6;
	stage[42][1] = 16;
	stage[43][0] = 6;
	stage[43][1] = 17;
	stage[44][0] = 6;
	stage[44][1] = 18;
	stage[45][0] = 6;
	stage[45][1] = 19;
	stage[46][0] = 6;
	stage[46][1] = 20;
	stage[47][0] = 6;
	stage[47][1] = 21;
	stage[48][0] = 6;
	stage[48][1] = 22;
	stage[49][0] = 6;
	stage[49][1] = 23;
	stage[50][0] = 6;
	stage[50][1] = 24;
	stage[51][0] = 6;
	stage[51][1] = 25;
}

function getStage7() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 1;
	snake[0][1] = 4;
	
	stage[0][0] = 5;
	stage[0][1] = 9;
	stage[1][0] = 6;
	stage[1][1] = 9;
	stage[2][0] = 7;
	stage[2][1] = 9;
	stage[3][0] = 8;
	stage[3][1] = 9;
	stage[4][0] = 9;
	stage[4][1] = 9;
	stage[5][0] = 10;
	stage[5][1] = 9;
	stage[6][0] = 11;
	stage[6][1] = 9;
	stage[7][0] = 12;
	stage[7][1] = 9;
	stage[8][0] = 13;
	stage[8][1] = 9;
	stage[9][0] = 14;
	stage[9][1] = 9;
	stage[10][0] = 15;
	stage[10][1] = 9;
	stage[11][0] = 16;
	stage[11][1] = 9;
	stage[12][0] = 17;
	stage[12][1] = 9;
	stage[13][0] = 18;
	stage[13][1] = 9;
	stage[14][0] = 19;
	stage[14][1] = 9;
	stage[15][0] = 20;
	stage[15][1] = 9;
	stage[16][0] = 20;
	stage[16][1] = 17;
	stage[17][0] = 19;
	stage[17][1] = 17;
	stage[18][0] = 18;
	stage[18][1] = 17;
	stage[19][0] = 17;
	stage[19][1] = 17;
	stage[20][0] = 16;
	stage[20][1] = 17;
	stage[21][0] = 15;
	stage[21][1] = 17;
	stage[22][0] = 14;
	stage[22][1] = 17;
	stage[23][0] = 13;
	stage[23][1] = 17;
	stage[24][0] = 12;
	stage[24][1] = 17;
	stage[25][0] = 11;
	stage[25][1] = 17;
	stage[26][0] = 10;
	stage[26][1] = 17;
	stage[27][0] = 9;
	stage[27][1] = 17;
	stage[28][0] = 8;
	stage[28][1] = 17;
	stage[29][0] = 7;
	stage[29][1] = 17;
	stage[30][0] = 6;
	stage[30][1] = 17;
	stage[31][0] = 5;
	stage[31][1] = 17;
}

function getStage8() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 1;
	snake[0][1] = 4;
	
	stage[0][1] = 6;
	stage[0][0] = 9;
	stage[1][0] = 9;
	stage[1][1] = 7;
	stage[2][0] = 9;
	stage[2][1] = 8;
	stage[3][0] = 9;
	stage[3][1] = 9;
	stage[4][0] = 9;
	stage[4][1] = 10;
	stage[5][0] = 9;
	stage[5][1] = 11;
	stage[6][0] = 9;
	stage[6][1] = 12;
	stage[7][0] = 9;
	stage[7][1] = 13;
	stage[8][0] = 9;
	stage[8][1] = 14;
	stage[9][0] = 9;
	stage[9][1] = 15;
	stage[10][0] = 9;
	stage[10][1] = 16;
	stage[11][0] = 9;
	stage[11][1] = 17;
	stage[12][0] = 9;
	stage[12][1] = 18;
	stage[13][0] = 9;
	stage[13][1] = 19;
	stage[14][0] = 9;
	stage[14][1] = 20;
	stage[15][0] = 17;
	stage[15][1] = 6;
	stage[16][0] = 17;
	stage[16][1] = 7;
	stage[17][0] = 17;
	stage[17][1] = 8;
	stage[18][0] = 17;
	stage[18][1] = 9;
	stage[19][0] = 17;
	stage[19][1] = 10;
	stage[20][0] = 17;
	stage[20][1] = 11;
	stage[21][0] = 17;
	stage[21][1] = 12;
	stage[22][0] = 17;
	stage[22][1] = 13;
	stage[23][0] = 17;
	stage[23][1] = 14;
	stage[24][0] = 17;
	stage[24][1] = 15;
	stage[25][0] = 17;
	stage[25][1] = 16;
	stage[26][0] = 17;
	stage[26][1] = 17;
	stage[27][0] = 17;
	stage[27][1] = 18;
	stage[28][0] = 17;
	stage[28][1] = 19;
	stage[29][0] = 17;
	stage[29][1] = 20;
}

function getStage9() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 1;
	snake[0][1] = 5;
	
	stage[0][0] = 16;
	stage[0][1] = 9;
	stage[1][0] = 16;
	stage[1][1] = 8;
	stage[2][0] = 16;
	stage[2][1] = 7;
	stage[3][0] = 16;
	stage[3][1] = 6;
	stage[4][0] = 16;
	stage[4][1] = 5;
	stage[5][0] = 16;
	stage[5][1] = 10;
	stage[6][0] = 17;
	stage[6][1] = 10;
	stage[7][0] = 18;
	stage[7][1] = 10;
	stage[8][0] = 19;
	stage[8][1] = 10;
	stage[9][0] = 20;
	stage[9][1] = 10;
	stage[10][0] = 21;
	stage[10][1] = 10;
	stage[11][0] = 10;
	stage[11][1] = 5;
	stage[12][0] = 10;
	stage[12][1] = 6;
	stage[13][0] = 10;
	stage[13][1] = 7;
	stage[14][0] = 10;
	stage[14][1] = 8;
	stage[15][0] = 10;
	stage[15][1] = 9;
	stage[16][0] = 10;
	stage[16][1] = 10;
	stage[17][0] = 9;
	stage[17][1] = 10;
	stage[18][0] = 8;
	stage[18][1] = 10;
	stage[19][0] = 7;
	stage[19][1] = 10;
	stage[20][0] = 6;
	stage[20][1] = 10;
	stage[21][0] = 5;
	stage[21][1] = 10;
	stage[22][0] = 16;
	stage[22][1] = 16;
	stage[23][0] = 16;
	stage[23][1] = 17;
	stage[24][0] = 16;
	stage[24][1] = 18;
	stage[25][0] = 16;
	stage[25][1] = 19;
	stage[26][0] = 16;
	stage[26][1] = 20;
	stage[27][0] = 16;
	stage[27][1] = 21;
	stage[28][0] = 17;
	stage[28][1] = 16;
	stage[29][0] = 18;
	stage[29][1] = 16;
	stage[30][0] = 19;
	stage[30][1] = 16;
	stage[31][0] = 20;
	stage[31][1] = 16;
	stage[32][0] = 21;
	stage[32][1] = 16;
	stage[33][0] = 10;
	stage[33][1] = 16;
	stage[34][0] = 10;
	stage[34][1] = 17;
	stage[35][0] = 10;
	stage[35][1] = 18;
	stage[36][0] = 10;
	stage[36][1] = 19;
	stage[37][0] = 10;
	stage[37][1] = 20;
	stage[38][0] = 10;
	stage[38][1] = 21;
	stage[39][0] = 9;
	stage[39][1] = 16;
	stage[40][0] = 8;
	stage[40][1] = 16;
	stage[41][0] = 7;
	stage[41][1] = 16;
	stage[42][0] = 6;
	stage[42][1] = 16;
	stage[43][0] = 5;
	stage[43][1] = 16;
}

function getStage10() {
	for (i = 0; i <= maxLenth; i++) {
		snake[i][0] = 0;
		snake[i][1] = 0;
	}
	for (i = 0; i <= 250; i++) {
		stage[i][0] = 0;
		stage[i][1] = 0;
	}
	snake[0][0] = 1;
	snake[0][1] = 13;
	
	stage[0][0] = 5;
	stage[0][1] = 5;
	stage[1][0] = 5;
	stage[1][1] = 6;
	stage[2][0] = 5;
	stage[2][1] = 7;
	stage[3][0] = 5;
	stage[3][1] = 8;
	stage[4][0] = 5;
	stage[4][1] = 9;
	stage[5][0] = 6;
	stage[5][1] = 5;
	stage[6][0] = 7;
	stage[6][1] = 5;
	stage[7][0] = 8;
	stage[7][1] = 5;
	stage[8][0] = 9;
	stage[8][1] = 5;
	stage[9][0] = 17;
	stage[9][1] = 5;
	stage[10][0] = 18;
	stage[10][1] = 5;
	stage[11][0] = 19;
	stage[11][1] = 5;
	stage[12][0] = 20;
	stage[12][1] = 5;
	stage[13][0] = 21;
	stage[13][1] = 5;
	stage[14][0] = 21;
	stage[14][1] = 6;
	stage[15][0] = 21;
	stage[15][1] = 7;
	stage[16][0] = 21;
	stage[16][1] = 8;
	stage[17][0] = 21;
	stage[17][1] = 9;
	stage[18][0] = 5;
	stage[18][1] = 17;
	stage[19][0] = 5;
	stage[19][1] = 18;
	stage[20][0] = 5;
	stage[20][1] = 19;
	stage[21][0] = 5;
	stage[21][1] = 20;
	stage[22][0] = 5;
	stage[22][1] = 21;
	stage[23][0] = 6;
	stage[23][1] = 21;
	stage[24][0] = 7;
	stage[24][1] = 21;
	stage[25][0] = 8;
	stage[25][1] = 21;
	stage[26][0] = 9;
	stage[26][1] = 21;
	stage[27][0] = 17;
	stage[27][1] = 21;
	stage[28][0] = 18;
	stage[28][1] = 21;
	stage[29][0] = 19;
	stage[29][1] = 21;
	stage[30][0] = 20;
	stage[30][1] = 21;
	stage[31][0] = 21;
	stage[31][1] = 21;
	stage[32][0] = 21;
	stage[32][1] = 20;
	stage[33][0] = 21;
	stage[33][1] = 19;
	stage[34][0] = 21;
	stage[34][1] = 18;
	stage[35][0] = 21;
	stage[35][1] = 17;
	stage[36][0] = 13;
	stage[36][1] = 13;
	stage[37][0] = 13;
	stage[37][1] = 12;
	stage[38][0] = 14;
	stage[38][1] = 13;
	stage[39][0] = 12;
	stage[39][1] = 13;
	stage[40][0] = 13;
	stage[40][1] = 14;
	stage[41][0] = 13;
	stage[41][1] = 15;
	stage[42][0] = 13;
	stage[42][1] = 11;
	stage[43][0] = 11;
	stage[43][1] = 13;
	stage[44][0] = 15;
	stage[44][1] = 13;
}


// fim
