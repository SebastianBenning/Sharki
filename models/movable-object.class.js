class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    startendx = false;
    startendy = false;
    intervalx = false;
    intervaly = false;
    animationStarted = false;
    // animationFinished = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    // Checks if 2 objects collide and returns a boolean
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    // Checks if 2 objects on x-axis collide and returns a boolean
    isCollidingX(movableObject) {
        if (this.checkCollindingx(movableObject)) {
            return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
                this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right;
        }
    }

    checkCollindingx(movableObject) {
        return this.y + this.height - this.offset.bottom - 5 > movableObject.y + movableObject.offset.top &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom - 5;
    }

    // Checks if 2 objects on y-axis collide and returns a boolean
    isCollidingY(movableObject) {
        if (this.checkCollindingy(movableObject)) {
            return this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
        }
    }

    checkCollindingy(movableObject) {
        return this.x + this.width - this.offset.right - 10 > movableObject.x + movableObject.offset.left &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right - 10;
    }

    // character hit a barrier
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

    // character hit a supperjelly
    hitSuper() {
        this.energy = 0;
    }

    // Bubble hit Enemy
    hitenemy(attack) {
        this.energy -= attack;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    // character hit a Enemy
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    // character is hurt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    // character is dead
    isDead() {
        return this.energy == 0;
    }

    // look in which direction the enemy is swimming
    switschMove(start, end, direction, speed) {
        setInterval(() => {
            if (this.isDead()) {
                this.goOut();
            }
            if (direction == 'vertical') {
                this.moveVertical(start, end, speed);
            }
            if (direction == 'horizontal') {
                this.moveHorizontal(start, end, speed);
            }
        }, 1000 / 60);
    }

    // enemy move from right to left
    moveVertical(start, end, speed) {
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

    // enemy move from up to down
    moveHorizontal(start, end, speed) {
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

    // enemy hitten then go out of map
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

    moveLeft() {
        let stopinter = setInterval(() => {
            this.x -= 0.01;
            if (this.isDead()) {
                clearInterval(stopinter);
            }
        }, 1000 / 60);
    }

    // animate all images
    playAnimation(images, attack) {
        if (attack == 0) {
            if (!this.animationStarted) {
                this.currentImage = 0;
                this.animationStarted = true;
            }
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            if (i == 5 || 1 > 5) {
                this.animationStarted = false;
            }
        }

        else if (attack == 1) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
}