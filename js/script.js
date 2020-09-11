var playerLeft;
var leftEnemies;
var leftBottom;
var leftShot;
let shotsfired = false;
let leftScore = 0;
gameStarted = false;
leftcan = document.getElementById("canvas1");
leftcanx = leftcan.getContext("2d");

function startGame(type) {
    if (type == 2) {
        /*Toto bude multiplayer*/
    } else if (type == 3) {
        document.getElementById("canvas2").style.display = "none";
        document.getElementById("gm1").style.float = "none";
        document.getElementById("gm1").style.margin = "auto";
    } else if (type == 1) {
        /*toto je single*/
        document.getElementById("gm2").style.display = "none";
        document.getElementById("gm1").style.float = "none";
        document.getElementById("gm1").style.margin = "auto";
    }
    /*Zde je vse*/
    playerLeft = new component(20, 15, "blue", 241, 470);
    leftEnemies = new component(30, 30, "red", Math.floor(Math.random() * 450) + 50, -40);
    leftBottom = new component(500, 3, "blue", 0, 497);
    gameLeft.start();
    gameStarted = true;
    document.getElementById("btnstart").style.display = "none";
}

var gameLeft = {
    canvas: document.getElementById("canvas1"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameLeft.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    if (playerLeft.crashWith(leftEnemies)) {
        gameLeft.stop();
        gameStarted = false;
        console.log("Fail");
        leftcanx.font = "20px Segoe UI";
        leftcanx.textAlign = "center";
        leftcanx.fillText("GAME OVER", leftcan.width / 2, leftcan.height / 2);
        leftcanx.fillText("Your Score: " + leftScore, leftcan.width / 2, leftcan.height / 1.7);
        leftcanx.fillText("ENTER to Retry", leftcan.width / 2, leftcan.height / 1.5);
    } else if (leftBottom.crashWith(leftEnemies)) {
        gameLeft.stop();
        gameStarted = false;
        console.log("Fail");
        leftcanx.font = "20px Segoe UI";
        leftcanx.textAlign = "center";
        leftcanx.fillText("GAME OVER", leftcan.width / 2, leftcan.height / 2);
        leftcanx.fillText("Your Score: " + leftScore, leftcan.width / 2, leftcan.height / 1.7);
        leftcanx.fillText("ENTER to Retry", leftcan.width / 2, leftcan.height / 1.5);
    } else {
        gameLeft.clear();
        playerLeft.newPos();
        playerLeft.update();
        leftEnemies.y += +1.5;
        leftEnemies.update();
        leftShot.y += -3;
        leftShot.update();
        leftBottom.update();
    }
    if (leftShot.crashWith(leftEnemies) || shotsfired == false) {
        leftEnemies.y = -40;
        leftEnemies.x = Math.floor(Math.random() * 450) + 50;
        leftShot.y = -100;
        leftScore ++;
        document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore;
    }
}
document.onkeydown = function movement(key) {
    if (gameStarted == true) {
        switch (key.keyCode) {
            case 65:
                console.log('A');
                playerLeft.speedX = -2;
                break;
            case 87:
                console.log('W');
                playerLeft.speedY = -2;
                break;
            case 68:
                console.log('D');
                playerLeft.speedX = 2;
                break;
            case 83:
                console.log('S');
                playerLeft.speedY = 2;
                break;
            case 32:
                shotsfired = true;
                leftShot = new component(3, 10, "blue", playerLeft.x + 10, playerLeft.y - 10);
                break;
        }
    } else if (key.keyCode == 13 && gameStarted != true) {
        startGame(1)
    } else if (key.keyCode == 8 && gameStarted != true) {
        startGame(2)
    } else if (key.keyCode == 16 && gameStarted != true) {
        startGame(3)
    }
}

document.onkeyup = function movement(key) {
    if (gameStarted == true) {
        switch (key.keyCode) {
            case 65:
                console.log('A');
                playerLeft.speedX = 0;
                break;
            case 87:
                console.log('W');
                playerLeft.speedY = 0;
                break;
            case 68:
                console.log('D');
                playerLeft.speedX = 0;
                break;
            case 83:
                console.log('S');
                playerLeft.speedY = 0;
                break;
            case 32:
                console.log('Left Shoot');
                break;
        }
    }
}