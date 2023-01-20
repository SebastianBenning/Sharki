class Endboss extends MovableObject {
    energy = 50;
    height = 400;
    width = 400;
    y = 0;
    hadfirstContact = false;
    win_sound = new Audio('audio/win.mp3');

    constructor() {
        super()
        this.loadImages(ENEMYS['boss_animation']);
        this.loadImages(ENEMYS['boss_hurt']);
        this.loadImages(ENEMYS['boss_dead']);
        this.loadImages(ENEMYS['boss_swim']);
        this.x = 2300;
        this.animate();
    }

    animate() {
        this.moveLeft();
        let bossanimation = 0;
        let intervalboss = setInterval(() => {
            if (this.hadfirstContact) {
                if (bossanimation < 10) {
                    this.playAnimation(ENEMYS['boss_animation']);
                    bossanimation++;
                }
                else if (this.isHurt()) {
                    this.playAnimation(ENEMYS['boss_hurt']);
                }
                else if (this.isDead()) {
                    let i = this.currentImage % ENEMYS['boss_dead'].length;
                    this.playAnimation(ENEMYS['boss_dead']);
                    if (soundonoff) {
                        this.win_sound.play();
                    }
                    if (i == 4) {
                        clearInterval(intervalboss);
                        endbossisDead = true;
                    }
                }
                else {
                    this.playAnimation(ENEMYS['boss_swim']);
                }
            }
            if (this.hadfirstContact) {
                this.moveLeft();
            }

            if (this.istriggerd && !this.hadfirstContact) {
                bossanimation = 0;
                this.hadfirstContact = true;
            }
        }, 130);
    }


}