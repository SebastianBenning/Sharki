class Character extends MovableObject {
    height = 250;
    width = 250;
    y = 200;
    x = -1300;
    speed = 5;
    isCollidingWithBarrierUp = false;
    isCollidingWithBarrierRight = false;
    isCollidingWithBarrierDown = false;
    isCollidingWithBarrierLeft = false;
    offset = {
        top: 130,
        bottom: 60,
        left: 60,
        right: 70
    }
    stopattack = false;
    attack = false;
    checkAlreadyRunning = false;
    world;
    walking_sound = new Audio('audio/swim.mp3');
    elektrik_sound = new Audio('audio/elektrik.mp3');
    lost_sound = new Audio('audio/lost.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(SHARKIE_IMAGES['dead']);
        this.loadImages(SHARKIE_IMAGES['hurt']);
        this.loadImages(SHARKIE_IMAGES['swim']);
        this.loadImages(SHARKIE_IMAGES['stay']);
        this.loadImages(SHARKIE_IMAGES['bubble_Trap']);
        this.loadImages(SHARKIE_IMAGES['poison_Bubble_Trap']);
        this.animate();
        this.touchEvents();
    }

    animate() {
        // look what key i press, if i hit a barrier and if the character is dead
        setInterval(() => {
            this.walking_sound.pause();
            this.walkingUpDown();
            this.walkingLeftRight();
        }, 1000 / 60);

        // look what move the character makes
        let stopintercharacter = setInterval(() => {
            if (this.isDead()) {
                let i = this.currentImage % SHARKIE_IMAGES['dead'].length;
                this.charIsDead();
                if (i == 11) {
                    clearInterval(stopintercharacter);
                    characterisDead = true;
                }
            }
            else if (this.isHurt()) {
                this.charisHurt();
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.charisSwimming();
            }
            else {
                this.charisStay();
            }
        }, 130);

        // interval for bubbleattack
        setInterval(() => {
            this.charAttack();
        }, 130);
    }

    // sharkie is Staying
    charisStay() {
        this.playAnimation(SHARKIE_IMAGES['stay'], 1);
    }

    // sharkie is swimming
    charisSwimming() {
        this.playAnimation(SHARKIE_IMAGES['swim'], 1);
    }

    // sharkie is Hurt
    charisHurt() {
        this.playAnimation(SHARKIE_IMAGES['hurt'], 1);
        if (soundonoff) {
            this.elektrik_sound.play();
        }
    }

    // sharkie is dead
    charIsDead() {
        this.playAnimation(SHARKIE_IMAGES['dead'], 1);
        if (soundonoff) {
            this.lost_sound.play();
        }
    }
    // sharkies Bubble attack 
    charAttack() {
        if (this.world.keyboard.D) {
            this.playAnimation(SHARKIE_IMAGES['bubble_Trap'], 0)
            this.bubbleTrapAttack();
        }
        else if (this.world.keyboard.F) {
            this.playAnimation(SHARKIE_IMAGES['poison_Bubble_Trap'], 0);
            this.poisonBubbleTrapAttack();
        }
        if (this.attackImage == 8) {
            clearInterval(this.stopinterattack);
            this.stopattack = false;
        }
    }
    // sharkie's running animation and camera work
    walkingLeftRight() {
        if (this.world.keyboard.RIGHT && !this.isCollidingWithBarrierRight && !this.isDead()) {
            this.x += this.speed;
            this.otherDirection = false;
            this.cameraSetXRightLeft();
            if (soundonoff) {
                this.walking_sound.play();
            }
        }
        if (this.world.keyboard.LEFT && !this.isCollidingWithBarrierLeft && !this.isDead()) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.cameraSetXRightLeft();
            if (soundonoff) {
                this.walking_sound.play();
            }
        }
    }
    // sharkie's running animation and camera work
    walkingUpDown() {
        if (this.world.keyboard.UP && this.y > -110 && !this.isCollidingWithBarrierUp && !this.isDead()) {
            this.y -= this.speed;
            this.cameraSetYUpDown();
            if (soundonoff) {
                this.walking_sound.play();
            }
        }
        if (this.world.keyboard.DOWN && !this.isCollidingWithBarrierDown && !this.isDead()) {
            this.y += this.speed;
            this.cameraSetYUpDown();
            if (soundonoff) {
                this.walking_sound.play();
            }
        }
    }
    // for touchdisplays
    touchEvents() {
        if (mobiledevice) {
            document.getElementById('btnRight').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.RIGHT = true;
            });

            document.getElementById('btnRight').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.RIGHT = false;
            });

            document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.LEFT = true;
            });

            document.getElementById('btnLeft').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.LEFT = false;
            });

            document.getElementById('btnUp').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.UP = true;
            });

            document.getElementById('btnUp').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.UP = false;
            });

            document.getElementById('btnDown').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.DOWN = true;
            });

            document.getElementById('btnDown').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.DOWN = false;
            });

            document.getElementById('btnBubble').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.D = true;
            });

            document.getElementById('btnBubble').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.D = false;
            });

            document.getElementById('btnPoison').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.F = true;
            });

            document.getElementById('btnPoison').addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard.F = false;
            });
        }
    }

    // makes a poison bubble
    poisonBubbleTrapAttack() {
        if (this.world.poison == 0) {
        }
        else {
            this.activateF();
            if (!this.checkAlreadyRunning) {
                if (!this.otherDirection) {
                    this.poisonDirection(200);
                } else {
                    this.poisonDirection(0);
                }
            }
        }
    }

    poisonDirection(x){
        setTimeout(() => {
            this.world.poison--;
            this.world.statusBarPoison.setPercentage(this.world.poison * 10, 'poison');
            let poisonbubble = new PoisonBubble(this.x + x, this.y + 130, this.otherDirection);
            this.world.poisonbubble.push(poisonbubble);
        }, 500);
    }

    // sets values ​​so that a bubble only appears every half second
    activateF() {
        if (!this.checkAlreadyRunning) {
            this.currentImage = 0;
            let fPressed = setInterval(() => {
                this.world.keyboard.F = true;
                this.checkAlreadyRunning = true;
            }, 100);
            setTimeout(() => {
                this.world.keyboard.F = false;
                this.checkAlreadyRunning = false;
                clearInterval(fPressed);
            }, 500);
        }
    }

    // makes a normal bubble
    bubbleTrapAttack() {
        this.activateD();
        if (!this.checkAlreadyRunning) {
            if (!this.otherDirection) {
                this.bubbleDirection(200);
            } else {
                this.bubbleDirection(0);
            }
        }
    }

    bubbleDirection(x){
        setTimeout(() => {
            let bubble = new Bubble(this.x + x, this.y + 130, this.otherDirection);
            this.world.bubble.push(bubble);
        }, 500);
    }

    // sets values ​​so that a bubble only appears every half second
    activateD() {
        if (!this.checkAlreadyRunning) {
            this.currentImage = 0;
            let dPressed = setInterval(() => {
                this.world.keyboard.D = true;
                this.checkAlreadyRunning = true;
            }, 100);
            setTimeout(() => {
                this.world.keyboard.D = false;
                this.checkAlreadyRunning = false;
                clearInterval(dPressed);
            }, 500);
        }
    }
    // aligns the camera depending on where the character is swimming
    cameraSetXRightLeft() {
        if (this.world.camera_x == -2100 || this.world.camera_x == 1400) {
            if (this.x > -1300 && this.x < -1200) {
                this.world.camera_x = -this.x + 100;
            }
            else if (this.x < 2200 && this.x > 2100) {
                this.world.camera_x = -this.x + 100;
            }
        }
        else {
            this.world.camera_x = -this.x + 100;
        }
    }

    // aligns the camera depending on where the character is swimming
    cameraSetYUpDown() {
        if (mobiledevice) {
            this.mobileY();
        }
        if (!mobiledevice) {
            this.notMobileY();
        }
    }

    // desktop camera setting
    notMobileY() {
        if (this.world.camera_y == -475 || this.world.camera_y == 0) {
            if (this.y > 100 && this.y < 120) {
                this.world.camera_y = -this.y + 100;
            }
            else if (this.y < 575 && this.y > 550) {
                this.world.camera_y = -this.y + 100;
            }
        }
        else {
            this.world.camera_y = -this.y + 100;
        }
    }

    // mobile camera setting
    mobileY() {
        if (canvasheiht < 850 && canvasheiht > 750) {
            if (this.world.camera_y == -140 || this.world.camera_y == 0) {
                if (this.y > 100 && this.y < 120) {
                    this.world.camera_y = -this.y + 100;
                }
                else if (this.y < 240 && this.y > 215) {
                    this.world.camera_y = -this.y + 100;
                }
            }
            else {
                this.world.camera_y = -this.y + 100;
            }
        }
        else if (canvasheiht < 475 && canvasheiht > 350) {
            if (this.world.camera_y == -475 || this.world.camera_y == 0) {
                if (this.y > 100 && this.y < 120) {
                    this.world.camera_y = -this.y + 100;
                }
                else if (this.y < 575 && this.y > 550) {
                    this.world.camera_y = -this.y + 100;
                }
            }
            else {
                this.world.camera_y = -this.y + 100;
            }
        }
    }
}