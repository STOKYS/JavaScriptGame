/*variables*/
let playerLeft;
let playerRight;
let playerSpeed = 2;
let ammo = 8;
let ammoLeft = ammo;
let ammoRight = ammo;
let enemiesLeft = [];
let enemiesRight = [];
let eneSpeed = 1;
let ghostLeft;
let ghostRight;
let ghostChance = -5000;
let ghostSpeed = 5;
let tankLeft;
let tankRight;
let tankChance = -2000;
let tankHit = 3;
let tankHitLeft = tankHit;
let tankHitRight = tankHit;
let tankSpeed = 1;
let leftBottom;
let rightBottom;
let leftShot = [];
let leftScore = 0;
let rightShot = [];
let rightScore = 0;
let Counter = 0;
let pointsToWin = 100;
let difficulty = 4;
let gameStarted = false;
let shotsfired = false;
let isMulti = false;
/**/

/*disable arrowkeys*/
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/**/

/*Setting up difficulties*/
document.getElementById("btnpeace").addEventListener("click", function () {
    difficulty = 2;
    eneSpeed = 0.66;
    playerSpeed = 2.25;
    ghostChance = -2000;
    ghostSpeed = 3;
    tankHit = 2
    tankChance = -4000
    tankSpeed = 0.8
    ammo = 15;
    document.getElementById("difftext").innerHTML = "Current difficulty: Peaceful";
});
document.getElementById("btneasy").addEventListener("click", function () {
    difficulty = 3;
    eneSpeed = 0.80;
    playerSpeed = 2;
    ghostChance = -3000;
    ghostSpeed = 4;
    tankHit = 2
    tankChance = -3000
    tankSpeed = 0.9
    ammo = 10
    document.getElementById("difftext").innerHTML = "Current difficulty: Easy";
});
document.getElementById("btnmed").addEventListener("click", function () {
    difficulty = 4;
    eneSpeed = 1;
    playerSpeed = 2;
    ghostChance = -5000;
    ghostSpeed = 5;
    tankHit = 3
    tankChance = -2000
    tankSpeed = 1
    ammo = 8
    document.getElementById("difftext").innerHTML = "Current difficulty: Medium";
});
document.getElementById("btnhard").addEventListener("click", function () {
    difficulty = 5;
    eneSpeed = 1.5;
    playerSpeed = 2;
    ghostChance - 7500;
    ghostSpeed = 6.66;
    tankHit = 4
    tankChance = -1500
    tankSpeed = 1.1
    ammo = 5
    document.getElementById("difftext").innerHTML = "Current difficulty: Hard";
});
document.getElementById("btndark").addEventListener("click", function () {
    difficulty = 6;
    eneSpeed = 1.8;
    playerSpeed = 1.8;
    ghostChance = -10000
    ghostSpeed = 8;
    tankHit = 5
    tankChance = -1000
    tankSpeed = 1.2
    ammo = 3
    document.getElementById("difftext").innerHTML = "Current difficulty: Dark Souls";
});
/**/

/*Setting up points to win*/
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
/**/

/*Starts the game*/
function startGame(type) {
    switch (type) {
        case 1:
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
    ghostLeft = new component(30, 30, "pink", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * ghostChance) - 2000);
    tankLeft = new component(50, 30, "orange", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * tankChance) - 2000);
    console.log(tankLeft.y)
    console.log(tankHitLeft)
    gameLeft.start();
    gameStarted = true;
    if (isMulti == true) {
        rightBottom = new component(500, 3, "green", 0, 497);
        playerRight = new component(20, 15, "green", 241, 470);
        ghostRight = new component(30, 30, "pink", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * ghostChance) - 2000);
        tankRight = new component(50, 30, "orange", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * tankChance) - 2000);
        gameRight.start();
    }
}
/**/


/*Startup for left canvas*/
let gameLeft = {
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
/**/

/*Startup for right canvas*/
let gameRight = {
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
/**/

/*Function creating components*/
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
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
/**/

/*Updates*/
function updateGameArea() {
    Counter++;
    if (Counter == 201 && enemiesLeft.length < difficulty) {
        Counter = 1;
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
    } else if (Counter == 1) {
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40));
    }
    if (pointsToWin <= rightScore && isMulti == true) {
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        end(1);
    }
    if (pointsToWin <= leftScore && isMulti == true) {
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        end(2);
    }
    if (pointsToWin <= leftScore && isMulti == false) {
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
                leftShot.splice(u, 1)
                ammoLeft++
                document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft
                leftScore++;
                document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
            }
        }
    }
    for (u = 0; u < leftShot.length; u += 1) {
        if (gameStarted == true && shotsfired == true && (ghostLeft.y > -50 && leftShot[u].crashWith(ghostLeft)) || ghostLeft.y > 600) {
            ghostLeft.y = Math.floor(Math.random() * ghostChance) - 2000;
            ghostLeft.x = Math.floor(Math.random() * 441) + 30;
            console.log("Fast enemy created at " + ghostLeft.y)
            leftShot.splice(u, 1)
            ammoLeft++
            document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft
            leftScore += 5;
            document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
        }
    }
    for (u = 0; u < leftShot.length; u += 1) {
        if (gameStarted == true && shotsfired == true && tankLeft.y > -10 && leftShot[u].crashWith(tankLeft) && tankHitLeft == 1) {
            tankLeft.y = Math.floor(Math.random() * tankChance) - 2000;
            tankLeft.x = Math.floor(Math.random() * 441) + 30;
            console.log("Fast enemy created at " + tankLeft.y)
            tankHitLeft = tankHit;
            leftShot.splice(u, 1)
            ammoLeft++
            document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft
            leftScore += 3;
            document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
        } else if (gameStarted == true && shotsfired == true && tankLeft.y > -50 && leftShot[u].crashWith(tankLeft) && tankHitLeft > 1) {
            tankHitLeft--;
            leftShot.splice(u, 1)
            ammoLeft++
            document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft
        }
    }
    for (u = 0; u < leftShot.length; u += 1) {
        if (leftShot[u].y < -10) {
            leftShot.splice(u, 1)
            ammoLeft++
            document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft
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
    tankLeft.y += tankSpeed;
    tankLeft.updateLeft();
    console.log(tankHitLeft)
    ghostLeft.y += ghostSpeed;
    ghostLeft.updateLeft();
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
                    rightShot.splice(j, 1)
                    ammoRight++
                    document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
                    rightScore++;
                    document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
                }
            }
        }
        for (j = 0; j < rightShot.length; j += 1) {
            if (gameStarted == true && shotsfired == true && (ghostRight.y > -10 && rightShot[j].crashWith(ghostRight)) || ghostRight.y > 600) {
                ghostRight.y = Math.floor(Math.random() * ghostChance) - 2000;
                ghostRight.x = Math.floor(Math.random() * 441) + 30;
                rightShot.splice(j, 1)
                ammoRight++
                document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
                rightScore += 5;
                document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
            }
        }
        for (j = 0; j < rightShot.length; j += 1) {
            if (gameStarted == true && shotsfired == true && tankRight.y > -50 && rightShot[j].crashWith(tankRight) && tankHitRight == 1) {
                tankRight.y = Math.floor(Math.random() * tankChance) - 2000;
                tankRight.x = Math.floor(Math.random() * 441) + 30;
                tankHitRight = tankHit;
                rightShot.splice(j, 1)
                ammoRight++
                document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
                rightScore += 3;
                document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
            } else if (gameStarted == true && shotsfired == true && tankRight.y > -50 && rightShot[j].crashWith(tankRight) && tankHitRight > 1) {
                rightShot.splice(j, 1)
                ammoRight++
                document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
                tankHitRight--;
            }
        }
        for (j = 0; j < rightShot.length; j += 1) {
            if (rightShot[j].y < -10) {
                rightShot.splice(j, 1)
                ammoRight++
                document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
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
        tankRight.y += tankSpeed;
        tankRight.updateRight();
        ghostRight.y += ghostSpeed;
        ghostRight.updateRight();
        playerRight.newPos();
        playerRight.updateRight();
    }
}
/*Updates*/

/* Ending */
function end(ending) {
    if (isMulti == true) {
        switch (ending) {
            case 1:
                document.getElementById("looser").innerHTML = "LEFT LOST, RIGHT WON"
                document.getElementById("scorefin").innerHTML = "Left Score: " + leftScore + "; Right Score: " + rightScore
                break;
            case 2:
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
/**/

/* Key commands */
document.onkeydown = function movement(key) {
    if (gameStarted == true) {
        switch (key.keyCode) {
            case 65:
                playerLeft.speedX = -(playerSpeed);
                break;
            case 87:
                playerLeft.speedY = -(playerSpeed);
                break;
            case 68:
                playerLeft.speedX = playerSpeed;
                break;
            case 83:
                playerLeft.speedY = playerSpeed;
                break;
            case 32:
                shotsfired = true;
                if (leftShot.length < ammo) {
                    leftShot.push(new component(3, 10, "blue", playerLeft.x + 10, playerLeft.y - 10));
                    ammoLeft--;
                    document.getElementById("ammocounter1").innerHTML="Ammo: " + ammoLeft;
                }
                break;
        }
        if (isMulti == true) {
            switch (key.keyCode) {
                case 37:
                    playerRight.speedX = -(playerSpeed);
                    break;
                case 38:
                    playerRight.speedY = -(playerSpeed);
                    break;
                case 39:
                    playerRight.speedX = playerSpeed;
                    break;
                case 40:
                    playerRight.speedY = playerSpeed;
                    break;
                case 96:
                    shotsfired = true;
                    if (rightShot.length < ammo) {
                        rightShot.push(new component(3, 10, "green", playerRight.x + 10, playerRight.y - 10));
                        ammoRight--;
                        document.getElementById("ammocounter2").innerHTML="Ammo: " + ammoRight
                    }
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
                playerLeft.speedX = 0;
                break;
            case 87:
                playerLeft.speedY = 0;
                break;
            case 68:
                playerLeft.speedX = 0;
                break;
            case 83:
                playerLeft.speedY = 0;
                break;
        }
        if (isMulti == true) {
            switch (key.keyCode) {
                case 37:
                    playerRight.speedX = 0;
                    break;
                case 38:
                    playerRight.speedY = 0;
                    break;
                case 39:
                    playerRight.speedX = 0;
                    break;
                case 40:
                    playerRight.speedY = 0;
                    break;
            }
        }
    }
}
/**/