let canvas;
let world;
let keyboard = new Keyboard();
let characterisDead = false;
let endbossisDead = false;
let gamehelperval = false;
function init() {
       
}

function startGame(){
    document.getElementById('startgame').classList.add('d-none');
    document.getElementById('header').classList.remove('header');
    let game = document.getElementById('gamecontainer');
    game.innerHTML='';
    game.innerHTML= canvasHtml();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function canvasHtml(){
    return `<div id="settings" class="setting-container">
            <canvas id="canvas" width="720px" height="480px"></canvas>
            <div class="button-container">
            <button onclick="fullScreen()" title="Fullscreen" class="nav"><img class="nav-icon" src="img/vollbild.png" alt=""></button>
            <button onclick="" title="Sound On/Off" class="nav"><img class="nav-icon" src="img/no-sound.png" alt=""></button>
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

function openGamehelper(){
    document.getElementById('infoForGame').classList.remove('d-none');
}

function closeGamehelper(){
    document.getElementById('gamehelper').classList.add('d-none');
}

function gamehelper(){
    if(!gamehelperval){
    let container = document.getElementById('gamehelper');
    container.classList.remove('d-none');
    container.innerHTML= '';
    container.innerHTML= gameHelperHtml();
    gamehelperval = true;
    }
    else{
        document.getElementById('gamehelper').classList.add('d-none');
        gamehelperval = false;
    }
}

function fullScreen(){
    let el = document.getElementById('canvas');
 
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }  
    
}



function gameHelperHtml(){
    return`
    <div class="close-help-container" ><img onclick="closeGamehelper()" class="close-icon" src="img/close.png" alt=""></div>
    <h2>Help</h2>
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
                <img class="help-img-key" src="img/6.Botones/Key/F_key.png" alt="">
                <h3>Poison Bubble Attack</h3>
                <img class="help-img-jelly" src="img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png" alt="">
            </div>
            <div class="help-box">
                <button onclick="openGamehelper()" class="game-helper-button">Game Help</button>
            </div>
            <div id="infoForGame" class="d-none">
                <h3>You Need 5 Coins for open the Chest.</h3>
                <h3>You can refill your Poison Bar over and over again.</h3>
                <h3>Go into the Final battle with enough Poisen Energy.</h3>
            </div>
    `;
}