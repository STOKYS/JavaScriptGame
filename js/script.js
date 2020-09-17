let playerLeft,
    playerRight,
    playerSpeed = 2,
    leftShot = [],
    rightShot = [],
    leftScore = 0,
    rightScore = 0;
let ammo = 8,
    ammoLeft = ammo,
    ammoRight = ammo;
let enemiesLeft = [],
    enemiesRight = [],
    eneSpeed = 1;
let ghostLeft,
    ghostRight,
    ghostChance = -5000,
    ghostSpeed = 5;
let tankLeft,
    tankRight,
    tankChance = -2000,
    tankSpeed = 1,
    tankHit = 3,
    tankHitLeft = tankHit,
    tankHitRight = tankHit;
let knightLeft,
    knightRight,
    knightChance = -2000,
    knightSpeed = 1,
    knightHorizontalSpeedLeft = 2,
    knightHorizontalSpeedRight = 2;
let shooterLeft,
    shooterRight,
    shooterChance = -500,
    shooterSpeed = .5,
    shooterHorizontalSpeedLeft = 1,
    shooterHorizontalSpeedRight = 1,
    shooterShotSpeed = 2,
    shooterLeftShot = [],
    shooterRightShot = [];
let leftBottom, rightBottom;
let Counter = 0;
let pointsToWin = 100;
let difficulty = 4;
let hearts = 1,
    heartsLeft = hearts,
    heartsRight = hearts;
let gameStarted = false,
    shotsfired = false,
    isMulti = false;
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
document.querySelectorAll("#btnpeace, #btneasy, #btnmed, #btnhard, #btndark").forEach(item => {
    item.addEventListener("click", event => {
        if (item.id == "btnpeace") {
            difficulty = 2;
            eneSpeed = 0.66;
            playerSpeed = 2.25;
            ghostChance = -2000;
            ghostSpeed = 3;
            tankHit = 2
            tankChance = -4000
            tankSpeed = 0.8
            knightSpeed = 0.8;
            knightHorizontalSpeedLeft = 1.5;
            knightHorizontalSpeedRight = 1.5;
            knightChance = -3000;
            shooterChance = -1000;
            shooterSpeed = .5
            shooterShotSpeed = 1.5;
            shooterHorizontalSpeedLeft = 1;
            shooterHorizontalSpeedRight = 1;
            ammo = 15;
            ammoLeft = ammo;
            ammoRight = ammo;
        } else if (item.id == "btneasy") {
            difficulty = 3;
            eneSpeed = 0.80;
            playerSpeed = 2;
            ghostChance = -3000;
            ghostSpeed = 4;
            tankHit = 2
            tankChance = -3000
            tankSpeed = 0.9
            knightSpeed = 0.9;
            knightHorizontalSpeedLeft = 1.75;
            knightHorizontalSpeedRight = 1.75;
            knightChance = -3000;
            shooterChance = -750;
            shooterSpeed = .5
            shooterShotSpeed = 1.5;
            shooterHorizontalSpeedLeft = 1;
            shooterHorizontalSpeedRight = 1;
            ammo = 10
            ammoLeft = ammo;
            ammoRight = ammo;
        } else if (item.id == "btnmed") {
            difficulty = 4;
            eneSpeed = 1;
            playerSpeed = 2;
            ghostChance = -5000;
            ghostSpeed = 5;
            tankHit = 3
            tankChance = -2000
            tankSpeed = 1
            knightSpeed = 1;
            knightHorizontalSpeedLeft = 2;
            knightHorizontalSpeedRight = 2;
            knightChance = -2000;
            shooterChance = -500;
            shooterSpeed = .5
            shooterShotSpeed = 2;
            shooterHorizontalSpeedLeft = 1;
            shooterHorizontalSpeedRight = 1;
            ammo = 8
            ammoLeft = ammo;
            ammoRight = ammo;
        } else if (item.id == "btnhard") {
            difficulty = 5;
            eneSpeed = 1.5;
            playerSpeed = 2;
            ghostChance - 7500;
            ghostSpeed = 6.66;
            tankHit = 4
            tankChance = -1500
            tankSpeed = 1.1
            knightSpeed = 1.25;
            knightHorizontalSpeedLeft = 2.2;
            knightHorizontalSpeedRight = 2.2;
            knightChance = -1500;
            shooterChance = -400;
            shooterSpeed = .75
            shooterShotSpeed = 3;
            shooterHorizontalSpeedLeft = 1;
            shooterHorizontalSpeedRight = 1;
            ammo = 5
            ammoLeft = ammo;
            ammoRight = ammo;
        } else if (item.id == "btndark") {
            difficulty = 6;
            eneSpeed = 1.8;
            playerSpeed = 1.8;
            ghostChance = -10000
            ghostSpeed = 8;
            tankHit = 5
            tankChance = -1000
            tankSpeed = 1.2
            knightSpeed = 1.5;
            knightHorizontalSpeedLeft = 2.5;
            knightHorizontalSpeedRight = 2.5;
            knightChance = -1000;
            shooterChance = -300;
            shooterSpeed = 1
            shooterShotSpeed = 4;
            shooterHorizontalSpeedLeft = 1;
            shooterHorizontalSpeedRight = 1;
            ammo = 3
            ammoLeft = ammo;
            ammoRight = ammo;
        }
        document.getElementById("difftext").innerHTML = "Current difficulty: " + item.getAttribute('data-diff');
        document.getElementById("ammocounter1").innerHTML = "Ammo: " + ammoLeft + "/" + ammo;
        document.getElementById("ammocounter2").innerHTML = "Ammo: " + ammoRight + "/" + ammo;
    })
})
document.querySelectorAll("#btndisabled, #btn50, #btn100, #btn200, #btncustom").forEach(item => {
    item.addEventListener("click", event => {
        switch (item.id) {
            case "btndisabled":
                pointsToWin = 9999;
                break;
            case "btn50":
                pointsToWin = 50;
                break;
            case "btn100":
                pointsToWin = 100;
                break;
            case "btn200":
                pointsToWin = 200;
                break;
            case "btncustom":
                pointsToWin = document.getElementById("customvalue").value
                break;
        }
        document.getElementById("difftextscore").innerHTML = "Current win on score: " + pointsToWin;
        document.getElementById("scoreboard1").innerHTML = "Score: 0/" + pointsToWin
        document.getElementById("scoreboard2").innerHTML = "Score: 0/" + pointsToWin
    })
})
document.querySelectorAll("#btn1, #btn2, #btn3, #btn5, #btncustomheart").forEach(item => {
    item.addEventListener("click", event => {
        switch (item.id) {
            case "btn1":
                hearts = 1;
                break;
            case "btn2":
                hearts = 2;
                break;
            case "btn3":
                hearts = 3;
                break;
            case "btn5":
                hearts = 5;
                break;
            case "btncustomheart":
                hearts = document.getElementById("customheartvalue").value
                break;
        }
        heartsRight = hearts;
        heartsLeft = hearts;
        document.getElementById("heartsetting").innerHTML = "Current hearts: " + hearts;
        document.getElementById("heartcounter1").innerHTML = "Hearts: " + heartsLeft + "/" + hearts;
        document.getElementById("heartcounter2").innerHTML = "Hearts: " + heartsRight + "/" + hearts;
    })
})

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
    document.getElementById("hideOnStart").style.display = "none";
    leftBottom = new component(500, 3, "blue", 0, 497);
    playerLeft = new component(20, 15, "blue", 241, 470);
    ghostLeft = new component(30, 30, "pink", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * ghostChance) - 2000);
    tankLeft = new component(50, 30, "orange", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * tankChance) - 2000);
    knightLeft = new component(40, 40, "tomato", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * knightChance) - 1000);
    shooterLeft = new component(30, 40, "orangered", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * shooterChance) - 1000);
    for (t = 0; t < difficulty; t++) {
        enemiesLeft.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40 + -(t * 100)));
    }
    gameLeft.start();
    gameStarted = true;
    if (isMulti == true) {
        rightBottom = new component(500, 3, "green", 0, 497);
        playerRight = new component(20, 15, "green", 241, 470);
        ghostRight = new component(30, 30, "pink", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * ghostChance) - 2000);
        tankRight = new component(50, 30, "orange", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * tankChance) - 2000);
        knightRight = new component(50, 30, "tomato", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * knightChance) - 1000);
        shooterRight = new component(30, 40, "orangered", Math.floor(Math.random() * 441) + 30, Math.floor(Math.random() * shooterChance) - 1000);
        for (t = 0; t < difficulty; t++) {
            enemiesRight.push(new component(30, 30, "red", Math.floor(Math.random() * 441) + 30, -40 + -(t * 100)));
        }
        gameRight.start();
    }
}
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

function updateGameArea() {
    gameLeft.clear();
    if ((pointsToWin <= rightScore && isMulti == true) || (pointsToWin <= leftScore) || (heartsLeft == 0) || (isMulti == true && heartsRight == 0)) {
        gameStarted = false;
        gameRight.stop();
        gameLeft.stop();
        if ((pointsToWin <= leftScore) || heartsRight < hearts) {
            end(1);
        } else if ((pointsToWin <= rightScore && isMulti == true) || heartsLeft < hearts) {
            end(2)
        }
    }
    for (i = 0; i < enemiesLeft.length; i += 1) {
        if ((leftBottom.crashWith(enemiesLeft[i]) || playerLeft.crashWith(enemiesLeft[i])) && gameStarted == true) {
            heartsLeft -= 1
            document.getElementById("heartcounter1").innerHTML = "Hearts: " + heartsLeft + "/" + hearts;
        }
        for (u = 0; u < leftShot.length; u += 1) {
            if (gameStarted == true && shotsfired == true && leftShot[u].crashWith(enemiesLeft[i])) {
                leftShot.splice(u, 1)
                ammoLeft++
                leftScore++;
                enemiesLeft[i].y = -40;
                enemiesLeft[i].x = Math.floor(Math.random() * 441) + 30;
                document.getElementById("ammocounter1").innerHTML = "Ammo: " + ammoLeft + "/" + ammo
                document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
            }
        }
        enemiesLeft[i].y += eneSpeed;
        enemiesLeft[i].updateLeft();
    }
    for (u = 0; u < leftShot.length; u += 1) {
        if (gameStarted == true && shotsfired == true && ghostLeft.y > -50 && leftShot[u].crashWith(ghostLeft)) {
            ghostLeft.y = Math.floor(Math.random() * ghostChance) - 2000;
            ghostLeft.x = Math.floor(Math.random() * 441) + 30;
            leftScore += 2;
        }
        if (gameStarted == true && shotsfired == true && knightLeft.y > -50 && leftShot[u].crashWith(knightLeft)) {
            knightLeft.y = Math.floor(Math.random() * knightChance) - 2000;
            knightLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (gameStarted == true && shotsfired == true && shooterLeft.y > 0 && leftShot[u].crashWith(shooterLeft)) {
            shooterLeft.y = Math.floor(Math.random() * shooterChance) - 2000;
            shooterLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (gameStarted == true && shotsfired == true && tankLeft.y > -10 && leftShot[u].crashWith(tankLeft) && tankHitLeft == 1) {
            tankLeft.y = Math.floor(Math.random() * tankChance) - 2000;
            tankLeft.x = Math.floor(Math.random() * 441) + 30;
            tankHitLeft = tankHit;
        } else if (gameStarted == true && shotsfired == true && tankLeft.y > -50 && leftShot[u].crashWith(tankLeft) && tankHitLeft > 1) {
            tankHitLeft--;
        }
        if (leftShot[u].crashWith(tankLeft) && tankHitLeft == 0 || leftShot[u].crashWith(shooterLeft) || leftShot[u].crashWith(knightLeft) || leftShot[u].crashWith(ghostLeft)) {
            leftScore += 3;
            leftShot.splice(u, 1)
            ammoLeft++
        }
        if (leftShot[u].y < -10) {
            leftShot.splice(u, 1)
            ammoLeft++
        }
        leftShot[u].y += -3;
        leftShot[u].updateLeft();
        document.getElementById("scoreboard1").innerHTML = "Score: " + leftScore + "/" + pointsToWin;
        document.getElementById("ammocounter1").innerHTML = "Ammo: " + ammoLeft + "/" + ammo
    }
    for (n = 0; n < shooterLeftShot.length; n += 1) {
        if (gameStarted == true && shooterLeft.y > -50 && shooterLeftShot[n].crashWith(playerLeft)) {
            heartsLeft -= 1
            document.getElementById("heartcounter1").innerHTML = "Hearts: " + heartsLeft + "/" + hearts;
            shooterLeftShot.splice(n, 1)
        }
        if (shooterLeftShot[n].y > 500) {
            shooterLeftShot.splice(n, 1)
        }
        shooterLeftShot[n].y += shooterShotSpeed;
        shooterLeftShot[n].updateLeft();
    }
    if ((playerLeft.crashWith(tankLeft) || playerLeft.crashWith(knightLeft) || playerLeft.crashWith(shooterLeft) || leftBottom.crashWith(tankLeft) || leftBottom.crashWith(knightLeft) || leftBottom.crashWith(shooterLeft)) && gameStarted == true) {
        heartsLeft -= 1
        document.getElementById("heartcounter1").innerHTML = "Hearts: " + heartsLeft + "/" + hearts;
        if (leftBottom.crashWith(tankLeft)) {
            tankLeft.y = Math.floor(Math.random() * tankChance) - 2000;
            tankLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (leftBottom.crashWith(knightLeft)) {
            knightLeft.y = Math.floor(Math.random() * knightChance) - 2000;
            knightLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (leftBottom.crashWith(shooterLeft)) {
            shooterLeft.y = Math.floor(Math.random() * shooterChance) - 2000;
            shooterLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (playerLeft.crashWith(tankLeft)) {
            tankLeft.y = Math.floor(Math.random() * tankChance) - 2000;
            tankLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (playerLeft.crashWith(knightLeft)) {
            knightLeft.y = Math.floor(Math.random() * knightChance) - 2000;
            knightLeft.x = Math.floor(Math.random() * 441) + 30;
        }
        if (playerLeft.crashWith(shooterLeft)) {
            shooterLeft.y = Math.floor(Math.random() * shooterChance) - 2000;
            shooterLeft.x = Math.floor(Math.random() * 441) + 30;
        }
    }
    if (ghostLeft.y > 600) {
        ghostLeft.y = Math.floor(Math.random() * ghostChance) - 2000;
        ghostLeft.x = Math.floor(Math.random() * 441) + 30;
    }
    shooterLeftMove(), shooterLeft.x += shooterHorizontalSpeedLeft, shooterLeft.y += shooterSpeed, shooterLeft.updateLeft()
    knightBordersLeft(), knightLeft.y += knightSpeed, knightLeft.x += knightHorizontalSpeedLeft, knightLeft.updateLeft();
    tankLeft.y += tankSpeed, tankLeft.updateLeft();
    ghostLeft.y += ghostSpeed, ghostLeft.updateLeft();
    leftBottom.updateLeft();
    playerLeft.newPos(), playerLeft.updateLeft();
    if (isMulti == true) {
        gameRight.clear()
        for (g = 0; g < enemiesRight.length; g += 1) {
            if ((rightBottom.crashWith(enemiesRight[g]) || playerRight.crashWith(enemiesRight[g])) && gameStarted == true) {
                heartsRight -= 1
                document.getElementById("heartcounter2").innerHTML = "Hearts: " + heartsRight + "/" + hearts;
            }
            for (r = 0; r < rightShot.length; r += 1) {
                if (gameStarted == true && shotsfired == true && rightShot[r].crashWith(enemiesRight[g])) {
                    rightShot.splice(r, 1)
                    ammoRight++
                    rightScore++;
                    enemiesRight[g].y = -40;
                    enemiesRight[g].x = Math.floor(Math.random() * 441) + 30;
                    document.getElementById("ammocounter2").innerHTML = "Ammo: " + ammoRight + "/" + ammo
                    document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
                }
            }
            enemiesRight[g].y += eneSpeed;
            enemiesRight[g].updateRight();
        }
        for (r = 0; r < rightShot.length; r += 1) {
            if (gameStarted == true && shotsfired == true && ghostRight.y > -50 && rightShot[r].crashWith(ghostRight)) {
                ghostRight.y = Math.floor(Math.random() * ghostChance) - 2000;
                ghostRight.x = Math.floor(Math.random() * 441) + 30;
                rightScore += 2;
            }
            if (gameStarted == true && shotsfired == true && knightRight.y > -50 && rightShot[r].crashWith(knightRight)) {
                knightRight.y = Math.floor(Math.random() * knightChance) - 2000;
                knightRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (gameStarted == true && shotsfired == true && shooterRight.y > 0 && rightShot[r].crashWith(shooterRight)) {
                shooterRight.y = Math.floor(Math.random() * shooterChance) - 2000;
                shooterRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (gameStarted == true && shotsfired == true && tankRight.y > -10 && rightShot[r].crashWith(tankRight) && tankHitRight == 1) {
                tankRight.y = Math.floor(Math.random() * tankChance) - 2000;
                tankRight.x = Math.floor(Math.random() * 441) + 30;
                tankHitRight = tankHit;
            } else if (gameStarted == true && shotsfired == true && tankRight.y > -50 && rightShot[r].crashWith(tankRight) && tankHitRight > 1) {
                tankHitRight--;
            }
            if (rightShot[r].crashWith(tankRight) && tankHitRight == 0 || rightShot[r].crashWith(shooterRight) || rightShot[r].crashWith(knightRight) || rightShot[r].crashWith(ghostRight)) {
                rightScore += 3;
                rightShot.splice(r, 1)
                ammoRight++
            }
            if (rightShot[r].y < -10) {
                rightShot.splice(r, 1)
                ammoRight++
            }
            rightShot[r].y += -3;
            rightShot[r].updateRight();
            document.getElementById("scoreboard2").innerHTML = "Score: " + rightScore + "/" + pointsToWin;
            document.getElementById("ammocounter2").innerHTML = "Ammo: " + ammoRight + "/" + ammo
        }
        for (m = 0; m < shooterRightShot.length; m += 1) {
            if (gameStarted == true && shooterRight.y > -50 && shooterRightShot[m].crashWith(playerRight)) {
                heartsRight -= 1
                document.getElementById("heartcounter2").innerHTML = "Hearts: " + heartsRight + "/" + hearts;
                shooterRightShot.splice(m, 1)
            }
            if (shooterRightShot[m].y > 500) {
                shooterRightShot.splice(n, 1)
            }
            shooterRightShot[m].y += shooterShotSpeed;
            shooterRightShot[m].updateRight();
        }
        if ((playerRight.crashWith(tankRight) || playerRight.crashWith(knightRight) || playerRight.crashWith(shooterRight) || rightBottom.crashWith(tankRight) || rightBottom.crashWith(knightRight) || rightBottom.crashWith(shooterRight)) && gameStarted == true) {
            heartsRight -= 1
            document.getElementById("heartcounter2").innerHTML = "Hearts: " + heartsRight + "/" + hearts;
            if (rightBottom.crashWith(tankRight)) {
                tankRight.y = Math.floor(Math.random() * tankChance) - 2000;
                tankRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (rightBottom.crashWith(knightRight)) {
                knightRight.y = Math.floor(Math.random() * knightChance) - 2000;
                knightRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (rightBottom.crashWith(shooterRight)) {
                shooterRight.y = Math.floor(Math.random() * shooterChance) - 2000;
                shooterRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (playerRight.crashWith(tankRight)) {
                tankRight.y = Math.floor(Math.random() * tankChance) - 2000;
                tankRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (playerRight.crashWith(knightRight)) {
                knightRight.y = Math.floor(Math.random() * knightChance) - 2000;
                knightRight.x = Math.floor(Math.random() * 441) + 30;
            }
            if (playerRight.crashWith(shooterRight)) {
                shooterRight.y = Math.floor(Math.random() * shooterChance) - 2000;
                shooterRight.x = Math.floor(Math.random() * 441) + 30;
            }
        }
        if (ghostRight.y > 600) {
            ghostRight.y = Math.floor(Math.random() * ghostChance) - 2000;
            ghostRight.x = Math.floor(Math.random() * 441) + 30;
        }
    }
    shooterRightMove(), shooterRight.x += shooterHorizontalSpeedRight, shooterRight.y += shooterSpeed, shooterRight.updateRight()
    knightBordersRight(), knightRight.y += knightSpeed, knightRight.x += knightHorizontalSpeedRight, knightRight.updateRight();
    tankRight.y += tankSpeed, tankRight.updateRight();
    ghostRight.y += ghostSpeed, ghostRight.updateRight();
    rightBottom.updateRight();
    playerRight.newPos(), playerRight.updateRight();
}

function shooterLeftMove() {
    if (shooterLeft.x > playerLeft.x) {
        shooterHorizontalSpeedLeft = -1
    } else if (shooterLeft.x < playerLeft.x) {
        shooterHorizontalSpeedLeft = 1
    } else {
        shooterHorizontalSpeedLeft = 0
        if (shooterLeft.y > -10) {
            if (shooterLeftShot.length == 0) {
                shooterLeftShot.push(new component(3, 10, "black", shooterLeft.x + 15, shooterLeft.y + 20));
            }
        }

    }
}

function shooterRightMove() {
    if (shooterRight.x > playerRight.x) {
        shooterHorizontalSpeedRight = -1
    } else if (shooterRight.x < playerRight.x) {
        shooterHorizontalSpeedRight = 1
    } else {
        shooterHorizontalSpeedRight = 0
        if (shooterRight.y > -10) {
            if (shooterRightShot.length == 0) {
                shooterRightShot.push(new component(3, 10, "black", shooterRight.x + 15, shooterRight.y + 20));
            }
        }
    }

}

function knightBordersLeft() {
    if (knightLeft.x < 30 || knightLeft.x > 470) {
        knightHorizontalSpeedLeft *= -1;
    }
}

function knightBordersRight() {
    if (knightRight.x < 30 || knightRight.x > 470) {
        knightHorizontalSpeedRight *= -1;
    }
}

function end(ending) {
    if (isMulti == true) {
        switch (ending) {
            case 2:
                document.getElementById("looser").innerHTML = "LEFT LOST, RIGHT WON"
                document.getElementById("scorefin").innerHTML = "Left Score: " + leftScore + "; Right Score: " + rightScore
                break;
            case 1:
                document.getElementById("looser").innerHTML = "LEFT WON, RIGHT LOST"
                document.getElementById("scorefin").innerHTML = "Left Score: " + leftScore + "; Right Score: " + rightScore
                break;
        }
    } else {
        switch (ending) {
            case 2:
                document.getElementById("scorefin").innerHTML = "Your Score: " + leftScore
                break;
            case 1:
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
                    document.getElementById("ammocounter1").innerHTML = "Ammo: " + ammoLeft + "/" + ammo;
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
                        document.getElementById("ammocounter2").innerHTML = "Ammo: " + ammoRight + "/" + ammo
                    }
                    break;
            }
        }
    } else if (key.keyCode == 13 && gameStarted != true) {
        startGame(1)
    } else if (key.keyCode == 32 && gameStarted != true) {
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