var playerLeft;
var playerRight;
var enemiesLeft = [];
var enemiesRight = [];
var 
var leftBottom;
var rightBottom;
var leftShot = [];
let leftScore = 0;
let Counter = 0;
var rightShot = [];
let rightScore = 0;
let gameStarted = false;
let shotsfired = false;
let difficulty = 4;
let eneSpeed = 1;
let playerSpeed = 2;
let isMulti = false;
let pointsToWin = 100;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

document.getElementById("btnpeace").addEventListener("click", function () {
    difficulty = 2;
    eneSpeed = 0.66;
    playerSpeed = 2.25;
    document.getElementById("difftext").innerHTML = "Current difficulty: Peaceful";
});
document.getElementById("btneasy").addEventListener("click", function () {
    difficulty = 3;
    eneSpeed = 0.80;
    playerSpeed = 2;
    document.getElementById("difftext").innerHTML = "Current difficulty: Easy";
});
document.getElementById("btnmed").addEventListener("click", function () {
    difficulty = 4;
    eneSpeed = 1;
    playerSpeed = 2;
    document.getElementById("difftext").innerHTML = "Current difficulty: Medium";
});
document.getElementById("btnhard").addEventListener("click", function () {
    difficulty = 5;
    eneSpeed = 1.5;
    playerSpeed = 2;
    document.getElementById("difftext").innerHTML = "Current difficulty: Hard";
});
document.getElementById("btndark").addEventListener("click", function () {
    difficulty = 6;
    eneSpeed = 1.8;
    playerSpeed = 1.8;
    document.getElementById("difftext").innerHTML = "Current difficulty: Dark Souls";
});



document.getElementById("btndisabled").addEventListener("click", function () {
    pointsToWin = 9999;
    document.getElementById("difftextscore").innerHTML = "Current win on score: Disabled";
    document.getElementById("scoreboard1").innerHTML = "Score: 0"
    document.getElementById("scoreboard2").innerHTML = "Score: 0"
});
document.getElementById("btn50").addEventListener("click", function () {
    pointsToWin = 50;
    document.getElementById("difftextscore").innerHTML = "Current win on score: 50";
    document.getElementById("scoreboard1").innerHTML = "Score: 0/" + pointsToWin;
    document.getElementById("scoreboard2").innerHTML = "Score: 0/" + pointsToWin;
});
document.getElementById("btn100").addEventListener("click", function () {
    pointsToWin = 100;
    document.getElementById("difftextscore").innerHTML = "Current win on score: 100";
    document.getElementById("scoreboard1").innerHTML = "Score: 0/" + pointsToWin;
    document.getElementById("scoreboard2").innerHTML = "Score: 0/" + pointsToWin;
});
document.getElementById("btn200").addEventListener("click", function () {
    pointsToWin = 200;
    document.getElementById("difftextscore").innerHTML = "Current win on score: 200";
    document.getElementById("scoreboard1").innerHTML = "Score: 0/" + pointsToWin;
    document.getElementById("scoreboard2").innerHTML = "Score: 0/" + pointsToWin;
});
document.getElementById("btncustom").addEventListener("click", function () {
    pointsToWin = document.getElementById("customvalue").value;
    document.getElementById("difftextscore").innerHTML = "Current win on score: " + pointsToWin;
    document.getElementById("scoreboard1").innerHTML = "Score: 0/" + pointsToWin;
    document.getElementById("scoreboard2").innerHTML = "Score: 0/" + pointsToWin;
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
    }
    document.getElementById("btnstart").style.display = "none";
    document.getElementById("btngroup1").style.display = "none";
    document.getElementById("btngroup2").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("difftext").style.display = "none";
    document.getElementById("difftextscore").style.display = "none";
    leftBottom = new component(500, 3, "blue", 0, 497);
    playerLeft = new component(20, 15, "blue", 241, 470);
    gameLeft.start();
    gameStarted = true;
    if (isMulti == true) {
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
        if (isMulti == false) {
            this.intervalLeft = setInterval(updateGameArea, 20);
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvasLeft.width, this.canvasLeft.height);
    },
    stop: function () {
        clearInterval(this.intervalLeft);
    }
}

var gameRight = {
    canvasRight: document.getElementById("canvas2"),
    start: function () {
        this.canvasRight.width = 500;
        this.canvasRight.height = 500;
        this.context = this.canvasRight.getContext("2d");
        this.intervalRight = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvasRight.width, this.canvasRight.height);
    },
    stop: function () {
        clearInterval(this.intervalRight);
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
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
    } else if (Counter == 1) {
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
    }
    if (pointsToWin == rightScore && isMulti == true) {
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        end(1);
    }
    if (pointsToWin == leftScore && isMulti == true) {
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        end(2);
    }
    if (pointsToWin == leftScore && isMulti == false){
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        end(2);
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        if (playerLeft.crashWith(enemiesLeft[i]) && gameStarted == true) {
            gameStarted = false;
            gameLeft.stop();
            gameRight.stop();
            end(1);
        }
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        if (leftBottom.crashWith(enemiesLeft[i]) && gameStarted == true) {
            gameStarted = false;
            gameLeft.stop();
            gameRight.stop();
            end(1);
        }
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        for (u = 0; u < leftShot.length; u += 1) {
            if (gameStarted == true && shotsfired == true && leftShot[u].crashWith(enemiesLeft[i])) {
                enemiesLeft[i].y = -40;
                enemiesLeft[i].x = Math.floor(Math.random() * 441) + 30;
                leftShot[u].y = -100;
                leftScore++;
                document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
            }
        }
    }
    gameLeft.clear();
    for (i = 0; i < enemiesLeft.length; i += 1) {
        enemiesLeft[i].y += eneSpeed;
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
            enemiesRight.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
        } else if (Counter == 1) {
            enemiesRight.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            if (playerRight.crashWith(enemiesRight[k]) && gameStarted == true) {
                gameStarted = false;
                gameRight.stop();
                gameLeft.stop();
                end(2);
            }
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            if (rightBottom.crashWith(enemiesRight[k]) && gameStarted == true) {
                gameStarted = false;
                gameRight.stop();
                gameLeft.stop();
                end(2);
            }
        }
        for (k = 0; k < enemiesRight.length; k += 1) {
            for (j = 0; j < rightShot.length; j += 1) {
                if (gameStarted == true && shotsfired == true && rightShot[j].crashWith(enemiesRight[k])) {
                    enemiesRight[k].y = -40;
                    enemiesRight[k].x = Math.floor(Math.random() * 441) + 30;
                    rightShot[j].y = -100;
                    rightScore++;
                    document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
                }
            }
        }
        gameRight.clear();
        for (k = 0; k < enemiesRight.length; k += 1) {
            enemiesRight[k].y += eneSpeed;
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

function end(ending) {
    console.log(ending + " " + isMulti)
    if (isMulti == true) {
        switch (ending) {
            case 1:
                document.getElementById("looser").innerHTML = "LEFT LOST, RIGHT WON"
                document.getElementById("scorefin").innerHTML = "Left Score: " + leftScore + "; Right Score: " + rightScore
                break;
            case 2:
                /*Multiplayer right loose*/
                document.getElementById("looser").innerHTML = "LEFT WON, RIGHT LOST"
                document.getElementById("scorefin").innerHTML = "Left Score: " + leftScore + "; Right Score: " + rightScore
                break;
        }
    } else {
        switch (ending) {
            case 1:
                document.getElementById("scorefin").innerHTML = "Your Score: " + leftScore
                break;
            case 2:
                document.getElementById("looser").innerHTML = "YOU WON"
                document.getElementById("scorefin").innerHTML = "Your Score: " + leftScore
                break;
        }
    }
    document.getElementById("retry").style.display = "inline"
    document.getElementById("game").style.filter = "blur(20px)"
    document.onkeydown = function movement(keyFin) {
        if (keyFin.keyCode == 13) {
            location.reload();
        }
    }
}

document.onkeydown = function movement(key) {
    if (gameStarted == true) {
        switch (key.keyCode) {
            case 65:
                console.log('A');
                playerLeft.speedX = -(playerSpeed);
                break;
            case 87:
                console.log('W');
                playerLeft.speedY = -(playerSpeed);
                break;
            case 68:
                console.log('D');
                playerLeft.speedX = playerSpeed;
                break;
            case 83:
                console.log('S');
                playerLeft.speedY = playerSpeed;
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
                    playerRight.speedX = -(playerSpeed);
                    break;
                case 38:
                    console.log('W');
                    playerRight.speedY = -(playerSpeed);
                    break;
                case 39:
                    console.log('D');
                    playerRight.speedX = playerSpeed;
                    break;
                case 40:
                    console.log('S');
                    playerRight.speedY = playerSpeed;
                    break;
                case 96:
                    shotsfired = true;
                    rightShot.push(new component(3, 10, "green", playerRight.x + 10, playerRight.y - 10));
                    break;
            }
        }
    } else if (key.keyCode == 13 && gameStarted != true) {
        startGame(1)
    } else if (key.keyCode == 8 && gameStarted != true) {
        startGame(2)
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