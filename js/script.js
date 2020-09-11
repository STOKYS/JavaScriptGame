var playerLeft;
var leftEnemies;

gameStarted = false;

function startGame(type) {
    if (type == 2) {
        /*Toto bude multiplayer*/
    }else if (type == 3){
        document.getElementById("canvas2").style.display = "none";
        document.getElementById("gm1").style.float = "none";
        document.getElementById("gm1").style.margin = "auto";
    }else if (type == 1){
        /*toto je single*/
        document.getElementById("gm2").style.display = "none";
        document.getElementById("gm1").style.float = "none";
        document.getElementById("gm1").style.margin = "auto";
    }
    /*Zde je vse*/
    playerLeft = new component(20, 15, "blue", 241, 470);
    leftEnemies = new component(30, 30, "red", 300, 120);
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
}

function updateGameArea() {
    gameLeft.clear();
    playerLeft.newPos();
    playerLeft.update();
    leftEnemies.update();
}

document.onkeydown = function movement(key) {
    if (gameStarted == true) {
        switch (key.keyCode) {
            case 65:
                console.log('A');
                playerLeft.speedX = -1;
                break;
            case 87:
                console.log('W');
                playerLeft.speedY = -1;
                break;
            case 68:
                console.log('D');
                playerLeft.speedX = 1;
                break;
            case 83:
                console.log('S');
                playerLeft.speedY = 1;
                break;
            case 32:
                console.log('Left Shoot');
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