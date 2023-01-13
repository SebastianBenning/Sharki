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
        let bossanimation = 0;
        setInterval(() => {
            if (bossanimation < 10) {
                this.loadImages(ENEMYS['boss_animation']);
                let i = this.currentImage % ENEMYS['boss_animation'].length;
                this.playAnimation(ENEMYS['boss_animation'], i);
                bossanimation++;
            }
            else if (this.isHurt()) {
                this.loadImages(ENEMYS['boss_swim']);
                let i = this.currentImage % ENEMYS['boss_swim'].length;
                this.playAnimation(ENEMYS['boss_swim'], i);
            }
            else {
                this.loadImages(ENEMYS['boss_swim']);
                let i = this.currentImage % ENEMYS['boss_swim'].length;
                this.playAnimation(ENEMYS['boss_swim'], i);
            }

            if (this.istriggerd && !this.hadfirstContact) {
                bossanimation = 0;
                this.hadfirstContact = true;
            }
        }, 130);
    }

    
}