let canvas;
let world;
let keyboard = new Keyboard();
let characterisDead = false;
let endbossisDead = false;
let gamehelperval = false;
let soundonoff = false;
let canvaswith;
let canvasheiht;
let mobiledevice = false;
let mobilegameend = false;
let closegamehelp = false;
let content ;
function init() {
    checkGameEnd();
}

function startGame() {

    document.getElementById('startgame').classList.add('d-none');
    document.getElementById('header').classList.remove('header');

    checkMobile();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function checkMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('desktopgame').classList.add('d-none');
        let mobilegame = document.getElementById('mobilecontainer');
        mobilegame.innerHTML = '';
        canwidth = screen.width;
        canheight = screen.height;
        canvaswith = canwidth;
        canvasheiht = canheight;
        console.log(canvasheiht);
        mobilegame.innerHTML = canvasMobileHtml(canwidth, canheight);
        mobiledevice = true;
        mobilegameend = true;
    } else {
        let game = document.getElementById('gamecontainer');
        game.innerHTML = '';
        game.innerHTML = canvasHtml();
        console.log("not mobile device");
    }
}

function canvasMobileHtml(canwidth, canheight) {
    return `
    <div class="mobilecontainer">
        <canvas id="canvas" width="${canwidth}" height="${canheight}" ></canvas>
        <div class="mobile-controller">
            <button id="btnUp" class="mobile-controll-key"><img src="img/arrow-up.png" alt=""></button>
            <div class="mobile-controll-x">
                <button id="btnLeft" class="mobile-controll-key"><img src="img/left-arrow.png" alt=""></button>
                <button id="btnRight" class="mobile-controll-key"><img src="img/right-arrow.png" alt=""></button>
            </div>
            <button id="btnDown" class="mobile-controll-key"><img src="img/arrow-down.png" alt=""></button>
        </div>
        <div class="mobile-akktion">
            <button id="btnBubble" class="mobile-controll-key">Bubble</button>
            <button id="btnPoison" class="mobile-controll-key">Poison Bubble</button>
        </div>
        <div class="mobile-interface">
        <button onclick="soundOnOff()" title="Sound On/Off" class="nav"><img id="sound-img" class="nav-icon" src="img/no-sound.png" alt=""></button>
        <button onclick="gamehelpermobile()" title="Help" class="nav"><img class="nav-icon" src="img/help.png" alt=""></button>
        </div>
        <div class="game-helper-container-mobile animationFadeInRight d-none" id="gamehelpermobile"></div> 
    </div>
    `
}

function canvasHtml() {
    return `
    <div id="settings" class="setting-container">
        <canvas id="canvas" width="720px" height="480px"></canvas>
        <div class="button-container">
        <button onclick="fullScreen()" title="Fullscreen" class="nav"><img class="nav-icon" src="img/vollbild.png" alt=""></button>
        <button onclick="soundOnOff()" title="Sound On/Off" class="nav"><img id="sound-img" class="nav-icon" src="img/no-sound.png" alt=""></button>
        <button onclick="gamehelper()" title="Help" class="nav"><img class="nav-icon" src="img/help.png" alt=""></button>
        </div>
    </div>`
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 70) {
        keyboard.F = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 70) {
        keyboard.F = false;
    }

});

function openGamehelper() {
    document.getElementById('infoForGame').classList.remove('d-none');
}

function closeGamehelper() {
    if (closegamehelp) {
        closegamehelp = false;
        document.getElementById('gamehelpermobile').classList.add('d-none');
    }
    else {
        document.getElementById('gamehelper').classList.add('d-none');
    }
}

function gamehelpermobile() {
    closegamehelp = true;
    let container = document.getElementById('gamehelpermobile');
    container.classList.remove('d-none');
    container.innerHTML = '';
    container.innerHTML = gameHelperHtml();
    gamehelperval = true;


}

function gamehelper() {
    if (!gamehelperval) {
        let container = document.getElementById('gamehelper');
        container.classList.remove('d-none');
        container.innerHTML = '';
        container.innerHTML = gameHelperHtml();
        gamehelperval = true;
    }
    else {
        document.getElementById('gamehelper').classList.add('d-none');
        gamehelperval = false;
    }
}

function fullScreen() {
    let el = document.getElementById('canvas');
    if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
    else {
        el.mozRequestFullScreen();
    }
}

function soundOnOff() {
    if (!soundonoff) {
        soundonoff = true;
        document.getElementById('sound-img').src = 'img/speaker-filled-audio-tool.png';
    }
    else {
        soundonoff = false;
        document.getElementById('sound-img').src = 'img/no-sound.png';
    }
}

function checkGameEnd() {
    let worldsinterval = setInterval(() => {
        if (mobilegameend) {
            content = document.getElementById('mobilecontainer');
        }
        else {
            content = document.getElementById('gamecontainer');
        }
        if (characterisDead) {
            setTimeout(() => {
                content.innerHTML = endScreenCharacterHtml();
                clearInterval(worldsinterval);
            }, 2000);
        }
        else if (endbossisDead) {
            setTimeout(() => {
                content.innerHTML = endScreenEndbossHtml();
                clearInterval(worldsinterval);
            }, 2000);
        }
    }, 250);
}

function restartLevel() {
    location.reload();
}

function endScreenEndbossHtml() {
    return `
    <div class="header">
        <h1>You Win!</h1>
        <img onclick="restartLevel()" src="img/6.Botones/Try again/Recurso 17.png" alt="" class="try-again-button">
    </div>
    `
}

function endScreenCharacterHtml() {
    return `
    <div class="header">
        <h1>Game Over</h1>
        <img onclick="restartLevel()" src="img/6.Botones/Try again/Recurso 17.png" alt="" class="try-again-button">
    </div>
    `
}

function gameHelperHtml() {
    return `
    <div class="close-help-container" ><img onclick="closeGamehelper()" class="close-icon" src="img/close.png" alt=""></div>
    <h2>Help</h2>
        <div class="displayd">
            <div class="help-box">
                <img class="help-img" src="img/6.Botones/Key/arrow keys.png" alt="">
                <h3>Move Sharkie</h3>
                <img class="help-img-sharkie" src="img/1.Sharkie/3.Swim/1.png" alt="">
            </div>
            <div class="help-box">
                <img class="help-img-key" src="img/6.Botones/Key/D key.png" alt="">
                <h3>Bubble Attack</h3>
                <img class="help-img-jelly" src="img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png" alt="">
            </div>
            <div class="help-box">
                <img class="help-img-key" src="img/6.Botones/Key/F key.png" alt="">
                <h3>Poison Bubble Attack</h3>
                <img class="help-img-jelly" src="img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png" alt="">
            </div>
            <div class="help-box-game">
                <button onclick="openGamehelper()" class="game-helper-button">Game Help</button>
            </div>
            <div id="infoForGame" class="d-none">
                <h3>You Need 5 Coins for open the Chest.</h3>
                <h3>You can refill your Poison Bar over and over again.</h3>
                <h3>Go into the Final battle with enough Poisen Energy.</h3>
            </div>
            </div>
    `;
}