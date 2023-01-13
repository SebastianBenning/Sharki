class World {
    character = new Character();
    level = level1;
    levelenemy = level1Enemy;
    levelbarrier = level1barrier;
    collectables = level1collectables;
    isCollidingWithBarrier = false;
    statusBarLife = new StatusBar('life', 0, 0, 200, 60, 100);
    statusBarCoin = new StatusBar('coin', 0, 50, 200, 60, 0);
    statusBarPoison = new StatusBar('poison', 0, 100, 200, 60, 0);
    chest = this.collectables.collectables[0].intervalChest;
    poisonflask = new Poison(-1220, 700);
    triggerbarrier = [new Jellysuper(1300, 100), new Jellysuper(1300, 180),new Jellysuper(1300, 260),new Jellysuper(1300, 340)];
    canvas;
    ctx;
    keyboard;
    camera_x = 1400;
    camera_y = -100;
    bubble = [];
    poisonbubble = [];
    coins = 0;
    poison = 0;
    worldistriggerd = false;
    inervalworld = false;
    allcoins = false;
    hitpoison = false;
    hitenemy = false;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsEnemy();
            this.checkCollisionsCollactable();
            this.checkCollisionsPoison();
            this.checkCollisionsBubble();
            this.checkCollisionsPoisonBubble();
            this.checkTriggerBoss();
        }, 1000 / 60);

        setInterval(() => {

            this.levelbarrier.backgroundbarrier.forEach((ground) => {
                let collindingWithBarrier = this.levelbarrier.backgroundbarrier.find(ground => this.character.isColliding(ground));
                let collidingWithBarrierX = this.levelbarrier.backgroundbarrier.find(ground => this.character.isCollidingX(ground));
                let collidingWithBarrierY = this.levelbarrier.backgroundbarrier.find(ground => this.character.isCollidingY(ground));
                if (collindingWithBarrier) {
                    this.isCollidingWithBarrier = true;
                }
                else {
                    this.isCollidingWithBarrier = false
                    this.character.isCollidingWithBarrierUp = false;
                    this.character.isCollidingWithBarrierRight = false;
                    this.character.isCollidingWithBarrierDown = false;
                    this.character.isCollidingWithBarrierLeft = false;
                }
                if (this.character.isColliding(ground)) {
                    if (this.isCollidingWithBarrier == true) {
                        this.character.hitground(collidingWithBarrierY, collidingWithBarrierX);

                    }
                }
            });
        }, 1000 / 60)
    }

    checkCollisionsPoison() {

        if (this.character.isColliding(this.poisonflask)) {
            if (!this.hitpoison) {
                this.hitpoison = true;
                setTimeout(() => {
                    this.statusBarPoison.setPercentage(20, 'poison');

                    setTimeout(() => {
                        this.statusBarPoison.setPercentage(40, 'poison');
                        setTimeout(() => {
                            this.statusBarPoison.setPercentage(60, 'poison');
                            setTimeout(() => {
                                this.statusBarPoison.setPercentage(80, 'poison');
                                setTimeout(() => {
                                    this.statusBarPoison.setPercentage(100, 'poison');
                                    this.poison = 10;
                                    setTimeout(() => {
                                        this.hitpoison = false;
                                    }, 6000);
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 1000);
            }
        }
    }

    checkCollisionsCollactable() {
        this.collectables.collectables.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let coinIndex = this.collectables.collectables.indexOf(coin);
                if (coinIndex == 0) {
                    if (this.coins == 5) {
                        if (!this.inervalworld) {
                            if (this.collectables.collectables[0].img.currentSrc == this.collectables.collectables[0].openpic.currentSrc) {
                                this.inervalworld = true;
                                clearInterval(this.chest);
                                this.statusBarCoin.setPercentage(0, 'coin');
                                setTimeout(() => {
                                    this.allcoins = true;
                                }, 1000);

                            }
                        }
                    } else {
                        if (!this.inervalworld) {
                            if (this.collectables.collectables[0].img.currentSrc == this.collectables.collectables[0].closedPic.currentSrc) {
                                this.inervalworld = true;
                                clearInterval(this.chest);
                                setTimeout(() => {
                                    this.collectables.collectables[0].animate();
                                    this.inervalworld = false;
                                    this.chest = this.collectables.collectables[0].intervalChest;

                                }, 2000);
                            }
                        }
                    }
                } else {
                    this.coins++;
                    this.statusBarCoin.setPercentage(this.coins * 21, 'coin');
                    this.collectables.collectables.splice(coinIndex, 1);
                    console.log(coinIndex);
                }
            }
        })
    }

    checkCollisionsEnemy() {
        this.levelenemy.fish.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                
                if (!this.hitenemy) {
                    if(enemy.hitsuper){
                        this.character.hitSuper();
                    }
                    this.hitenemy = true;
                    this.character.hit();
                    this.statusBarLife.setPercentage(this.character.energy, 'life');
                    console.log(this.character.energy);
                    setTimeout(() => {
                        this.hitenemy = false;
                    }, 400)
                }
            }
        });
    }

    checkCollisionsBubble(){
        this.levelenemy.fish.forEach((enemy)=>{
            this.bubble.forEach((bubble)=>{
                if(enemy.isColliding(bubble)&& enemy instanceof Jelly){
                    enemy.hitenemy(bubble.attack);
                    
                }

            });
            
        });
    }

    checkCollisionsPoisonBubble(){
        this.levelenemy.fish.forEach((enemy)=>{
            this.poisonbubble.forEach((poisonbubble)=>{
                if(enemy.isColliding(poisonbubble)&& enemy instanceof Jellysuper || enemy.isColliding(poisonbubble)&& enemy instanceof Endboss){
                    enemy.hitenemy(poisonbubble.attack);
                    this.poisonbubble.splice(poisonbubbleindex, 1);
                }

            });
            
        });
    }

    checkTriggerBoss(){
        if (this.character.x > 1700 && this.character.y < 400 && !this.worldistriggerd ){
           console.log('work');
           this.levelenemy.fish[25].istriggerd = true;
           this.worldistriggerd = true;
            
       }
   }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(0, this.camera_y);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(-0, -this.camera_y);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarPoison);

        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(0, this.camera_y);

        this.addObjectsToMap(this.levelbarrier.backgroundbarrier);
        this.addObjectsToMap(this.levelenemy.fish);
        this.addObjectsToMap(this.collectables.collectables);
        if(this.worldistriggerd){
            this.addObjectsToMap(this.triggerbarrier);
        }
        if (this.allcoins) {
            this.addToMap(this.poisonflask);
        }
        this.addToMap(this.character);
        if (this.bubble) {
            this.addObjectsToMap(this.bubble);
        }
        if (this.poisonbubble) {
            this.addObjectsToMap(this.poisonbubble);
        }
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(-0, -this.camera_y);



        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }



    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);

        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);

        }
        if (!(mo.img == undefined)) {
            mo.draw(this.ctx);
        }
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}