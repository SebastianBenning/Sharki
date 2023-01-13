class Endboss extends MovableObject {
    energy = 50;
    height = 400;
    width = 400;
    y = 0;
    hadfirstContact = false;


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
            if (bossanimation < 10) {
                this.playAnimation(ENEMYS['boss_animation']);
                bossanimation++;
            }
            else if (this.isHurt()) {
                this.playAnimation(ENEMYS['boss_hurt']);
            }
            else if (this.isDead()) {
                this.playAnimation(ENEMYS['boss_dead']);
                if (i == 4) {
                    clearInterval(intervalboss);
                }
            }
            else {
                this.playAnimation(ENEMYS['boss_swim']);
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