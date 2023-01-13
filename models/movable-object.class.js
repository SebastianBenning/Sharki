class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    startendx = false;
    startendy = false;
    intervalx = false;
    intervaly = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    isCollidingX(movableObject) {
        if (this.y + this.height - this.offset.bottom - 5 > movableObject.y + movableObject.offset.top && this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom - 5) {
            return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
                this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingY(movableObject) {
        if (this.x + this.width - this.offset.right - 10 > movableObject.x + movableObject.offset.left && this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right - 10) {
            return this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
        }
    }

    hitground(collidingWithBarrierY, collidingWithBarrierX) {



        if (this.world.keyboard.RIGHT == true && collidingWithBarrierX && !this.isCollidingWithBarrierLeft) {
            this.isCollidingWithBarrierRight = true;
        }

        if (this.world.keyboard.LEFT == true && collidingWithBarrierX && !this.isCollidingWithBarrierRight) {
            this.isCollidingWithBarrierLeft = true;
        }

        if (this.world.keyboard.UP == true && collidingWithBarrierY && !this.isCollidingWithBarrierDown) {
            this.isCollidingWithBarrierUp = true;
        }

        if (this.world.keyboard.DOWN == true && collidingWithBarrierY && !this.isCollidingWithBarrierUp) {
            this.isCollidingWithBarrierDown = true;
        }

    }

    hitSuper() {
        this.energy = 0;
    }

    hitenemy(attack) {
        this.energy -= attack;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;

    }

    switschMove(start, end, direction, speed) {
        setInterval(() => {
            if (this.isDead()) {
                this.goOut();
            }
            if (direction == 'vertical') {
                if (!this.intervalx) {
                    if (this.x > start) {
                        this.startendx = true;
                        this.intervalx = true;
                        this.otherDirection = false;
                    }
                }
                if (this.intervalx) {
                    if (this.x < end) {
                        this.startendx = false;
                        this.intervalx = false;
                        this.otherDirection = true;
                    }
                }
                if (this.startendx) {
                    this.x -= speed;

                }
                if (!this.startendx) {
                    this.x += speed;

                }
            }
            if (direction == 'horizontal') {
                if (!this.intervaly) {
                    if (this.y > start) {
                        this.startendy = true;
                        this.intervaly = true;

                    }

                }
                if (this.intervaly) {
                    if (this.y < end) {
                        this.startendy = false;
                        this.intervaly = false;

                    }
                }
                if (this.startendy) {
                    this.y -= speed;
                }
                if (!this.startendy) {
                    this.y += speed;
                }
            }




        }, 1000 / 60);
    }

    goOut() {
        setInterval(() => {
            this.y -= 0.1;
        }, 1000 / 60);
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

    moveTop() {

    }

    moveBot() {

    }

    moveLeft() {
      let stopinter =  setInterval(() => {
            this.x -= 0.01;
            if (this.isDead()){
                clearInterval(stopinter);
            }
        }, 1000 / 60);
    }

    playAnimation(images, i) {

        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}