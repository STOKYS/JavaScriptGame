var playerLeft;
var playerRight;
var enemiesLeft = [];
var enemiesRight = [];
var leftBottom;
var rightBottom;
var leftShot = [];
let leftScore = 0;
let Counter = 0;
var rightShot = [];
let rightScore = 0;
let gameStarted = false;
let shotsfired = false;
let difficulty = 3;
let isMulti = false;
leftcan = document.getElementById("canvas1");
leftcanx = leftcan.getContext("2d");
rightcan = document.getElementById("canvas2");
rightcanx = rightcan.getContext("2d");

document.getElementById("btneasy").addEventListener("click", function () {
    difficulty = 2;
    document.getElementById("difftext").innerHTML = "Current difficulty: Easy";
});
document.getElementById("btnmed").addEventListener("click", function () {
    difficulty = 3;
    document.getElementById("difftext").innerHTML = "Current difficulty: Medium";
});
document.getElementById("btnhard").addEventListener("click", function () {
    difficulty = 4;
    document.getElementById("difftext").innerHTML = "Current difficulty: Hard";
});

function startGame(type) {
    switch (type) {
        case 1:
            /*Singleplayer*/
            document.getElementById("gm2").style.display = "none";
            document.getElementById("gm1").style.float = "none";
            document.getElementById("gm1").style.margin = "auto";
            break;
        case 2:
            isMulti = true;
            break;
        case 3:
            /*Coop*/

            break;
    }
    document.getElementById("btnstart").style.display = "none";
    document.getElementById("btngroup").style.display = "none";
    document.getElementById("difftext").style.display = "none";
    leftBottom = new component(500, 3, "blue", 0, 497);
    playerLeft = new component(20, 15, "blue", 241, 470);
    gameLeft.start();
    gameStarted = true;
    if(isMulti == true){
        rightBottom = new component(500, 3, "green", 0, 497);
        playerRight = new component(20, 15, "green", 241, 470);
        gameRight.start();
    }
}

var gameLeft = {
    canvasLeft: document.getElementById("canvas1"),
    start: function () {
        this.canvasLeft.width = 500;
        this.canvasLeft.height = 500;
        this.context = this.canvasLeft.getContext("2d");
        if (isMulti == false){
            this.interval = setInterval(updateGameArea, 20);
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvasLeft.width, this.canvasLeft.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

var gameRight = {
    canvasRight: document.getElementById("canvas2"),
    start: function () {
        this.canvasRight.width = 500;
        this.canvasRight.height = 500;
        this.context = this.canvasRight.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvasRight.width, this.canvasRight.height);
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
    this.updateLeft = function () {
        ctx = gameLeft.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.updateRight = function () {
        ctx = gameRight.context;
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
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    Counter++;
    if (Counter == 201 && enemiesLeft.length < difficulty) {
        Counter = 1;
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 500), -40));
    } else if (Counter == 1) {
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 500), -40));
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        if (playerLeft.crashWith(enemiesLeft[i]) && gameStarted == true) {
            gameLeft.stop();
            gameStarted = false;
            leftcanx.font = "20px Segoe UI";
            leftcanx.textAlign = "center";
            leftcanx.fillText("GAME OVER", leftcan.width / 2, leftcan.height / 2);
            leftcanx.fillText("Your Score: " + leftScore, leftcan.width / 2, leftcan.height / 1.7);
            leftcanx.fillText("ENTER to Retry", leftcan.width / 2, leftcan.height / 1.5);
        }
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        if (leftBottom.crashWith(enemiesLeft[i]) && gameStarted == true) {
            gameLeft.stop();
            gameStarted = false;
            console.log("Fail");
            leftcanx.font = "20px Segoe UI";
            leftcanx.textAlign = "center";
            leftcanx.fillText("GAME OVER", leftcan.width / 2, leftcan.height / 2);
            leftcanx.fillText("Your Score: " + leftScore, leftcan.width / 2, leftcan.height / 1.7);
            leftcanx.fillText("ENTER to Retry", leftcan.width / 2, leftcan.height / 1.5);
        }
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        for (u = 0; u < leftShot.length; u += 1) {
            if (gameStarted == true && shotsfired == true && leftShot[u].crashWith(enemiesLeft[i])) {
                enemiesLeft[i].y = -40;
                enemiesLeft[i].x = Math.floor(Math.random() * 450) + 50;
                leftShot[u].y = -100;
                leftScore++;
                document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore;
            }
        }
    }
    gameLeft.clear();
    for (i = 0; i < enemiesLeft.length; i += 1) {
        enemiesLeft[i].y += +1.5;
        enemiesLeft[i].updateLeft();
    }
    for (u = 0; u < leftShot.length; u += 1) {
        if (shotsfired == true) {
            leftShot[u].y += -3;
            leftShot[u].updateLeft();
        }
    }
    playerLeft.newPos();
    playerLeft.updateLeft();
    if (isMulti == true) {
        if (Counter == 201 && enemiesRight.length < difficulty) {
            Counter = 1;
            enemiesRight.push(new component(30, 30, "red", Math.floor(Math.random() * 500), -40));
        } else if (Counter == 1) {
            enemiesRight.push(new component(30, 30, "red", Math.floor(Math.random() * 500), -40));
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            if (playerRight.crashWith(enemiesRight[k]) && gameStarted == true) {
                gameRight.stop();
                gameStarted = false;
                rightcanx.font = "20px Segoe UI";
                rightcanx.textAlign = "center";
                rightcanx.fillText("GAME OVER", rightcan.width / 2, rightcan.height / 2);
                rightcanx.fillText("Your Score: " + rightScore, rightcan.width / 2, rightcan.height / 1.7);
                rightcanx.fillText("ENTER to Retry", rightcan.width / 2, rightcan.height / 1.5);
            }
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            if (rightBottom.crashWith(enemiesRight[k]) && gameStarted == true) {
                gameRight.stop();
                gameStarted = false;
                console.log("Fail");
                rightcanx.font = "20px Segoe UI";
                rightcanx.textAlign = "center";
                rightcanx.fillText("GAME OVER", rightcan.width / 2, rightcan.height / 2);
                rightcanx.fillText("Your Score: " + rightScore, rightcan.width / 2, rightcan.height / 1.7);
                rightcanx.fillText("ENTER to Retry", rightcan.width / 2, rightcan.height / 1.5);
            }
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            for (j = 0; j < rightShot.length; j += 1) {
                if (gameStarted == true && shotsfired == true && rightShot[j].crashWith(enemiesRight[k])) {
                    enemiesRight[k].y = -40;
                    enemiesRight[k].x = Math.floor(Math.random() * 450) + 50;
                    rightShot[j].y = -100;
                    rightScore++;
                    document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore;
                }
            }
        }
        gameRight.clear();
        for (k = 0; k < enemiesRight.length; k += 1) {
            enemiesRight[k].y += +1.5;
            enemiesRight[k].updateRight();
        }
        for (j = 0; j < rightShot.length; j += 1) {
            if (shotsfired == true) {
                rightShot[j].y += -3;
                rightShot[j].updateRight();
            }
        }
        playerRight.newPos();
        playerRight.updateRight();
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
                leftShot.push(new component(3, 10, "blue", playerLeft.x + 10, playerLeft.y - 10));
                break;
        }
        if (isMulti == true) {
            switch (key.keyCode) {
                case 37:
                    console.log('A');
                    playerRight.speedX = -2;
                    break;
                case 38:
                    console.log('W');
                    playerRight.speedY = -2;
                    break;
                case 39:
                    console.log('D');
                    playerRight.speedX = 2;
                    break;
                case 40:
                    console.log('S');
                    playerRight.speedY = 2;
                    break;
                case 96:
                    shotsfired = true;
                    rightShot.push(new component(3, 10, "blue", playerRight.x + 10, playerRight.y - 10));
                    break;
            }
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
        if (isMulti == true) {
            switch (key.keyCode) {
                case 37:
                    console.log('A');
                    playerRight.speedX = 0;
                    break;
                case 38:
                    console.log('W');
                    playerRight.speedY = 0;
                    break;
                case 39:
                    console.log('D');
                    playerRight.speedX = 0;
                    break;
                case 40:
                    console.log('S');
                    playerRight.speedY = 0;
                    break;
            }
        }
    }
}