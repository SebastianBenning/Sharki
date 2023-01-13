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
    checkAlreadyRunning = false;


    world;
    walking_sound = new Audio('audio/swim.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(SHARKIE_IMAGES['dead']);
        this.loadImages(SHARKIE_IMAGES['hurt']);
        this.loadImages(SHARKIE_IMAGES['swim']);
        this.loadImages(SHARKIE_IMAGES['stay']);
        this.loadImages(SHARKIE_IMAGES['bubble_Trap']);
        this.loadImages(SHARKIE_IMAGES['poison_Bubble_Trap']);
        this.animate();
    }

    animate() {



        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.UP && this.y > -110 && !this.isCollidingWithBarrierUp && !this.isDead()) {
                this.y -= this.speed;
                this.cameraSetYUpDown();
                // this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && !this.isCollidingWithBarrierDown && !this.isDead()) {
                this.y += this.speed;
                this.cameraSetYUpDown();
                // this.walking_sound.play();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isCollidingWithBarrierRight && !this.isDead()) {
                this.x += this.speed;
                this.otherDirection = false;
                this.cameraSetXRightLeft();
                // this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && !this.isCollidingWithBarrierLeft && !this.isDead()) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.cameraSetXRightLeft();
                // this.walking_sound.play();
            }

        }, 1000 / 60);

        let stopintercharacter = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(SHARKIE_IMAGES['dead']);
                if (i == 11) {
                    clearInterval(stopintercharacter);
                }
            }
            else if (this.isHurt()) {
                this.playAnimation(SHARKIE_IMAGES['hurt']);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(SHARKIE_IMAGES['swim']);
            }
            else {
                this.playAnimation(SHARKIE_IMAGES['stay']);
            }
        }, 130);

        setInterval(() => {
            if (this.world.keyboard.D) {
                this.playAnimation(SHARKIE_IMAGES['bubble_Trap']);
                this.bubbleTrapAttack();
            }

            else if (this.world.keyboard.F) {
                this.playAnimation(SHARKIE_IMAGES['poison_Bubble_Trap']);
                this.poisonBubbleTrapAttack();
            }
        }, 130);
    }

    poisonBubbleTrapAttack() {
        if (this.world.poison == 0) {

        }
        else {
            this.activateF();
            if (!this.checkAlreadyRunning) {
                if (!this.otherDirection) {
                    setTimeout(() => {
                        this.world.poison--;
                        this.world.statusBarPoison.setPercentage(this.world.poison * 10, 'poison');
                        let poisonbubble = new PoisonBubble(this.x + 200, this.y + 130, this.otherDirection);
                        this.world.poisonbubble.push(poisonbubble);
                    }, 500);
                } else {
                    setTimeout(() => {
                        this.world.poison--;
                        this.world.statusBarPoison.setPercentage(this.world.poison * 10, 'poison');
                        let poisonbubble = new PoisonBubble(this.x + 0, this.y + 130, this.otherDirection);
                        this.world.poisonbubble.push(poisonbubble);
                    }, 500);
                }
            }
        }
    }

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
                console.log(this.world.keyboard.F);
            }, 500);
        }
    }

    bubbleTrapAttack() {
        this.activateD();
        if (!this.checkAlreadyRunning) {
            if (!this.otherDirection) {
                setTimeout(() => {
                    let bubble = new Bubble(this.x + 200, this.y + 130, this.otherDirection);
                    this.world.bubble.push(bubble);
                }, 500);
            } else {
                setTimeout(() => {
                    let bubble = new Bubble(this.x + 0, this.y + 130, this.otherDirection);
                    this.world.bubble.push(bubble);
                }, 500);
            }
        }
    }

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
                console.log(this.world.keyboard.D);
            }, 500);
        }
    }

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


    cameraSetYUpDown() {
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