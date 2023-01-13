class Endboss extends MovableObject {
    energy = 50;
    height = 400;
    width = 400;
    y = 0;
    hadfirstContact = false;


    constructor() {
        super()

        this.x = 2300;
        this.animate();
    }

    animate() {
        this.moveLeft();
        let bossanimation = 0;
        let intervalboss = setInterval(() => {

            if (bossanimation < 10) {
                this.loadImages(ENEMYS['boss_animation']);
                let i = this.currentImage % ENEMYS['boss_animation'].length;
                this.playAnimation(ENEMYS['boss_animation'], i);
                bossanimation++;
            }
            else if (this.isHurt()) {
                this.loadImages(ENEMYS['boss_hurt']);
                let i = this.currentImage % ENEMYS['boss_hurt'].length;
                this.playAnimation(ENEMYS['boss_hurt'], i);
            }
            else if (this.isDead()) {
                this.loadImages(ENEMYS['boss_dead']);
                let i = this.currentImage % ENEMYS['boss_dead'].length;
                console.log(i)
                this.playAnimation(ENEMYS['boss_dead'], i);
                if (i == 4) {
                    clearInterval(intervalboss);
                    
                }
            }
            else {
                this.loadImages(ENEMYS['boss_swim']);
                let i = this.currentImage % ENEMYS['boss_swim'].length;
                this.playAnimation(ENEMYS['boss_swim'], i);
            }
            if (this.hadfirstContact ){
                this.moveLeft();
            }

            if (this.istriggerd && !this.hadfirstContact) {
                bossanimation = 0;
                this.hadfirstContact = true;
                
            }
        }, 130);
    }


}