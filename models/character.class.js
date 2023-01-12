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

    images_stay = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    images_swim = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    images_dead = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    images_hurt = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];
    world;
    walking_sound = new Audio('audio/swim.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.animate();
    }

    animate() {



        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.UP && this.y > -110 && !this.isCollidingWithBarrierUp) {
                this.y -= this.speed;
                this.cameraSetYUpDown();
                // this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && !this.isCollidingWithBarrierDown) {
                this.y += this.speed;
                this.cameraSetYUpDown();
                // this.walking_sound.play();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isCollidingWithBarrierRight) {
                this.x += this.speed;
                this.otherDirection = false;
                this.cameraSetXRightLeft();
                // this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && !this.isCollidingWithBarrierLeft) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.cameraSetXRightLeft();
                // this.walking_sound.play();
            }

        }, 1000 / 60);

        setInterval(() => {

            if (this.isDead()) {
                this.loadImages(this.images_dead);
                let i = this.currentImage % this.images_dead.length;
                this.playAnimation(this.images_dead, i);
            }

            else if (this.isHurt()) {
                this.loadImages(this.images_hurt);
                let i = this.currentImage % this.images_hurt.length;
                this.playAnimation(this.images_hurt, i);
            }

            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.loadImages(this.images_swim);
                let i = this.currentImage % this.images_swim.length;
                this.playAnimation(this.images_swim, i);
            }


            else {
                this.loadImages(this.images_stay);
                let i = this.currentImage % this.images_stay.length;
                this.playAnimation(this.images_stay, i);
            }
        }, 130);

        setInterval(() => {
            if (this.world.keyboard.D) {
                this.loadImages(SHARKIE_IMAGES['bubble_Trap']);
                let i = this.currentImage % SHARKIE_IMAGES['bubble_Trap'].length;
                this.playAnimation(SHARKIE_IMAGES['bubble_Trap'], i);
                this.bubbleTrapAttack();
            }

            else if (this.world.keyboard.F) {
                this.loadImages(SHARKIE_IMAGES['poison_Bubble_Trap']);
                let i = this.currentImage % SHARKIE_IMAGES['poison_Bubble_Trap'].length;
                this.playAnimation(SHARKIE_IMAGES['poison_Bubble_Trap'], i);
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
                if(!this.otherDirection){
                    setTimeout(() => {
                        this.world.poison--;
                        this.world.statusBarPoison.setPercentage(this.world.poison * 10, 'poison');
                        let poisonbubble = new PoisonBubble(this.x + 200, this.y + 130, this.otherDirection);
                        this.world.poisonbubble.push(poisonbubble);
                    }, 500);
                }else{
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
            }else{
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